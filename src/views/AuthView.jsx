import { Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from '../components/auth/LoginScreen';

function AuthView() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" replace />} />
      <Route path="login" element={<LoginScreen />} />
    </Routes>
  );
}

export default AuthView;
