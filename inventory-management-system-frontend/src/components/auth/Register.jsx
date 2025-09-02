import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../../features/auth/authSlice';
import { FaUserPlus } from 'react-icons/fa';

import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
  Grid
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const { username, email, password, password2 } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        username,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <FaUserPlus size={24} style={{ marginRight: 8 }} />
            <Typography component="h1" variant="h5">
              Register
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ mb: 3, textAlign: 'center' }}>
            Create an account to get started
          </Typography>

          <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={onChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={onChange}
            />
            <FormControl margin="normal" required fullWidth variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={onChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth variant="outlined">
              <InputLabel htmlFor="password2">Confirm Password</InputLabel>
              <OutlinedInput
                id="password2"
                name="password2"
                type={showPassword ? 'text' : 'password'}
                value={password2}
                onChange={onChange}
                label="Confirm Password"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            {isError && (
              <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                {message}
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Register;
