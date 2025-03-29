import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, TextField, Button, Typography, Container, Paper } from '@mui/material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() === 'Sandesh' && password.trim() === 'Sandesh123') {
      localStorage.setItem('token', 'dummy-auth-token');
      toast.success('Login successful!');
      navigate('/users');
    } else {
      toast.error('Invalid credentials. Please use Username: Sandesh and Password: Sandesh123');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            padding: 4, 
            width: '100%',
            background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
            borderRadius: 2,
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
          }}
        >
          <Typography 
            component="h1" 
            variant="h4" 
            align="center" 
            gutterBottom
            sx={{ 
              color: '#1a237e',
              fontWeight: 'bold',
              mb: 3
            }}
          >
            Welcome Back
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 2, 
                mb: 2,
                py: 1.5,
                background: 'linear-gradient(45deg, #1a237e 30%, #3949ab 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #3949ab 30%, #1a237e 90%)',
                }
              }}
            >
              Sign In
            </Button>
            <Typography variant="body2" color="textSecondary" align="center">
              Username: Sandesh / Password: Sandesh123
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;