import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  AppBar,
  Toolbar,
} from '@mui/material';

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Indian users data
  const indianUsers = [
    {
      id: 1,
      first_name: 'Arjun',
      last_name: 'Patel',
      email: 'arjun.patel@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
    },
    {
      id: 2,
      first_name: 'Priya',
      last_name: 'Sharma',
      email: 'priya.sharma@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/42.jpg'
    },
    {
      id: 3,
      first_name: 'Rahul',
      last_name: 'Kumar',
      email: 'rahul.kumar@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/43.jpg'
    },
    {
      id: 4,
      first_name: 'Neha',
      last_name: 'Gupta',
      email: 'neha.gupta@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 5,
      first_name: 'Vikram',
      last_name: 'Singh',
      email: 'vikram.singh@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    {
      id: 6,
      first_name: 'Ananya',
      last_name: 'Reddy',
      email: 'ananya.reddy@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/46.jpg'
    }
  ];

  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      setUsers(indianUsers);
      localStorage.setItem('users', JSON.stringify(indianUsers));
    }
  }, []);

  const handleDelete = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    toast.success('User deleted successfully');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const filteredUsers = users.filter(user =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #1a237e 30%, #3949ab 90%)' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EmployWise Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            label="Search users"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#1a237e',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1a237e',
                }
              }
            }}
          />

          <Grid container spacing={3}>
            {filteredUsers.map(user => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: '#1a237e' }}>
                      {user.first_name} {user.last_name}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {user.email}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        onClick={() => navigate(`/edit/${user.id}`)}
                        fullWidth
                        sx={{
                          background: 'linear-gradient(45deg, #1a237e 30%, #3949ab 90%)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #3949ab 30%, #1a237e 90%)',
                          }
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(user.id)}
                        fullWidth
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default UserList;