import React from "react";
import { back, trash } from "../images";
import { useNavigate } from "react-router-dom";
import { foods } from "../foods-image/foodsData";
import { motion } from "framer-motion";
import SuccussModal from "../billing-info/success-modal";
import {
  AddProductItem,
  DeleteFoodItem,
  MinusProductItem,
} from "../../reducer/delivery";
import { useDispatch, useSelector } from "react-redux";
import DeleteItems from "./delete-items";
import plus from "./plus.svg";
import minus from "./minus.svg";
const Basket = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.delivery);
  const handleClose = () => {
    navigate("/delivery/home");
  };
  const handleClearBasket = () => {
    dispatch(DeleteFoodItem(true));
  };

  const handleAddItem = (id, categoryId) => {
    dispatch(AddProductItem([id, categoryId]));
  };

  const handleDecrementItem = (id, categoryId) => {
    dispatch(MinusProductItem([id, categoryId]));
  };

  function formatPrice(price) {
    // Formatni "20,300" yoki "1,000" shaklida olish
    const formattedPrice = new Intl.NumberFormat("en-US").format(price);

    return formattedPrice;
  }

  console.log(items);
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
        <img
          className="cursor-pointer"
          onClick={handleClearBasket}
          src={trash}
          alt=""
        />
      </section>
      <section className="flex flex-col gap-[24px]">
        {items.map((item, idx) => (
          <div className="grid grid-cols-3" key={idx}>
            <div className="col-span-2 flex items-center justify-start gap-[16px]">
              <img
                className="w-[70px] h-[70px] object-cover rounded-[12px]"
                src={item.url}
                alt="dasf"
              />
              <div className="flex flex-col justify-start items-start">
                <h1 className="text-[18px] text-[#344054] font-[500]">
                  {item.title}
                </h1>
                <p className="text-[16px] font-[500] text-[#2E90FA]">
                  {formatPrice(item.price*item.quantity)} so'm
                </p>
              </div>
            </div>
            <div className="col-span-1 flex justify-end items-center">
              <div className="flex justify-center items-center py-[4px] px-[12px] gap-[16px] border-[1px] border-solid border-[#EAECF0] rounded-[8px]">
                <img
                  onClick={() => handleDecrementItem(item.id, item.categoryId)}
                  src={minus}
                  alt=""
                />
                <h1 className="text-[20px] font-[500] text-[#475467]">{item.quantity}</h1>
                <img
                  onClick={() => handleAddItem(item.id, item.categoryId)}
                  src={plus}
                  alt=""
                />
              </div>
            </div>
          </div>
        ))}
      </section>
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: items.length > 0 ? 0 : "100%" }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ duration: 0.5 }}
        className="w-full mx-auto flex justify-center fixed bottom-[-10px] p-[16px] z-10 left-0 bg-white"
      >
        <button
          onClick={() => navigate("/delivery/order-type")}
          className="bg-[#2E90FA] w-full rounded-[8px] flex justify-between items-center py-[8px] px-[16px]"
        >
          <h1 className="text-[#fff] text-[18px] font-[400]">
            {items && items.length} ta mahsulot
          </h1>
          <p className="text-[#fff] text-[18px] font-[500]">
            {formatPrice(totalPrice)} so’m
          </p>
        </button>
      </motion.div>
      <SuccussModal />
      <DeleteItems />
    </main>
  );
};

export default Basket;
