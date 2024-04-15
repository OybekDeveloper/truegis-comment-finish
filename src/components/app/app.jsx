import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "../home/home";
import AllProduct from "../all-product/all-product";
import Photo from "../photo/photo";
import Comment from "../comment/comment";
import About from "../about/about";
import AddComment from "../comment/add-comment";
import EditComment from "../comment/edit-comment";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import LoadingT from "../loading/loading";
import {
  Delivery,
  CategoryElements,
  Basket,
  PersonalInfo,
  OrderHistory,
  SearchCategory,
  OrderType,
  Delivered,
  BeDelivered,
  BillingInfoDeliver,
} from "../../delivery-components";
import BillingInfoAway from "../../delivery-components/billing-info/billing-info-away";
import YandexMap from "../map/map";
import YMapsTest from "../map/map";
const tg = window.Telegram.WebApp;
console.log(localStorage.getItem("userId"));
i18n
  .use(initReactI18next)
  .use(HttpApi)
  .use(LanguageDetector)
  .init({
    supportedLngs: ["en", "uz", "ru"],
    fallbackLng: "ru",
    detection: {
      order: ["htmlTag", "cookie", "localStorage", "subdomain", "path"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/assets/{{lng}}/translation.json",
    },
  });
  
export default function App() {
  const placeId = localStorage.getItem("placeId");
  const userId = localStorage.getItem("userId");
  const km = localStorage.getItem("km");

  const { pathname } = useLocation();
  const navigate = useNavigate();
  let BackButton = tg.BackButton;

  const [loading, setLoading] = useState(true);
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");

  const back = () => {
    navigate(-1);
  };
  tg.onEvent("backButtonClicked", function () {
    back();
  });

  useEffect(() => {
    if (pathname !== `/${placeId}/${userId}/${km}/all-product`) {
      BackButton.show();
    } else {
      BackButton.hide();
    }
  }, [pathname]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        setLong(position.coords.longitude);
        setLat(position.coords.latitude);
      });
    }
  }, []);

  useEffect(() => {
    if (long && lat) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [lat, long]);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center w-full h-screen">
          <LoadingT />
        </div>
      ) : (
        <div id="back-effect" className="app max-w-[400px] mx-auto">
          <Routes>
            <Route
              path="/:placeId/:userId/:km"
              element={<Home lat={lat} long={long} />}
            >
              <Route path={"all-product"} element={<AllProduct />} />
              <Route path={"photo"} element={<Photo />} />
              <Route path={"comment"} element={<Comment />} />
              <Route path={"about"} element={<About />} />
            </Route>
            <Route
              path={`/:placeId/:userId/:km/add-comment`}
              element={<AddComment />}
            />
            <Route
              path={`/:placeId/:userId/:km/edit-comment`}
              element={<EditComment />}
            />
            <Route path={`/delivery`} element={<Delivery />}>
              <Route path="home" element={<CategoryElements />} />
              <Route path="basket" element={<Basket />} />
              <Route path="personal-info" element={<PersonalInfo />} />
              <Route path="order-history" element={<OrderHistory />} />
              <Route path="delivered/:id" element={<Delivered />} />
              <Route path="be-delivered/:id" element={<BeDelivered />} />
              <Route path="search-category" element={<SearchCategory />} />
              <Route path="order-type" element={<OrderType />} />
              <Route
                path="billing-info-deliver"
                element={<BillingInfoDeliver />}
              />
              <Route path="billing-info-away" element={<BillingInfoAway />} />
            </Route>
            <Route path={"/map"} element={<YMapsTest />} />
          </Routes>
        </div>
      )}
    </>
  );
}
