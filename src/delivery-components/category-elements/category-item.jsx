import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddProductItem,
  MinusProductItem,
  SelectCategoryModal,
} from "../../reducer/delivery";
import { minus, plus } from "../images";

const CategoryItem = ({ item, categoryId }) => {
  const dispatch = useDispatch();

  const handleShow = (id) => {
    dispatch(SelectCategoryModal(id));
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

  return (
    <div className="flex flex-col gap-[8px] cursor-pointer">
      <img
        onClick={() => handleShow(item,categoryId)}
        className="rounded-[12px] w-full h-[150px] object-cover"
        src={item?.url}
        alt=""
      />
      <h1 className="text-[14px] font-[500] text-[#475467]">
        {item?.title.length > 20
          ? item?.title.slice(0, 20) + "..."
          : item?.title}
      </h1>
      {item?.quantity > 0 ? (
        <div className="h-[43px] flex justify-between items-center px-[16px] py-[8px] rounded-[12px] bg-[#F2F4F7] cursor-pointer">
          <img
            onClick={() => handleDecrementItem(item?.id, categoryId)}
            className="w-[20px] h-[20px] "
            src={minus}
            alt=""
          />
          <h1 className="text-[18px] font-[500] text-[#2E90FA]">
            {item.quantity}
          </h1>
          <img
            onClick={() => handleAddItem(item?.id, categoryId)}
            className="w-[20px] h-[20px] "
            src={plus}
            alt=""
          />
        </div>
      ) : (
        <div
          onClick={() => handleAddItem(item?.id, categoryId)}
          className="h-[43px] flex justify-center items-center px-[16px] py-[8px] rounded-[12px] bg-[#F2F4F7] cursor-pointer text-[#2E90FA] text-[14px] font-[500]"
        >
          {formatPrice(item?.price)} so'm
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
