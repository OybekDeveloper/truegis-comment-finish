import React, { useEffect, useState } from "react";
import "./home.scss";
import { imgplus, line, pointgreen } from "./img";
import { motion } from "framer-motion";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { ApiServer } from "../../ApiServer/api";
import { useDispatch, useSelector } from "react-redux";
import { GetCommentData, GetPlaceData } from "../../reducer/event";

const tg = window.Telegram.WebApp;
const backgroundImage =
    "https://s3-alpha-sig.figma.com/img/808e/7de1/0a383ce94c24b18e47af0e9ba369a18a?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e7AE~1fTZ-cKSH-WZLl2-g9yhVsxw2rJ9qJ2UKefHAOZY7zlW89xrlkRsImEkHEpfT-NbJeMcmF8UOdemF1ZcKZ8pRYxqVXXTemn~8p8t33cVhaNCNt-owytQK4HRstvl2T7czB8Uz2ftE-2~XPFq3mqssd1E~DJ6zJFjmrRZAc8Aj~zpqEKSGWDut85W3WDy4YEr4KhHvbYk46g4mhrPl51d-gbgN-YbVSQXf7A5eVRYQQzFlf9bq5tIZttyyTLn9xbSDL2xeTsLI~AWyh-L84eXCGkG9-oVcYfLgeedzw9oa9Bk4xv45eGvhjGYLaflIBwXwzBq4TXwqefY87HuQ__";

export default function Home() {
  const { id, km } = useParams();
  const { pathname } = useLocation();
  const[imgCount,setImgCount]=useState(0)
  const { placeData, commentData } = useSelector((state) => state.event);

  const navlink = [
    {
      id: 1,
      title: "Umumiy",
      link: `/${id}/${km}/all-product`,
      count: null,
    },

    {
      id: 2,
      title: "Rasm",
      link: `/${id}/${km}/photo`,
      count: imgCount!==0?imgCount:null,
    },
    {
      id: 3,
      title: "Sharhlar",
      link: `/${id}/${km}/comment`,
      count: commentData.length?commentData.length:null,
    },
    {
      id: 4,
      title: "Joy haqida",
      link: `/${id}/${km}/about`,
      count: null,
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(1);

  const getTimeData = (start, end) => {
    const workStart = start?.split(":")[0];
    const workEnd = end?.split(":")[0];

    if (workEnd - workStart > 0) {
      return workEnd - workStart;
    } else {
      return workEnd - workStart + 24;
    }
  };
  useEffect(() => {
    const { image, image2, image3, image4 } = placeData;
    const photosArray = [];
    if (image) photosArray.push(image);
    if (image2) photosArray.push(image2);
    if (image3) photosArray.push(image3);
    if (image4) photosArray.push(image4);
    setImgCount(photosArray.length);
  }, [placeData]);

  useEffect(() => {

    
    localStorage.setItem("id", id);
    localStorage.setItem("km", km);

  }, []);
  // useEffect(() => {
  //   // Function to handle back button click
  //   const handleBackButtonClick = () => {
  //     navigate(-1); // Navigating back
  //   };

  //   // Show back button
  //   tg.UI.backButton.show();

  //   // Set click handler for back button
  //   tg.UI.backButton.onClick(handleBackButtonClick);

  //   // Clean up function
  //   return () => {
  //     tg.UI.backButton.offClick(handleBackButtonClick); // Remove click handler
  //     tg.UI.backButton.hide(); // Hide back button
  //   };
  // }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const place = await ApiServer.getData(`/place/${id}/`);
        const comment = await ApiServer.getData(`/comments/${id}/list`);
        dispatch(GetPlaceData(place));
        dispatch(GetCommentData(comment));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(placeData);
  
  return (
    <main className="home relative ">
      <section className="px-[16px] min-h-[200px] home-back">
        <div className="overlay">
          <div className="overlay"></div>
          <img
            className="img-back object-cover w-[400px] min-h-[200px]  z-[-10]"
            src={placeData.photo_url ? placeData.photo_url : backgroundImage}
            alt=""
          />
        </div>
        <div className="content">
          <h1 className="text-[#fff] text-[24px] font-[500] pt-[16px]">
            {placeData?.name}
          </h1>
          <div className="flex items-center gap-[14px]">
            <Rating
              name="text-feedback"
              value={placeData.rating ? placeData.rating : 0}
              readOnly
              style={{ color: "#FAC515" }}
              emptyIcon={
                <StarIcon
                  style={{ opacity: 0.55, color: "#D0D5DD" }}
                  fontSize="inherit"
                />
              }
            />
            <p className="text-[#fff] opacity-[0.7] text-[14px] font-[500] mt-[4px]">
              {placeData.rating ? placeData.rating : 0}
            </p>
            <p className="text-[#fff] opacity-[0.7] text-[14px] font-[500] mt-[4px]">
              {commentData.length ? commentData.length : "0"} sharhlar
            </p>
          </div>
          <div className="flex justify-between items-center mt-[50px]">
            <div className="flex justify-start items-center gap-[8px]">
              <img src={pointgreen} alt="" />
              <p className="text-[#fff] text-[14px] font-[500]">{`${
                (placeData.work_start_time &&placeData.work_end_time )
                  ? getTimeData(
                      placeData.work_start_time,
                      placeData.work_end_time
                    )
                  : "0"
              } soat`}</p>
            </div>
            <div className="flex items-center gap-[8px]">
              <img src={line} alt="" />
              <p className="text-[#fff] text-[14px] font-[500]">{`${km} km`}</p>
            </div>
          </div>
        </div>
      </section>
      <nav className="relative navbar w-full overflow-x-scroll whitespace-nowrap  flex gap-[20px]  px-[16px]">
        {navlink.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              navigate(item.link);
              setActiveTab(item.id);
            }}
            className="font-[500] h-[70px] relative text-[16px]"
          >
            <div className="flex items-center gap-[4px] h-[30px]">
              <span className={`${pathname === item.link && "tg-button-text"}`}>
                {item.title}
              </span>
              {item.count && (
                <p className="rounded-[10px] text-[12px] font-[600] px-[9px] py-[5px] bg-[#F2F4F7] text-[#667085]">
                  {item.count}
                </p>
              )}
            </div>

            {pathname === item.link && (
              <motion.div
                layoutId="active-pill"
                className="absolute mt-[10px] h-[3px] w-full tg-button"
              />
            )}
          </button>
        ))}
        <div className="hr z-[-10] absolute bottom-[-16px] w-full h-[1px]  mb-[24px]"></div>
      </nav>

      <Outlet />
      <div className="mb-[40px]"></div>
      {pathname === `/${id}/${km}/photo` ? (
        <div className="max-w-[400px] mx-auto fixed bottom-[4px] w-full flex justify-center items-center">
          <button className="text-[17px] font-[500] text-[#fff] px-[14px] py-[10px] w-[94%] tg-button rounded-[8px] flex justify-center items-center gap-[8px]">
            <img src={imgplus} alt="sadf" />
            <h1>Rasm qo’shish</h1>
          </button>
        </div>
      ) : (
        <div className="max-w-[400px] mx-auto fixed bottom-[4px] w-full flex justify-center items-center">
          <button
            onClick={() => navigate(`/${id}/${km}/add-comment`)}
            className="flex  justify-center items-center gap-[12px] text-[17px] font-[500] text-[#fff] px-[10px] py-[14px] w-[94%] bg-[#F2F4F7]  rounded-[8px]"
          >
            {CommentAdd(
              tg.themeParams.button_color
                ? tg.themeParams.button_color
                : "#0A84FF"
            )}
            <h1 className="tg-button-text">Sharh qoldirish</h1>
          </button>
        </div>
      )}
    </main>
  );
}

function CommentAdd(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M21 21.0001H13M2.5 21.5001L8.04927 19.3657C8.40421 19.2292 8.58168 19.161 8.74772 19.0718C8.8952 18.9927 9.0358 18.9013 9.16804 18.7987C9.31692 18.6831 9.45137 18.5487 9.72028 18.2798L21 7.00006C22.1046 5.89549 22.1046 4.10463 21 3.00006C19.8955 1.89549 18.1046 1.89549 17 3.00006L5.72028 14.2798C5.45138 14.5487 5.31692 14.6831 5.20139 14.832C5.09877 14.9643 5.0074 15.1049 4.92823 15.2523C4.83911 15.4184 4.77085 15.5959 4.63433 15.9508L2.5 21.5001ZM2.5 21.5001L4.55812 16.149C4.7054 15.7661 4.77903 15.5746 4.90534 15.4869C5.01572 15.4103 5.1523 15.3813 5.2843 15.4065C5.43533 15.4354 5.58038 15.5804 5.87048 15.8705L8.12957 18.1296C8.41967 18.4197 8.56472 18.5648 8.59356 18.7158C8.61877 18.8478 8.58979 18.9844 8.51314 19.0947C8.42545 19.2211 8.23399 19.2947 7.85107 19.442L2.5 21.5001Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
