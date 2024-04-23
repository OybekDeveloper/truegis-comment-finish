import React from "react";
import Slider from "react-slick";
import "./discount.scss";
import next from "./chevron-left (1).svg";
import prev from "./chevron-left.svg";
import { useTranslation } from "react-i18next";
import Lottie from "react-lottie";

const Discount = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <img className="slick-next" src={next} alt="Next" />,
    prevArrow: <img className="slick-prev" src={prev} alt="Previous" />,
  };
  const animationData = require("./cat.json");
  const options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  const { t } = useTranslation();
  return (
    <div className="relative">
      {/* <main className="h-[400px] mt-[24px] w-[90%] mx-auto">
        <Lottie options={options} height={200} />
        <h1 className="text-center w-full top-[10px] text-[18px] font-[500]">
          {t("discount_new")}
        </h1>
      </main> */}

      <main className="px-[16px] mt-[24px] relative">
        <section className="px-[16px]">
          <Slider {...settings}>
            <div className="flex justify-center">
              <img
                className="slider mx-auto rounded-[8px]"
                src="https://s3-alpha-sig.figma.com/img/0d62/990b/6ff93121d24fcb090f305520081f66a9?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Oet1nlVflvI9UPeLuu3NzNEk3UmGVIWHlqNF6jlp0CZTwu79zOfDyfm5FIM7zdSSl7f-2O7EA7W5fuk05SHgHAVkw1Sd5oLT-ifq21iKAC9aNufiUii1DiI2js7FLbzANgO7xe08dZzZsCBbXimgdvVmoOl1KOh8XJg7pID6NWRFEJ~H-4eoqRiMzCfXgyUR05iSOMn7wgIqiXlD5hZNE3Hq3DlPN8JT4DjQ0s6fGOQMWfT2EvtLCG0TTj4YonHHcoFATluQxYYFPNeJWW6jG1UKb73bRA6~vJxmUGUIOf5ohJvOb7nRQHFqPvU75mtwwGDwA34ZgqIwt78JqW9-3Q__"
                alt="sadfaf"
              />
            </div>
            <div className="flex justify-center ">
              <img
                className="slider mx-auto rounded-[8px]"
                src="https://cdn.mediapark.uz/imgs/19e6894b-89c0-4a58-954d-c980725161a4_Artboard1-1300.webp"
                alt="sadfaf"
              />
            </div>
            <div className="flex justify-center ">
              <img
                className="slider mx-auto rounded-[8px]"
                src="https://www.apple.com/v/macbook-pro-14-and-16/e/images/meta/macbook-pro-14-and-16_overview__fz0lron5xyuu_og.png"
                alt="sadfaf"
              />
            </div>
            <div className="flex justify-center ">
              <img
                className="slider mx-auto rounded-[8px]"
                src="https://www.apple.com/v/macbook-pro-14-and-16/e/images/meta/macbook-pro-14-and-16_overview__fz0lron5xyuu_og.png"
                alt="sadfaf"
              />
            </div>
          </Slider>
        </section>
        <section className="mt-[40px] flex flex-col gap-[16px]">
          <h1 className="text-[24px] font-[500]">Smartfon Samsung A34 64GB</h1>
          <div>
            <h1 className="text-[16px] font-[400]">Aksiya va muddati</h1>
            <div className="relative flex items-center mt-[8px]">
              <div className="w-full tg-time-discount-back py-[8px]"></div>
              <p className="w-full tg-time-discount px-[14px] mt-[4px] font-[500]">
                15.04.2024 dan - 30.04.2024 gacha
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
            <li>
              Barcha IMEI lar rasmiy ro'yxatdan o'tgan va ro'yxatga olish
              faollashuvi 30 kun ichida amalga oshiriladi. Ishlab chiqaruvchi
              o'z mahsulotlariga 12 oylik kafolat beradi.
            </li>
            <li>Piksel zichligi (ppi) - 390</li>
            <li>Ekranning tanaga nisbati - 84.9</li>
            <li>Displey turi - SUPER AMOLED</li>
          </ul>
        </article>
      </main>
    </div>
  );
};

export default Discount;
