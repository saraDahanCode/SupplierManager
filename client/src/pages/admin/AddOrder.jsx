
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Button,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuppliers } from '../../api/Suppliers';
import { addOwnerOrder } from '../../redux/slices/orders';

export default function AddOrder() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.products);

  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [supplierProducts, setSupplierProducts] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [addedProducts, setAddedProducts] = useState([]);

  useEffect(() => {
    const getSuppliers = async () => {
      try {
        const data = await fetchSuppliers();
        setSuppliers(data);
      } catch (error) {
        alert('שגיאה בטעינת ספקים');
        console.error('Error loading suppliers:', error);
      }
    };

    getSuppliers();
  }, []);

  const changeSupplier = (e) => {
    const supplierId = e.target.value;
    setSelectedSupplier(supplierId);

    const productsBySupplier = allProducts.filter(
      (product) => product.supplierId === supplierId
    );
    setSupplierProducts(productsBySupplier);
    setSelectedQuantities({});
    setAddedProducts([]);
  };

  const changeQuantity = (productId, value) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [productId]: value
    }));
  };

  const addProduct = (product) => {
    const quantityToAdd = parseInt(selectedQuantities[product._id]) || 1;

    if (quantityToAdd <= 0) {
      alert('אנא הזן כמות חוקית');
      return;
    }

    if (quantityToAdd < product.minQuantity) {
      alert(`כמות מינימלית למוצר "${product.productName}" היא ${product.minQuantity}`);
      return;
    }

    const exists = addedProducts.find((p) => p._id === product._id);

    if (exists) {
      setAddedProducts((prev) =>
        prev.map((p) =>
          p._id === product._id
            ? { ...p, quantity: p.quantity + quantityToAdd }
            : p
        )
      );
    } else {
      setAddedProducts((prev) => [
        ...prev,
        { ...product, quantity: quantityToAdd }
      ]);
    }

    setSelectedQuantities((prev) => ({
      ...prev,
      [product._id]: ''
    }));
  };

  const getTotalPrice = () => {
    return addedProducts.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );
  };

  const submitOrder = async () => {
    if (!addedProducts.length) {
      alert('לא נבחרו מוצרים להזמנה');
      return;
    }

    const selectedSupplierData = suppliers.find(s => s._id === selectedSupplier);
    const supplierCompanyName = selectedSupplierData?.companyName || '';

    try {
      await dispatch(
        addOwnerOrder({
          supplierId: selectedSupplier,
           companyName: supplierCompanyName,
          products: addedProducts.map((p) => ({
            productId: p._id,
            quantity: p.quantity,
            productName: p.productName
          })),
          totalPrice: getTotalPrice()
        })
      ).unwrap();

      alert('הזמנה נשלחה בהצלחה!');
      setAddedProducts([]);
      setSelectedSupplier('');
      setSupplierProducts([]);
    } catch (err) {
      console.error('שגיאה בשליחת הזמנה:', err);
      alert('שגיאה בשליחת הזמנה');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        יצירת הזמנה חדשה
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>בחר ספק</InputLabel>
        <Select
          value={selectedSupplier}
          onChange={changeSupplier}
          label="בחר ספק"
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300
              }
            }
          }}
        >
          {suppliers.map((supplier) => (
            <MenuItem key={supplier._id} value={supplier._id}>
              {supplier.companyName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedSupplier && (
        <>
          <Typography variant="h6" gutterBottom>
            מוצרים זמינים מהספק
          </Typography>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            {supplierProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {product.productName}
                    </Typography>
                    <Typography variant="body2">
                      מחיר: {product.price} ₪
                    </Typography>
                    <Typography variant="body2">
                      כמות מינימלית: {product.minQuantity}
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                      <TextField
                        label="כמות"
                        size="small"
                        type="number"
                        value={selectedQuantities[product._id] || ''}
                        onChange={(e) =>
                          changeQuantity(product._id, e.target.value)
                        }
                        sx={{ width: '80px', mr: 1 }}
                      />
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => addProduct(product)}
                      >
                        הוסף
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ mb: 3 }} />

          <Typography variant="h6" gutterBottom>
            פרטי ההזמנה:
          </Typography>

          <List dense>
            {addedProducts.map((product, idx) => (
              <ListItem key={idx}>
                <ListItemText
                  primary={`${product.productName} - כמות: ${product.quantity} - סה"כ: ₪${product.quantity * product.price}`}
                />
              </ListItem>
            ))}
          </List>

          <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>
            מחיר כולל: ₪{getTotalPrice().toFixed(2)}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={submitOrder}
          >
            סיום הזמנה
          </Button>
        </>
      )}
    </Box>
  );
}
