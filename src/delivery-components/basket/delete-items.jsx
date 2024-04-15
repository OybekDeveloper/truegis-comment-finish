import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  ClearBasket,
  DeleteFoodItem,
  SendOrderItem,
} from "../../reducer/delivery";
import { close, deleteicon, success } from "../images";
export default function DeleteItems() {
  const { deleteFood,activeCatgory } = useSelector((state) => state.delivery);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  function closeModal() {
    dispatch(DeleteFoodItem(false));
  }
  const handleEnd = () => {
    dispatch(DeleteFoodItem(false));
  };

  const handleClear = () => {
    dispatch(ClearBasket(activeCatgory?.food_id));
    dispatch(DeleteFoodItem(false));
  };
  return (
    <>
      <Transition appear show={deleteFood} as={Fragment}>
        <Dialog as="div" className="relative z-[999]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-[#fff] w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all z-[999]">
                  <Dialog.Title
                    as="h3"
                    className="relative text-lg font-medium leading-6 flex justify-center items-center"
                  >
                    <img
                      onClick={closeModal}
                      className="cursor-pointer absolute right-0 top-0 z-10"
                      src={close}
                      alt=""
                    />
                    <img src={deleteicon} alt="" />
                  </Dialog.Title>
                  <div className="w-full flex justify-center flex-col gap-[12px] mt-[16px]">
                    <h1 className="text-center text-[#101828] text-[18px] font-[500]">
                      Savatni tozalash{" "}
                    </h1>
                    <div className="flex flex-col items-center justify-center gap-[12px]">
                      <button
                        onClick={handleClear}
                        className="text-[18px] text-[#fff] w-full px-[14px] py-[10px] rounded-[8px] bg-[#D92D20]"
                      >
                        Tozalash{" "}
                      </button>
                      <button className="text-[18px] text-[#000] w-full px-[14px] py-[10px] rounded-[8px] border-[1px] border-solid border-[#D0D5DD]">
                        Bekor qilish{" "}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
