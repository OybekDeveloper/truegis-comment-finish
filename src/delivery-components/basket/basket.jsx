import React from "react";
import { back, minus, plus, trash } from "../images";
import { useNavigate } from "react-router-dom";
import { foods } from "../foods-image/foodsData";
import { motion } from "framer-motion";
import SuccussModal from "../billing-info/success-modal";
import { DeleteFoodItem } from "../../reducer/delivery";
import { useDispatch } from "react-redux";
import DeleteItems from "./delete-items";
const Basket = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => {
    navigate("/delivery/home");
  };
  const handleClearBasket = () => {
    dispatch(DeleteFoodItem(true));
  };
  return (
    <main>
      <section className="bg-[#fff] shadow-shadow-xs w-full flex items-center justify-between mb-[24px] py-[17px]">
        <img
          onClick={handleClose}
          className="cursor-pointer"
          src={back}
          alt=""
        />
        <h1 className="text-[20px] font-[500] texxt-[#000]">Savat</h1>
        <img className="cursor-pointer" onClick={handleClearBasket} src={trash} alt="" />
      </section>
      <section className="flex flex-col gap-[24px]">
        {foods[0].props.map((item, idx) => (
          <div className="flex justify-between items-center" key={idx}>
            <div className="flex items-center justify-start gap-[16px]">
              <img
                className="w-[70px] h-[70px] object-cover rounded-[12px]"
                src={item.url}
                alt="dasf"
              />
              <div className="flex flex-col justify-start items-start">
                <h1 className="text-[18px] text-[#344054] font-[500]">
                  Chuchvara
                </h1>
                <p className="text-[16px] font-[500] text-[#2E90FA]">
                  26,000 so’m
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center p-[4px] gap-[16px] border-[1px] border-solid border-[#EAECF0] rounded-[8px]">
              <img src={minus} alt="" />
              <h1>1</h1>
              <img src={plus} alt="" />
            </div>
          </div>
        ))}
      </section>
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: true ? 0 : "100%" }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ duration: 0.5 }}
        className="w-full mx-auto flex justify-center fixed bottom-[-10px] p-[16px] z-10 left-0 bg-white"
      >
        <button
          onClick={() => navigate("/delivery/order-type")}
          className="bg-[#2E90FA] w-full rounded-[8px] flex justify-between items-center py-[8px] px-[16px]"
        >
          <h1 className="text-[#fff] text-[18px] font-[400]">3 ta mahsulot</h1>
          <p className="text-[#fff] text-[18px] font-[500]">78,000 so’m</p>
        </button>
      </motion.div>
      <SuccussModal />
      <DeleteItems />
    </main>
  );
};

export default Basket;
