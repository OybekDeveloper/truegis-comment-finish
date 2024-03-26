import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "../home/home";
import AllProduct from "../all-product/all-product";
import Photo from "../photo/photo";
import Comment from "../comment/comment";
import About from "../about/about";
import AddComment from "../comment/add-comment";
import EditComment from "../comment/edit-comment";
export default function App() {
  const placeId = localStorage.getItem("placeId");
  const userId = localStorage.getItem("userId");
  const km = localStorage.getItem("km");
  const {pathname}=useLocation()
  const navigate = useNavigate();
  const tg = window.Telegram.WebApp;
  let BackButton = tg.BackButton;
  useEffect(() => {
    const placeId = localStorage.getItem("placeId");
    const userId = localStorage.getItem("userId");
    const km = localStorage.getItem("km");
    navigate(`/${placeId}/${userId}/${km}/all-product`);
  }, []);
  useEffect(() => {
    if (pathname !== `/${placeId}/${userId}/${km}/all-product`) {
      BackButton.show();
    } else {
      BackButton.hide();
    }
  }, [pathname]);
  const backPage = () => {
    window.history.back();
  };
  BackButton.onClick(function() {
    tg.showAlert("Нет пути назад!");
    
    BackButton.hide();
  });
  tg.onEvent('backButtonClicked', function() {
    backPage()
  });
  

  return (
    <div className="app max-w-[400px] mx-auto">
      <Routes>
        <Route path="/:placeId/:userId/:km" element={<Home />}>
          <Route path={"all-product"} element={<AllProduct />} />
          <Route path={"photo"} element={<Photo />} />
          <Route path={"comment"} element={<Comment />} />
          <Route path={"about"} element={<About />} />
        </Route>
        <Route
          path={`/${placeId}/${userId}/${km}/add-comment`}
          element={<AddComment />}
        />
        <Route
          path={`/${placeId}/${userId}/${km}/edit-comment`}
          element={<EditComment />}
        />
      </Routes>
    </div>
  );
}
