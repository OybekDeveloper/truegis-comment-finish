import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "../home/home";
import AllProduct from "../all-product/all-product";
import Photo from "../photo/photo";
import Comment from "../comment/comment";
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
import Discount from "../discount/discount";
import DiscountItem from "../discount/discount-item";
import {BackButton , useShowPopup } from '@vkruglikov/react-telegram-web-app';

const tg = window.Telegram.WebApp;
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
  const showPopup = useShowPopup();
  const handleClick = () =>
  showPopup({
    message: "Hello, I am popup",
  });

  const placeId = localStorage.getItem("placeId");
  const userId = localStorage.getItem("userId");
  const km = localStorage.getItem("km");

  const { pathname } = useLocation();
  // let BackButton = tg.BackButton;

  const [loading, setLoading] = useState(true);
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");

  // const back = () => {
  //   window.history.back();
  // };
  // tg.onEvent("backButtonClicked", function () {
  //   back();
  // });

  // useEffect(() => {
  //   if (pathname !== `/${placeId}/${userId}/${km}/all-product`) {
  //     BackButton.show();
  //   } else {
  //     BackButton.hide();
  //   }
  // }, [pathname,placeId]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLong(position.coords.longitude);
        setLat(position.coords.latitude);
      });
    }
    tg.ready()
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
        <div id="back-effect" className="app mx-auto">
          <BackButton onClick={() => window.history.back()} />
          <Routes>
            <Route
              path="/:placeId/:userId/:km"
              element={<Home lat={lat} long={long} />}
            >
              <Route path={"all-product"} element={<AllProduct />} />
              <Route path={"photo"} element={<Photo />} />
              <Route path={"comment"} element={<Comment />} />
              {/* <Route path={"about"} element={<About />} /> */}
              <Route path={"discount"} element={<Discount />} >
                <Route
                  path={":id"}
                  element={<DiscountItem />}
                />
              </Route>
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
          </Routes>
        </div>
      )}
    </>
  );
}
