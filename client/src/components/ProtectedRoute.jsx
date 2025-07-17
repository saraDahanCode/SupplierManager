import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children, details }) {
    
    const user=useSelector(state=>state.user.userDetails);
    const isAllowed = user && user.role==details.role
    

    return isAllowed
        ? children
        : <Navigate to={details.redirectPath} replace />;
}