import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { DeleteFoodItem, ExitUserModal } from "../../reducer/delivery";
import { SavePlaceModal } from "../../reducer/event";
import save from "./liked.png";
import { like_en, like_ru, like_uz } from ".";
export default function SaveModal() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isSave } = useSelector((state) => state.event);
  const lang = localStorage.getItem("lang");

  function closeModal() {
    dispatch(SavePlaceModal(false));
  }
  const handleEnd = () => {
    dispatch(DeleteFoodItem(false));
  };
  return (
    <>
      <Transition appear show={isSave} as={Fragment}>
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
                <Dialog.Panel className="bg-[#fff] w-full max-w-md transform overflow-hidden rounded-2xl  text-left align-middle shadow-xl transition-all z-[999]">
                  <Dialog.Title
                    as="h3"
                    className="relative text-lg font-medium leading-6 flex justify-center items-center"
                  >
                    <div className="w-full">
                      {lang === "uz" ? (
                        <img
                          className="w-full object-cover"
                          src={like_uz}
                          alt=""
                        />
                      ) : lang === "en" ? (
                        <img
                          className="w-full object-cover"
                          src={like_en}
                          alt=""
                        />
                      ) : (
                        <img
                          className="w-full object-cover"
                          src={like_ru}
                          alt=""
                        />
                      )}
                    </div>
                  </Dialog.Title>
                  <div className="px-[16px] py-[20px] w-full flex justify-center flex-col gap-[12px]">
                    <h1 className="text-start text-[#555] text-[18px] font-[400]">
                      {t("like_title")}
                    </h1>
                    <div className="w-full flex justify-end tg-button-text">
                      <button onClick={closeModal} className="text-[18px]">
                        OK
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
