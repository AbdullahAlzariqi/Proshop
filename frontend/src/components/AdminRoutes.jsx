import { useSelector } from "react-redux"
import { Outlet, Navigate } from 'react-router-dom'


const AdminRoutes = () => {

    const { userInfo } = useSelector((state) => state.auth)
    const isAdmin = userInfo.isAdmin;
    return userInfo && isAdmin ? <Outlet /> : <Navigate to="/login" replace />

}

export default AdminRoutes