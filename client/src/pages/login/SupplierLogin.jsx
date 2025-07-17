
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
  Paper,
  Typography
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { basicSupplierValidate } from '../../utils/validation.js';
import { supplierLogin } from '../../redux/slices/user.js';
import { NavLink } from 'react-router-dom';

export default function SupplierLogin() {
  const location = useLocation();
  const { phone, password } = location.state || {};
  const [formData, setFormData] = useState({
    phone: phone || '',
    password: password || ''
  });

  const [errors, setErrors] = useState({
    phone: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Change = (e) => {
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

    const newErrors = basicSupplierValidate(formData);
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some(val => val === true);

    if (!hasErrors) {
      try {
        await dispatch(supplierLogin(formData)).unwrap();
        alert("המשתמש התחבר בהצלחה");
        navigate("/supplier/dashboard");
      } catch (err) {
        alert('אחד או יותר מהפרטים שהזנת שגויים, נסה שוב');
        console.error("שגיאה בהתחברות:", err);
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
          justifyContent: 'flex-start',
          borderRadius: '12px',
          border: '2px solid #1976d2',
          backgroundColor: 'white'
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ fontWeight: 'bold', mt: 1, color: '#0b1d51' }}
        >
          Supplier Login
        </Typography>
        <Box sx={{ mt: 4 }}>
          <form onSubmit={submitForm}>
            <TextField
              label='Phone'
              name='phone'
              value={formData.phone}
              onChange={Change}
              error={errors.phone}
              helperText={errors.phone ? `Please enter a valid phone` : ''}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={Change}
              error={errors.password}
              helperText={errors.password ? 'Please enter a valid password' : ''}
              fullWidth
              sx={{ mb: 2 }}
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
                mt: 1,
                backgroundColor: 'black',
                fontSize: '1.1rem',
                paddingY: 1.2,
                borderRadius: '10px',
              }}
              disabled={Object.values(formData).some(value => value === '')}
            >
              Login
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

            <NavLink
              to={'/supplier/register'}
              style={{
                display: 'block',
                marginTop: 16,
                textAlign: 'center',
                textDecoration: 'none',
                color: '#1976d2',
              }}
            >
              אין לך עדיין חשבון? צור אותו עכשיו
            </NavLink>
          </form>
        </Box>
      </Paper>
    </Box>
  );
}
