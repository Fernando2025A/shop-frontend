import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Store from "./pages/Store/Store";
import Services from "./pages/Services/Services";
import Orders from "./pages/Orders/Orders";
import Inventory from "./pages/Inventory/Inventory";
import Tasks from "./pages/Generator/Generator";
import Social from "./pages/Social/Social";
import { CartPage } from "./components/CartPage/CartPage";
import { RequireAuth } from "./context/AuthContext";
import {CreateProduct} from "./components/CreateProduct/CreateProduct";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/home/profile" element={<Profile />} />
        <Route path="/home/store" element={<Store />} />
        <Route path="/home/inventory" element={<Inventory />} />
        <Route path="/home/services" element={<Services />} />
        <Route path="/home/orders" element={<Orders />} />
        <Route path="/home/cart" element={<CartPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/rewards" element={<Tasks />} />
        <Route path="/home/social" element={<Social />} />
        {/* <Route path="/home/product/create" element={<CreateProduct display="none" />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
