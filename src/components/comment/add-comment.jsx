import React from "react";
import ReactStars from "react-rating-stars-component";
import plusimg from "./imgplus.svg";
import { useNavigate } from "react-router-dom";
export default function AddComment() {
    const id=localStorage.getItem("id")
    const km =localStorage.getItem('km')
    const navigate = useNavigate()
  return (
    <main>
      <section className="px-[16px]">
        <h1>Tenge bank</h1>
        <p>Parkent bank xizmatlari, Parkent, 66, 1-8 qavat, Toshkent</p>
        <ReactStars count={5} size={24} activeColor="#ffd700" />
      </section>
      <section className="px-[16px]">
        <button className="flex gap-[8px] justify-center items-center px-[16px] py-[12px] w-full border-[1px] border-solid border-[#D0D5DD] rounded-[8px]">
          <img src={plusimg} alt="" />
          <h1 className="text-[16px] font-[500] text-[#0A84FF]">
            Rasm qo’shish
          </h1>
        </button>
      </section>
      <hr className="w-full h-[1px] text-[#EAECF0] mb-[24px] mt-[32px]" />
      <section className="px-[16px]">
        <h1>Joy haqida o’z fikringizni qoldiring</h1>
        <textarea
          className="w-full mt-[24px] rounded-[8px] border-[1px] border-solid border-[#D0D5DD] px-[14px] py-[12px] focus:border-[#0A84FF]"
          name="message"
          id=""
          cols="30"
          rows="10"
          placeholder="Sharh yozing"
        ></textarea>
      </section>
      <div className="mx-auto fixed bottom-[10px] w-full flex justify-center items-center">
      <button onClick={()=>navigate(`/${id}/${km}/comment`)} className="text-[17px] font-[500] text-[#fff] px-[10px] py-[14px] w-[94%] bg-[#0A84FF] rounded-[8px]">
      Yuborish
      </button>
      </div>
    </main>
  );
}
