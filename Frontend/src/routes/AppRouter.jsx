import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CreatePost from "../pages/CreatePost";
import EditPost from "../pages/EditPost";
import PostDetail from "../pages/PostDetail";
import Navbar from "../components/Navbar";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}