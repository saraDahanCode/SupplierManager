
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { validateOwnerLogin } from '../../utils/validation';
import { ownerLogin } from '../../redux/slices/user.js';

export default function AdminLogin() {
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [errors, setErrors] = useState({ name: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const change = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: false
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const newErrors = validateOwnerLogin(formData);
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some(val => val === true);
    if (!hasErrors) {
      try {
        await dispatch(ownerLogin(formData)).unwrap();
        navigate("/admin/dashboard");
      } catch (err) {
        console.error("שגיאה בהתחברות:", err);
        throw err;
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        bgcolor: '#0a192f',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          width: 320,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '12px'
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ fontWeight: 'bold', mt: 1 }}
        >
          Owner Login
        </Typography>

        <Box sx={{ mt: 4 }}>
          <form onSubmit={submitForm}>
            <TextField
              label="name"
              name='name'
              type='text'
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={change}
              error={errors.name}
              helperText={errors.name ? 'Please enter a valid name' : ''}
            />
            <TextField
              label="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={change}
              error={errors.password}
              helperText={errors.password ? 'Please enter a valid password' : ''}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: 'black',
                fontSize: '1.1rem',
                paddingY: 1.2,
                borderRadius: '10px',
              }}
              disabled={Object.values(formData).some(value => value === '')}
            >
              login
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate('/')}
              sx={{
                mt: 2,
                borderColor: '#0b1d51',
                color: '#0b1d51',
                fontWeight: 'bold',
                borderRadius: '10px',
              }}
            >
              חזרה לעמוד הראשי
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  );
}
