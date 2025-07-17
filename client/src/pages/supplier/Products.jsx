
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { useSelector } from 'react-redux';



export default function ProductsTable() {
  const products = useSelector(state => state.products.products);
  if(!products || products.length==0)
    return <>אין לך עדיין מוצרים </>

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 1,
        mx: 'auto',
        width: '80vw', 
        maxWidth: 'none', 
        boxShadow: 3,
        overflowX: 'auto', 
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
           
            <TableCell>מחיר</TableCell>
            <TableCell>כמות מינימלית</TableCell>
             <TableCell>שם מוצר</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.flat().map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.productName}</TableCell>
              <TableCell>{product.price} ₪</TableCell>
              <TableCell>{product.minQuantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
