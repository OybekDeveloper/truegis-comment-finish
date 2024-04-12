import React from "react";
import { useNavigate } from "react-router-dom";
import { back } from "../images";
import {motion} from 'framer-motion'
const OrderType = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };
  return (
    <div>
      <section className="bg-[#fff] shadow-shadow-xs w-full flex items-center justify-between mb-[24px] py-[17px]">
        <img
          onClick={handleClose}
          className="cursor-pointer"
          src={back}
          alt=""
        />
        <h1 className="text-[20px] font-[500] texxt-[#000]">Buyurtma turi</h1>
        <div></div>
      </section>
      <section className=" mt-[24px] flex flex-col gap-[20px]">
        <div
          className={`${
            true
              ? "border-[#2E90FA] border-[2px]"
              : "border-[1px] border-[#EAECF0]"
          } flex justify-between items-start p-[16px]  rounded-[12px]`}
        >
          <div className="flex justify-start items-center gap-[12px]">
            <div className="flex flex-col justify-start items-start">
              <h1 className="text-[16px] font-[500] text-[#344054]">
                Yetkazib berish
              </h1>
              <p className="text-[16px] font-[400] text-[#98A2B3]">
                Kuryer orqali yetkaziladi{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="default-radio-1"
              type="radio"
              value=""
              checked={true}
              name="default-radio"
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded-full"
            />
          </div>
        </div>
        <div className="flex justify-between items-start p-[16px] border-[1px] border-[#EAECF0] rounded-[12px]">
          <div className="flex justify-start items-center gap-[12px]">
            <div className="flex flex-col justify-start items-start">
              <h1 className="text-[16px] font-[500] text-[#344054]">
                Olib ketish
              </h1>
              <p className="text-[16px] font-[400] text-[#98A2B3]">
                Eng yaqin filialimizdan olib ketishingiz mumkin{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="default-radio-1"
              type="radio"
              value=""
              name="default-radio"
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded-full"
            />
          </div>
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
          onClick={() => navigate("/delivery/billing-info")}
          className="bg-[#2E90FA] w-full flex justify-center items-center rounded-[8px] py-[8px] px-[16px]"
        >
          <h1 className="text-[#fff] text-[18px] font-[400]">Davom etish</h1>
        </button>
      </motion.div>
    </div>
  );
};

export default OrderType;
