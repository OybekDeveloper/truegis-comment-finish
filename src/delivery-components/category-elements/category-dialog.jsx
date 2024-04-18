import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  AddProductItem,
  MinusProductItem,
  SelectCategoryModal,
} from "../../reducer/delivery";
import { close, minus, plus } from "../images";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
export default function CategoryDialog({ categoryId}) {
  const { selectCategory, selectCategoryItem,foods ,activeCatgory} = useSelector(
    (state) => state.delivery
  );
  const [selectFood,setSelectFood]=useState()
  const dispatch = useDispatch();
  function closeModal() {
    dispatch(SelectCategoryModal());
  }

  function formatPrice(price) {
    const formattedPrice = new Intl.NumberFormat("en-US").format(price);
    return formattedPrice;
  }

  const handleAddItem = (id, categoryId) => {
    dispatch(AddProductItem([id, categoryId]));
  };

  const handleDecrementItem = (id, categoryId) => {
    dispatch(MinusProductItem([id, categoryId]));
  };
  useEffect(()=>{
    if(activeCatgory && selectCategory){
      setSelectFood(foods[categoryId-1]?.props.find(c=>c.id===selectCategoryItem.id))
    }
  },[foods,selectCategory])
  return (
    <div className="">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: selectCategory ? "0" : "100%" }}
        transition={{ duration: "0.7" }}
        className="fixed inset-0 overflow-y-auto z-[100]"
      >
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="bg-[#fff] absolute bottom-0 w-full max-w-md transform overflow-hidden min-h-[50%] rounded-t-2xl p-6 text-left align-middle shadow-xl transition-all z-[999]">
            <img
              className="w-full h-[220px] object-cover rounded-t-[12px] absolute left-0 top-0"
              src={selectCategoryItem?.url}
              alt=""
            />
            <div className="absolute top-[12px] rounded-full p-[6px] right-[12px] z-10 bg-white">
              <img
                onClick={closeModal}
                className=" cursor-pointer"
                src={close}
                alt=""
              />
            </div>
            <div className="w-full h-[180px]"></div>
            <section className="w-full mt-[25px]">
              <h1 className="text-[20px] font-[500] text-[#000] mt-[22px]">
                {selectCategoryItem?.title}
              </h1>
              <h2 className="text-[20px] font-[600] text-[#2E90FA] mt-[8px]">
                {formatPrice(selectCategoryItem?.price)} so'm
              </h2>
              <p className="text-[16px] font-[400] mt-[12px] text-[#475467]">
                Bu yashil karom (karam) va boshqa sabzavotlar bilan
                tayyorlanadigan, O'rta Osiyo va xususan O'zbek oshxonasiga xos
                bo'lgan engil va sog'lom sho'rva. Ushbu sho'rva sog'liq uchun
                foydali bo'lib, xususan, sovuq kunlarda tanani isitish va
                immunitetni oshirish uchun juda yaxshi tanlovdir.
              </p>
              <div className="grid grid-cols-3 gap-[12px] mt-[18px]">
                {selectFood?.quantity > 0 && (
                  <div className="col-span-1 flex justify-between items-center bg-[#F2F4F7] py-[10px] rounded-[12px] px-[6px]">
                    <img
                      onClick={() =>
                        handleDecrementItem(selectCategoryItem.id, categoryId)
                      }
                      src={minus}
                      alt=""
                    />
                    <h1 className="text-[16px] font-[600] text-[#2E90FA]">{selectFood.quantity}</h1>
                    <img
                      onClick={() =>
                        handleAddItem(selectCategoryItem.id, categoryId)
                      }
                      src={plus}
                      alt=""
                    />
                  </div>
                )}

                <div
                  onClick={() =>
                    handleAddItem(selectCategoryItem.id, categoryId)
                  }
                  className={`${
                    selectFood?.quantity > 0
                      ? "col-span-2"
                      : "col-span-3"
                  } bg-[#2E90FA] cursor-pointer rounded-[12px] py-[10px] text-center text-[18px] font-[500] text-[#fff]`}
                >
                  {formatPrice(selectCategoryItem?.price)} so'm
                </div>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
      {selectCategory && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10"></div>
      )}
    </div>
  );
}
