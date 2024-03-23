import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../home/home";
import AllProduct from "../all-product/all-product";
import Photo from "../photo/photo";
import Comment from "../comment/comment";
import About from "../about/about";
import AddComment from "../comment/add-comment";
export default function App() {
  const id = localStorage.getItem("id");
    const km = localStorage.getItem("km");
  const navigate = useNavigate();
  const tg = window.Telegram.WebApp;
  useEffect(() => {
    const id = localStorage.getItem("id");
    const km = localStorage.getItem("km");
    navigate(`/${id}/${km}/all-product`);
  }, []);

  return (
    <div className="home max-w-[400px] mx-auto">
      <Routes>
        <Route path="/:id/:km" element={<Home />}>
          <Route path={"all-product"} element={<AllProduct />} />
          <Route path={"photo"} element={<Photo />} />
          <Route path={"comment"} element={<Comment />} />
          <Route path={"about"} element={<About />} />
        </Route>
        <Route path={`/${id}/${km}/add-comment`} element={<AddComment />} />
      </Routes>
    </div>
  );
}
