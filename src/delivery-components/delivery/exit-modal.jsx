import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  DeleteFoodItem,
  ExitUserModal,
  SendOrderItem,
} from "../../reducer/delivery";
import { close, deleteicon, exitdoor, success } from "../images";
export default function ExitUser() {
  const { exitUser } = useSelector((state) => state.delivery);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  function closeModal() {
    dispatch(ExitUserModal(false));
  }
  const handleEnd = () => {
    dispatch(DeleteFoodItem(false));
  };
  return (
    <>
      <Transition appear show={exitUser} as={Fragment}>
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
                    <img src={exitdoor} alt="" />
                  </Dialog.Title>
                  <div className="w-full flex justify-center flex-col gap-[12px] mt-[1">
                    <h1 className="text-center text-[#101828] text-[18px] font-[500]">
                      Profildan chiqishni xohlaysizmi?
                    </h1>
                    <div className="flex flex-col items-center justify-center gap-[12px]">
                      <button className="text-[18px] text-[#fff] w-full px-[14px] py-[10px] rounded-[8px] bg-[#D92D20]">
                        Chiqish{" "}
                      </button>
                      <button onClick={closeModal} className="text-[18px] text-[#000] w-full px-[14px] py-[10px] rounded-[8px] border-[1px] border-solid border-[#D0D5DD]">
                        Bekor qilish
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
