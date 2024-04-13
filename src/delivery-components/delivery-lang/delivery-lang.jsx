import React, { useState } from "react";
import { back, eng, rus, uzb } from "../images";
import { OpenLangMenu } from "../../reducer/delivery";
import { useDispatch } from "react-redux";

const DeliveryLang = () => {
  const dispatch = useDispatch();
  const [lang, setLang] = useState([
    {
      id: 1,
      h1: "O’zbek tili",
      p: "Tanlash uchun bosing",
      icon: uzb,
      type: "uz",
      check: true
    },
    {
      id: 2,
      h1: "Pусский язык",
      p: "Нажмите, чтобы выбрать",
      icon: rus,
      type: "ru",
      check: false
    },
    {
      id: 3,
      h1: "English",
      p: "Click to select",
      icon: eng,
      type: "en",
      check: false
    }
  ]);

  const handleOpenLang = () => {
    dispatch(OpenLangMenu());
  };

  const handleCheck = (id) => {
    const updatedLang = lang.map((item) =>
      item.id === id ? { ...item, check: true } : { ...item, check: false }
    );
    setLang(updatedLang);
  };

  return (
    <main className="w-full max-w-[400px] mx-auto bg-[#FFF] h-screen">
      <section className="flex items-center justify-between py-[17px] shadow-shadow-xs w-full">
        <img
          className="cursor-pointer"
          onClick={handleOpenLang}
          src={back}
          alt=""
        />
        <h1 className="text-[20px] font-[500] text-[#000]">Tilni tanlash</h1>
        <div></div>
      </section>
      <section className="mt-[24px] flex flex-col gap-[20px]">
        {lang.map((item) => (
          <div
            onClick={() => handleCheck(item.id)}
            key={item.id}
            className={`${
              item.check
                ? "border-[2px] border-solid border-[#2E90FA]"
                : "border-[1px] border-[#EAECF0]"
            } flex justify-between items-start p-[16px] cursor-pointer  rounded-[12px] h-[90px]`}
          >
            <div className="flex justify-start items-center gap-[12px]">
              <img src={item.icon} alt={item.h1} />
              <div className="flex flex-col justify-start items-start">
                <h1 className="text-[16px] font-[500] text-[#344054]">
                  {item.h1}
                </h1>
                <p className="text-[16px] font-[400] text-[#98A2B3]">
                  {item.p}
                </p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <input
                id={`radio-${item.id}`}
                type="radio"
                // defaultChecked={item.check}
                checked={item.check}
                name="language"
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded-full"
              />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default DeliveryLang;
