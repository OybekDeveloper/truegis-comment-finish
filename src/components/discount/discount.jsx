import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Lottie from "react-lottie";
import { ApiServer } from "../../ApiServer/api";
import { useDispatch, useSelector } from "react-redux";
import "./discount.css";

import { NavLink, Outlet, useLocation } from "react-router-dom";

const Discount = () => {
  const placeId = localStorage.getItem("placeId");
  const userId = localStorage.getItem("userId");
  const km = localStorage.getItem("km");
  const { pathname } = useLocation();
  const { discount } = useSelector((state) => state.event);
  const animationData = require("./cat.json");
  const options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  const handleActive = (id) => {};

  

  console.log(discount);
  const { t } = useTranslation();
  return (
    <div className="relative">
      {discount.length > 0 ? (
        <>
          <section
            className={
              pathname === `/${placeId}/${userId}/${km}/discount` &&
              " grid grid-cols-2 gap-[17px] px-[16px]"
            }
          >
            {discount.map(
              (item, idx) =>
                pathname !==
                  `/${placeId}/${userId}/${km}/discount/${item.id}` && (
                  <NavLink
                    to={`/${placeId}/${userId}/${km}/discount/${item.id}`}
                    onClick={() => handleActive(item.id)}
                    key={idx}
                    className="cursor-pointer flex flex-col justify-start gap-[12px]"
                  >
                    <img
                      className="h-[128px] object-cover rounded-[8px]"
                      src={item.media[0].media}
                      alt=""
                    />
                    <h1 className="text-[16px] font-[500]">{item.name}</h1>
                  </NavLink>
                )
            )}
            <Outlet />
          </section>
        </>
      ) : (
        <main className="h-[400px] mt-[24px] w-[90%] mx-auto">
          <Lottie options={options} height={200} />
          <h1 className="text-center w-full top-[10px] text-[18px] font-[500]">
            {t("discount_new")}
          </h1>
        </main>
      )}
    </div>
  );
};

export default Discount;
function SlideLeft(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M20 24L12 16L20 8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function SlideRigth(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M12 8L20 16L12 24"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
