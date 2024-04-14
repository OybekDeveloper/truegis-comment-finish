import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { back, card, home, location, money, rightarrow, time } from "../images";
import checkback from "./Subtract.svg";
import { motion } from "framer-motion";
import "./billing-info.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  OpenAwayDate,
  OpenDeliveryMenu,
  SendOrderItem,
} from "../../reducer/delivery";
import SuccussModal from "./success-modal";
import DateModal from "./date-modal";
const BillingInfoAway = () => {
  const navigate = useNavigate();
  const { sendOrder } = useSelector((state) => state.delivery);
  const dispatch = useDispatch();

  const [activeDate, setActiveDate] = useState(false);
  const [activeMap, setActiveMap] = useState(false);

  const handleClose = () => {
    navigate(-1);
  };

  const handleSubmitOrder = () => {
    dispatch(SendOrderItem(true));
    navigate("/delivery/basket");
  };

  const handleOpenDate = (bool) => {
    dispatch(OpenAwayDate(bool));
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
        <h1 className="text-[20px] font-[500] texxt-[#000]">
          To’lov ma’lumotlari
        </h1>
        <div></div>
      </section>
      <section className="flex flex-col mt-[24px] gap-[20px]">
        <h1 className="text-[20px] font-[500] text-[#182230]">Olib ketish</h1>
        <article className="flex justify-between items-start">
          <div className="w-full flex items-start justify-start gap-[8px]">
            <img className="w-[20px] h-[20px]" src={location} alt="" />
            <p className="text-[14px] font-[400] text-[#475467]">
              Filialni tanlash
            </p>
          </div>
          <div className="flex justify-end items-start gap-[6px] w-full">
            <p className="text-[14px] font-[400] text-[#2E90FA]">
              Xaritadan tanlash
            </p>
            <img src={rightarrow} alt="" />
          </div>
        </article>
        <article
          onClick={() => handleOpenDate(true)}
          className="flex justify-between items-start cursor-pointer"
        >
          <div className="w-full flex items-start justify-start gap-[8px]">
            <img className="w-[20px] h-[20px]" src={time} alt="" />
            <p className="text-[14px] font-[400] text-[#475467]">
              Olib ketish vaqti
            </p>
          </div>
          <div className="flex justify-end items-start gap-[6px] w-full">
            <p className="text-[14px] font-[400] text-[#2E90FA]">
              08 Aprel, 2024 soat 18:00
            </p>
            <img src={rightarrow} alt="" />
          </div>
        </article>
        <div className="bg-[#F2F4F7] h-[1px] w-full"></div>
      </section>
      <section className="check-info min-h-[400px] mt-[32px] px-[20px] py-[40px] gap-[20px] flex flex-col">
        <h1 className="text-[20px] font-[500] text-[#182230]">
          Buyurtma ma’lumotlari
        </h1>
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-[8px]">
            <h1 className="text-[14px] font-[400] text-[#2E90FA]">3X</h1>
            <p className="text-#[667085] text-[14px] font-[400]">
              Samarqand oshi
            </p>
          </div>
          <h1 className="text-[14px] font-[500] text-[#2E90FA]">
            162,000 so’m
          </h1>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-[8px]">
            <h1 className="text-[14px] font-[400] text-[#2E90FA]">3X</h1>
            <p className="text-#[667085] text-[14px] font-[400]">
              Samarqand oshi
            </p>
          </div>
          <h1 className="text-[14px] font-[500] text-[#2E90FA]">
            162,000 so’m
          </h1>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-[8px]">
            <h1 className="text-[14px] font-[400] text-[#2E90FA]">3X</h1>
            <p className="text-#[667085] text-[14px] font-[400]">
              Samarqand oshi
            </p>
          </div>
          <h1 className="text-[14px] font-[500] text-[#2E90FA]">
            162,000 so’m
          </h1>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-[8px]">
            <h1 className="text-[14px] font-[400] text-[#2E90FA]">3X</h1>
            <p className="text-#[667085] text-[14px] font-[400]">
              Samarqand oshi
            </p>
          </div>
          <h1 className="text-[14px] font-[500] text-[#2E90FA]">
            162,000 so’m
          </h1>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-[8px]">
            <h1 className="text-[14px] font-[400] text-[#2E90FA]">3X</h1>
            <p className="text-#[667085] text-[14px] font-[400]">
              Samarqand oshi
            </p>
          </div>
          <h1 className="text-[14px] font-[500] text-[#2E90FA]">
            162,000 so’m
          </h1>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-[#667085] text-[14px] font-[400]">Jami summa:</h1>
          <h2 className="text-[16px] font-[500] text-[#2E90FA]">
            285,000 so’m
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
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: false ? 0 : "100%" }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ duration: 0.5 }}
        className="w-full mx-auto flex flex-col justify-center items-center fixed bottom-[-10px] p-[16px] z-[12] left-0 bg-white rounded-t-[16px]"
      >
        <div className="w-[23px] h-[4px] bg-[#d9d9d9] rounded-[2px]"></div>
        <div className="mt-[25px] flex flex-col gap-[12px]">
          <h1 className="text-[#344054] text-[16px] text-[400]">
            Olib ketish vaqtini tanlang
          </h1>
          <div className="grid grid-cols-3 gap-[17px]">
            <input
              className="col-span-2 border-[1px] border-[#EAECF0] border-solid rounded-[8px] outline-none text-[#344054] text-[14px] font-[400] px-[14px] py-[10px] "
              type="text"
              placeholder="Kirish yo’li"
            />
            <input
              className="col-span-1 border-[1px] border-[#EAECF0] border-solid rounded-[8px] outline-none text-[#344054] text-[14px] font-[400] px-[14px] py-[10px] "
              type="text"
              placeholder="Uy qavati"
            />
          </div>
          <button
            onClick={handleSubmitOrder}
            className="bg-[#2E90FA] w-full rounded-[8px] flex justify-center items-center py-[8px] px-[16px] mt-[12px]"
          >
            <h1 className="text-[#fff] text-[18px] font-[500]">
              Buyurtmani rasmiylashtirish
            </h1>
          </button>
        </div>
      </motion.div>
      {false && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10"></div>
      )}
      <DateModal />
    </div>
  );
};

export default BillingInfoAway;
