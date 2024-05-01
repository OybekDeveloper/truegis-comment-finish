import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { back, card, home, money, rightarrow } from "../images";
import { motion } from "framer-motion";
import "./billing-info.scss";
import { useDispatch, useSelector } from "react-redux";
import { SendOrderItem } from "../../reducer/delivery";
const BillingInfoDeliver = () => {
  const navigate = useNavigate();
  const { items,totalPrice } = useSelector((state) => state.delivery);
  const dispatch = useDispatch();
  const handleClose = () => {
    navigate(-1);
  };

  const handleSubmitOrder = () => {
    dispatch(SendOrderItem(true));
    navigate("/delivery/basket");
  };

  return (
    <div className="flex flex-col mb-[60px]">
      <section className="bg-[#fff] shadow-shadow-xs w-full flex items-center justify-between mb-[24px] py-[17px]">
        <img
          onClick={handleClose}
          className="cursor-pointer"
          src={back}
          alt=""
        />
        <h1 className="text-[20px] font-[500] text-[#000]">
          To’lov ma’lumotlari
        </h1>
        <div></div>
      </section>
      
      <section className="flex flex-col mt-[24px] gap-[20px]">
        <h1 className="text-[20px] font-[500] text-[#182230]">
          Yetkazib berish manzili
        </h1>
        <article className="flex justify-between items-start">
          <div className="w-full flex items-start justify-start gap-[8px]">
            <img src={home} alt="" />
            <p className="text-[14px] font-[400] text-[#475467]">
              Toshkent shahri, Maxtumquli ko’chasi, 7
            </p>
          </div>
          <div className="flex justify-end items-start gap-[6px] w-full">
            <p className="text-[14px] font-[400] text-[#2E90FA]">
              Xaritadan tanlash
            </p>
            <img src={rightarrow} alt="" />
          </div>
        </article>
        <div className="bg-[#F2F4F7] h-[1px] w-full"></div>
        <div className="grid grid-cols-3 gap-[17px]">
          <input
            className=" border-[1px] border-[#EAECF0] border-solid rounded-[8px] outline-none text-[#344054] text-[14px] font-[400] px-[14px] py-[10px] "
            type="text"
            placeholder="Kirish yo’li"
          />
          <input
            className=" border-[1px] border-[#EAECF0] border-solid rounded-[8px] outline-none text-[#344054] text-[14px] font-[400] px-[14px] py-[10px] "
            type="text"
            placeholder="Uy qavati"
          />
          <input
            className=" border-[1px] border-[#EAECF0] border-solid rounded-[8px] outline-none text-[#344054] text-[14px] font-[400] px-[14px] py-[10px] "
            type="text"
            placeholder="Xonadon"
          />
        </div>
        <input
          className=" border-[1px] border-[#EAECF0] border-solid rounded-[8px] outline-none text-[#344054] text-[14px] font-[400] px-[14px] py-[10px] "
          type="text"
          placeholder="Kuryer uchun izoh(domofon kodi)"
        />
        <div className="bg-[#F2F4F7] h-[1px] w-full"></div>
      </section>
      <section className="flex flex-col mt-[24px] gap-[20px]">
        <h1 className="text-[20px] font-[500] text-[#182230]">To'lov turi</h1>
        <div className="flex justify-between mt-[4px]">
          <div className="flex justify-start items-start gap-[8px]">
            <img className="w-[20px] h-[20px]" src={money} alt="" />
            <div>
              <h1 className="text-[14px] font-[500] text-#344054]">
                Naqd pul yoki qabul qilgach karta orqali{" "}
              </h1>
              <p className="text-[12px] font-[400] text-[#475467]">
                Buyurtmani qabul qilgandan keyin to’lang
              </p>
            </div>
          </div>
          <input
            className="w-[20px] h-[20px] outline-none rounded-[6px]"
            type="checkbox"
            checked={true}
          />
        </div>
        <div className="flex justify-between opacity-[0.7] ">
          <div className="flex justify-start items-start gap-[8px]">
            <img className="w-[20px] h-[20px]" src={card} alt="" />
            <div>
              <h1 className="text-[14px] font-[500] text-#344054]">
                Karta orqali to’lash{" "}
                <span className="text-[12px] font-[400] text-[#EAAA08]">
                  Tez orada ishga tushadi
                </span>
              </h1>
              <p className="text-[12px] font-[400] text-[#475467]">
                Humo, Uzcard, Visa orqali to’lang
              </p>
            </div>
          </div>

          <input
            disabled={true}
            className="w-[20px] h-[20px] outline-none rounded-[6px]"
            type="checkbox"
          />
        </div>
      </section>
      <div className="bg-[#F2F4F7] h-[1px] w-full mt-[20px]"></div>

      <section className="check-info min-h-[400px] mt-[32px] px-[20px] py-[40px] gap-[20px] flex flex-col">
        <h1 className="text-[20px] font-[500] text-[#182230]">
          Buyurtma ma’lumotlari
        </h1>
      {items.map((item,idx)=>(
         <div  key={idx} className="flex justify-between items-center">
         <div className="flex justify-start items-center gap-[8px]">
           <h1 className="text-[14px] font-[400] text-[#2E90FA]">{item.quantity}X</h1>
           <p className="text-#[667085] text-[14px] font-[400]">
             {item.title}
           </p>
         </div>
         <h1 className="text-[14px] font-[500] text-[#2E90FA]">
          {formatPrice(item.quantity*item.price)} so’m
         </h1>
       </div>
      ))}
        <div className="flex justify-between items-center">
          <h1 className="text-[#667085] text-[14px] font-[400]">Jami summa:</h1>
          <h2 className="text-[16px] font-[500] text-[#2E90FA]">
            {formatPrice(totalPrice)} so’m
          </h2>
        </div>
      </section>
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: true ? 0 : "100%" }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ duration: 0.5 }}
        className="w-full mx-auto flex justify-center fixed bottom-[-10px] p-[16px] z-10 left-0 bg-white"
      >
        <button
          onClick={handleSubmitOrder}
          className="bg-[#2E90FA] w-full rounded-[8px] flex justify-center items-center py-[8px] px-[16px]"
        >
          <h1 className="text-[#fff] text-[18px] font-[500]">
            Buyurtmani rasmiylashtirish
          </h1>
        </button>
      </motion.div>
    </div>
  );
};

export default BillingInfoDeliver;

function formatPrice(price) {
  // Formatni "20,300" yoki "1,000" shaklida olish
  const formattedPrice = new Intl.NumberFormat("en-US").format(price);

  return formattedPrice;
}
