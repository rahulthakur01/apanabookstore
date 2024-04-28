import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import Navbar from "./components/Header";
import ListPage from "./pages/List";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import ViewOrderDetails from "./pages/ViewOrderDetails";
import OrderPage from "./pages/ViewOrder";
import { useState } from "react";
import DocumentPage from "./pages/DocumentPage";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/book/list" element={<ListPage  />} />
          <Route path="/book/view/:bookId" element={<DetailPage />} />
          <Route path="/book/orders" element={<OrderPage/>}/>
          <Route path="/books/orders/:bookId" element={<ViewOrderDetails/>}/>
          <Route path="/document" element={<DocumentPage/>} />
        

          
        </Routes>
      </div>
    </>
  );
}

export default App;
