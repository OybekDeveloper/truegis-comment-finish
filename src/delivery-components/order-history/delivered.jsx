import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { back, date, location, money } from "../images";
const Delivered = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="bg-[#fff]">
        <section className="bg-[#fff] shadow-shadow-xs w-full flex items-center justify-between mb-[24px] py-[17px]">
          <img
            onClick={handleClose}
            className="cursor-pointer"
            src={back}
            alt=""
          />
          <h1 className="text-[20px] font-[500] texxt-[#000]">
            Buyurtma <span className="text-[#667085] ">#{id}</span>
          </h1>
          <div></div>
        </section>
        <section className="mt-[24px]">
          <h1 className="text-[20px] font-[500] texxt-[#000]">
            Ibroximbek Restorani
          </h1>
          <div className="flex justify-start gap-[8px] mt-[8px]">
            <img src={date} alt="" />
            <h1 className="text-[14px] font-[500] text-[#667085]">
              Yetkazilgan sana:{" "}
              <span className="text-[#475467]">04 Aprel 2024</span>
            </h1>
          </div>
        </section>
        <section className="check-info min-h-[400px] mt-[32px] px-[20px] py-[40px] gap-[20px] flex flex-col">
          <h1 className="text-[20px] font-[500] text-[#182230]">
            Buyurtma ma’lumotlari
          </h1>
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-[8px]">
              <h1 className="text-[14px] font-[400] text-[#2E90FA]">3X</h1>
              <p className="text-#[667085] text-[14px] font-[400]">
                Samarqand oshi
              </p>
            </div>
            <h1 className="text-[14px] font-[500] text-[#2E90FA]">
              162,000 so’m
            </h1>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-[8px]">
              <h1 className="text-[14px] font-[400] text-[#2E90FA]">3X</h1>
              <p className="text-#[667085] text-[14px] font-[400]">
                Samarqand oshi
              </p>
            </div>
            <h1 className="text-[14px] font-[500] text-[#2E90FA]">
              162,000 so’m
            </h1>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-[8px]">
              <h1 className="text-[14px] font-[400] text-[#2E90FA]">3X</h1>
              <p className="text-#[667085] text-[14px] font-[400]">
                Samarqand oshi
              </p>
            </div>
            <h1 className="text-[14px] font-[500] text-[#2E90FA]">
              162,000 so’m
            </h1>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-[8px]">
              <h1 className="text-[14px] font-[400] text-[#2E90FA]">3X</h1>
              <p className="text-#[667085] text-[14px] font-[400]">
                Samarqand oshi
              </p>
            </div>
            <h1 className="text-[14px] font-[500] text-[#2E90FA]">
              162,000 so’m
            </h1>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-[8px]">
              <h1 className="text-[14px] font-[400] text-[#2E90FA]">3X</h1>
              <p className="text-#[667085] text-[14px] font-[400]">
                Samarqand oshi
              </p>
            </div>
            <h1 className="text-[14px] font-[500] text-[#2E90FA]">
              162,000 so’m
            </h1>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-[#667085] text-[14px] font-[400]">
              Jami summa:
            </h1>
            <h2 className="text-[16px] font-[500] text-[#2E90FA]">
              285,000 so’m
            </h2>
          </div>
        </section>
        <section className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[8px]">
            <h1 className="text-[20px] font-[500] texxt-[#000]">
              Yetkazilgan manzil
              <div className="flex justify-start items-center gap-[8px]">
                <img src={location} alt="" />
                <h1 className="text-[16px] font-[500] text-[#667085]">
                  Maxtumquli ko’chasi, 7
                </h1>
              </div>
            </h1>
          </div>
          <div className="flex flex-col gap-[8px]">
            <h1 className="text-[20px] font-[500] texxt-[#000]">
              To’lov turi
              <div className="flex justify-start items-center gap-[8px]">
                <img src={money} alt="" />
                <h1 className="text-[16px] font-[500] text-[#667085]">
                  Naqd pul orqali to’langan
                </h1>
              </div>
            </h1>
          </div>
        </section>
      </div>
    </>
  );
};
export default Delivered;
