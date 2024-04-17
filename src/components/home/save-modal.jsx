import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { DeleteFoodItem, ExitUserModal } from "../../reducer/delivery";
import { SavePlaceModal } from "../../reducer/event";
export default function SaveModal() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isSave } = useSelector((state) => state.event);
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
                <Dialog.Panel className="bg-[#fff] w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all z-[999]">
                  <Dialog.Title
                    as="h3"
                    className="relative text-lg font-medium leading-6 flex justify-center items-center"
                  >
                    <div className="flex gap-[10px] flex-col w-full pb-[20px]">
                      <h1 className="text-[14px] font-[500] hr w-full text-center py-[9px] rounded-[4px] opacity-[0.5]">📍Lokatsiyani yuborish</h1>
                      <h1 className="text-[14px] font-[500] hr w-full text-center py-[9px] rounded-[4px]">❤️ Sevimlilar</h1>
                      <h1 className="text-[14px] font-[500] hr w-full text-center py-[9px] rounded-[4px] opacity-[0.5]">🔙 Ortga</h1>
                    </div>
                  </Dialog.Title>
                  <div className="w-full flex justify-center flex-col gap-[12px] mt-[24px]">
                    <h1 className="text-center text-[#101828] text-[18px] font-[400]">
                      Saqlagan joylaringizni <strong>❤️ Sevimlilar </strong>
                      bo’limidan topishingiz mumkin
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
