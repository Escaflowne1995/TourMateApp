import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../utils/theme';
import AuthScreenLayout from '../../components/layout/AuthScreenLayout';
import LoginForm from '../../components/auth/LoginForm';
import useLoginLogic from '../../hooks/useLoginLogic';
import { getLoginStyles } from '../../styles/authStyles';
import FirebaseDebug from '../../utils/debug/FirebaseDebug';

const Login = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  const styles = getLoginStyles(colors, isDarkMode);
  
  // Dependency Injection - All logic separated into custom hook
  const {
    showPassword,
    setShowPassword,
    isLoading,
    validationSchema,
    handleLogin,
    canSubmit
  } = useLoginLogic(navigation);

  // Debug Firebase on screen load (remove this in production)
  React.useEffect(() => {
    // Uncomment the next line to run Firebase diagnostics
    // FirebaseDebug.runFullDiagnostic();
  }, []);

  return (
    <AuthScreenLayout colors={colors} backgroundIndex={0}>
      <LoginForm
        validationSchema={validationSchema}
        onSubmit={handleLogin}
        isLoading={isLoading}
        canSubmit={canSubmit}
        colors={colors}
        styles={styles}
        navigation={navigation}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
    </AuthScreenLayout>
  );
};

export default Login;
