import React, { useState } from "react";
import { check, down, info, location, phone, time } from "../home/img";
import "./main.scss";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
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
  const [tableActive, setTableActive] = useState(false);

  const getInitials = (fullName) => {
    if (!fullName) return "";
    const words = fullName.split(" ");
    const initials = words.map((word) => word[0]);
    return initials.join("").toUpperCase();
  };

  return (
    <main className="all-product">
      <section className="px-[16px]">
        <div className="flex justify-start items-start gap-[16px] mt-[24px]">
          <img className="w-[24px] h-[24px]" src={location} alt="" />
          <div className="flex flex-col gap-[12px]">
            <h1 className="text-[16px] font-[500]">Manzil</h1>
            <p className="text-[16px] font-[400] ">
              Parkent bank xizmatlari, Parkent, 66, 1-8 qavat, Toshkent
            </p>
          </div>
        </div>
        <div className="flex justify-start items-start gap-[16px] mt-[24px]">
          <img className="w-[24px] h-[24px]" src={phone} alt="" />
          <div className="flex flex-col gap-[12px]">
            <h1 className="text-[16px] font-[500]">Aloqa</h1>
            <p className="text-[16px] font-[500] tg-button-text">
              +998 88 777 00 99
            </p>
          </div>
        </div>
        <div className="relative flex justify-start items-start gap-[16px] mt-[24px]">
          <img className="w-[24px] h-[24px]" src={time} alt="" />
          <div className="w-full flex flex-col gap-[12px]">
            <h1 className="text-[16px] font-[500]">Ishlash vaqtlari</h1>
            <article className="flex justify-between items-center w-full">
              <h1 className="text-[16px] font-[400] ">18:00 gacha ochiq</h1>
              <div
                onClick={() => setTableActive(!tableActive)}
                className="cursor-pointer flex  items-center gap-[8px]"
              >
                <p className="font-[500] tg-button-text">Jadval</p>
                <img src={down} alt="" />
              </div>
            </article>
          </div>
        </div>
        <div
          className={`table_content ${
            tableActive ? "transition-height active mb-[24px]" : ""
          } mt-[32px] flex flex-col gap-[16px]`}
        >
          <div className="flex justify-between items-center">
            <p className="text-[16px] font-[400]">Dushanba</p>
            <p className="text-[16px] font-[500]">24 soat</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[16px] font-[400]">Dushanba</p>
            <p className="text-[16px] font-[500]">24 soat</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[16px] font-[400]">Dushanba</p>
            <p className="text-[16px] font-[500]">24 soat</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[16px] font-[400]">Dushanba</p>
            <p className="text-[16px] font-[500]">24 soat</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[16px] font-[400]">Dushanba</p>
            <p className="text-[16px] font-[500]">24 soat</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[16px] font-[400]">Dushanba</p>
            <p className="text-[16px] font-[500]">24 soat</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[16px] font-[400]">Dushanba</p>
            <p className="text-[16px] font-[500]">24 soat</p>
          </div>
        </div>
      </section>
      <hr className="w-full h-[1px] mb-[32px]" />
      <section className="px-[16px] mb-[32px]">
        <div className="flex justify-start items-start gap-[16px] mt-[24px]">
          <img className="w-[24px] h-[24px]" src={info} alt="" />
          <div className="flex flex-col gap-[12px]">
            <h1 className="text-[16px] font-[500]">Joy haqida</h1>
            <div className="w-full">
              {about.map((item) => (
                <button
                  key={item.id}
                  className="mr-[6px] mt-[5px] inline-flex border-[1px] border-solid border-[#667085] rounded-[40px] px-[10px] py-[6px]  justify-center items-center"
                >
                  <img src={check} alt="" />{" "}
                  <p className="text-[14px] font-[500] gap-[8px]">
                    {item.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate(`/${id}/${km}/about`)}
          className="mt-[12px] w-full text-[14px] font-[400] rounded-[40px] bg-[#17B26A] p-[10px] text-[#fff]"
        >
          Batafsil ko’rish
        </button>
      </section>
      <hr className="w-full h-[1px] mb-[24px]" />
      <section>rasmlar</section>
      <hr className="w-full h-[1px] mb-[24px]" />
      <section className="px-[16px] w-full">
        <h1 className="text-[18px] font-[500]">Sharhlar</h1>
        <div className="w-full flex flex-col gap-[32px]">
          {about.map((item) => (
            <main key={item.id} className="">
              <div className="flex justify-start items-center gap-[12px]">
                <div className=" text-[16px] font-[600] flex items-center justify-center w-[40px] h-[40px] rounded-full border-[1px] border-solid border-[#dfe0e3] bg-[#f2f4f7] text-[#475467]">
                  {getInitials(item?.title)}
                </div>
                <p className="text-[16px] font-[500]">{item.title}</p>
              </div>
              <div className="flex justify-between items-center mt-[24px]">
                <Rating
                  name="text-feedback"
                  value={4}
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
                <p className="text-[14px] font-[400]">15.03.2024</p>
              </div>
              <h1 className="text-[16px] font-[400] mt-[16px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </h1>
              <hr className="w-full h-[1px] mt-[24px]" />
            </main>
          ))}
        </div>
      </section>
    </main>
  );
}
