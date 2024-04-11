import React from "react";
import { back } from "../images";
import { useNavigate } from "react-router-dom";
const OrderHisotry = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen">
      <section className="bg-[#fff] shadow-shadow-xs w-full flex items-center justify-between mb-[24px] py-[17px]">
        <img
          onClick={handleClose}
          className="cursor-pointer"
          src={back}
          alt=""
        />
        <h1 className="text-[20px] font-[500] texxt-[#000]">
          Buyurtmalar tarixi
        </h1>
        <div></div>
      </section>
      <section className="flex w-full flex-col mt-[24px] gap-[32px]">
        {[1, 2, 3, 4].map((item, idx) => (
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-[18px] font-[500] text-[#344054]">
                3x Samarqand oshi
              </h1>
              <p className="text-[#2E90FA] font-[400] text-[16px]">
                Yetkazilmoqda{" "}
              </p>
            </div>
            <h1 className="text-[#2E90FA] text-[18px] font-[500]">
              222,000 so’m
            </h1>
          </div>
        ))}
      </section>
    </div>
  );
};

export default OrderHisotry;
