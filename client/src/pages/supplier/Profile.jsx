// UserProfileCard.jsx
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box
} from '@mui/material';

import { useSelector } from 'react-redux';

export default function UserProfileCard() {
  const user = useSelector(state => state.user.userDetails);

  return (
    <Card sx={{ maxWidth: 340, margin: 'auto', mt: 6, borderRadius: 3, minHeight: 180 }}>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6" align="center" gutterBottom>
          פרטי משתמש
        </Typography>
        <Divider sx={{ mb: 1 }} />

        <Box sx={{ mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">שם חברה:</Typography>
          <Typography variant="body2">{user.companyName}</Typography>
        </Box>
        <Box sx={{ mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">אימייל:</Typography>
          <Typography variant="body2">{user.email}</Typography>
        </Box>
        <Box sx={{ mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">טלפון:</Typography>
          <Typography variant="body2">{user.phone}</Typography>
        </Box>
        <Box sx={{ mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">איש קשר:</Typography>
          <Typography variant="body2">{user.contactPerson}</Typography>
        </Box>
        <Box sx={{ mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">כתובת:</Typography>
          <Typography variant="body2">{user.address}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}