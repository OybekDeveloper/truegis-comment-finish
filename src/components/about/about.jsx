import React, { useEffect, useState } from "react";
import { check, info } from "../home/img";
import { useSelector } from "react-redux";
const tg = window.Telegram.WebApp;


export default function About() {
  const { placeData } = useSelector((state) => state.event);
  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    function filterTrueOptions(data) {
      const trueOptions = [];

      // Check if "Service options" exists in data and it is an object
      if (
        data &&
        typeof data === "object" &&
        data.hasOwnProperty("Service options")
      ) {
        const serviceOptions = data["Service options"];
        // Iterate over each key-value pair in serviceOptions
        for (const option in serviceOptions) {
          // Check if the value is true
          if (serviceOptions[option] === true) {
            trueOptions.push(option);
          }
        }
      }

      setAboutData(trueOptions);
    }
    filterTrueOptions(placeData.about.details);
  }, [placeData.about]);
  return (
    <div>
      {aboutData.length > 0 ? (
        <section className="px-[16px]">
          <div className="w-full mt-[24px]">
            {aboutData.map((item,idx) => (
              <button
                key={idx}
                className="mr-[6px] mt-[12px] inline-flex gap-[8px]  px-[10px] py-[6px]  justify-center items-center"
              >
                {CheskSvg(
                  tg.themeParams.button_color
                    ? tg.themeParams.button_color
                    : "#0A84FF"
                )}
                <p className="text-[14px] font-[500] gap-[8px]">{item}</p>
              </button>
            ))}
          </div>
        </section>
      ):(
        <h1 className="mt-[20px] text-[16px] font-[500] text-center">Joy haqida ma'lumotlar mavjud emas!</h1>
      )}
    </div>
  );
}
function CheskSvg(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M16.6663 5L7.49967 14.1667L3.33301 10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
