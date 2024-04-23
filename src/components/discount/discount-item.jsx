import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
const tg = window.Telegram.WebApp;

const DiscountItem = () => {
  const { id } = useParams();
  console.log(id);
  const { discount } = useSelector((state) => state.event);
  const [selectDic, setSelectDic] = useState({ media: [] });

  function formatPrice(price) {
    // Formatni "20,300" yoki "1,000" shaklida olish
    const formattedPrice = new Intl.NumberFormat("en-US").format(price);

    return formattedPrice;
  }

  useEffect(() => {
    const select = discount.find((item) => +item.id === +id);
    console.log(select);
    localStorage.setItem("percent", select.percent);
    setSelectDic(select);
  }, []);
  console.log(selectDic);
  return (
    <>
      <article className="absolute top-[12px]  left-[30px] z-[10] rounded-[6px] text-[#F04438] px-[8px] py-[4px] bg-[#dbdbdb]">
        {selectDic.percent}% chegirma
      </article>
      <main className="mt-[24px] relative">
        <section className="">
          <Swiper
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {selectDic.media.map((item, idx) => (
              <>
                <SwiperSlide key={idx}>
                  <div>
                    <img className="" src={item.media} alt="dfasdf" />
                  </div>
                </SwiperSlide>
              </>
            ))}
          </Swiper>
        </section>
        <section className=" flex flex-col gap-[16px] px-[16px]">
          <h1 className="text-[24px] font-[500]">{selectDic.name}</h1>
          <div>
            <h1 className="text-[16px] font-[400]">Aksiya va muddati</h1>
            <div className="relative flex items-center mt-[8px]">
              <p className="tg-time-discount px-[14px] py-[4px] mt-[4px] font-[500]">
                {selectDic.start_date} dan - {selectDic.end_date} gacha
              </p>
            </div>
          </div>
          <div>
            <h1 className="text-[16px] font-[400]">Narxi</h1>
            <div className="flex justify-start gap-[16px] items-end mt-[8px]">
              <h1 className="text-[24px] font-[500]">
                {formatPrice(selectDic.discount_price)} so’m
              </h1>
              <p className="line-through text-[16px] font-[500] opacity-[0.7]">
                {formatPrice(selectDic.price)} so’m
              </p>
            </div>
          </div>
        </section>
        <article className="mt-[32px] p-[16px] rounded-[12px]">
          <h1 className="text-[18px] font-[500] ">
            Mahsulot haqida qisqacha ma’lumot
          </h1>
          <ul className="text-[16px] font-[400] list-disc px-[16px] mt-[12px] opacity-[0.7]">
            <div
              dangerouslySetInnerHTML={{
                __html: selectDic.discription,
              }}
            />
          </ul>
        </article>
      </main>
    </>
  );
};

export default DiscountItem;
