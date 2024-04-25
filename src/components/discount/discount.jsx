import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Lottie from "react-lottie";
import { ApiServer } from "../../ApiServer/api";
import { useDispatch, useSelector } from "react-redux";
import "./discount.css";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { DiscountBlur } from "../../image-blur/discount-blur";
const tg = window.Telegram.WebApp;

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
  const navigate = useNavigate();
  const { t } = useTranslation();

  // useEffect(() => {
  //   if (discount.length == 1) {
  //     navigate(`/${placeId}/${userId}/${km}/discount/${discount[0]?.id}`);
  //   }
  // }, [discount]);

  return (
    <div className="relative">
      {discount.length > 0 ? (
        <>
          {discount && (
            <section
              className={`${
                pathname === `/${placeId}/${userId}/${km}/discount` &&
                "grid grid-cols-2 gap-[17px] px-[16px]"
              }`}
            >
              {discount.map(
                (item, idx) =>
                  pathname !==
                    `/${placeId}/${userId}/${km}/discount/${item.id}` && (
                    <NavLink
                      to={`/${placeId}/${userId}/${km}/discount/${item.id}`}
                      key={idx}
                      className="cursor-pointer flex flex-col justify-start gap-[12px]"
                    >
                      {item.media[0].media.split(".")[
                        item.media[0].media.split - 1
                      ] === "mp4" ? (
                        <div className="w-[100%] h-[230px]">
                          <video
                            className="w-[90%] h-[230px] mx-auto"
                            controls
                            autoPlay
                          >
                            <source
                              src={item.media[0].media}
                              type="video/mp4"
                            />
                          </video>
                        </div>
                      ) : (
                        <DiscountBlur
                          className="h-[128px] object-cover rounded-[8px]"
                          src={item.media[0].media}
                          alt=""
                        />
                      )}

                      <h1 className="text-[16px] font-[500]">
                        {item.name.length > 30
                          ? item.name.slice(0, 30) + "..."
                          : item.name}
                      </h1>
                      <div className="flex justify-start items-center gap-[4px]">
                        <h1 className="text-[14px] font-[400] tg-button-text">
                          Batafsil
                        </h1>
                        {Share(
                          tg.themeParams.button_color
                            ? tg.themeParams.button_color
                            : "#1C93E3"
                        )}
                      </div>
                    </NavLink>
                  )
              )}
            </section>
          )}
          <Outlet />
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
function Share(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M5.83334 14.1667L14.1667 5.83334M14.1667 5.83334H5.83334M14.1667 5.83334V14.1667"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
