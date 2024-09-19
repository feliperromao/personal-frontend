import React, { useState } from 'react';
import { TextField, Button, Container, Typography, CircularProgress } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        type
      }
    }
  }
`;

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login_request, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await login_request({ variables: { email, password } });
      if (!result.data.login.token || !result.data.login.user) {
        throw new Error('login data is corrupted');
      }
      const login_data = {
        token: result.data.login.token,
        user: result.data.login.user,
      }
      login(login_data);
      if (result.data.login.user.type === 'PERSONAL') {
        navigate('/personal');
        return;
      }
      if (result.data.login.user.type === 'STUDENT') {
        navigate('/student');
        return;
      }
      navigate('/');
    } catch (e) {
      console.error('Login error:', e);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ marginTop: '16px' }}
        >
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
      </form>
      {error && <Typography color="error">{error.message}</Typography>}
      {data && <Typography color="primary">Login successful!</Typography>}
    </Container>
  );
};

export default Login;
