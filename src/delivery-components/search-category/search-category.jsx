import React from "react";
import { useNavigate } from "react-router-dom";
import { back } from "../images";
import { useSelector, useDispatch } from "react-redux";
import CategoryItem from "../category-elements/category-item";
import { SelectCategoryActive } from "../../reducer/delivery";
import CategoryElements from "../category-elements/category-elements";

const SearchCategory = () => {
  const { activeCatgory } = useSelector((state) => state.delivery);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1);
  };
  console.log(activeCatgory);
  return (
    <div className="min-h-screen bg-[#fff]">
      <section className="shadow-shadow-xs w-full flex items-center justify-between mb-[24px] py-[17px]">
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
    </div>
  );
};

export default SearchCategory;
