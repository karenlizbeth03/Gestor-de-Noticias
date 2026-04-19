import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import PostDetail from "../pages/PostDetail";
import Navbar from "../components/Navbar";

export default function AppRouter() {
  return (
    <BrowserRouter>

      {/* NAVBAR GLOBAL */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>

    </BrowserRouter>
  );
}