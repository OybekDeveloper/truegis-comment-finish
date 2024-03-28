import React, { useEffect, useState } from "react";
import {
  check,
  down,
  info,
  instagram,
  location,
  phone,
  telegram,
  time,
  web,
} from "../home/img";
import empty from "../comment/empty-comment.svg";
import "./main.scss";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../comment/modal";
import MapAppSelector from "./map";
import { ActiveModal, DeleteComment } from "../../reducer/event";
import { t } from "i18next";
// import { View, Button, Linking, Platform } from "react-native";
const about = [
  {
    id: 1,
    title: "Yetkazib berish",
  },
  {
    id: 2,
    title: "Karta orqali to’lov",
  },
  {
    id: 3,
    title: "Bepul Wi-Fi",
  },
  {
    id: 4,
    title: "Dessert",
  },
  {
    id: 5,
    title: "Kofe",
  },
];
const tg = window.Telegram.WebApp;
export default function AllProduct() {
  const navigate = useNavigate();
  const placeId = localStorage.getItem("placeId");
  const userId = localStorage.getItem("userId");
  const km = localStorage.getItem("km");
  const dispatch = useDispatch();
  const { delModal, placeData, commentData } = useSelector(
    (state) => state.event
  );
  const [menuActive, setMenuActive] = useState(false);
  const [tableActive, setTableActive] = useState(false);
  const [aboutData, setAboutData] = useState([]);
  const [maxTime, setMaxTime] = useState("");
  const getInitials = (fullName) => {
    if (!fullName) return "";
    const words = fullName.split(" ");
    const initials = words.map((word) => word[0]);
    return initials.join("").toUpperCase();
  };
  const close = () => setMenuActive(false);
  const open = () => setMenuActive(true);

  const handleDelete = (id) => {
    dispatch(DeleteComment(id));
  };
  const workData = () => {
    const finalData =
      placeData.work_start_time === placeData?.work_end_time
        ? `24 soat`
        : placeData.work_start_time.split(":")[0] +
          ":" +
          placeData.work_start_time.split(":")[1] +
          " - " +
          placeData.work_end_time.split(":")[0] +
          ":" +
          placeData.work_end_time.split(":")[1];
          return finalData;
  };

  useEffect(() => {
    const body = document.querySelector(".home");
    if (menuActive && delModal) {
      body.classList.add("blur-effect");
    } else {
      body.classList.remove("blur-effect");
    }
  }, [menuActive, delModal]);
  useEffect(() => {
    function filterTrueOptions(data) {
      const trueOptions = [];

      // Check if "Service options" exists in data and it is an object
      if (
        data &&
        typeof data === "object" &&
        data.hasOwnProperty("Service options")
      ) {
        const serviceOptions = data["Service options"];
        // Iterate over each key-value pair in serviceOptions
        for (const option in serviceOptions) {
          // Check if the value is true
          if (serviceOptions[option] === true) {
            trueOptions.push(option);
          }
        }
      }

      setAboutData(trueOptions);
    }
    if (placeData.about) {
      filterTrueOptions(placeData.about.details);
    }
  }, [placeData.about]);
  return (
    <main className="all-product">
      <section className="px-[16px]">
        <div className="flex justify-start items-start gap-[16px] mt-[24px]">
          <img className="w-[24px] h-[24px]" src={location} alt="" />
          <div className="flex flex-col gap-[12px]">
            <h1 className="text-[16px] font-[500]">{t("adress")}</h1>
            <MapAppSelector
              latitude={placeData?.latitude}
              longitude={placeData?.longitude}
              text={
                placeData.full_address
                  ? placeData.full_address
                  : placeData.street
              }
            />
          </div>
        </div>
        <div className="flex justify-start items-start gap-[16px] mt-[24px] mb-[24px]">
          <img className="w-[24px] h-[24px]" src={phone} alt="" />
          <div className="flex flex-col gap-[12px]">
            <h1 className="text-[16px] font-[500]">{t("contact")}</h1>
            <h1
              className="text-[16px] font-[500] tg-button-text"
              onClick={() => window.open(`tel:${placeData.phone}`)}
            >
              {placeData.phone}
            </h1>

            <div className="flex justify-start items-center gap-[16px]">
              {placeData.instagram && (
                <a href={placeData.instagram} className="social-media">
                  <img className="" src={instagram} alt="" />
                </a>
              )}
              {placeData.telegram && (
                <a href={placeData.telegram} className="social-media">
                  <img className="" src={telegram} alt="" />
                </a>
              )}
              {placeData.website && (
                <a href={placeData.website} className="social-media">
                  <img className="" src={web} alt="" />
                </a>
              )}
            </div>
          </div>
        </div>
        {placeData.work_days &&
          placeData.work_end_time &&
          placeData.work_start_time && (
            <div className="relative flex justify-start items-start gap-[16px] mt-[24px]">
              <img className="w-[24px] h-[24px]" src={time} alt="" />
              <div className="w-full flex flex-col gap-[12px]">
                <h1 className="text-[16px] font-[500]">{t("work_time")}</h1>
                <article className="flex justify-between items-center w-full">
                  <p className="text-[16px] font-[400] ">
                    {placeData?.work_end_time} gacha ochiq
                  </p>
                  <div
                    onClick={() => setTableActive(!tableActive)}
                    className="cursor-pointer flex  items-center gap-[8px]"
                  >
                    <p className="font-[500] tg-button-text">Jadval</p>
                    {TableDown(
                      tg.themeParams.button_color
                        ? tg.themeParams.button_color
                        : "#0A84FF"
                    )}
                  </div>
                </article>
              </div>
            </div>
          )}

        {placeData.work_days &&
          placeData.work_end_time &&
          placeData.work_start_time && (
            <div
              className={`table_content ${
                tableActive ? "transition-height active mb-[24px]" : ""
              } mt-[32px] flex flex-col gap-[16px] ml-[40px] mr-[10px]`}
            >
              <div className="flex justify-between items-center">
                <p className="text-[16px] font-[400]">Dushanba</p>
                <div className={`text-[16px] font-[500]`}>
                  {placeData?.work_days?.find((c) => c === 1) ? (
                    workData()
                  ) : (
                    <h1 className="text-red-500">Close</h1>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[16px] font-[400]">Seshanba</p>
                <div className={`text-[16px] font-[500]`}>
                  {placeData?.work_days?.find((c) => c === 2) ? (
                    workData()
                  ) : (
                    <h1 className="text-red-500">Close</h1>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[16px] font-[400]">Chorshanba</p>
                <div className={`text-[16px] font-[500]`}>
                  {placeData?.work_days?.find((c) => c === 3) ? (
                    workData()
                  ) : (
                    <h1 className="text-red-500">Close</h1>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[16px] font-[400]">Payshanba</p>
                <div className={`text-[16px] font-[500]`}>
                  {placeData?.work_days?.find((c) => c === 4) ? (
                    workData()
                  ) : (
                    <h1 className="text-red-500">Close</h1>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[16px] font-[400]">Juma</p>
                <div className={`text-[16px] font-[500]`}>
                  {placeData?.work_days?.find((c) => c === 5) ? (
                    workData()
                  ) : (
                    <h1 className="text-red-500">Close</h1>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[16px] font-[400]">Shanba</p>
                <div className={`text-[16px] font-[500]`}>
                  {placeData?.work_days?.find((c) => c === 6) ? (
                    workData()
                  ) : (
                    <h1 className="text-red-500">Close</h1>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[16px] font-[400] ">Yakshanba</p>
                <div className={`text-[16px] font-[500]`}>
                  {placeData?.work_days?.find((c) => c === 0) ? (
                    workData()
                  ) : (
                    <h1 className="text-red-500">Close</h1>
                  )}
                </div>
              </div>
            </div>
          )}
      </section>
      <div className="hr w-full h-[1px] mb-[32px]"></div>
      {aboutData.length > 0 && (
        <section className="px-[16px] mb-[32px]">
          <div className="flex justify-start items-start gap-[16px] mt-[24px]">
            <img className="w-[24px] h-[24px]" src={info} alt="" />
            <div className="flex flex-col gap-[12px] w-full">
              <div
                onClick={() => navigate(`/${placeId}/${userId}/${km}/about`)}
                className="cursor-pointer w-full flex justify-between items-center"
              >
                <h1 className="text-[16px] font-[500]">{t("li_4")}</h1>
                {RightArrow(
                  tg.themeParams.button_color
                    ? tg.themeParams.button_color
                    : "#0A84FF"
                )}
              </div>
              <div className="w-full">
                {aboutData.map((item, idx) => (
                  <button
                    key={idx}
                    className="mr-[6px] mt-[12px] inline-flex gap-[8px]  px-[10px] py-[6px]  justify-center items-center"
                  >
                    {CheskSvg(
                      tg.themeParams.button_color
                        ? tg.themeParams.button_color
                        : "#0A84FF"
                    )}
                    <p className="text-[14px] font-[500] gap-[8px]">{item}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="px-[16px] w-full mb-[80px]">
        <h1 className="text-[18px] font-[500]">{t("li_3")}</h1>
        {commentData?.length > 0 ? (
          <section className="px-[16px] w-full mt-[48px]">
            <div className="hr w-full h-[1px]  mb-[24px]"></div>
            <div className="w-full flex flex-col gap-[32px]">
              {commentData.map((item) => (
                <main key={item.id} className="">
                  <div className="flex justify-between items-center gap-[12px]">
                    <article className="flex justify-start items-center gap-[12px]">
                      <div className=" text-[16px] font-[600] flex items-center justify-center w-[40px] h-[40px] rounded-full border-[1px] border-solid border-[#dfe0e3] bg-[#f2f4f7] text-[#475467]">
                        {getInitials(item.user.full_name)}
                      </div>
                      <h1 className="text-[16px] font-[500]">
                        {item.user.full_name}
                      </h1>
                    </article>
                    {item.user.id === +userId && (
                      <main onClick={() => handleDelete(item.id)}>
                        <div
                          onClick={() => {
                            menuActive ? close() : open();
                            dispatch(ActiveModal(true));
                          }}
                          className="w-[24px] h-[24px]"
                        >
                          {MenuIcon(
                            tg.themeParams.text_color
                              ? tg.themeParams.text_color
                              : "black"
                          )}
                        </div>
                      </main>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-[24px]">
                    <Rating
                      name="text-feedback"
                      value={item.star}
                      readOnly
                      style={{ color: "#FAC515" }}
                      emptyIcon={
                        <StarIcon
                          style={{
                            opacity: 0.55,
                            color: tg.themeParams.text_color,
                          }}
                          fontSize="inherit"
                        />
                      }
                    />
                    <p className="text-[14px] font-[400]">
                      {item.created_time.split(" ")[0]}
                    </p>
                  </div>
                  <h1 className="text-[16px] font-[400] mt-[16px]">
                    {item.text}
                  </h1>
                  <div className=" hr w-full h-[1px] mt-[24px]"></div>
                </main>
              ))}
            </div>
          </section>
        ) : (
          <div className="w-full flex flex-col justify-center items-center mt-[20px] gap-[16px]">
            <img src={empty} alt="" />
            <p className="text-[14px] font-[400]">{t("empty_comment")}</p>
          </div>
        )}
      </section>
      {menuActive && delModal && (
        <Modal modalOpen={menuActive} handleClose={close} />
      )}
    </main>
  );
}

function TableDown(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function CheskSvg(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M16.6663 5L7.49967 14.1667L3.33301 10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function RightArrow(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M9 18L15 12L9 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function MenuIcon(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
