import React from "react";
import { check, info } from "../home/img";
const about = [
  {
    id: 1,
    title: "Yetkazib berish",
  },
  {
    id: 1,
    title: "Karta orqali to’lov",
  },
  {
    id: 1,
    title: "Bepul Wi-Fi",
  },
  {
    id: 1,
    title: "Dessert",
  },
  {
    id: 1,
    title: "Kofe",
  },
  {
    id: 1,
    title: "Yetkazib berish",
  },
  {
    id: 1,
    title: "Karta orqali to’lov",
  },
  {
    id: 1,
    title: "Bepul Wi-Fi",
  },
  {
    id: 1,
    title: "Dessert",
  },
  {
    id: 1,
    title: "Kofe",
  },
];
export default function About() {
  return (
    <div>
      {" "}
      <section className="px-[16px]">
        <div className="w-full mt-[24px]">
              {about.map((item) => (
                <button className="mr-[20px] mt-[16px] inline-flex border-[1px] border-solid border-[#667085] rounded-[40px] px-[10px] py-[6px]  justify-center items-center">
                  <img src={check} alt="" />
                  <p className="text-[14px] font-[500] text-[#475467] gap-[8px]">
                    {item.title}
                  </p>
                </button>
              ))}
        </div>
      </section>
    </div>
  );
}
