import Home from "./Screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Screens/Login";
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Screens/Signup";
import { CartProvider } from "./Components/ContextReduser";
import MyOrder from "./Screens/MyOrder";
import Contact from "./Screens/Contact";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Createuser" element={<Signup />} />
            <Route exact path="/MyOrder" element={<MyOrder />} />
            <Route exact path="/Contact" element={<Contact />} />


          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
