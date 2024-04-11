import React from "react";
import { back, minus, plus, trash } from "../images";
import { useNavigate } from "react-router-dom";
import { foods } from "../foods-image/foodsData";
const Basket = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };
  return (
    <main>
      <section className="bg-[#fff] shadow-shadow-xs w-full flex items-center justify-between mb-[24px] py-[17px]">
        <img
          onClick={handleClose}
          className="cursor-pointer"
          src={back}
          alt=""
        />
        <h1 className="text-[20px] font-[500] texxt-[#000]">Savat</h1>
        <img src={trash} alt="" />
      </section>
      <section className="flex flex-col gap-[24px]">
        {foods[0].props.map((item, idx) => (
          <div className="flex justify-between items-center" key={idx}>
            <div className="flex items-center justify-start gap-[16px]">
              <img
                className="w-[70px] h-[70px] object-cover rounded-[12px]"
                src={item.url}
                alt="dasf"
              />
              <div className="flex flex-col justify-start items-start">
                <h1 className="text-[18px] text-[#344054] font-[500]">
                  Chuchvara
                </h1>
                <p className="text-[16px] font-[500] text-[#2E90FA]">
                  26,000 so’m
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center p-[4px] gap-[16px] border-[1px] border-solid border-[#EAECF0] rounded-[8px]">
              <img src={minus} alt="" />
              <h1>1</h1>
              <img src={plus} alt="" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Basket;
