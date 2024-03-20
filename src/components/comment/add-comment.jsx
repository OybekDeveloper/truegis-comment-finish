import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import plusimg from "./imgplus.svg";
import { useNavigate } from "react-router-dom";
import "./comment.scss";
const imgs = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
];
const tg=window.Telegram.WebApp;

export default function AddComment() {
  const id = localStorage.getItem("id");
  const km = localStorage.getItem("km");
  const navigate = useNavigate();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };
  return (
    <main className="comment">
      <section className="px-[16px]">
        <h1 className="text-[24px] font-[500] mt-[16px]">Tenge bank</h1>
        <p className="text-[16px] font-[400] mt-[12px]">
          Parkent bank xizmatlari, Parkent, 66, 1-8 qavat, Toshkent
        </p>
        <div className="w-full flex justify-center items-center my-[32px]">
          <Rating
            name="size-large"
            value={value}
            onChange={handleChange}
            size="large"
            style={{ color: "#FAC515" }}
            emptyIcon={  <StarIcon style={{ opacity: 0.55,color:tg.themeParams.text_color}} fontSize="inherit" />}
          />
        </div>
      </section>
      <section className="px-[16px]">
        {imgs.length > 0 ? (
         <div className="overflow-x-scroll whitespace-nowrap comment-img">
         <div className="inline-flex justify-center items-center">
           <div className="cursor-pointer w-[96px] h-[96px] mr-[16px]  border-[1px] border-solid border-[#D0D5DD] rounded-[8px]">
             <img className="mx-auto mt-[32px] w-[32px] h-[32px]" src={plusimg} alt="" />
           </div>
         </div>
         
         {imgs.map((item) => (
           <div key={item.id} className="inline-flex justify-center items-center">
             <img className="rounded-[8px] mr-[16px] w-[96px] h-[96px] object-cover " src="https://s3-alpha-sig.figma.com/img/846f/5267/f91f9c16efda1587ffe0bc44bd39bb85?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PNbQ-wI4pO1YuriliDRfhmdT212ZmzTsmreL6jEAOcXPR6JWKTnHJOSpnelh-7qiCLCNMudIKet6Huw7bcKMkv9NtwpOaJFycsWtDsuA8mXFoE~hZIoV7LgrWw6W0-HGxOjs-~aH0BItD~Fk0CEBd-7Xd1Cz4KSAUOyJcbViTXHEDs1raHjjFJHvVbXPmbMK2zfHitCqfS-DCRVUMCg4-7-QMdFKDvxlgbH2PQNPzL1KjhfqHb7SofSYU~Mim7uEW2CRlmqt1TUiNx9SClvVnB4Nb5AYAfZ~Nrs08GpWEb7b8cRE1HKlrIoam~RmnxAUdoc3bcRp5yIrl~Nt1uNHGQ__" alt="" />
           </div>
         ))}
       </div>
       
        ) : (
          <button className="flex gap-[8px] justify-center items-center px-[16px] py-[12px] w-full border-[1px] border-solid border-[#D0D5DD] rounded-[8px]">
            <img src={plusimg} alt="" />
            <h1 className="text-[16px] font-[500] tg-button-text">
              Rasm qo’shish
            </h1>
          </button>
        )}
      </section>
      <hr className="w-full h-[1px]  mb-[24px] mt-[32px]" />
      <section className="px-[16px]">
        <p className="text-[18px] font-[500]">
          Joy haqida o’z fikringizni qoldiring
        </p>
        <textarea
          name="message"
          onChange={handleChange}
          id="message"
          rows="6"
          className={`mt-[24px] border-[1px] border-solid comment-input p-[10px] bg-transparent text-[16px] font-[400] input-form`}
          placeholder={"Sharh yozing"}
        ></textarea>
      </section>
      <div className="mx-auto fixed bottom-[10px] w-full flex justify-center items-center">
        <button
          onClick={() => navigate(`/${id}/${km}/comment`)}
          className="text-[17px] font-[500] text-[#fff] px-[14px] py-[10px] w-[94%] tg-button rounded-[8px]"
        >
          Yuborish
        </button>
      </div>
    </main>
  );
}
