import React, { useEffect, useState } from "react";
import { check, info } from "../home/img";
import { useSelector } from "react-redux";
import empty from "./empty.svg";
import { useTranslation } from "react-i18next";
import LoadingC from "../loading/loader";
const tg = window.Telegram.WebApp;

export default function About() {
  const { placeData } = useSelector((state) => state.event);
  const [aboutData, setAboutData] = useState([]);
  const[loading,setLoading]=useState(true)
  const { t } = useTranslation();
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
    filterTrueOptions(placeData?.about?.details);
    setTimeout(() => {
      setLoading(false)
    }, 500);
  }, [placeData.about]);
  return (
    <main className="">
      {loading?(
        <LoadingC/>
      ):(
        <div>
      {(placeData.info) ? (
        <>
          <section className="relative mt-[24px] mx-[16px]">
            <h1 className="text-justify  text-[16px] font-400 ">{placeData.info}</h1>
          </section>
          {aboutData.length > 0 && (
            <>
              <div className={`hr w-full h-[1px] mb-[32px]`}></div>
              <section className="px-[16px]">
                <div className="w-full mt-[24px]">
                  {aboutData.map((item, idx) => (
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
            </>
          )}
        </>
      ) : (
        <div className="w-full flex flex-col justify-center items-center mt-[20px] gap-[16px]">
          <img src={empty} alt="" />
          <p className="text-[14px] font-[400]">{t("empty_place")}</p>
        </div>
      )}
    </div>
      )}
    </main>
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
