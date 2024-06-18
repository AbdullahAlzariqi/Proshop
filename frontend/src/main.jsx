import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';
// import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/bootstrap.custom.css'
import App from './App.jsx'
import { HomeScreen, ProductScreen, PrivateRoutes, AdminRoutes } from './components'
import CartScreen from './screens/cartScreen.jsx';
import './assets/styles/index.css'
import store from './store.js';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ShippingScreen from './screens/ShippingScreen.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';
import OrderScreen from './screens/OrderScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import OrderListScreen from './screens/admin/OrderListScreen.jsx';
import ProductListScreen from './screens/admin/ProductListScreen.jsx';
import ProductEditScreen from './screens/admin/ProductEditScreen.jsx';
import UserListScreen from './screens/admin/UserListScreen.jsx';
import UserEditScreen from './screens/admin/UserEditScreen.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />}></Route>
      <Route path="/page/:pageNumber" element={<HomeScreen />}></Route>
      <Route path="/search/:keyword" element={<HomeScreen />}></Route>
      <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />}></Route>
      <Route path="/product/:id" element={<ProductScreen />}></Route>
      <Route path="/cart" element={<CartScreen />}></Route>
      <Route path="/login" element={<LoginScreen />}></Route>
      <Route path="/register" element={<RegisterScreen />}></Route>

      <Route path="" element={<PrivateRoutes />}>
        <Route path="/shipping" element={<ShippingScreen />}></Route>
        <Route path="/payment" element={<PaymentScreen />}></Route>
        <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
        <Route path="/orders/:id" element={<OrderScreen />}></Route>
        <Route path="/profile" element={<ProfileScreen />}></Route>

      </Route>

      <Route path="" element={<AdminRoutes />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />}></Route>
        <Route path="/admin/productlist" element={<ProductListScreen />}></Route>
        <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen />}></Route>
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />}></Route>
        <Route path="/admin/userlist" element={<UserListScreen />}></Route>
        <Route path="/admin/userlist/:id/edit" element={<UserEditScreen />}></Route>

      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

)
