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
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import i18next from "i18next";
const tg = window.Telegram.WebApp;
console.log(localStorage.getItem("userId"));
i18n
  .use(initReactI18next)
  .use(HttpApi)
  .use(LanguageDetector)
  .init({
    supportedLngs: ["en", "uz", "ru"],
    fallbackLng: "en",
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
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");

  useEffect(() => {
    if (
      pathname === `/${placeId}/${userId}/${km}/all-product` ||
      pathname === `/${placeId}/${userId}/${km}`
    ) {
      BackButton.hide();
    } else {
      BackButton.show();
    }
  }, [pathname]);

  const back = () => {
    navigate(-1);
  };
  tg.onEvent("backButtonClicked", function () {
    back();
  });
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              // User granted permission, handle the position data
              console.log("Latitude:", position.coords.latitude);
              console.log("Longitude:", position.coords.longitude);
              setLong(position.coords.longitude);
              setLat(position.coords.latitude);
            },
            (error) => {
              // Handle errors (e.g., user denied permission)
              console.error("Error getting location:", error.message);
              tg.close(); // Close the Telegram Web App
            }
          );
        } else if (result.state === "denied") {
          // User denied permission, handle accordingly (e.g., show a message)
          console.log("Geolocation permission denied.");
          tg.close(); // Close the Telegram Web App
        }
      });
    } else {
      // Geolocation is not supported
      console.log("Geolocation is not available in this browser.");
      tg.close(); // Close the Telegram Web App
    }
  }, []);
  useEffect(() => {
    if (long && lat) {
      setLoading(true);
    } else {
      // tg.close()
    }
  }, [lat, long]);
  return (
    <>
      {/* <button onClick={back}>back</button>
      <h1>{long}</h1>
      <h1>{lat}</h1> */}
      {loading ? (
        <div className="app max-w-[400px] mx-auto">
          <Routes>
            <Route path="/:placeId/:userId/:km" element={<Home />}>
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
          </Routes>
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <Loading />
        </div>
      )}
    </>
  );
}
