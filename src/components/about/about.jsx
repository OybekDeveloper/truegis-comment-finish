import React from "react";
import { check, info } from "../home/img";
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
  return (
    <div>
      {" "}
      <section className="px-[16px]">
        <div className="w-full mt-[24px]">
              {about.map((item) => (
                <button key={item.id} className="mr-[20px] mt-[16px] inline-flex border-[1px] border-solid border-[#667085] rounded-[40px] px-[10px] py-[6px]  justify-center items-center">
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
