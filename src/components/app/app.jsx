import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "../home/home";
import AllProduct from "../all-product/all-product";
import Photo from "../photo/photo";
import Comment from "../comment/comment";
import About from "../about/about";
import AddComment from "../comment/add-comment";
import EditComment from "../comment/edit-comment";
import Loading from "../loading/loading";
import { useSelector } from "react-redux";
export default function App() {
  const placeId = localStorage.getItem("placeId");
  const userId = localStorage.getItem("userId");
  const km = localStorage.getItem("km");
  const {pathname}=useLocation()
  const navigate = useNavigate();
  const tg = window.Telegram.WebApp;
  let BackButton = tg.BackButton;

  const [loading,setLoading]=useState(false)
  // useEffect(() => {
  //   if (pathname !== `/${placeId}/${userId}/${km}/all-product`) {
  //     BackButton.show();
  //   } else {
  //     BackButton.hide();
  //   }
  // }, [pathname]);

  // const back=()=>{
  //   window.history.back()
  // }
  // tg.onEvent('backButtonClicked', function() {
  //     back()
  // });
  useEffect(()=>{
    setTimeout(() => {
      setLoading(true)
    }, 1300);
  })

  return (
    <>
    {loading?(
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
    ):(
      <div className="w-full h-screen flex justify-center items-center">
        <Loading/>
      </div>
    )}
    </>
  
  );
}
