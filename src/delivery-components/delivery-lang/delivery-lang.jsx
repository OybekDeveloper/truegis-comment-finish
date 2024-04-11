import React from "react";
import { back, eng, rus, uzb } from "../images";
import { OpenLangMenu } from "../../reducer/delivery";
import { useDispatch } from "react-redux";
const lang = [
  {
    id: 1,
    h1: "O’zbek tili",
    p: "Tanlash uchun bosing",
    icon: uzb,
    type: "uz",
  },
  {
    id: 1,
    h1: "Pусский язык",
    p: "Нажмите, чтобы выбрать",
    icon: rus,
    type: "ru",
  },
  {
    id: 1,
    h1: "English",
    p: "Click to select",
    icon: eng,
    type: "en",
  },
];

const DeliveryLang = () => {
  const dispatch = useDispatch();
  const handleOpenLang = () => {
    dispatch(OpenLangMenu());
  };
  return (
    <main className="w-full px-[16px] pt-[17px] max-w-[400px] mx-auto bg-[#FFF]">
      <section className="flex items-center justify-between">
        <img
          className="cursor-pointer"
          onClick={handleOpenLang}
          src={back}
          alt=""
        />
        <h1 className="text-[20px] font-[500] text-[#000]">Tilni tanlash</h1>
        <div></div>
      </section>
      <section className=" mt-[24px] flex flex-col gap-[20px]">
        {lang.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-start p-[16px] border-[1px] border-[#EAECF0] rounded-[12px]"
          >
            <div className="flex justify-start items-center gap-[12px]">
              <img src={item.icon} alt="dfd" />
              <div className="flex flex-col justify-start items-start">
                <h1 className="text-[16px] font-[500] text-[#344054]">
                  O’zbek tili
                </h1>
                <p className="text-[16px] font-[400] text-[#98A2B3]">
                  Tanlash uchun bosing
                </p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="default-radio-1"
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-full"
              />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default DeliveryLang;
