import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "../pages/Home";
import PostDetail from "../pages/PostDetail";
import Navbar from "../components/Navbar";
import CreatePost from "../pages/CreatePost";
import EditPost from "../pages/EditPost";

export default function AppRouter() {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>

      {/* NAVBAR GLOBAL */}
      <Navbar onSearch={setSearch}/>

      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>

    </BrowserRouter>
  );
}