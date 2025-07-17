
import { useEffect } from "react";
import { Box, Typography, Toolbar, Grid, Card, CardContent, Button, CircularProgress } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOwnerOrders } from '../../redux/slices/orders.js';
import { fetchProducts } from "../../redux/slices/products.js";

export default function AdminDeshboard() {
  const user = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();

  const { ownerOrders, loadingOwner } = useSelector((state) => state.orders);
 
  
  useEffect(() => {
    dispatch(fetchOwnerOrders());
    dispatch(fetchProducts());
  }, [dispatch, user]);

  const uncompletedOrders = ownerOrders.filter(order => order.status === 'in process');

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5">ברוך הבא, {user.name}</Typography>
        </Toolbar>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* הזמנות ממתינות */}
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>הזמנות שטרם סומנו כהתקבלו.</Typography>
                {loadingOwner ? (
                  <CircularProgress color="primary" />
                ) : (
                  <>
                    <Typography variant="h3" color="primary">{uncompletedOrders.length}</Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      ישנן {uncompletedOrders.length}  שטרם סומנו כהתקבלו.
                      עדכן אותן עכשיו 
                    </Typography>
                    <Button variant="outlined" fullWidth component={Link} to="/admin/updateOrders">
                      צפייה בהזמנות
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>

          

          {/* הוסף מוצר */}
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>צור הזמנה חדשה</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                 בצע הזמנה מספקים במערכת 
                </Typography>
                <Button variant="contained" fullWidth startIcon={<AddBoxIcon />} component={Link} to="/admin/orders/new">
                  צור הזמנה
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
