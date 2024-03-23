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
import { useSelector } from "react-redux";
import Modal from "../comment/modal";
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
  const id = localStorage.getItem("id");
  const km = localStorage.getItem("km");

  const [menuActive, setMenuActive] = useState(false);
  const { placeData, commentData } = useSelector((state) => state.event);
  const [tableActive, setTableActive] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const getInitials = (fullName) => {
    if (!fullName) return "";
    const words = fullName.split(" ");
    const initials = words.map((word) => word[0]);
    return initials.join("").toUpperCase();
  };
  const close = () => setMenuActive(false);
  const open = () => setMenuActive(true);

  const handleDelete = (id) => {
    setDeleteId(id);
  };
  const latitude = 37.7749; // Example latitude
const longitude = -122.4194; // Example longitude

const telegramUrl = `https://t.me/share/url?url=&text=Latitude:${latitude}%0ALongitude:${longitude}`;


  useEffect(() => {
    const body = document.querySelector(".home");
    if (menuActive) {
      body.classList.add("blur-effect");
    } else {
      body.classList.remove("blur-effect");
    }
  }, [menuActive]);
  return (
    <main className="all-product">
      <section className="px-[16px]">
        <div className="flex justify-start items-start gap-[16px] mt-[24px]">
          <img className="w-[24px] h-[24px]" src={location} alt="" />
          <a href={telegramUrl} target="_blank" rel="noopener noreferrer">View in Telegram</a>
          {/* <a
            href={`https://t.me/loc?lat=${placeData?.latitude}&long=${placeData?.longitude}`}
            className="font-[400] text-[16px] tg-button-text underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {placeData.street
              ? placeData.street
              : "Manzil haqida ma'lumot mavjud emas!"}
          </a> */}
        </div>
        <div className="flex justify-start items-start gap-[16px] mt-[24px]">
          <img className="w-[24px] h-[24px]" src={phone} alt="" />
          <div className="flex flex-col gap-[12px]">
            <h1 className="text-[16px] font-[500]">Aloqa</h1>
            <p className="text-[16px] font-[500] tg-button-text">
              +998 88 777 00 99
            </p>
            <div className="flex justify-start items-center gap-[16px]">
              <div className="social-media">
                <img className="" src={instagram} alt="" />
              </div>
              <div className="social-media">
                <img className="" src={telegram} alt="" />
              </div>
              <div className="social-media">
                <img className="" src={web} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex justify-start items-start gap-[16px] mt-[24px]">
          <img className="w-[24px] h-[24px]" src={time} alt="" />
          <div className="w-full flex flex-col gap-[12px]">
            <h1 className="text-[16px] font-[500]">Ishlash vaqtlari</h1>
            <article className="flex justify-between items-center w-full">
              <p className="text-[16px] font-[400] ">18:00 gacha ochiq</p>
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
        <div
          className={`table_content ${
            tableActive ? "transition-height active mb-[24px]" : ""
          } mt-[32px] flex flex-col gap-[16px] ml-[40px] mr-[10px]`}
        >
          <div className="flex justify-between items-center">
            <p className="text-[16px] font-[400]">Dushanba</p>
            <p className="text-[16px] font-[500]">24 soat</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[16px] font-[400]">Seshanba</p>
            <p className="text-[16px] font-[500]">24 soat</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[16px] font-[400]">Chorshanba</p>
            <p className="text-[16px] font-[500]">24 soat</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[16px] font-[400]">Payshanba</p>
            <p className="text-[16px] font-[500]">24 soat</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[16px] font-[400]">Juma</p>
            <p className="text-[16px] font-[500]">24 soat</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[16px] font-[400]">Shanba</p>
            <p className="text-[16px] font-[500]">24 soat</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[16px] font-[400]">Yakshanba</p>
            <p className="text-[16px] font-[500]">24 soat</p>
          </div>
        </div>
      </section>
      <div className="hr w-full h-[1px] mb-[32px]"></div>
      <section className="px-[16px] mb-[32px]">
        <div className="flex justify-start items-start gap-[16px] mt-[24px]">
          <img className="w-[24px] h-[24px]" src={info} alt="" />
          <div className="flex flex-col gap-[12px]">
            <div
              onClick={() => navigate(`/${id}/${km}/about`)}
              className="cursor-pointer w-full flex justify-between items-center"
            >
              <h1 className="text-[16px] font-[500]">Joy haqida</h1>
              {RightArrow(
                tg.themeParams.button_color
                  ? tg.themeParams.button_color
                  : "#0A84FF"
              )}
            </div>
            <div className="w-full">
              {about.map((item) => (
                <button
                  key={item.id}
                  className="mr-[6px] mt-[12px] inline-flex gap-[8px]  px-[10px] py-[6px]  justify-center items-center"
                >
                  {CheskSvg(
                    tg.themeParams.button_color
                      ? tg.themeParams.button_color
                      : "#0A84FF"
                  )}
                  <p className="text-[#475467] text-[14px] font-[500] gap-[8px]">
                    {item.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="px-[16px] w-full mb-[80px]">
        <h1 className="text-[18px] font-[500]">Sharhlar</h1>
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
                    {item.user.id === 221 && (
                      <main onClick={() => handleDelete(item.id)}>
                        <div
                          onClick={() => (menuActive ? close() : open())}
                          className="w-[24px] h-[24px]"
                        >
                          {MenuIcon()}
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
            <p className="text-[14px] font-[400]">Sharhlar mavjud emas</p>
          </div>
        )}
      </section>
      {menuActive && (
        <Modal deleteId={deleteId} modalOpen={menuActive} handleClose={close} />
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
        stroke="#475467"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
        stroke="#475467"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
        stroke="#475467"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
