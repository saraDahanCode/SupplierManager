
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { useState } from 'react';
import { validateProduct } from '../../utils/validation';
import {addProductBySupplier} from '../../redux/slices/products.js'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AddProductForm({ onAdd }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    minQuantity: '',
  });

  const [errors, setErrors] = useState({
    productName: false,
    price: false,
    minQuantity: false,
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateProduct(formData);
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((val) => val === true);
    if (!hasErrors) {
      const newProduct = {
        productName: formData.productName.trim(),
        price: parseFloat(formData.price),
        minQuantity: parseInt(formData.minQuantity),
      };

   
      try {
        // מאפשר לי ממש לתפוס שגיאה
        await dispatch(addProductBySupplier(formData)).unwrap();
       
        alert('מוצר נוסף בהצלחה')
        navigate('/supplier/products')

      } catch (err) {
        console.error("Add product faild")
        throw err;


      }
        onAdd(newProduct);
        setSuccess(true);
        setFormData({ productName: '', price: '', minQuantity: '' });
        setErrors({ productName: false, price: false, minQuantity: false });
        navigate('/supplier/products');
      
    }
  };

  const isFormIncomplete =
    !formData.productName.trim() || !formData.price.trim() || !formData.minQuantity.trim();

  return (
    <>
      <Card sx={{ maxWidth: 500, margin: 'auto', mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            הוספת מוצר חדש
          </Typography>

          <TextField
            label="product name"
            fullWidth
            margin="normal"
            value={formData.productName}
            onChange={handleChange('productName')}
            error={!!errors.productName}
            helperText={errors.productName && 'Invalid product name'}
          />

          <TextField
            label="price"
            type="text"
            fullWidth
            margin="normal"
            value={formData.price}
            onChange={handleChange('price')}
            error={!!errors.price}
            helperText={errors.price && 'Invalid price'}
          />

          <TextField
            label="mininmal Quantity"
            type="number"
            fullWidth
            margin="normal"
            value={formData.minQuantity}
            onChange={handleChange('minQuantity')}
            error={!!errors.minQuantity}
            helperText={errors.minQuantity && ' Invalid  quantity'}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={isFormIncomplete}
          >
            הוסף מוצר
          </Button>
        </CardContent>
      </Card>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          המוצר נוסף בהצלחה!
        </Alert>
      </Snackbar>
    </>
  );
}
