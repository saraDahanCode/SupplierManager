// PendingOrdersList.jsx
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from '@mui/material';

export default function PendingOrdersList({ orders, onApprove, showApproveButton }) {
  return (
    <Stack spacing={2} sx={{ mt: 3 }}>
      {orders.map((order) => (
        <Card key={order._id} variant="outlined" sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              הזמנה מ: {order.customerName}
            </Typography>
            <Typography color="text.secondary">
              תאריך: {new Date(order.date).toLocaleDateString()}
            </Typography>
            <Typography color="text.secondary" sx={{ my: 1 }}>
              סטטוס: {order.status}
            </Typography>

            {showApproveButton(order) && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => onApprove(order._id)}
              >
                אשר הזמנה
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
