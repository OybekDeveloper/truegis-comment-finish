import React from "react";
import { check, info } from "../home/img";
const tg = window.Telegram.WebApp;

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
  {
    id: 6,
    title: "Yetkazib berish",
  },
  {
    id: 7,
    title: "Karta orqali to’lov",
  },
  {
    id: 8,
    title: "Bepul Wi-Fi",
  },
  {
    id: 9,
    title: "Dessert",
  },
  {
    id: 10,
    title: "Kofe",
  },
];
export default function About() {
  const backPage=()=>{
    window.history.back()
  }
  tg.onEvent("backButtonClicked",backPage);
  return (
    <div>
      {" "}
      <section className="px-[16px]">
        <div className="w-full mt-[24px]">
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
                  <p className="text-[14px] font-[500] gap-[8px]">
                    {item.title}
                  </p>
                </button>
              ))}
        </div>
      </section>
    </div>
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