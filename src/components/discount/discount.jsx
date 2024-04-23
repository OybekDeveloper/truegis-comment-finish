import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./discount.scss";
import next from "./chevron-left (1).svg";
import prev from "./chevron-left.svg";
import { useTranslation } from "react-i18next";
import Lottie from "react-lottie";
import "./discount.css";
import { ApiServer } from "../../ApiServer/api";
const tg = window.Telegram.WebApp;
const Discount = () => {
  const placeId = localStorage.getItem("placeId");
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: SlideRigth(
      tg.themeParams.button_color ? tg.themeParams.text_color : "#000"
    ),
    prevArrow: SlideLeft(
      tg.themeParams.button_color ? tg.themeParams.text_color : "#000"
    ),
  };
  const animationData = require("./cat.json");
  const options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  const [discount, setDiscount] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ApiServer.getData(`/product/list/${placeId}/`);
        console.log(res);
        setDiscount(res);
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
              <h1 className="text-[24px] font-[500]">{item.name}</h1>
              <div>
                <h1 className="text-[16px] font-[400]">Aksiya va muddati</h1>
                <div className="relative flex items-center mt-[8px]">
                  <p className="w-full tg-time-discount px-[14px] mt-[4px] font-[500]">
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
                    __html:
                      '<p><strong>SALOM</strong></p>\r\n\r\n<h2 style="font-style:italic"><strong>Lore Ipsum</strong>&nbsp;s<u>hunchaki matbaa </u></h2>\r\n\r\n<hr />\r\n<div style="background:#eeeeee; border:1px solid #cccccc; padding:5px 10px">matn.&nbsp;Lore Ipsum 1500-yillardan beri sanoatning standart qo&#39;g&#39;irchoq matni bo&#39;lib kelgan, o&#39;shanda noma&#39;lum printer turdagi oshxonani olib, uni namunaviy kitob qilish uchun shifrlangan.&nbsp;U nafaqat besh asrdan, balki elektron matn terishga sakrashdan ham omon qoldi va mohiyatan o&#39;zgarishsiz qoldi.&nbsp;Bu 1960-yillarda chiqarilishi bilan ommalashgan Letraset o&#39;z ichiga olgan varaqlar Lorem Ipsum parchalar va yaqinda ish stoli nashriyot dasturlari bilan Aldus PageMaker shu jumladan versiyalari Lorem Ipsum.</div>',
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
