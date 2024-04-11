import React from "react";
import { back, trash } from "../images";

const Basket = () => {
  const handleClose=()=>{

  }
  return (
    <main>
      <section className="w-full flex items-center justify-between mb-[24px]">
        <img
          onClick={handleClose}
          className="cursor-pointer"
          src={back}
          alt=""
        />
        <h1 className="text-[20px] font-[500] texxt-[#000]">Savat</h1>
        <img src={trash} alt="" />
      </section>
    </main>
  );
};

export default Basket;
