import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AboutUs from './pages/AboutUs';
import Contacts from './pages/Contacts';
import Cart from './pages/Cart';
import FullCart from './pages/FullCart';
import './scss/main.scss';
import OrderForm from './pages/Orederform';
import OrderSuccess from './pages/OrederSuccess';



function App() {

  return (
    <>
        <Nav />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/description/:id" element={<FullCart />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/order-success/:orderNumber" element={<OrderSuccess />} />
          {/* <Route path="/order-success" element={<OrderSuccess />} /> */}
        </Routes>

        <footer className="footer">
          <div className="container">
            <div className="footer__copiright">© 2023 JIVA</div>
          </div>
        </footer>
    </>
  );
}

export default App;
