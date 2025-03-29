import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  AppBar,
  Toolbar
} from '@mui/material';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });

  useEffect(() => {
    // Simulating API call with Indian user data
    const indianUsers = {
      1: { first_name: 'Arjun', last_name: 'Patel', email: 'arjun.patel@example.com' },
      2: { first_name: 'Priya', last_name: 'Sharma', email: 'priya.sharma@example.com' },
      3: { first_name: 'Rahul', last_name: 'Kumar', email: 'rahul.kumar@example.com' },
      4: { first_name: 'Neha', last_name: 'Gupta', email: 'neha.gupta@example.com' },
      5: { first_name: 'Vikram', last_name: 'Singh', email: 'vikram.singh@example.com' },
      6: { first_name: 'Ananya', last_name: 'Reddy', email: 'ananya.reddy@example.com' }
    };
    
    const userData = indianUsers[id];
    if (userData) {
      setUser(userData);
    } else {
      toast.error('User not found');
      navigate('/users');
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form fields
    if (!user.first_name.trim() || !user.last_name.trim() || !user.email.trim()) {
      toast.error('All fields are required');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Update the user in the parent component
    const userList = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = userList.map(u => {
      if (u.id === parseInt(id)) {
        return { ...u, ...user };
      }
      return u;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    toast.success('User updated successfully');
    navigate('/users');
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #1a237e 30%, #3949ab 90%)' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Edit User Profile
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4,
              background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
              borderRadius: 2,
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
            }}
          >
            <Typography 
              component="h1" 
              variant="h5" 
              gutterBottom
              sx={{ 
                color: '#1a237e',
                fontWeight: 'bold',
                mb: 3
              }}
            >
              Edit User Details
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="First Name"
                name="first_name"
                value={user.first_name}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Last Name"
                name="last_name"
                value={user.last_name}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    background: 'linear-gradient(45deg, #1a237e 30%, #3949ab 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #3949ab 30%, #1a237e 90%)',
                    }
                  }}
                >
                  Update
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate('/users')}
                  sx={{
                    borderColor: '#1a237e',
                    color: '#1a237e',
                    '&:hover': {
                      borderColor: '#3949ab',
                      backgroundColor: 'rgba(57, 73, 171, 0.04)'
                    }
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
}

export default EditUser;