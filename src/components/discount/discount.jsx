import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Lottie from "react-lottie";
import { ApiServer } from "../../ApiServer/api";
import { useSelector } from "react-redux";
import "./discount.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const tg = window.Telegram.WebApp;
const Discount = () => {
  const { discount } = useSelector((state) => state.event);
  const placeId = localStorage.getItem("placeId");
  const animationData = require("./cat.json");
  const options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ApiServer.getData(`/product/media/${3}/`);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const { t } = useTranslation();
  return (
    <div className="relative">
      {discount.length > 0 ? (
        [1, 2, 3].map((item, idx) => (
          <main key={idx} className="mt-[24px] relative">
            <section className="">
              <Swiper
               style={{
                '--swiper-navigation-color':  tg.themeParams.button_color,
                '--swiper-pagination-color':  tg.themeParams.button_color,
              }}
                slidesPerView={"auto"}
                spaceBetween={30}
                pagination={{
                  dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <img
                    src="https://s3-alpha-sig.figma.com/img/bb0d/0546/67ab9a3169848e51f776f222301ee68e?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KrCddP8KHjKY7586GVGibxhKsCb8RBF5PXLfz5q1Qi-Hm-jKstx~Cobu9Ghv-ygY~2BoCNzcI2~jpWwaVL-ejMwVblyZqdCMXkYuVkGaQKd1m9esKiH8biZVkVIlVMKUlrMkVzOWFHeh~zbY-rDCZ2rQHEerpUgShNTOOWRA7tt3AnrMZItm~lROKdiO6BN8gurqnRYKgv1NqTBgOOeZiNnusWx1FS8MGTgtwswzJiw373ve4lPll0IYA9RzgUHHcwlyZK5cUNdCSZ2HivY8HmnjUUusMsAd7TY225~10R7pw2ExjSjewDP~a7MEWtLOpvmWrM7qD1HM7t872URlAA__"
                    alt="dfasdf"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://s3-alpha-sig.figma.com/img/bb0d/0546/67ab9a3169848e51f776f222301ee68e?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KrCddP8KHjKY7586GVGibxhKsCb8RBF5PXLfz5q1Qi-Hm-jKstx~Cobu9Ghv-ygY~2BoCNzcI2~jpWwaVL-ejMwVblyZqdCMXkYuVkGaQKd1m9esKiH8biZVkVIlVMKUlrMkVzOWFHeh~zbY-rDCZ2rQHEerpUgShNTOOWRA7tt3AnrMZItm~lROKdiO6BN8gurqnRYKgv1NqTBgOOeZiNnusWx1FS8MGTgtwswzJiw373ve4lPll0IYA9RzgUHHcwlyZK5cUNdCSZ2HivY8HmnjUUusMsAd7TY225~10R7pw2ExjSjewDP~a7MEWtLOpvmWrM7qD1HM7t872URlAA__"
                    alt="dfasdf"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://s3-alpha-sig.figma.com/img/bb0d/0546/67ab9a3169848e51f776f222301ee68e?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KrCddP8KHjKY7586GVGibxhKsCb8RBF5PXLfz5q1Qi-Hm-jKstx~Cobu9Ghv-ygY~2BoCNzcI2~jpWwaVL-ejMwVblyZqdCMXkYuVkGaQKd1m9esKiH8biZVkVIlVMKUlrMkVzOWFHeh~zbY-rDCZ2rQHEerpUgShNTOOWRA7tt3AnrMZItm~lROKdiO6BN8gurqnRYKgv1NqTBgOOeZiNnusWx1FS8MGTgtwswzJiw373ve4lPll0IYA9RzgUHHcwlyZK5cUNdCSZ2HivY8HmnjUUusMsAd7TY225~10R7pw2ExjSjewDP~a7MEWtLOpvmWrM7qD1HM7t872URlAA__"
                    alt="dfasdf"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://s3-alpha-sig.figma.com/img/bb0d/0546/67ab9a3169848e51f776f222301ee68e?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KrCddP8KHjKY7586GVGibxhKsCb8RBF5PXLfz5q1Qi-Hm-jKstx~Cobu9Ghv-ygY~2BoCNzcI2~jpWwaVL-ejMwVblyZqdCMXkYuVkGaQKd1m9esKiH8biZVkVIlVMKUlrMkVzOWFHeh~zbY-rDCZ2rQHEerpUgShNTOOWRA7tt3AnrMZItm~lROKdiO6BN8gurqnRYKgv1NqTBgOOeZiNnusWx1FS8MGTgtwswzJiw373ve4lPll0IYA9RzgUHHcwlyZK5cUNdCSZ2HivY8HmnjUUusMsAd7TY225~10R7pw2ExjSjewDP~a7MEWtLOpvmWrM7qD1HM7t872URlAA__"
                    alt="dfasdf"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://s3-alpha-sig.figma.com/img/bb0d/0546/67ab9a3169848e51f776f222301ee68e?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KrCddP8KHjKY7586GVGibxhKsCb8RBF5PXLfz5q1Qi-Hm-jKstx~Cobu9Ghv-ygY~2BoCNzcI2~jpWwaVL-ejMwVblyZqdCMXkYuVkGaQKd1m9esKiH8biZVkVIlVMKUlrMkVzOWFHeh~zbY-rDCZ2rQHEerpUgShNTOOWRA7tt3AnrMZItm~lROKdiO6BN8gurqnRYKgv1NqTBgOOeZiNnusWx1FS8MGTgtwswzJiw373ve4lPll0IYA9RzgUHHcwlyZK5cUNdCSZ2HivY8HmnjUUusMsAd7TY225~10R7pw2ExjSjewDP~a7MEWtLOpvmWrM7qD1HM7t872URlAA__"
                    alt="dfasdf"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://s3-alpha-sig.figma.com/img/bb0d/0546/67ab9a3169848e51f776f222301ee68e?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KrCddP8KHjKY7586GVGibxhKsCb8RBF5PXLfz5q1Qi-Hm-jKstx~Cobu9Ghv-ygY~2BoCNzcI2~jpWwaVL-ejMwVblyZqdCMXkYuVkGaQKd1m9esKiH8biZVkVIlVMKUlrMkVzOWFHeh~zbY-rDCZ2rQHEerpUgShNTOOWRA7tt3AnrMZItm~lROKdiO6BN8gurqnRYKgv1NqTBgOOeZiNnusWx1FS8MGTgtwswzJiw373ve4lPll0IYA9RzgUHHcwlyZK5cUNdCSZ2HivY8HmnjUUusMsAd7TY225~10R7pw2ExjSjewDP~a7MEWtLOpvmWrM7qD1HM7t872URlAA__"
                    alt="dfasdf"
                  />
                </SwiperSlide>
              </Swiper>
            </section>
            <section className="mt-[40px] flex flex-col gap-[16px]">
              <h1 className="text-[24px] font-[500]">{item.name}</h1>
              <div>
                <h1 className="text-[16px] font-[400]">Aksiya va muddati</h1>
                <div className="relative flex items-center mt-[8px]">
                  <p className=" w-full tg-time-discount px-[14px] mt-[4px] font-[500]">
                    {item.start_date} dan - {item.end_date} gacha
                  </p>
                </div>
              </div>
              <div>
                <h1 className="text-[16px] font-[400]">Narxi</h1>
                <div className="flex justify-between items-center mt-[8px]">
                  <h1 className="text-[24px] font-[500]">3,149,000 so’m</h1>
                  <p className="line-through text-[16px] font-[500] opacity-[0.7]">
                    5,000,000 so’m
                  </p>
                </div>
              </div>
            </section>
            <article className="mt-[32px] border-[1px] border-solid border-[#EAECF0] p-[16px] rounded-[12px]">
              <h1 className="text-[18px] font-[500] ">
                Mahsulot haqida qisqacha ma’lumot
              </h1>
              <ul className="text-[16px] font-[400] list-disc px-[16px] mt-[12px] opacity-[0.7]">
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.discription,
                  }}
                />
              </ul>
            </article>
          </main>
        ))
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
