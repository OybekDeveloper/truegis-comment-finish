import React from "react";
import { back } from "../images";
import { useNavigate } from "react-router-dom";
import emptyorder from "./no-order.png";
const OrderHisotry = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/delivery/home");
  };

  const handleShowDelivered = () => {
    navigate(`/delivery/delivered/12`);
  };
  const handleShowBeDelivered = () => {
    navigate(`/delivery/be-delivered/12`);
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
        <h1 className="text-[20px] font-[500] text-[#000]">
          Buyurtmalar tarixi
        </h1>
        <div></div>
      </section>
      <section className="flex w-full flex-col mt-[24px] gap-[32px]">
        <div className="relative flex flex-col justify-center items-center gap-3">
          <div className="min-h-[425.5]">
            <img className="" src={emptyorder} alt="" />
          </div>
          <div className="flex justify-center items-center flex-col absolute bottom-[32px]">
            <h1 className="text-[20px] font-[500] text-[#000]">
              Buyurtmalar tarixi bo’sh
            </h1>
            <p className="text-[16px] font-[400] text-[#667085]">
              Siz hech narsa buyurtma bermagansiz
            </p>
          </div>
        </div>
        {/* {[1, 2, 3, 4].map((item, idx) => (
          <div key={idx} onClick={handleShowBeDelivered} className="flex justify-between items-center cursor-pointer">
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
        {[1, 2 ].map((item, idx) => (
          <div key={idx} onClick={handleShowDelivered} className="flex justify-between items-center cursor-pointer">
            <div>
              <h1 className="text-[18px] font-[500] text-[#344054]">
                3x Samarqand oshi
              </h1>
              <div>
                <h1 className="text-[16px] font-[400] text-[#17B26A]">
                Yetkazildi <span className="text-[#667085]">3 Aprel 2024</span>
                </h1>
              </div>
            </div>
            <h1 className="text-[#2E90FA] text-[18px] font-[500]">
              222,000 so’m
            </h1>
          </div>
        ))} */}
      </section>
    </div>
  );
};

export default OrderHisotry;
