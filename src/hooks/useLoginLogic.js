// useLoginLogic.js - Custom hook for login state and logic (SRP + DIP)
import { useState, useMemo, useEffect } from 'react';
import ValidationService from '../services/validation/ValidationService';
import SecurityService from '../services/security/SecurityService';
import LoginController from '../controllers/LoginController';
import AsyncStorageTest from '../utils/debug/AsyncStorageTest';
import FirebaseEmailHistoryService from '../services/storage/FirebaseEmailHistoryService';
import EmailHistoryService from '../services/storage/EmailHistoryService';

const useLoginLogic = (navigation) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Dependency Injection - Services injected through useMemo
  const securityService = useMemo(() => new SecurityService(5), []);
  const loginController = useMemo(() => new LoginController(securityService), [securityService]);
  const validationSchema = useMemo(() => ValidationService.getLoginValidationSchema(), []);

  // Debug AsyncStorage on component mount
  useEffect(() => {
    AsyncStorageTest.debugAsyncStorage();
  }, []);

  const handleLogin = async (values) => {
    setIsLoading(true);
    
    try {
      // Attempt login
      await loginController.handleLogin(values.email, values.password, navigation);
      
      // Save successful login email to history with fallback
      try {
        await FirebaseEmailHistoryService.addEmail(values.email);
        console.log('Email saved to Firebase history');
      } catch (emailSaveError) {
        console.warn('Could not save email to Firebase, falling back to AsyncStorage:', emailSaveError.message);
        // Fallback to AsyncStorage if Firebase fails
        try {
          await EmailHistoryService.saveEmail(values.email);
          console.log('Email saved to AsyncStorage history as fallback');
        } catch (asyncStorageError) {
          console.error('Failed to save email to both Firebase and AsyncStorage:', asyncStorageError);
          // Don't fail the login if email saving fails completely
        }
      }
      
    } catch (loginError) {
      console.error('Login failed:', loginError);
      throw loginError; // Re-throw to handle in UI
    } finally {
      setIsLoading(false);
    }
  };

  const canSubmit = securityService.canAttemptLogin();

  return {
    showPassword,
    setShowPassword,
    isLoading,
    validationSchema,
    handleLogin,
    canSubmit
  };
};

export default useLoginLogic; 