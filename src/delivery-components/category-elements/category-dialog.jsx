import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { SelectCategoryModal } from "../../reducer/delivery";
import { close, minus, plus } from "../images";
import { motion } from "framer-motion";
export default function CategoryDialog() {
  const { selectCategory, selectCategoryItem } = useSelector(
    (state) => state.delivery
  );
  const dispatch = useDispatch();
  function closeModal() {
    dispatch(SelectCategoryModal());
  }

  function formatPrice(price) {
    const formattedPrice = new Intl.NumberFormat("en-US").format(price);
    return formattedPrice;
  }

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
            <section className="w-full">
              <div className="w-full flex justify-center items-center relative">
                <div className="bg-[#d9d9d9]  w-[23px] h-[4px] rounded-[2px]"></div>
                <img
                  onClick={closeModal}
                  className=" cursor-pointer absolute top-0 right-0"
                  src={close}
                  alt=""
                />
              </div>
            </section>
            <section className="w-full mt-[25px]">
              <img
                className="w-full h-[150px] object-cover rounded-[12px]"
                src={selectCategoryItem?.url}
                alt=""
              />
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
                {selectCategoryItem?.quantity > 0 && (
                  <div className="col-span-1 flex justify-between items-center bg-[#F2F4F7] py-[10px] rounded-[12px] px-[6px]">
                    <img src={minus} alt="" />
                    <h1 className="text-[16px] font-[600] text-[#2E90FA]">3</h1>
                    <img src={plus} alt="" />
                  </div>
                )}

                <div
                  className={`${
                    selectCategoryItem?.quantity > 0
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
