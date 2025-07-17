
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLogin from '../pages/login/MainLogin.jsx'
import AdminLogin from '../pages/login/AdminLogin.jsx';
import SupplierLogin from '../pages/login/SupplierLogin.jsx';
import MainLayout from '../layouts/MainLayout.jsx';
import AdminDashboard from '../pages/admin/AdminDashboard.jsx';
import SupplierDashboard from '../pages/supplier/SupplierDashboard.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import SupplierRegister from '../pages/register/SupplierRegister.jsx';
import Products from '../pages/supplier/Products.jsx'
import AllOrders from '../pages/supplier/AllOrders.jsx';
import OrdersToUpdate from '../pages/supplier/OrdersToUpdate.jsx';
import UserProfileCard from '../pages/supplier/Profile.jsx';
import AddProduct from '../pages/supplier/AddProduct.jsx';
import ViewOrders from '../pages/admin/ViewOrders.jsx';
import  CompleteOrders  from '../pages/admin/CompleteOrders.jsx';
import AddOrder from '../pages/admin/AddOrder.jsx'
const router = createBrowserRouter([
  { path: '/', element: <MainLogin /> },
  { path: '/admin/login', element: <AdminLogin /> },
  { path: '/supplier/login', element: <SupplierLogin /> },
  { path: '/supplier/register', element: <SupplierRegister /> },

  {
    path: '/supplier',
    element: (
      <ProtectedRoute details={{ role: 'supplier', redirectPath: '/supplier/login' }}>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path:
          'dashboard',
        element: <SupplierDashboard />
      },
      {
        path: 'orders',
        element: <AllOrders />
      },
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'profile',
        element: <UserProfileCard />
      },
      {
        path: 'updateOrders',
        element: <OrdersToUpdate />
      },
      {
        path: 'products/add',
        element: <AddProduct />
      }
    ]
  },

  {
    path: '/admin',
    element: (
      <ProtectedRoute details={{ role: 'admin', redirectPath: '/admin/login' }}>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'orders', element: <ViewOrders /> },
      { path: 'updateOrders', element: <CompleteOrders /> },
      { path: 'orders/new', element: <AddOrder /> }
      // ,
      // { path: 'profile', element: <CompleteOrders /> }
    ]
  }
]);


export default function AppRouter() {
  return <RouterProvider router={router} />;
}
