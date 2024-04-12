import React from "react";
import { back, minus, plus, trash } from "../images";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import './personal.scss'
const PersonalInfo = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/delivery/home');
  };
  return (
    <main className="h-screen">
      <section className="bg-[#fff]  shadow-shadow-xs w-full flex items-center justify-between mb-[24px] py-[17px]">
        <img
          onClick={handleClose}
          className="cursor-pointer"
          src={back}
          alt=""
        />
        <h1 className="text-[20px] font-[500] texxt-[#000]">
          Shaxsiy ma’lumotlar
        </h1>
        <div></div>
      </section>
      <section className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[16px]">
          <label
            htmlFor="text"
            className="text-[18px] font-[500] text-[#667085]"
          >
            Familiya va ismingiz
          </label>
          <input
            className="text-[#344054] text-[18px] font-[500] px-[14px] py-[10px] border-[1px] border-solid border-[#D0D5DD] rounded-[8px] w-full"
            type="text"
            placeholder=""
            value={"John Doe"}
          />
        </div>
        <div className="flex flex-col gap-[16px]">
          <label
            htmlFor="text"
            className="text-[18px] font-[500] text-[#667085]"
          >
            Telefon raqamingiz
          </label>
          <PhoneInput
          buttonClass="phone-btn"
            containerStyle={{
              width:'100%',
              height:'auto',
              borderRadius:'8px'
            }}
            buttonStyle={{
                borderTopLeftRadius:"8px",
                borderBottomLeftRadius:'8px',
                // overflow:'hidden'
            }}
            inputStyle={{
                height:'48px',
                width:'100%',
                paddingTop:'10px',
                paddingBottom:'10px',
                borderRadius:'8px',
                overflow:'hidden',
                fontSize:"18px",
                fontWeight:'500',
                color:"#344054",
            }}
            country={"uz"}
            onlyCountries={['uz','us','ru']}
            value="+998910800616"
            placeholder="+998 91 080 06 16"
            onChange={(phone) => console.log({ phone })}
          />
        </div>
      </section>
    </main>
  );
};

export default PersonalInfo;
