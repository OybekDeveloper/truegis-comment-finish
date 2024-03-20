import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "../home/home";
import AllProduct from "../all-product/all-product";
import Photo from "../photo/photo";
import Comment from "../comment/comment";
import About from "../about/about";
import AddComment from "../comment/add-comment";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
export default function App() {
  const id = localStorage.getItem("id");
  const km = localStorage.getItem("km");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const tg = window.Telegram.WebApp;
  useEffect(() => {
    navigate(`/${id}/${km}/all-product`);
  }, []);
  const handleBackButtonClick = () => {
    window.history.back();
  };
  return (
    <div className="home max-w-[400px] mx-auto">
      <div>
        {pathname !== `/${id}/${km}/all-product` && (
          <button
            onClick={handleBackButtonClick}
            className="mx-[16px] mt-[16px]"
          >
            <ArrowBackIosIcon style={{color:tg.themeParams.text_color}} fontSize="24px" />
          </button>
        )}
      </div>
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
