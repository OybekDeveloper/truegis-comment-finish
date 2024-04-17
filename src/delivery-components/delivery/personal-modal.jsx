import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import OTPInput, { ResendOTP } from "otp-input-react";
import {
  OpenAwayDate,
  OpenDeliveryMenu,
  SendOrderItem,
  openPersonalModal,
} from "../../reducer/delivery";
import { success } from "../images";
import { useNavigate } from "react-router-dom";
import close from "./close.svg";
import { Height } from "@mui/icons-material";
export default function PersonalModal() {
  const { openPersonal } = useSelector((state) => state.delivery);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [OTP, setOTP] = useState("");

  const [sendSms, setSendSms] = useState(false);

  function closeModal() {
    dispatch(openPersonalModal(false));
  }
  const handleEnd = () => {
    dispatch(openPersonalModal(false));
  };
  const renderButton = (buttonProps) => {
    return (
      <button {...buttonProps} className="mt-[10px] text-[16px] font-[400] text-[#475467]">
        {buttonProps.remainingTime !== 0
          ? `00:${
              buttonProps.remainingTime.toString().length > 1
                ? buttonProps.remainingTime
                : `0${buttonProps.remainingTime}`
            } dan so'ng qayta yuborish`
          : "Kod kelmadimi?<span className='text-[#2E90FA]'>  Qaytadan yuborish</span>"}
      </button>
    );
  };
  const renderTime = () => React.Fragment;
  return (
    <>
      <Transition appear show={openPersonal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[999]"
          onClose={() => {}}
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
                {sendSms ? (
                  <Dialog.Panel className="bg-[#fff] w-full max-w-md transform overflow-hidden rounded-2xl  p-6 text-left align-middle shadow-xl transition-all z-[999] flex flex-col gap-[20px]">
                    <Dialog.Title
                      as="div"
                      className="relative flex-col text-lg font-medium leading-6 flex justify-start items-start"
                    >
                      <div className="flex justify-end w-full">
                        sdafsdf
                        <img onClick={closeModal} src={close} alt="" />
                      </div>
                      <h1 className="text-[18px] font-[500] text-[#344054]">
                        Tasdiqlash kodi
                      </h1>
                      <p className="text-[#475467] text-[16px] font-[400] mt-[4px]">
                        +998(88) 000-333 raqaminga yuborilgan kodni kiriting{" "}
                      </p>
                    </Dialog.Title>
                    <div className="flex flex-col justify-start items-start gap-[6px]">
                      <>
                        <OTPInput
                          placeholder="****"
                          value={OTP}
                          onChange={setOTP}
                          autoFocus
                          inputStyles={{
                            border: "1px solid #D0D5DD",
                            height: "64px",
                            width: "64px",
                            borderRadius: "8px",
                            padding: "10px",
                            fontSize: "16px",
                            color: "#344054",
                          }}
                          OTPLength={4}
                          otpType="number"
                          disabled={false}
                        />
                        <ResendOTP
                          renderTime={renderTime}
                          renderButton={renderButton}
                          placeholder="dafdf"
                          onClick={() => console.log("Resend clicked")}
                        />
                      </>
                    </div>
                    <button className="bg-[#2E90FA] w-full rounded-[8px] flex justify-center items-center py-[8px] px-[16px] mt-[12px]">
                      <h1 className="text-[#fff] text-[18px] font-[500]">
                        Tasdiqlash{" "}
                      </h1>
                    </button>
                  </Dialog.Panel>
                ) : (
                  <Dialog.Panel className="bg-[#fff] w-full max-w-md transform overflow-hidden rounded-2xl  p-6 text-left align-middle shadow-xl transition-all z-[999] flex flex-col gap-[20px]">
                    <Dialog.Title
                      as="div"
                      className="relative flex-col text-lg font-medium leading-6 flex justify-start items-start"
                    >
                      <div className="w-full flex justify-end">
                        <img onClick={closeModal} src={close} alt="" />
                      </div>
                      <h1 className="text-[18px] font-[500] text-[#344054]">
                        Telefon raqamingizni kiriting{" "}
                      </h1>
                      <p className="text-[#475467] text-[16px] font-[400] mt-[4px]">
                        Kirish uchun telefon raqamingizni kiriting
                      </p>
                    </Dialog.Title>
                    <div className="flex flex-col justify-start items-start gap-[6px]">
                      <label className={"text-[14px] font-[500] text-[#344054]"} htmlFor="text">Telefon raqami</label>
                      <input
                        className="w-full border-[1px] border-[#EAECF0] border-solid rounded-[8px] outline-none text-[#344054] text-[14px] font-[400] px-[14px] py-[10px] "
                        type="text"
                        placeholder="+998(88) 000-3333"
                      />
                    </div>
                    <button
                      onClick={() => setSendSms(true)}
                      className="bg-[#2E90FA] w-full rounded-[8px] flex justify-center items-center py-[8px] px-[16px] mt-[12px]"
                    >
                      <h1 className="text-[#fff] text-[18px] font-[500]">
                        Davom etish
                      </h1>
                    </button>
                  </Dialog.Panel>
                )}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
