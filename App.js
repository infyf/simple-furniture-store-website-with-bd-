import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; 
import Home from "./pages/Home"; 
import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import Footer from "./components/home/Footer";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import AuthForm from "./pages/AuthForm";
import CheckoutForm from "./pages/CheckoutForm"; 

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/checkout" element={<CheckoutForm />} /> 
        </Routes>
      </div>
      <Footer /> 
    </Router>
  );
}

export default App;
