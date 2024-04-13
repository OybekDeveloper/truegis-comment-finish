import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  OpenAwayDate,
  OpenDeliveryMenu,
  SendOrderItem,
} from "../../reducer/delivery";
import { close, success } from "../images";
import { useNavigate } from "react-router-dom";
export default function DateModal() {
  const { openDate } = useSelector((state) => state.delivery);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  function closeModal() {
    dispatch(OpenAwayDate(false));
  }
  const handleEnd = () => {
    dispatch(SendOrderItem(false));
  };
  return (
    <>
      <Transition appear show={openDate} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[999]"
          onClose={() => closeModal()}
        >
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
                <Dialog.Panel className="bg-[#fff] w-full max-w-md transform overflow-hidden rounded-2xl tg-bg-color p-6 text-left align-middle shadow-xl transition-all z-[999] flex flex-col gap-[12px]">
                  <Dialog.Title
                    as="h3"
                    className="relative text-lg font-medium leading-6 flex justify-start items-center"
                  >
                    <h1 className="text-[18px] font-[500] text-[#344054]">Olib ketish vaqtini tanlang</h1>
                  </Dialog.Title>
                  <div className="grid grid-cols-3 gap-[17px]">
                    <input
                      className="col-span-2 border-[1px] border-[#EAECF0] border-solid rounded-[8px] outline-none text-[#344054] text-[14px] font-[400] px-[14px] py-[10px] "
                      type="text"
                      placeholder="Jan 6, 2024"
                    />
                    <input
                      className="col-span-1 border-[1px] border-[#EAECF0] border-solid rounded-[8px] outline-none text-[#344054] text-[14px] font-[400] px-[14px] py-[10px] "
                      type="text"
                      placeholder="18:00"
                    />
                  </div>
                  <button
                    className="bg-[#2E90FA] w-full rounded-[8px] flex justify-center items-center py-[8px] px-[16px] mt-[12px]"
                  >
                    <h1 className="text-[#fff] text-[18px] font-[500]">
                      Buyurtmani rasmiylashtirish
                    </h1>
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
