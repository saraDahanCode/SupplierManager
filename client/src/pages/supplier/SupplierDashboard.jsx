
import { Box, Typography, Toolbar, Grid, Card, CardContent, Button, CircularProgress } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSupplierOrders } from '../../redux/slices/orders.js';
import { fetchProducts } from "../../redux/slices/products.js";

export default function SupplierDashboard() {
  const user = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSupplierOrders());
    dispatch(fetchProducts());
  }, [dispatch, user]);

  const { supplierOrders, loadingSupplier } = useSelector((state) => state.orders);
  const { products, loadingProducts } = useSelector((state) => state.products);

  const pendingOrders = supplierOrders && supplierOrders.filter(order => order.status === 'pending');

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5">ברוך הבא, {user.companyName}</Typography>
        </Toolbar>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* הזמנות ממתינות */}
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>הזמנות ממתינות</Typography>
                {loadingSupplier ? (
                  <CircularProgress color="primary" />
                ) : (
                  <>
                    <Typography variant="h3" color="primary">{pendingOrders.length}</Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      ישנן {pendingOrders.length} הזמנות שממתינות לאישור שלך.
                    </Typography>
                    <Button variant="outlined" fullWidth component={Link} to="/supplier/orders">
                      צפייה בהזמנות
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* סה"כ מוצרים */}
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>סה"כ מוצרים</Typography>
                {loadingProducts ? (
                  <CircularProgress color="primary" />
                ) : (
                  <>
                    <Typography variant="h3" color="primary">{products.length}</Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      יש לך {products && products.length} מוצרים פעילים במערכת.
                    </Typography>
                    <Button variant="outlined" fullWidth component={Link} to="/supplier/products">
                      צפייה במוצרים
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
                <Typography variant="h6" gutterBottom>הוסף מוצר חדש</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  הוסף מוצרים חדשים לחנות שלך.
                </Typography>
                <Button variant="contained" fullWidth startIcon={<AddBoxIcon />} component={Link} to="/supplier/products/add">
                  הוסף מוצר
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}




