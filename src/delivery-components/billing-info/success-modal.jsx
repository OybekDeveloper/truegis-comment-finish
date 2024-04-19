import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { SendOrderItem } from "../../reducer/delivery";
import { close, success } from "../images";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";

export default function SuccussModal() {
  const { sendOrder } = useSelector((state) => state.delivery);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const animationData = require("./done.json");
  const options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };
  function closeModal() {
    dispatch(SendOrderItem(false));
  }
  const handleEnd = () => {
    navigate("/delivery/home");
    dispatch(SendOrderItem(false));
  };
  return (
    <>
      <Transition appear show={sendOrder} as={Fragment}>
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
                <Dialog.Panel className="bg-[#fff] w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all z-[999]">
                  <Dialog.Title
                    as="h3"
                    className="relative text-lg font-medium leading-6 flex justify-center items-center"
                  >
                    <img
                      onClick={() => closeModal()}
                      className="cursor-pointer absolute right-0 top-0 z-10"
                      src={close}
                      alt=""
                    />
                    <Lottie options={options} height={50} width={50} />
                  </Dialog.Title>
                  <div className="w-full flex justify-center flex-col gap-[12px]">
                    <h1 className="text-center text-[#101828] text-[18px] font-[500]">
                      Buyurtmangiz jo’natildi
                    </h1>
                    <p className="text-center text-[14px] font-[400] text-[#475467]">
                      Sizning buyurtmangiz muvaffaqiyatli jo’natildi,
                      buyurtmangiz holati haqida bot orqali bildirishnoma olasiz
                    </p>
                    <button
                      onClick={handleEnd}
                      className=" text-[18px] font-[500] text-[#344054]  shadow-shadow-xs border-[1px] py-[10px] px-[14px] rounded-[8px] mt-[12px]"
                    >
                      Asosiy sahifaga qaytish
                    </button>
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
