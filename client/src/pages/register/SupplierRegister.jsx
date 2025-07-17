

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
import { useNavigate } from 'react-router-dom';
import { supplierRegister } from '../../redux/slices/user.js';
import { supplierRegisterValidate } from '../../utils/validation.js';

export default function SupplierRegister() {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    address: '',
    contactPerson: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    companyName: false,
    email: false,
    phone: false,
    address: false,
    contactPerson: false,
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
    const newErrors = supplierRegisterValidate(formData);
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(val => val === true);
    if (!hasErrors) {
      try {
        await dispatch(supplierRegister(formData)).unwrap();
        navigate('/supplier/login', { state: { phone: formData.phone, password: formData.password } });
      } catch (err) {
        alert('התרחשה שגיאה בהרשמה');
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
          Supplier Register
        </Typography>

        <Box sx={{ mt: 4 }}>
          <form onSubmit={submitForm}>
            {[
              { name: 'companyName', label: 'Company Name' },
              { name: 'email', label: 'Email' },
              { name: 'phone', label: 'Phone' },
              { name: 'address', label: 'Address' },
              { name: 'contactPerson', label: 'Contact Person' },
            ].map(({ name, label }) => (
              <TextField
                key={name}
                label={label}
                name={name}
                value={formData[name]}
                onChange={Change}
                error={errors[name]}
                helperText={errors[name] ? `Please enter a valid ${label}` : ''}
                fullWidth
                sx={{ mb: 2 }}
              />
            ))}
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
              sx={{
                width: '100%',
                color: '#0b1d51',
                backgroundColor: 'black',
                fontWeight: 'bold',
              }}
              type="submit"
              variant="contained"
              disabled={Object.values(formData).some(value => value === '')}
            >
              Register
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
