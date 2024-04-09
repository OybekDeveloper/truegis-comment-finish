import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteModalRedux } from "../../reducer/event";
import { useTranslation } from "react-i18next";
import { ApiServer } from "../../ApiServer/api";
import { SelectCategoryModal } from "../../reducer/delivery";
import { close, minus, plus } from "../images";
export default function CategoryDialog() {
  const { selectCategory, selectCategoryId } = useSelector(
    (state) => state.delivery
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  function closeModal() {
    dispatch(SelectCategoryModal());
  }

  return (
    <>
      <Transition appear show={selectCategory} as={Fragment}>
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
                <Dialog.Panel className="absolute bottom-0 w-full max-w-md transform overflow-hidden min-h-[50%] rounded-t-2xl tg-bg-color p-6 text-left align-middle shadow-xl transition-all z-[999]">
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
                      src="https://s3-alpha-sig.figma.com/img/0881/6f20/4fc2956e035299dfef8a5b7425404501?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Uzfl617lqepLXSTG5fzbSki8F838tV2k7yT7TfPA5nayTxexPfmNCpyFJKFzYc3CuiAzRx-m7sIZ41Zf8i1qQFFg4P9unEKZe7otKqWvXff2w-BbVwGrZbwhp435QXATa6q2uuNbysQ58YQW3SdmsNHRbQ7jjvff2Xqo8RLuKY~Y2gmWeUmVsrGRVKgzU91ylxGxqFM80i~ugheEegUi60SJW4bTag1rx8AyyF02MNouEQmdbtMI6mMIcXGMtWdwGkYPR80r-lV9QqD8cSwcWMVswRTsb-f9GA8MA3dVeydv4u55U0p-8mbXz9k91Ypu2gpZWOyhvFpxfK-PQDETHQ__"
                      alt=""
                    />
                    <h1 className="text-[20px] font-[500] text-[#000] mt-[22px]">
                      Yashil karam sho’rva
                    </h1>
                    <h2 className="text-[20px] font-[600] text-[#2E90FA] mt-[8px]">
                      34,000 so’m
                    </h2>
                    <p className="text-[16px] font-[400] mt-[12px] text-[#475467]">
                      Bu yashil karom (karam) va boshqa sabzavotlar bilan
                      tayyorlanadigan, O'rta Osiyo va xususan O'zbek oshxonasiga
                      xos bo'lgan engil va sog'lom sho'rva. Ushbu sho'rva
                      sog'liq uchun foydali bo'lib, xususan, sovuq kunlarda
                      tanani isitish va immunitetni oshirish uchun juda yaxshi
                      tanlovdir.
                    </p>
                    <div className="grid grid-cols-3 gap-[12px] mt-[18px]">
                      <div className="col-span-1 flex justify-between items-center bg-[#F2F4F7] py-[10px] rounded-[12px] px-[6px]">
                        <img src={minus} alt="" />
                        <h1 className="text-[16px] font-[600] text-[#2E90FA]">3</h1>
                        <img src={plus} alt="" />
                      </div>
                      <div className="col-span-2 bg-[#2E90FA] rounded-[12px] py-[10px] text-center text-[18px] font-[500] text-[#fff]">
                      34,000 so’m
                      </div>
                    </div>
                  </section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
