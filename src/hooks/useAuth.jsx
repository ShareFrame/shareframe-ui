import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';

const useAuth = () => {
  const [loginMutation, { loading, error }] = useMutation(LOGIN_USER);

  const login = async (email, password) => {
    const response = await loginMutation({ variables: { email, password } });
    const token = response.data.login.token;
    localStorage.setItem('token', token);
    return response.data.login.user;
  };

  const logout = () => localStorage.removeItem('token');

  return { login, logout, loading, error };
};

export default useAuth;
