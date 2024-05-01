import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";
import { DiscountItemBlur } from "../../image-blur/discount-item-blur";
import { BackButton } from "@vkruglikov/react-telegram-web-app";

const tg = window.Telegram.WebApp;

const DiscountItem = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { discount } = useSelector((state) => state.event);
  const [selectDic, setSelectDic] = useState({ media: [] });
  const navigate=useNavigate(-2)
  function formatPrice(price) {
    // Formatni "20,300" yoki "1,000" shaklida olish
    const formattedPrice = new Intl.NumberFormat("en-US").format(price);

    return formattedPrice;
  }
  const handleBack = () => {
    if(discount.length===1){
      navigate(-2)
    }else{
      navigate(-1)
    }
  }

  useEffect(() => {
    const select = discount.find((item) => +item.id === +id);
    localStorage.setItem("percent", select.percent);
    setSelectDic(select);
 
  }, []);
  return (
    <>
      <BackButton onClick={() => handleBack()} />
      <article className="absolute top-[12px]  left-[30px] z-[10] rounded-[6px] text-[#F04438] px-[8px] py-[4px] bg-[#dbdbdb]">
        {selectDic.percent}% {t("discount_percent")}
      </article>
      <main className="mt-[24px] relative">
        <section className="">
          <Swiper
            style={{
              "--swiper-pagination-color": tg.themeParams.button_color
                ? tg.themeParams.button_color
                : "#1C93E3",
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {selectDic.media.map((item, idx) => (
              <div key={idx}>
                <SwiperSlide key={idx}>
                  <div className="mx-auto">
                    {item.media.split(".").includes("mp4") ? (
                      <div className="w-[100%] h-[230px]">
                        <video
                          className="w-[90%] h-[230px]  mx-auto rounded-[12px] z-10"
                          controls
                          poster={
                            selectDic.media[0].media.split(".").includes("mp4")
                              ? selectDic.media[1].media
                                ? selectDic.media[2].media
                                : selectDic.media[1].media
                              : selectDic.media[0].media
                          }
                        >
                          <source src={item.media} type="video/mp4" />
                        </video>
                      </div>
                    ) : (
                      <DiscountItemBlur
                        className=""
                        src={item.media}
                        alt="dfasdf"
                      />
                    )}
                  </div>
                </SwiperSlide>
              </div>
            ))}
          </Swiper>
        </section>
        <section className=" flex flex-col gap-[16px] px-[16px]">
          <h1 className="text-[24px] font-[500]">{selectDic.name}</h1>
          <div>
            <h1 className="text-[16px] font-[400]">{t("discount_time")}</h1>
            <div className="relative flex items-center mt-[8px]">
              <p className="tg-time-discount px-[14px] py-[4px] mt-[4px] font-[500]">
                {selectDic.start_date} {t("from")} - {selectDic.end_date}{" "}
                {t("to")}
              </p>
            </div>
          </div>
          <div>
            <h1 className="text-[16px] font-[400]">{t("discount_price")}</h1>
            <div className="flex justify-start gap-[16px] items-end mt-[8px]">
              <h1 className="text-[24px] font-[500]">
                {formatPrice(selectDic.discount_price)} so'm
              </h1>
              <p className="line-through text-[16px] font-[500] opacity-[0.7]">
                {formatPrice(selectDic.price)} so'm
              </p>
            </div>
          </div>
        </section>
        <article className="mt-[32px] p-[16px] rounded-[12px]">
          <h1 className="text-[18px] font-[500] ">{t("discount_info")}</h1>
          <ul className="discription-text text-[16px] text-justify font-[400] list-disc px-[16px] mt-[12px] opacity-[0.7]">
            <div
              dangerouslySetInnerHTML={{
                __html: selectDic.description,
              }}
            />
          </ul>
        </article>
      </main>
    </>
  );
};

export default DiscountItem;
