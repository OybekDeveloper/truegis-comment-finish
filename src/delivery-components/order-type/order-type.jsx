import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { back } from "../images";
import { motion } from "framer-motion";

const OrderType = () => {
  const navigate = useNavigate();

  const [orderTypes, setOrderTypes] = useState([
    {
      id: 1,
      title: "Yetkazib berish",
      description: "Kuryer orqali yetkaziladi",
      link: "/delivery/billing-info-deliver",
      checked: false,
    },
    {
      id: 2,
      title: "Olib ketish",
      description: "Eng yaqin filialimizdan olib ketishingiz mumkin",
      link: "/delivery/billing-info-away",
      checked: false,
    },
  ]);

  const [selectedOrderLink, setSelectedOrderLink] = useState("");

  const handleOrderTypeChange = (id) => {
    const updatedOrderTypes = orderTypes.map((type) =>
      type.id === id ? { ...type, checked: true } : { ...type, checked: false }
    );
    const selectedLink = orderTypes.find((type) => type.id === id).link;
    setOrderTypes(updatedOrderTypes);
    setSelectedOrderLink(selectedLink);
  };

  const handleClose = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    if (selectedOrderLink) {
      navigate(selectedOrderLink);
    } else {
      // Handle case where no order type is selected
      console.error("No order type selected");
    }
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
        {orderTypes.map((type) => (
          <div
            key={type.id}
            className={`${
              type.checked
                ? "border-[#2E90FA] border-[2px]"
                : "border-[1px] border-[#EAECF0]"
            } flex justify-between items-start p-[16px] cursor-pointer rounded-[12px]`}
            onClick={() => handleOrderTypeChange(type.id)}
          >
            <div className="flex justify-start items-center gap-[12px]">
              <div className="flex flex-col justify-start items-start">
                <h1 className="text-[16px] font-[500] text-[#344054]">
                  {type.title}
                </h1>
                <p className="text-[16px] font-[400] text-[#98A2B3]">
                  {type.description}
                </p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <input
                id={`order-type-${type.id}`}
                type="radio"
                checked={type.checked}
                name="order-type"
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded-full"
                onChange={() => handleOrderTypeChange(type.id)}
              />
            </div>
          </div>
        ))}
      </section>
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: selectedOrderLink ? 0 : "100%" }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ duration: 0.5 }}
        className="w-full mx-auto flex justify-center fixed bottom-[-10px] p-[16px] z-10 left-0 bg-white"
      >
        <button
          onClick={handleContinue}
          className={`bg-[#2E90FA] w-full flex justify-center items-center rounded-[8px] py-[8px] px-[16px] ${
            !selectedOrderLink && "opacity-50 cursor-not-allowed"
          }`}
          disabled={!selectedOrderLink}
        >
          <h1 className="text-[#fff] text-[18px] font-[400]">Davom etish</h1>
        </button>
      </motion.div>
    </div>
  );
};

export default OrderType;
