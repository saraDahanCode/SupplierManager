
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/user.js';

export default function MainLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        minHeight: '100%',
        bgcolor: '#0a192f',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2
      }}
    >
      <Card
        sx={{
          width: 320,
          borderRadius: 3,
          boxShadow: 5,
          p: 3,
          backgroundColor: '#ffffff'
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            color="primary"
          >
            כניסה למערכת
          </Typography>

          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
            sx={{ mt: 1, mb: 2 }}
          >
            אינך מחובר או שנותקת מהמערכת אנא התחבר שוב
          </Typography>

          <Stack spacing={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate('/admin/login')}
            >
              כניסת מנהל
            </Button>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => navigate('/supplier/login')}
            >
              כניסת ספק
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
