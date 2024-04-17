import React, { useEffect, useState } from "react";
import "./home.scss";
import { motion } from "framer-motion";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { ApiServer } from "../../ApiServer/api";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCommentData,
  GetPlaceData,
  SaveDistance,
  SavePathData,
} from "../../reducer/event";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { nosave, save, share } from "./img";
import { TurnedInOutlined } from "@mui/icons-material";
import LoadingC from "../loading/loader";

const backgroundImage =
  "https://s3-alpha-sig.figma.com/img/808e/7de1/0a383ce94c24b18e47af0e9ba369a18a?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e7AE~1fTZ-cKSH-WZLl2-g9yhVsxw2rJ9qJ2UKefHAOZY7zlW89xrlkRsImEkHEpfT-NbJeMcmF8UOdemF1ZcKZ8pRYxqVXXTemn~8p8t33cVhaNCNt-owytQK4HRstvl2T7czB8Uz2ftE-2~XPFq3mqssd1E~DJ6zJFjmrRZAc8Aj~zpqEKSGWDut85W3WDy4YEr4KhHvbYk46g4mhrPl51d-gbgN-YbVSQXf7A5eVRYQQzFlf9bq5tIZttyyTLn9xbSDL2xeTsLI~AWyh-L84eXCGkG9-oVcYfLgeedzw9oa9Bk4xv45eGvhjGYLaflIBwXwzBq4TXwqefY87HuQ__";

export default function Home({ lat, long }) {
  const { t } = useTranslation();
  const { placeId, userId, km } = useParams();
  const { pathname } = useLocation();
  const { placeData, commentData, delModal, deleteModal } = useSelector(
    (state) => state.event
  );
  const navlink = [
    {
      id: 1,
      title: t("li_1"),
      link: `/${placeId}/${userId}/${km}/all-product`,
      count: null,
    },

    {
      id: 2,
      title: t("li_2"),
      link: `/${placeId}/${userId}/${km}/photo`,
      count: placeData?.images?.length ? placeData.images.length : null,
    },
    {
      id: 3,
      title: t("li_3"),
      link: `/${placeId}/${userId}/${km}/comment`,
      count: commentData?.length ? commentData.length : null,
    },
    {
      id: 4,
      title: t("li_4"),
      link: `/${placeId}/${userId}/${km}/about`,
      count: null,
    },
    {
      id: 5,
      title: "deliver",
      link: `/delivery`,
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [statusWork, setStatusWork] = useState(true);
  const [activeTab, setActiveTab] = useState(1);
  const [activeComment, setActiveComment] = useState(false);
  const [loading, setLoading] = useState(TurnedInOutlined);
  const [isSave,setIsSave] = useState(false);
  const workStatus = () => {
    const hours = new Date().getHours();
    const start = placeData?.work_start_time?.split(":")[0];
    const end = placeData?.work_end_time?.split(":")[0];
    if (hours > start && hours < end) {
      setStatusWork(true);
    } else if (start == end) {
      setStatusWork(true);
    } else {
      setStatusWork(false);
    }
  };

  function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadiusKm = 6371;

    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(lat1)) *
        Math.cos(degreesToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadiusKm * c;
    return distance;
  }
  useEffect(() => {
    dispatch(SavePathData([placeId, userId, km]));
    if (pathname === `/${placeId}/${userId}/${km}/comment`) {
      navigate(`/${placeId}/${userId}/${km}/comment`);
    } else {
      navigate(`/${placeId}/${userId}/${km}/all-product`);
    }
    workStatus();
  }, []);

  useEffect(() => {
    localStorage.setItem("placeId", placeId);
    localStorage.setItem("userId", userId);
    localStorage.setItem("km", km);
    const fetchData = async () => {
      try {
        const place = await ApiServer.getData(`/place/${placeId}/`);
        const comment = await ApiServer.getData(`/comments/${placeId}/list`);
        const res = await ApiServer.getData(`/users/${userId}/`);
        i18next.changeLanguage(res.lang);
        dispatch(GetPlaceData(place));
        dispatch(GetCommentData(comment));
      } catch (error) {
        console.log(error);
      } finally {
        if (lat && long) {
          localStorage.setItem("lat", lat);
          localStorage.setItem("long", long);
          setLoading(false);
        }
      }
    };
    fetchData();
    workStatus();
    const distance = calculateDistance(
      placeData.latitude,
      placeData.longitude,
      lat,
      long
    );
    dispatch(SaveDistance(distance.toFixed(2)));
  }, [delModal, deleteModal, placeId, lat, long]);
  useEffect(() => {
    setActiveComment(
      commentData.find((item) => item.user.id === +userId) ? true : false
    );
    workStatus();
  }, [commentData]);
  return (
    <>
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <LoadingC />
        </div>
      ) : (
        <main className="home relative ">
          <section className="px-[16px] min-h-[190px] home-back flex justify-end flex-col pb-[30px]">
            <div className="overlay">
              <div className="overlay"></div>
              <img
                className="img-back object-cover w-[400px] min-h-[200px]  z-[-10]"
                src={
                  placeData.photo_url ? placeData.photo_url : backgroundImage
                }
                alt=""
              />
            </div>
            <div className="content flex flex-col gap-[12px]">
              <div className="mt-[56px]">
                <div className="flex justify-between items-center">
                  <h1 className="text-[#fff] text-[18px] font-[500]">
                    {placeData?.name}
                  </h1>
                  {placeData?.work_end_time && placeData.work_end_time && (
                    <div className="flex justify-start items-center gap-[8px]">
                      {OpenClose(statusWork ? "#17B26A" : "red")}
                      <p className="text-[#fff] text-[14px] font-[500]">
                        {statusWork
                          ? `${t("status_true")}`
                          : `${t("status_false")}`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-[14px]">
                <Rating
                  name="text-feedback"
                  value={placeData.rating ? placeData.rating : 0}
                  readOnly
                  size="small"
                  style={{ color: "#FAC515" }}
                  precision={0.5}
                  emptyIcon={
                    <StarIcon
                      fontSize="inherit"
                      style={{ opacity: 1, color: "#b4b5b5", fontSize: "18px" }}
                    />
                  }
                />
                <p className="text-[#fff] opacity-[0.7] text-[14px] font-[500] mt-[4px]">
                  {placeData.rating ? placeData.rating : 0}
                </p>
                <p className="text-[#fff] opacity-[0.7] text-[14px] font-[500] mt-[4px]">
                  {commentData.length ? commentData.length : "0"}{" "}
                  {t("home_comment")}
                </p>
              </div>
              {/* <div className="flex justify-between items-center mt-[50px]">
              <div className="flex items-center gap-[8px]">
                <img src={line} alt="" />
                <p className="text-[#fff] text-[14px] font-[500]">{`${km} km`}</p>
              </div>
            </div> */}
            </div>
            {placeData?.order_url && (
              <a href={placeData.order_url.url} className="z-10">
                <button className="text-[14px] font-[500] text-[#fff] mt-[20px] home-btn w-full h-[44px] z-10 rounded-[8px]">
                  {placeData.order_url.name}
                </button>
              </a>
            )}
          </section>
          <nav className="sticky top-[-5px] z-[200] navbar w-full overflow-x-scroll whitespace-nowrap flex gap-[24px] px-[16px]">
            {placeData.id === 128078
              ? navlink.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      navigate(item.link);
                      setActiveTab(item.id);
                    }}
                    className="font-[500] h-[50px] relative text-[15px]"
                  >
                    <div className="flex items-center gap-[4px] h-[30px]">
                      <span
                        className={`${
                          pathname === item.link && "tg-button-text"
                        }`}
                      >
                        {item.title}
                      </span>
                      {item.count && (
                        <div
                          className={`${
                            pathname === item.link
                              ? "tg-theme-color"
                              : "tg-hint-color"
                          } rounded-full w-[20px] h-[20px] flex justify-center items-center`}
                        >
                          <h1 className="text-[12px] font-[600]  mt-[0.5px]">
                            {item.count}
                          </h1>
                        </div>
                      )}
                    </div>

                    {pathname === item.link && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute mt-[5px] h-[3px] w-full tg-button rounded-t-[5px]"
                      />
                    )}
                  </button>
                ))
              : navlink.slice(0, 4).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      navigate(item.link);
                      setActiveTab(item.id);
                    }}
                    className="font-[500] h-[50px] relative text-[15px]"
                  >
                    <div className="flex items-center gap-[4px] h-[30px]">
                      <span
                        className={`${
                          pathname === item.link && "tg-button-text"
                        }`}
                      >
                        {item.title}
                      </span>
                      {item.count && (
                        <div
                          className={`${
                            pathname === item.link
                              ? "tg-theme-color"
                              : "tg-hint-color"
                          } rounded-full w-[20px] h-[20px] flex justify-center items-center`}
                        >
                          <h1 className="text-[12px] font-[600]  mt-[0.5px]">
                            {item.count}
                          </h1>
                        </div>
                      )}
                    </div>

                    {pathname === item.link && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute mt-[5px] h-[3px] w-full tg-button rounded-t-[5px]"
                      />
                    )}
                  </button>
                ))}

            {/* <div className="hr z-[-10] absolute bottom-[-16px] w-full h-[1px]  mb-[24px]"></div> */}
          </nav>
          <Outlet />
          <div className={`mb-[70px]`}></div>
          {!(pathname === `/${placeId}/${userId}/${km}/photo`) && (
            <div className="max-w-[400px] mx-auto fixed bottom-0 w-full flex justify-around  items-center add-button py-[10px]">
              <div className="flex justify-between gap-[16px]  items-center w-full mx-[16px] ">
                <button
                  onClick={() => {
                    !activeComment &&
                      navigate(`/${placeId}/${userId}/${km}/add-comment`);
                  }}
                  className={`${
                    activeComment ? "opacity-[0.7]" : "opacity-1"
                  } w-[80%] flex justify-center items-center gap-[12px] text-[17px] font-[500] text-[#fff] h-[44px] tg-button rounded-[8px]`}
                >
                  {CommentAdd("#fff")}
                  <h1 className="text-[15px] font-[500] text-[#fff]">
                    {t("add_comment_btn")}
                  </h1>
                </button>
                <button
                onClick={()=>setIsSave(!isSave)}
                  className="cursor-pointer flex justify-center items-center rounded-[8px] px-[14px] h-[44px] bg-[#F0F0F0]"
                >
                  <img src={isSave?save:nosave} alt="" />
                </button>
                <a
                  href={`https://t.me/share/url?url=${"https://t.me/TrueGis_bot"}&text=${"Botimizdan foydalaning!"}`}
                  className="flex justify-center items-center rounded-[8px] px-[14px] h-[44px] bg-[#F0F0F0]"
                >
                  <img src={share} alt="" />
                </a>
              </div>
            </div>
          )}
        </main>
      )}
    </>
  );
}

function CommentAdd(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
    >
      <path
        d="M18.3982 11.6158C14.7931 15.2577 10.0245 20.0749 9.7109 20.3917C9.33182 20.7746 8.71055 20.8704 8.4473 20.8704H6.23534C5.86679 20.8704 5.12968 20.647 5.12968 19.7535C5.12968 18.8599 5.12903 17.8387 5.12968 17.5196C5.13034 17.2005 5.25719 16.752 5.60415 16.4027C5.73619 16.2697 10.6925 11.3734 14.4436 7.62092M18.3982 11.6158C19.1503 10.8561 19.8517 10.1475 20.4515 9.54155C20.7674 9.22242 21.2097 8.3927 20.4515 7.62681C20.083 7.2545 19.1563 6.31842 18.3982 5.55253C17.64 4.78664 16.8187 5.23341 16.5028 5.55253C15.8969 6.16458 15.1944 6.86984 14.4436 7.62092M18.3982 11.6158L14.4436 7.62092"
        stroke="#FAFAFA"
        strokeWidth="1.5"
      />
    </svg>
  );
}
function OpenClose(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 8 8"
      fill="none"
    >
      <circle cx="4" cy="4" r="4" fill={color} />
    </svg>
  );
}
