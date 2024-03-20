import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import empty from "./empty-comment.svg";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import './comment.scss'
const about = [
  // {
  //   id: 1,
  //   title: "Yetkazib berish",
  // },
  // {
  //   id: 2,
  //   title: "Karta orqali to’lov",
  // },
  // {
  //   id: 3,
  //   title: "Bepul Wi-Fi",
  // },
  // {
  //   id: 4,
  //   title: "Dessert",
  // },
  // {
  //   id: 5,
  //   title: "Kofe",
  // },
];
const tg=window.Telegram.WebApp;

export default function Comment() {
  const getInitials = (fullName) => {
    if (!fullName) return "";
    const words = fullName.split(" ");
    const initials = words.map((word) => word[0]);
    return initials.join("").toUpperCase();
  };

  return (
    <main className="">
      <section className="w-full flex justify-between px-[16px]">
        <div className="w-1/2 flex flex-col gap-2">
          <div className="w-full flex justify-center items-center gap-[12px]">
            <h1 className="text-[18px] font-[500]">5</h1>
            <ProgressBar
              className="w-full"
              completed={87}
              maxCompleted={100}
              bgColor="#FAC515"
              height="6px"
              animateOnRender={true}
              customLabel=" "
            />
          </div>
          <div className="flex justify-center items-center gap-[12px]">
            <h1 className="text-[18px] font-[500]">4</h1>
            <ProgressBar
              className="w-full"
              completed={91}
              maxCompleted={100}
              bgColor="#FAC515"
              height="6px"
              animateOnRender={true}
              customLabel=" "
            />
          </div>
          <div className="flex justify-center items-center gap-[12px]">
            <h1 className="text-[18px] font-[500]">3</h1>
            <ProgressBar
              className="w-full"
              completed={25}
              maxCompleted={100}
              bgColor="#FAC515"
              height="6px"
              animateOnRender={true}
              customLabel=" "
            />
          </div>
          <div className="flex justify-center items-center gap-[12px]">
            <h1 className="text-[18px] font-[500]">2</h1>
            <ProgressBar
              className="w-full"
              completed={59}
              maxCompleted={100}
              bgColor="#FAC515"
              height="6px"
              animateOnRender={true}
              customLabel=" "
            />
          </div>
          <div className="flex justify-center items-center gap-[12px]">
            <h1 className="text-[18px] font-[500]">1</h1>
            <ProgressBar
              className="w-full"
              completed={12}
              maxCompleted={100}
              bgColor="#FAC515"
              height="6px"
              animateOnRender={true}
              customLabel=" "
            />
          </div>
        </div>
        <div>
          <h1 className="font-[500] text-[30px]">4.0</h1>
          <Rating
            name="text-feedback"
            value={4}
            readOnly
            style={{ color: "#FAC515" }}
            emptyIcon={  <StarIcon style={{ opacity: 0.55,color:tg.themeParams.text_color}} fontSize="inherit" />}

          />  
        </div>
      </section>

      {about.length > 0 ? (
        <section className="px-[16px] w-full mt-[48px]">
          <h1 className="text-[18px] font-[500] mb-[12px]">Sharhlar</h1>
          <hr className="w-full h-[1px]  mb-[24px]" />
          <div className="w-full flex flex-col gap-[32px]">
          {about.map((item) => (
            <main key={item.id} className="">
              <div className="flex justify-start items-center gap-[12px]">
                <div className=" text-[16px] font-[600] flex items-center justify-center w-[40px] h-[40px] rounded-full border-[1px] border-solid border-[#dfe0e3] bg-[#f2f4f7] text-[#475467]">
                  {getInitials(item?.title)}
                </div>
                <h1 className="text-[16px] font-[500]">{item.title}</h1>
              </div>
              <div className="flex justify-between items-center mt-[24px]">
                <Rating
                  name="text-feedback"
                  value={4}
                  readOnly
                  style={{ color: "#FAC515" }}
                  emptyIcon={
                    <StarIcon
                      style={{
                        opacity: 0.55,
                        color: tg.themeParams.text_color,
                      }}
                      fontSize="inherit"
                    />
                  }
                />
                <p className="text-[14px] font-[400]">15.03.2024</p>
              </div>
              <h1 className="text-[16px] font-[400] mt-[16px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </h1>
              <hr className="w-full h-[1px] mt-[24px]" />
            </main>
          ))}
          </div>
        </section>
      ) : (
        <div className="w-full flex flex-col justify-center items-center mt-[80px] gap-[16px]">
          <img src={empty} alt="" />
          <p className="text-[14px] font-[400]">Sharhlar mavjud emas</p>
        </div>
      )}
    </main>
  );
}
