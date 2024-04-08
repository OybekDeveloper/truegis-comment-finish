import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./delivery.scss";
import { burger, down, search, web } from "../images";
export const Delivery = () => {
  const placeId=localStorage.getItem("placeId")
  const userId = localStorage.getItem("userId");
  const tg = window.Telegram.WebApp;
  const navigate = useNavigate();
  const back = () => {
    navigate(`/${placeId}/${userId}/12`);
  };
  tg.onEvent("backButtonClicked", function () {
    back();
  });
  const category_link = [
    {
      id: 1,
      name: "Burger",
      img: burger,
    },
    {
      id: 2,
      name: "Burger",
      img: burger,
    },
    {
      id: 3,
      name: "Burger",
      img: burger,
    },
    {
      id: 4,
      name: "Burger",
      img: burger,
    },
    {
      id: 5,
      name: "Burger",
      img: burger,
    },
    {
      id: 6,
      name: "Burger",
      img: burger,
    },
  ];
  useEffect(() => {
    navigate("/delivery/home");
  }, []);

  return (
    <div className="px-[16px] delivery bg-white relative">
      <section className="flex justify-between items-center w-full py-[24px]">
        <div className="w-[48px] h-[48px] rounded-full flex justify-center items-center bg-[#f2f4f7] border-[1px] border-solid">
          OR
        </div>
        <div className="flex justify-center items-center gap-2">
          <img src={down} alt="down" />
          Yetkazish manzili qo’shish
        </div>
        <img src={web} alt="" />
      </section>
      <section className="overflow-x-scroll whitespace-nowrap w-full image-slide">
        {[1, 2, 3, 4, 5].map((item, idx) => (
          <div key={idx} className="inline-flex mr-2">
            <img
              className=" w-[300px] h-[140px] object-cover rounded-[12px]"
              alt="img"
              src="https://s3-alpha-sig.figma.com/img/feec/d7df/6689d6ed9b06aee81153af617d42d0b2?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NIFl9Ev8q~-tiHQrwZGnmIL-8CQV-lrc01S5bsloATMhntGyik7VS03w7tiQIYVWzi0K7BV20juEe6q7rbfyVlyNDv9Z6RslxFxWqs79~P8nmNBCVRtbQcjQ4h~5Ba6kpyVc9QxmUZHcKq9g2uAAvTTA0rgMksCcTgq8k71pjRJGu0BVMk5pJfZLg4Ll3byLOZDVHPgrEW4DJDWvqTLdmx87FMHSvW9BpUyWpG9gAOnVEA1Qm~oJ8eEB9Az2waBZukVZnd7k~4MMrci0EyAS6ytQll5qSRMBA4bjz7~zYN27onvTYj~Pnt3kDJZhnS5jhN~Z1PWYT5xWVlzauFAkeQ__"
            />
          </div>
        ))}
      </section>
      <section className="w-full flex justify-start items-center relative mt-[24px]">
        <img className="absolute left-[14px] " src={search} alt="search" />
        <input
          className="pr-[14px] pl-[44px] py-[10px] w-full bg-[#F2F4F7] rounded-[12px]"
          type="text"
          placeholder="Mahsulot izlash"
        />
      </section>
      <section className="overflow-x-scroll whitespace-nowrap w-full image-slide mt-[24px]">
        {category_link?.map((item) => (
          <div className="inline-flex flex-col gap-[8px] mr-[24px] ">
            <img
              className="w-[48px] h-[48px] border-[3px] border-solid border-[#EAECF0] rounded-full"
              src={item.img}
              alt=""
            />
            <h1>{item.name}</h1>
          </div>
        ))}
      </section>

      <Outlet />
      <motion.section className="absolute"></motion.section>
    </div>
  );
};
