import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { Toaster } from "react-hot-toast";
import BookList from "./Pages/BookList";
import AddBooks from './Pages/AddBooks'

function App() {
  return (
    <>
    <Toaster position="top-center"/>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<SignUp />}/>
        <Route path="/booklist" element={<BookList />}/>
        <Route path="/addBook" element={<AddBooks />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
