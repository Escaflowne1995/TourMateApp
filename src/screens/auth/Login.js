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

  // ✅ All login logic is here via custom hook
  const {
    showPassword,
    setShowPassword,
    isLoading,
    validationSchema,
    handleLogin,
    canSubmit,
  } = useLoginLogic(navigation);

  React.useEffect(() => {
    // Uncomment for debugging Firebase
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
