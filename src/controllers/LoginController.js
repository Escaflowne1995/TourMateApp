import AuthService from '../services/auth/AuthService';
import UserService from '../services/user/UserService';
import NavigationService from '../services/navigation/NavigationService';
import AlertService from '../utils/alert/AlertService';

// Dependency Inversion: Depends on abstractions (services), not concrete implementations
// Single Responsibility: Only orchestrates login flow
class LoginController {
  constructor(securityService) {
    this.securityService = securityService; // Dependency injection
  }

  async handleLogin(email, password, navigation) {
    // Check security constraints
    if (!this.securityService.canAttemptLogin()) {
      AlertService.showTooManyAttempts();
      return { success: false };
    }

    console.log('Attempting login with email:', email);
    
    // Authenticate user
    const authResult = await AuthService.login(email, password);
    
    if (!authResult.success) {
      this.securityService.incrementAttempts();
      this._handleLoginError(authResult.error, email, navigation);
      return { success: false };
    }

    // Get user data
    const userResult = await UserService.getUserData(authResult.user);
    
    if (!userResult.success) {
      AlertService.showError('Error', 'Failed to load user data');
      return { success: false };
    }

    // Reset security attempts on successful login
    this.securityService.resetAttempts();
    
    // Navigate to main app
    NavigationService.navigateToMainApp(navigation, userResult.userData);
    
    console.log('Login successful for user:', userResult.userData.email);
    return { success: true, userData: userResult.userData };
  }

  _handleLoginError(error, email, navigation) {
    console.error('Login error:', error);
    
    const errorCode = error.code || error.message;
    
    switch (errorCode) {
      case 'auth/user-not-found':
        console.log('Showing account not found alert for:', email);
        AlertService.showAccountNotFound(email, (email) => {
          NavigationService.navigateToSignup(navigation, email);
        });
        break;
      case 'auth/invalid-credential':
        console.log('Showing invalid credentials alert for:', email);
        // For known corrupted accounts, offer direct recovery
        if (email === 'romeoalbarando115@gmail.com' || email === 'ompadking77@gmail.com') {
          AlertService.showCorruptedAccountRecovery(
            email,
            (email) => this._handlePasswordReset(email),
            (email) => this._handleAccountRecreation(email, navigation)
          );
        } else {
          AlertService.showInvalidCredentials(
            email, 
            (email) => this._handlePasswordReset(email),
            (email) => NavigationService.navigateToSignup(navigation, email)
          );
        }
        break;
      case 'auth/wrong-password':
        console.log('Showing invalid password alert');
        AlertService.showInvalidPassword();
        break;
      case 'auth/too-many-requests':
        console.log('Showing too many attempts alert');
        AlertService.showTooManyAttempts();
        break;
      default:
        console.log('Showing generic error alert for code:', errorCode);
        const message = AuthService.getErrorMessage(errorCode);
        AlertService.showError('Login Failed', message);
    }
  }

  async _handlePasswordReset(email) {
    console.log('Attempting password reset for:', email);
    const result = await AuthService.resetPassword(email);
    
    if (result.success) {
      AlertService.showError('Password Reset', 'Password reset email has been sent to your email address.');
    } else {
      AlertService.showError('Reset Failed', 'Failed to send password reset email. Please try again.');
    }
  }

  async _handleAccountRecreation(email, navigation) {
    console.log('Handling account recreation for:', email);
    AlertService.showConfirmation(
      'Recreate Account',
      'This will create a new account with the same email. Your previous data may be lost. Continue?',
      () => {
        // Navigate to signup with the email pre-filled
        NavigationService.navigateToSignup(navigation, email);
      },
      () => {
        console.log('Account recreation cancelled');
      }
    );
  }
}

export default LoginController; 