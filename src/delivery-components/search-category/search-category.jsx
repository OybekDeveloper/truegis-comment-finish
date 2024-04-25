import React from "react";
import { useNavigate } from "react-router-dom";
import { back } from "../images";
import { useSelector, useDispatch } from "react-redux";
import CategoryElements from "../category-elements/category-elements";
import { motion } from "framer-motion";

const SearchCategory = () => {
  const { activeCatgory, items,totalPrice } = useSelector((state) => state.delivery);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1);
  };
  return (
    <div className="min-h-screen bg-[#fff]">
      <section className="sticky top-0 bg-[#fff] shadow-shadow-xs w-full flex items-center justify-between mb-[24px] py-[17px]">
        <img
          onClick={handleClose}
          className="cursor-pointer"
          src={back}
          alt=""
        />
        <h1 className="text-[20px] font-[500] text-[#000]">
          {activeCatgory?.title}
        </h1>
        <div></div>
      </section>
      <CategoryElements />
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: items.length > 0 ? 0 : "100%" }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ duration: 0.5 }}
        className="w-full mx-auto flex justify-center fixed bottom-[-10px] p-[16px] z-30 left-0 bg-white"
      >
        <button
          onClick={() => navigate("/delivery/basket")}
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
    </div>
  );
};

export default SearchCategory;

function formatPrice(price) {
  // Formatni "20,300" yoki "1,000" shaklida olish
  const formattedPrice = new Intl.NumberFormat("en-US").format(price);

  return formattedPrice;
}
