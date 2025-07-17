
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {confirmOrder} from '../../redux/slices/orders.js'
function OrderCard({ order, onApprove }) {
  return (
    <Card
      key={order._id}
      variant="outlined"
      sx={{
        width: 320,
        borderRadius: 3,
        direction: 'rtl',
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {order.customerName}
            </Typography>
            <Typography variant="body2">
              סכום כולל: {order.totalPrice} ₪
            </Typography>
            <Typography variant="body2">
              סטטוס: {order.status}
            </Typography>
          </Box>

          {order.status === 'pending' && (
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => onApprove(order._id)}
              sx={{ ml: 1 }}
            >
              אישור
            </Button>
          )}
        </Box>

        <Divider sx={{ mb: 1 }} />
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          מוצרים:
        </Typography>
        <List dense disablePadding>
          {order.products.map((product, idx) => (
            <ListItem key={idx} sx={{ py: 0.5 }}>
              <ListItemText
                primary={`${product.productName} - כמות: ${product.quantity}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default function OrdersRowList() {
  const orders = useSelector(state => state.orders.supplierOrders);
  const dispatch = useDispatch();

  if (!orders || orders.length === 0) {
    return (
      <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 4 }}>
        אין לך עדיין הזמנות
      </Typography>
    );
  }

  const handleApproveAndRefresh = async (id) => {
    
    try {
        // מאפשר לי ממש לתפוס שגיאה
        await dispatch(confirmOrder(id)).unwrap();
        console.log("Order updated succssefuly");


    } catch (err) {
        console.error("Order updated faild")
        throw err;


    }
  };

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const rows = chunkArray(orders, 3);

  return (
    <Box sx={{ p: 2 }}>
      {rows.map((row, rowIndex) => {
        // key ייחודי לפי ה־_id של כל ההזמנות בשורה (מונע בעיות ברנדר)
        const key = row.map(o => o._id).join('-');
        return (
          <Box
            key={key}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              gap: 2,
              mb: 3,
            }}
          >
            {row.map(order => (
              <OrderCard key={order._id} order={order} onApprove={handleApproveAndRefresh} />
            ))}
          </Box>
        );
      })}
    </Box>
  );
}
