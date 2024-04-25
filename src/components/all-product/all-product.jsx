import React, { useEffect, useState } from "react";
import {
  arrowRight,
  bot,
  facebook,
  info,
  instagram,
  star,
  telegram,
  twitter,
  yandex,
  youtube,
} from "../home/img";
import "./main.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MapAppSelector from "./map";
import { t } from "i18next";
import LoadingC from "../loading/loader";
import PlaceSearch from "./place-search";
import { ApiServer } from "../../ApiServer/api";
// import { View, Button, Linking, Platform } from "react-native";

const tg = window.Telegram.WebApp;
export default function AllProduct() {
  const navigate = useNavigate();
  const placeId = localStorage.getItem("placeId");
  const userId = localStorage.getItem("userId");
  const km = localStorage.getItem("km");
  const lat = localStorage.getItem("lat");
  const long = localStorage.getItem("long");
  const dispatch = useDispatch();
  const { delModal, placeData } = useSelector((state) => state.event);
  const [menuActive, setMenuActive] = useState(false);
  const [tableActive, setTableActive] = useState(false);
  const [aboutData, setAboutData] = useState([]);
  const [statusWork, setStatusWork] = useState(true);
  const [imageLength, setImageLength] = useState(0);
  const [distance, setDistance] = useState(0);
  const [yandex1, setYandex1] = useState("");
  const [yandexTime, setYandex1Time] = useState("");
  const [loading, setLoading] = useState(true);
  function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadiusKm = 6371;

    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(lat1)) *
        Math.cos(degreesToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadiusKm * c;
    return distance;
  }
  const workStatus = () => {
    const hours = new Date().getHours();
    const start = placeData?.work_start_time?.split(":")[0];
    const end = placeData?.work_end_time?.split(":")[0];
    if (hours >= +start && hours <= +end) {
      setStatusWork(true);
    } else if (+start === +end) {
      setStatusWork(true);
    } else {
      setStatusWork(false);
    }
  };
  const workData = () => {
    const finalData =
      placeData.work_start_time === placeData?.work_end_time
        ? `24 ${t("home_time")}`
        : placeData.work_start_time.split(":")[0] +
          ":" +
          placeData.work_start_time.split(":")[1] +
          " - " +
          placeData.work_end_time.split(":")[0] +
          ":" +
          placeData.work_end_time.split(":")[1];
    return finalData;
  };

  useEffect(() => {
    const body = document.querySelector(".home");
    if (menuActive && delModal) {
      body.classList.add("blur-effect");
    } else {
      body.classList.remove("blur-effect");
    }
    workStatus();
  }, [menuActive, delModal]);

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
      setAboutData(trueOptions ? trueOptions : []);
    }
    if (placeData.about) {
      filterTrueOptions(placeData.about.details);
    }
  }, [placeData.about]);

  useEffect(() => {
    workData();
    setTimeout(() => {
      setLoading(false);
    }, 500);
    if (placeData.images) {
      setImageLength(placeData.images.length);
    } else {
      setImageLength(0);
    }
    workStatus();
    const distance = calculateDistance(
      placeData.latitude,
      placeData.longitude,
      lat,
      long
    );
    setDistance(distance.toFixed(2));
    if ((lat, long, placeData)) {
      const fetchYandex = async () => {
        try {
          const response = await fetch(
            `https://taxi-routeinfo.taxi.yandex.net/taxi_info?rll=${long},${lat}~${placeData.longitude},${placeData.latitude}&clid=ak231124&apikey=SjFZnMpqqiBMsjOthnPlbZVOGvrTJkFAdArwsnr&class=business&req=yellowcarnumber`
          );

          const res = await response.json();
          setYandex1Time(res.time_text);
          setYandex1(
            res?.options[0]?.price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          );
        } catch (error) {
          console.log(error);
        }
      };
      fetchYandex();
    }
  }, [placeData]);

  return (
    <>
      {/* {loading ? (
        <LoadingC />
      ) : ( */}
      <main className="all-product">
        <section className="cursor-pointer flex flex-col justify-start items-start gap-[16px] my-[24px] px-[16px]">
          <h1 className="text-[15px] font-[500]">{t("adress")}</h1>
          <div className="flex  gap-[12px] justify-between w-full">
            <div className="flex justify-start items-center gap-[12px]">
              {LocationSvg(
                tg.themeParams.button_color
                  ? tg.themeParams.button_color
                  : "#1C93E3"
              )}
              <MapAppSelector
                latitude={placeData?.latitude}
                longitude={placeData?.longitude}
                text={placeData.street ? placeData.street : "Manzilni ko'rish"}
              />
            </div>
            <div className="w-[70px]">
              <p className=" text-end w-full text-[13px] font-[500]">{`${distance} km`}</p>
            </div>
          </div>
        </section>
        <div className="hr w-full h-[0.5px] mb-[32px]"></div>
        {/* Yandex price title */}
        <section
          onClick={() =>
            window.open(
              `https://3.redirect.appmetrica.yandex.com/route?start-lat=${lat}&start-lon=${long}&end-lat=${placeData.latitude}&end-lon=${placeData.longitude}&tariffClass=econom&ref=yoursiteru&appmetrica_tracking_id=1178268795219780156`
            )
          }
          className="cursor-pointer w-full flex-col flex mb-[20px] px-[16px] gap-[20px]"
        >
         <div className="flex justify-between items-center w-full">
         <div className="flex justify-start items-center gap-[12px] tg-button-text">
            <img className="w-[28px] h-[28px]" src={yandex} alt="yandex" />
            <h1 className="text-[15px] font-[500]">{yandex1} so'm</h1>
          </div>
          {LinkSvg2(
            tg.themeParams.text_color ? tg.themeParams.text_color : "#1C93E3"
          )}
         </div>
          <div className="flex justify-start items-center gap-[12px]">
          {CarSvg(
            tg.themeParams.text_color ? tg.themeParams.text_color : "#1C93E3"
          )}
          <h1 className="tg-button-text text-[16px] font-[600]">{yandexTime}</h1>
          </div>
        </section>
        <div className="hr w-full h-[0.5px] mb-[32px]"></div>
        {(placeData.phone || placeData.website) && (
          <>
            <section
              className={`flex flex-col justify-start items-start gap-[20px] mt-[24px] px-[16px]`}
            >
              <h1 className="font-[500] text-[15px] ">{t("contact_info")}</h1>
              <div className="flex flex-col gap-[25px] w-full">
                {placeData.phone && (
                  <div className="flex justify-start items-center gap-[12px]">
                    {PhoneSVG(
                      tg.themeParams.button_color
                        ? tg.themeParams.button_color
                        : "#1C93E3"
                    )}
                    <h1
                      className="text-[15px] font-[500] tg-button-text"
                      onClick={() => window.open(`tel:${placeData.phone}`)}
                    >
                      {placeData.phone}
                    </h1>
                  </div>
                )}
                {placeData.website && (
                  <a href={placeData.website} className="w-full">
                    <div className="flex justify-between w-full items-center gap-[12px]">
                      <div className="flex justify-start items-center gap-[16px]">
                        {LinkSvg(
                          tg.themeParams.button_color
                            ? tg.themeParams.button_color
                            : "#1C93E3"
                        )}
                        <h1 className="text-[15px] font-[500] tg-button-text">
                          {placeData.website.slice(8, 24)}
                        </h1>
                      </div>
                      {WebSvg(
                        tg.themeParams.button_color
                          ? tg.themeParams.button_color
                          : "#1C93E3"
                      )}
                    </div>
                  </a>
                )}
              </div>
            </section>
            <div className={`hr w-full h-[0.5px] mt-[24px] mb-[32px]`}></div>
          </>
        )}
        <section className="w-full flex flex-col justify-start px-[16px]">
          <h1 className="font-[500] text-[15px]">{t("social_info")}</h1>
          <div className="flex flex-row gap-[20px] pt-[20px]">
            <a
              href={placeData.telegram}
              className={`${
                placeData.telegram ? "opacity-1" : "opacity-[0.7] "
              } social-media`}
            >
              <img src={telegram} alt="" className="w-[48px] h-[48px]" />
            </a>
            <a
              href={placeData.telegram_bot}
              className={`${
                placeData.telegram_bot ? "opacity-1" : "opacity-[0.7]  "
              } social-media`}
            >
              <img src={bot} alt="" className="w-[38px] h-[38px]" />
            </a>
            <a
              href={placeData.instagram}
              className={`${
                placeData.instagram ? "opacity-1" : "opacity-[0.7]  "
              } social-media`}
            >
              <img src={instagram} alt="" className="w-[48px] h-[48px]" />
            </a>
            <a
              href={placeData.youtube}
              className={`${
                placeData.youtube ? "opacity-1" : "opacity-[0.7] "
              } social-media`}
            >
              <img src={youtube} alt="" className="w-[28px] h-[28px]" />
            </a>
            <a
              href={placeData.facebook}
              className={`${
                placeData.facebook ? "opacity-1" : "opacity-[0.7]  "
              } social-media`}
            >
              <img src={facebook} alt="" className="w-[16px] h-[48px]" />
            </a>
          </div>
        </section>
        <div className="hr w-full h-[0.5px] mt-[24px] mb-[32px]"></div>
        <section>
          {placeData.work_days &&
            placeData.work_end_time &&
            placeData.work_start_time && (
              <>
                <div className="relative flex justify-start items-start gap-[16px] mt-[24px] px-[16px]">
                  <div className="w-full flex flex-col gap-[12px]">
                    <article className="flex justify-between items-center w-full">
                      {placeData?.work_end_time && placeData.work_end_time && (
                        <div className="flex flex-col gap-[8px]">
                          <h1
                            className={`${
                              statusWork ? "text-[#4ECC5E]" : "text-red-500"
                            } text-[13px] font-[500]`}
                          >
                            {statusWork
                              ? `${t("status_true")}`
                              : `${t("status_false")}`}
                          </h1>
                          <p className="text-[15px] font-[400] ">
                            {t("work_time")}
                          </p>
                        </div>
                      )}
                      <div
                        onClick={() => setTableActive(!tableActive)}
                        className="cursor-pointer flex  items-center gap-[8px]"
                      >
                        {placeData.work_start_time ==
                        placeData.work_end_time ? (
                          <p className="text-[15px] font-[400] ">
                            24 {t("home_time")}
                          </p>
                        ) : (
                          <>
                            <p className="text-[15px] font-[400] ">
                              {placeData?.work_end_time.split(":")[0] +
                                ":" +
                                placeData?.work_end_time.split(":")[1]}{" "}
                              {t("open_close_info")}
                            </p>
                          </>
                        )}

                        {TableDown(
                          tg.themeParams.button_color
                            ? tg.themeParams.button_color
                            : "#0A84FF"
                        )}
                      </div>
                    </article>
                  </div>
                </div>
                <div
                  className={`table_content ${
                    tableActive ? "transition-height active mb-[24px]" : ""
                  } mt-[32px] flex flex-col gap-[16px] px-[16px]`}
                >
                  <div className="flex justify-between items-center">
                    <h1 className="text-[15px] font-[500] ">{t("monday")}</h1>
                    <p
                      className={`text-[15px] font-[500] tg-button-text opacity-[0.7]`}
                    >
                      {placeData?.work_days?.find((c) => +c == 1) ? (
                        workData()
                      ) : (
                        <span className="text-[#F04438] font-[500] text-[15px]">
                          Close
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h1 className="text-[15px] font-[500] ">{t("tuesday")}</h1>
                    <p
                      className={`text-[15px] font-[500] tg-button-text opacity-[0.7]`}
                    >
                      {placeData?.work_days?.find((c) => +c == 2) ? (
                        workData()
                      ) : (
                        <span className="text-[#F04438] font-[500] text-[15px]">
                          Close
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h1 className="text-[15px] font-[500] ">
                      {t("wednesday")}
                    </h1>
                    <p
                      className={`text-[15px] font-[500] tg-button-text opacity-[0.7]`}
                    >
                      {placeData?.work_days?.find((c) => +c == 3) ? (
                        workData()
                      ) : (
                        <span className="text-[#F04438] font-[500] text-[15px]">
                          Close
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h1 className="text-[15px] font-[500] ">{t("thursday")}</h1>
                    <p
                      className={`text-[15px] font-[500] tg-button-text opacity-[0.7]`}
                    >
                      {placeData?.work_days?.find((c) => +c == 4) ? (
                        workData()
                      ) : (
                        <span className="text-[#F04438] font-[500] text-[15px]">
                          Close
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h1 className="text-[15px] font-[500] ">{t("friday")}</h1>
                    <p
                      className={`text-[15px] font-[500] tg-button-text opacity-[0.7]`}
                    >
                      {placeData?.work_days?.find((c) => +c == 5) ? (
                        workData()
                      ) : (
                        <span className="text-[#F04438] font-[500] text-[15px]">
                          Close
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h1 className="text-[15px] font-[500] ">{t("saturday")}</h1>
                    <p
                      className={`text-[15px] font-[500] tg-button-text opacity-[0.7]`}
                    >
                      {placeData?.work_days?.find((c) => +c == 6) ? (
                        workData()
                      ) : (
                        <span className="text-[#F04438] font-[500] text-[15px]">
                          Close
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h1 className="text-[15px] font-[500]  ">{t("sunday")}</h1>
                    <p
                      className={`text-[15px] font-[500] tg-button-text opacity-[0.7]`}
                    >
                      {placeData?.work_days?.find((c) => +c == 0) ? (
                        workData()
                      ) : (
                        <span className="text-[#F04438] font-[500] text-[15px]">
                          Close
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div
                  className={`hr w-full h-[0.5px] mt-[24px] mb-[32px]`}
                ></div>
              </>
            )}
        </section>
        {aboutData.length > 0 && (
          <>
            <section className="px-[16px] mb-[32px]">
              <div className="flex justify-start items-start gap-[16px] mt-[24px]">
                <div className="flex flex-col gap-[12px] w-full">
                  <div
                    onClick={() =>
                      navigate(`/${placeId}/${userId}/${km}/about`)
                    }
                    className="cursor-pointer w-full flex justify-between items-center"
                  >
                    <h1 className="text-[15px] font-[500]">{t("li_4")}</h1>
                    {RightArrow(
                      tg.themeParams.button_color
                        ? tg.themeParams.button_color
                        : "#0A84FF"
                    )}
                  </div>
                  <div className="w-full">
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
                        <p className="text-[14px] font-[500] gap-[8px]">
                          {item}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <div className={`hr w-full h-[0.5px] mt-[24px] mb-[32px]`}></div>
          </>
        )}
        {imageLength > 0 && (
          <>
            <section
              className={`overflow-x-scroll whitespace-nowrap photo-slide px-[16px]`}
            >
              {placeData.images.slice(0, 3).map((item, idx) => (
                <img
                  key={idx}
                  className="inline-flex w-[90px] h-[100px] object-cover mr-[8px] rounded-[4px] "
                  src={item.image}
                  alt="dsfa"
                />
              ))}
              {imageLength > 0 && (
                <div
                  onClick={() => navigate(`/${placeId}/${userId}/${km}/photo`)}
                  className="inline-flex flex-col justify-center items-center opacity-[0.7] tg-button w-[90px] h-[100px] rounded-[4px] cursor-pointer"
                >
                  <img className="" src={arrowRight} alt="add" />
                  <h1 className="text-[12px] font-[400] text-[#fff]">
                    {t("all_photo_info")}
                  </h1>
                </div>
              )}
            </section>
            <div className={`hr w-full h-[0.5px] mb-[32px] mt-[24px]`}></div>
          </>
        )}
        <section>
          <PlaceSearch placeData={placeData} />
          <div className={`hr w-full h-[0.5px] mb-[32px] mt-[24px]`}></div>
        </section>
        {/* xabar qoldirish qismi  */}
        <a
          href="https://t.me/TrueGisSupport_bot"
          className="mx-[16px] border-[1px] border-solid border-[#EEE] flex items-center justify-start gap-[12px] px-[12px] py-[10px] rounded-[8px]"
        >
          <img src={info} alt="" />
          <p>{t("support")}</p>
        </a>
      </main>
      {/* )} */}
    </>
  );
}
function TableDown(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="#888888"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
function RightArrow(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M9 18L15 12L9 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function LocationSvg(color) {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.4808 24.5241C17.5865 21.5103 22 15.8 22 10.2483C22 7.55172 20.1692 2 13.5 2C6.83077 2 5 7.55172 5 10.2483C5 15.8 9.57692 21.669 12.5192 24.5241C12.6827 24.6828 12.9769 25 13.5 25C13.9904 25 14.3173 24.6828 14.4808 24.5241ZM16.4423 10.2483C16.4423 8.66207 15.1346 7.3931 13.5 7.3931C11.8654 7.3931 10.5577 8.66207 10.5577 10.2483C10.5577 11.8345 11.8654 13.1034 13.5 13.1034C15.1346 13.1034 16.4423 11.8345 16.4423 10.2483Z"
        fill={color}
      />
    </svg>
  );
}
function PhoneSVG(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
    >
      <path
        d="M23.8517 22.8428C23.8517 23.65 23.1968 23.8518 22.8693 23.8518C19.9949 23.8518 17.5585 23.3659 15.5008 22.5422C10.9675 20.7273 8.27204 17.2726 6.78022 13.7618C5.61637 11.0228 5.18506 8.2496 5.18506 6.19419C5.18506 5.38699 5.84003 5.18518 6.16751 5.18518H9.11488C9.90085 5.18518 10.0973 5.85785 10.0973 6.19419V10.5309C10.0973 11.8048 7.43519 13.794 6.78022 13.7618C8.27204 17.2726 10.9675 20.7273 15.5008 22.5422C16.6798 19.88 18.2845 19.279 18.9394 19.3113H22.8693C23.6552 19.3113 23.8517 19.984 23.8517 20.3203V22.8428Z"
        fill={tg.themeParams.bg_color}
      />
      <path
        d="M15.5008 22.5422C7.43072 19.3114 5.18506 10.8842 5.18506 6.19419C5.18506 5.38699 5.84003 5.18518 6.16751 5.18518H9.11488C9.90085 5.18518 10.0973 5.85785 10.0973 6.19419C10.0973 6.19419 10.0973 9.25699 10.0973 10.5309C10.0973 11.8048 7.43519 13.794 6.78022 13.7618M15.5008 22.5422C17.5585 23.3659 19.9949 23.8518 22.8693 23.8518C23.1968 23.8518 23.8517 23.65 23.8517 22.8428C23.8517 22.0356 23.8517 20.8248 23.8517 20.3203C23.8517 19.984 23.6552 19.3113 22.8693 19.3113C22.0833 19.3113 19.9219 19.3113 18.9394 19.3113C18.2845 19.279 16.6798 19.88 15.5008 22.5422Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}
function LinkSvg(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
    >
      <path
        d="M15.9168 12.0164L11.5124 16.4036M12.6714 8.09091L13.5987 7.10423C15.6121 5.0986 18.8766 5.0986 20.89 7.10423C22.9035 9.10986 22.9035 12.3616 20.89 14.3673L19.8575 15.3958M15.3288 19.9091L14.4015 20.8958C12.3881 22.9014 9.12364 22.9014 7.11019 20.8958C5.09673 18.8901 5.09674 15.6384 7.11019 13.6327L8.14267 12.6043"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function WebSvg(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
    >
      <path
        d="M11.5 22C12.8333 21.3333 15.5 18.3 15.5 11.5C15.5 4.7 12.8333 1.66667 11.5 1M11.5 22C10.1667 21.3333 7.5 18.3 7.5 11.5C7.5 4.7 10.1667 1.66667 11.5 1M11.5 22C15.8827 22 19.6382 19.3149 21.2112 15.5M11.5 22C7.11734 22 3.36182 19.3149 1.78878 15.5M11.5 1C15.8827 1 19.6382 3.68511 21.2112 7.5M11.5 1C7.11734 1 3.36182 3.68511 1.78878 7.5M21.2112 15.5C21.7196 14.2672 22 12.9163 22 11.5C22 10.3801 21.8247 9.30121 21.5 8.28918C21.414 8.02127 21.3176 7.75805 21.2112 7.5M21.2112 15.5H1.78878M1.78878 15.5C1.28042 14.2672 1 12.9163 1 11.5C1 10.3801 1.17532 9.30121 1.5 8.28918C1.58595 8.02127 1.68237 7.75805 1.78878 7.5M21.2112 7.5H1.78878"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}
function LinkSvg2(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <g clipPath="url(#clip0_894_2062)">
        <path
          d="M10 3.61859H0.883789V19.1163H16.3815V10"
          stroke={color}
          strokeWidth="1.5"
        />
        <path
          d="M8.17676 11.8233L19.1163 0.883759"
          stroke={color}
          strokeWidth="1.5"
        />
        <path
          d="M11.8232 0.883759H19.1162V8.17676"
          stroke={color}
          strokeWidth="1.5"
        />
      </g>
      <defs>
        <clipPath id="clip0_894_2062">
          <rect width="20" height="20" fill="#000" />
        </clipPath>
      </defs>
    </svg>
  );
}
function CarSvg(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill={color}
    >
      <path
        d="M21.8333 11.8085C22 11.8085 23 11.1957 23 10.7872C23 10.3787 22.2222 10.2766 21.8333 10.2766C21.6667 10.2766 21.0928 10.1169 20.8333 9.59574C21 10.9574 19.9733 11.4681 19.3333 11.4681C20.3066 11.4681 21.6667 11.4681 21.8333 11.8085Z"
        fill="#1C93E3"
      />
      <path
        d="M4.16667 11.8085C4 11.8085 3 11.1957 3 10.7872C3 10.3787 3.77778 10.2766 4.16667 10.2766C4.33333 10.2766 4.90722 10.1169 5.16667 9.59574C5 10.9574 6.0267 11.4681 6.66667 11.4681C5.69336 11.4681 4.33333 11.4681 4.16667 11.8085Z"
        fill="#1C93E3"
      />
      <path
        d="M8 15.383C8 15.853 7.70152 16.234 7.33333 16.234C6.96514 16.234 6.66667 15.853 6.66667 15.383C6.66667 14.9129 6.96514 14.5319 7.33333 14.5319C7.70152 14.5319 8 14.9129 8 15.383Z"
        fill="#1C93E3"
      />
      <path
        d="M19.3333 15.383C19.3333 15.853 19.0349 16.234 18.6667 16.234C18.2985 16.234 18 15.853 18 15.383C18 14.9129 18.2985 14.5319 18.6667 14.5319C19.0349 14.5319 19.3333 14.9129 19.3333 15.383Z"
        fill="#1C93E3"
      />
      <path
        d="M21.8333 11.8085L21.2495 12.0943L21.2956 12.1884L21.3689 12.2633L21.8333 11.8085ZM20.8333 9.59574L21.4152 9.30607C21.4085 9.29263 21.4014 9.27943 21.3938 9.26649L20.8333 9.59574ZM18.6667 5.68085L19.2445 5.38309L19.2209 5.33747L19.1906 5.29611L18.6667 5.68085ZM4.16667 11.8085L4.6311 12.2633L4.70439 12.1884L4.75046 12.0943L4.16667 11.8085ZM5.16667 9.59574L4.62237 9.24044L4.60167 9.27216L4.58478 9.30607L5.16667 9.59574ZM7.33333 5.68085L6.80943 5.29611L6.77906 5.33747L6.75555 5.38309L7.33333 5.68085ZM21.6833 19.2979C21.6833 19.4267 21.6134 19.7072 21.4147 19.9488C21.2367 20.1652 20.9574 20.35 20.5 20.35V21.65C21.3759 21.65 22.0133 21.2675 22.4187 20.7746C22.8033 20.307 22.9833 19.7364 22.9833 19.2979H21.6833ZM20.5 20.35C20.1665 20.35 19.7267 20.2888 19.3964 20.137C19.0792 19.9913 18.9833 19.8321 18.9833 19.6383H17.6833C17.6833 20.5339 18.2819 21.0556 18.8536 21.3183C19.4122 21.575 20.0557 21.65 20.5 21.65V20.35ZM18.9833 19.6383C18.9833 18.9776 18.3361 18.6479 17.6667 18.6479V19.9479C17.8485 19.9479 17.8686 19.9874 17.824 19.9557C17.7794 19.9241 17.6833 19.8236 17.6833 19.6383H18.9833ZM22.9833 19.2979V14.1915H21.6833V19.2979H22.9833ZM22.9833 14.1915C22.9833 13.8837 22.9842 13.373 22.9148 12.8688C22.8501 12.3993 22.706 11.7707 22.2978 11.3538L21.3689 12.2633C21.4606 12.3569 21.5666 12.6078 21.6269 13.0461C21.6825 13.4497 21.6833 13.8752 21.6833 14.1915H22.9833ZM21.8333 12.4585C21.9934 12.4585 22.1322 12.4013 22.1755 12.3838C22.2486 12.3541 22.3245 12.3166 22.3969 12.2772C22.5427 12.1977 22.7102 12.0909 22.8706 11.97C23.0281 11.8512 23.1999 11.7029 23.3392 11.5368C23.458 11.3952 23.65 11.1287 23.65 10.7872H22.35C22.35 10.7079 22.3733 10.6619 22.3743 10.6599C22.3761 10.6561 22.3693 10.6702 22.3431 10.7015C22.2897 10.7652 22.2011 10.8466 22.0878 10.9321C21.9773 11.0154 21.8635 11.0874 21.775 11.1356C21.7302 11.16 21.7006 11.1735 21.6871 11.179C21.6802 11.1818 21.6852 11.1793 21.6996 11.1753C21.7062 11.1735 21.7579 11.1585 21.8333 11.1585V12.4585ZM23.65 10.7872C23.65 10.4486 23.4787 10.1971 23.2929 10.0395C23.121 9.89358 22.9198 9.80982 22.7579 9.75878C22.4302 9.65551 22.067 9.6266 21.8333 9.6266V10.9266C21.9885 10.9266 22.2087 10.9487 22.3671 10.9987C22.4482 11.0242 22.4658 11.0426 22.4519 11.0307C22.4241 11.0072 22.35 10.9216 22.35 10.7872H23.65ZM21.8333 9.6266C21.8734 9.6266 21.8699 9.63216 21.821 9.61828C21.7813 9.60699 21.7292 9.58756 21.6743 9.55825C21.5627 9.49865 21.4696 9.41531 21.4152 9.30607L20.2515 9.88542C20.4565 10.2973 20.78 10.5544 21.0619 10.705C21.3263 10.8461 21.6166 10.9266 21.8333 10.9266V9.6266ZM21.3938 9.26649C20.8982 8.42295 19.7932 6.4479 19.2445 5.38309L18.0889 5.97861C18.6512 7.06983 19.7685 9.06641 20.2729 9.925L21.3938 9.26649ZM19.1906 5.29611C18.9023 4.90351 18.1416 4.35 17 4.35V5.65C17.3585 5.65 17.6331 5.73658 17.8264 5.83481C17.924 5.88441 18.0005 5.93681 18.0559 5.98208C18.0836 6.00465 18.1048 6.02451 18.12 6.04013C18.1276 6.04788 18.1332 6.05417 18.1372 6.05879C18.1412 6.06347 18.1429 6.0658 18.1428 6.06559L19.1906 5.29611ZM20.1881 9.67471C20.248 10.1634 20.096 10.4224 19.9398 10.5697C19.7565 10.7426 19.5046 10.8181 19.3333 10.8181V12.1181C19.802 12.1181 20.3834 11.9383 20.8318 11.5154C21.3073 11.067 21.5854 10.3898 21.4785 9.51678L20.1881 9.67471ZM19.3333 12.1181C19.8275 12.1181 20.3803 12.1186 20.8287 12.1581C21.0552 12.1781 21.2228 12.2056 21.3293 12.2363C21.3825 12.2516 21.3962 12.261 21.3869 12.2555C21.3812 12.2521 21.3049 12.2074 21.2495 12.0943L22.4171 11.5227C22.3201 11.3245 22.1649 11.2053 22.0491 11.1368C21.9297 11.0661 21.8022 11.0197 21.6892 10.9871C21.4634 10.9221 21.1989 10.8857 20.9429 10.8632C20.4263 10.8176 19.8125 10.8181 19.3333 10.8181V12.1181ZM19.3333 12.1181C19.3335 12.1181 19.3336 12.1181 19.3337 12.1181C19.3338 12.1181 19.3339 12.1181 19.334 12.1181C19.3341 12.1181 19.3343 12.1181 19.3344 12.1181C19.3345 12.1181 19.3346 12.1181 19.3347 12.1181C19.3348 12.1181 19.3349 12.1181 19.335 12.1181C19.3352 12.1181 19.3353 12.1181 19.3354 12.1181C19.3355 12.1181 19.3356 12.1181 19.3357 12.1181C19.3358 12.1181 19.3359 12.1181 19.336 12.1181C19.3361 12.1181 19.3362 12.1181 19.3364 12.1181C19.3365 12.1181 19.3366 12.1181 19.3367 12.1181C19.3368 12.1181 19.3369 12.1181 19.337 12.1181C19.3371 12.1181 19.3372 12.1181 19.3373 12.1181C19.3374 12.1181 19.3375 12.1181 19.3376 12.1181C19.3377 12.1181 19.3378 12.1181 19.3379 12.1181C19.338 12.1181 19.3381 12.1181 19.3382 12.1181C19.3383 12.1181 19.3384 12.1181 19.3385 12.1181C19.3386 12.1181 19.3387 12.1181 19.3388 12.1181C19.3389 12.1181 19.339 12.1181 19.3391 12.1181C19.3392 12.1181 19.3393 12.1181 19.3394 12.1181C19.3395 12.1181 19.3396 12.1181 19.3397 12.1181C19.3398 12.1181 19.3399 12.1181 19.34 12.1181C19.3401 12.1181 19.3402 12.1181 19.3403 12.1181C19.3404 12.1181 19.3404 12.1181 19.3405 12.1181C19.3406 12.1181 19.3407 12.1181 19.3408 12.1181C19.3409 12.1181 19.341 12.1181 19.3411 12.1181C19.3412 12.1181 19.3413 12.1181 19.3414 12.1181C19.3414 12.1181 19.3415 12.1181 19.3416 12.1181C19.3417 12.1181 19.3418 12.1181 19.3419 12.1181C19.342 12.1181 19.3421 12.1181 19.3421 12.1181C19.3422 12.1181 19.3423 12.1181 19.3424 12.1181C19.3425 12.1181 19.3426 12.1181 19.3427 12.1181C19.3427 12.1181 19.3428 12.1181 19.3429 12.1181C19.343 12.1181 19.3431 12.1181 19.3432 12.1181C19.3432 12.1181 19.3433 12.1181 19.3434 12.1181C19.3435 12.1181 19.3436 12.1181 19.3436 12.1181C19.3437 12.1181 19.3438 12.1181 19.3439 12.1181C19.344 12.1181 19.344 12.1181 19.3441 12.1181C19.3442 12.1181 19.3443 12.1181 19.3443 12.1181C19.3444 12.1181 19.3445 12.1181 19.3446 12.1181C19.3447 12.1181 19.3447 12.1181 19.3448 12.1181C19.3449 12.1181 19.345 12.1181 19.345 12.1181C19.3451 12.1181 19.3452 12.1181 19.3452 12.1181C19.3453 12.1181 19.3454 12.1181 19.3455 12.1181C19.3455 12.1181 19.3456 12.1181 19.3457 12.1181C19.3458 12.1181 19.3458 12.1181 19.3459 12.1181C19.346 12.1181 19.346 12.1181 19.3461 12.1181C19.3462 12.1181 19.3462 12.1181 19.3463 12.1181C19.3464 12.1181 19.3465 12.1181 19.3465 12.1181C19.3466 12.1181 19.3467 12.1181 19.3467 12.1181C19.3468 12.1181 19.3469 12.1181 19.3469 12.1181C19.347 12.1181 19.3471 12.1181 19.3471 12.1181C19.3472 12.1181 19.3472 12.1181 19.3473 12.1181C19.3474 12.1181 19.3474 12.1181 19.3475 12.1181C19.3476 12.1181 19.3476 12.1181 19.3477 12.1181C19.3478 12.1181 19.3478 12.1181 19.3479 12.1181C19.3479 12.1181 19.348 12.1181 19.3481 12.1181C19.3481 12.1181 19.3482 12.1181 19.3482 12.1181C19.3483 12.1181 19.3484 12.1181 19.3484 12.1181C19.3485 12.1181 19.3485 12.1181 19.3486 12.1181C19.3486 12.1181 19.3487 12.1181 19.3488 12.1181C19.3488 12.1181 19.3489 12.1181 19.3489 12.1181C19.349 12.1181 19.349 12.1181 19.3491 12.1181C19.3492 12.1181 19.3492 12.1181 19.3493 12.1181C19.3493 12.1181 19.3494 12.1181 19.3494 12.1181C19.3495 12.1181 19.3495 12.1181 19.3496 12.1181C19.3496 12.1181 19.3497 12.1181 19.3497 12.1181C19.3498 12.1181 19.3498 12.1181 19.3499 12.1181C19.3499 12.1181 19.35 12.1181 19.35 12.1181C19.3501 12.1181 19.3501 12.1181 19.3502 12.1181C19.3502 12.1181 19.3503 12.1181 19.3503 12.1181C19.3504 12.1181 19.3504 12.1181 19.3505 12.1181C19.3505 12.1181 19.3506 12.1181 19.3506 12.1181C19.3507 12.1181 19.3507 12.1181 19.3508 12.1181C19.3508 12.1181 19.3508 12.1181 19.3509 12.1181C19.3509 12.1181 19.351 12.1181 19.351 12.1181C19.3511 12.1181 19.3511 12.1181 19.3512 12.1181C19.3512 12.1181 19.3512 12.1181 19.3513 12.1181C19.3513 12.1181 19.3514 12.1181 19.3514 12.1181C19.3515 12.1181 19.3515 12.1181 19.3515 12.1181C19.3516 12.1181 19.3516 12.1181 19.3517 12.1181C19.3517 12.1181 19.3517 12.1181 19.3518 12.1181C19.3518 12.1181 19.3519 12.1181 19.3519 12.1181C19.3519 12.1181 19.352 12.1181 19.352 12.1181C19.352 12.1181 19.3521 12.1181 19.3521 12.1181C19.3522 12.1181 19.3522 12.1181 19.3522 12.1181C19.3523 12.1181 19.3523 12.1181 19.3523 12.1181C19.3524 12.1181 19.3524 12.1181 19.3524 12.1181C19.3525 12.1181 19.3525 12.1181 19.3525 12.1181C19.3526 12.1181 19.3526 12.1181 19.3526 12.1181C19.3527 12.1181 19.3527 12.1181 19.3527 12.1181C19.3528 12.1181 19.3528 12.1181 19.3528 12.1181C19.3529 12.1181 19.3529 12.1181 19.3529 12.1181C19.353 12.1181 19.353 12.1181 19.353 12.1181C19.353 12.1181 19.3531 12.1181 19.3531 12.1181C19.3531 12.1181 19.3532 12.1181 19.3532 12.1181C19.3532 12.1181 19.3532 12.1181 19.3533 12.1181C19.3533 12.1181 19.3533 12.1181 19.3534 12.1181C19.3534 12.1181 19.3534 12.1181 19.3534 12.1181C19.3535 12.1181 19.3535 12.1181 19.3535 12.1181C19.3535 12.1181 19.3536 12.1181 19.3536 12.1181C19.3536 12.1181 19.3536 12.1181 19.3537 12.1181C19.3537 12.1181 19.3537 12.1181 19.3537 12.1181C19.3537 12.1181 19.3538 12.1181 19.3538 12.1181C19.3538 12.1181 19.3538 12.1181 19.3539 12.1181C19.3539 12.1181 19.3539 12.1181 19.3539 12.1181C19.3539 12.1181 19.354 12.1181 19.354 12.1181C19.354 12.1181 19.354 12.1181 19.354 12.1181C19.3541 12.1181 19.3541 12.1181 19.3541 12.1181C19.3541 12.1181 19.3541 12.1181 19.3542 12.1181C19.3542 12.1181 19.3542 12.1181 19.3542 12.1181C19.3542 12.1181 19.3542 12.1181 19.3543 12.1181C19.3543 12.1181 19.3543 12.1181 19.3543 12.1181C19.3543 12.1181 19.3543 12.1181 19.3544 12.1181C19.3544 12.1181 19.3544 12.1181 19.3544 12.1181C19.3544 12.1181 19.3544 12.1181 19.3544 12.1181C19.3545 12.1181 19.3545 12.1181 19.3545 12.1181C19.3545 12.1181 19.3545 12.1181 19.3545 12.1181C19.3545 12.1181 19.3546 12.1181 19.3546 12.1181C19.3546 12.1181 19.3546 12.1181 19.3546 12.1181C19.3546 12.1181 19.3546 12.1181 19.3546 12.1181C19.3546 12.1181 19.3547 12.1181 19.3547 12.1181C19.3547 12.1181 19.3547 12.1181 19.3547 12.1181C19.3547 12.1181 19.3547 12.1181 19.3547 12.1181C19.3547 12.1181 19.3547 12.1181 19.3547 12.1181C19.3548 12.1181 19.3548 12.1181 19.3548 12.1181C19.3548 12.1181 19.3548 12.1181 19.3548 12.1181C19.3548 12.1181 19.3548 12.1181 19.3548 12.1181C19.3548 12.1181 19.3548 12.1181 19.3548 12.1181C19.3548 12.1181 19.3548 12.1181 19.3548 12.1181C19.3548 12.1181 19.3549 12.1181 19.3549 12.1181C19.3549 12.1181 19.3549 12.1181 19.3549 12.1181C19.3549 12.1181 19.3549 12.1181 19.3549 12.1181C19.3549 12.1181 19.3549 12.1181 19.3549 12.1181C19.3549 12.1181 19.3549 12.1181 19.3549 12.1181C19.3549 12.1181 19.3549 12.1181 19.3549 12.1181C19.3549 12.1181 19.3549 12.1181 19.3549 12.1181C19.3549 12.1181 19.3549 12.1181 19.3549 12.1181C19.3549 11.4681 19.3549 10.8181 19.3549 10.8181H19.3549C19.3549 10.8181 19.3549 10.8181 19.3549 10.8181C19.3549 10.8181 19.3549 10.8181 19.3549 10.8181C19.3549 10.8181 19.3549 10.8181 19.3549 10.8181C19.3549 10.8181 19.3549 10.8181 19.3549 10.8181C19.3549 10.8181 19.3549 10.8181 19.3549 10.8181C19.3549 10.8181 19.3549 10.8181 19.3549 10.8181C19.3549 10.8181 19.3548 10.8181 19.3548 10.8181C19.3548 10.8181 19.3548 10.8181 19.3548 10.8181C19.3548 10.8181 19.3548 10.8181 19.3548 10.8181C19.3548 10.8181 19.3548 10.8181 19.3548 10.8181C19.3548 10.8181 19.3548 10.8181 19.3548 10.8181C19.3548 10.8181 19.3548 10.8181 19.3547 10.8181C19.3547 10.8181 19.3547 10.8181 19.3547 10.8181C19.3547 10.8181 19.3547 10.8181 19.3547 10.8181C19.3547 10.8181 19.3547 10.8181 19.3547 10.8181C19.3547 10.8181 19.3547 10.8181 19.3546 10.8181C19.3546 10.8181 19.3546 10.8181 19.3546 10.8181C19.3546 10.8181 19.3546 10.8181 19.3546 10.8181C19.3546 10.8181 19.3546 10.8181 19.3545 10.8181C19.3545 10.8181 19.3545 10.8181 19.3545 10.8181C19.3545 10.8181 19.3545 10.8181 19.3545 10.8181C19.3545 10.8181 19.3545 10.8181 19.3544 10.8181C19.3544 10.8181 19.3544 10.8181 19.3544 10.8181C19.3544 10.8181 19.3544 10.8181 19.3544 10.8181C19.3543 10.8181 19.3543 10.8181 19.3543 10.8181C19.3543 10.8181 19.3543 10.8181 19.3543 10.8181C19.3543 10.8181 19.3542 10.8181 19.3542 10.8181C19.3542 10.8181 19.3542 10.8181 19.3542 10.8181C19.3542 10.8181 19.3542 10.8181 19.3541 10.8181C19.3541 10.8181 19.3541 10.8181 19.3541 10.8181C19.3541 10.8181 19.3541 10.8181 19.354 10.8181C19.354 10.8181 19.354 10.8181 19.354 10.8181C19.354 10.8181 19.3539 10.8181 19.3539 10.8181C19.3539 10.8181 19.3539 10.8181 19.3539 10.8181C19.3539 10.8181 19.3538 10.8181 19.3538 10.8181C19.3538 10.8181 19.3538 10.8181 19.3538 10.8181C19.3537 10.8181 19.3537 10.8181 19.3537 10.8181C19.3537 10.8181 19.3537 10.8181 19.3536 10.8181C19.3536 10.8181 19.3536 10.8181 19.3536 10.8181C19.3536 10.8181 19.3535 10.8181 19.3535 10.8181C19.3535 10.8181 19.3535 10.8181 19.3535 10.8181C19.3534 10.8181 19.3534 10.8181 19.3534 10.8181C19.3534 10.8181 19.3533 10.8181 19.3533 10.8181C19.3533 10.8181 19.3533 10.8181 19.3533 10.8181C19.3532 10.8181 19.3532 10.8181 19.3532 10.8181C19.3532 10.8181 19.3531 10.8181 19.3531 10.8181C19.3531 10.8181 19.3531 10.8181 19.353 10.8181C19.353 10.8181 19.353 10.8181 19.353 10.8181C19.353 10.8181 19.3529 10.8181 19.3529 10.8181C19.3529 10.8181 19.3529 10.8181 19.3528 10.8181C19.3528 10.8181 19.3528 10.8181 19.3528 10.8181C19.3527 10.8181 19.3527 10.8181 19.3527 10.8181C19.3526 10.8181 19.3526 10.8181 19.3526 10.8181C19.3526 10.8181 19.3525 10.8181 19.3525 10.8181C19.3525 10.8181 19.3525 10.8181 19.3524 10.8181C19.3524 10.8181 19.3524 10.8181 19.3524 10.8181C19.3523 10.8181 19.3523 10.8181 19.3523 10.8181C19.3522 10.8181 19.3522 10.8181 19.3522 10.8181C19.3522 10.8181 19.3521 10.8181 19.3521 10.8181C19.3521 10.8181 19.352 10.8181 19.352 10.8181C19.352 10.8181 19.352 10.8181 19.3519 10.8181C19.3519 10.8181 19.3519 10.8181 19.3518 10.8181C19.3518 10.8181 19.3518 10.8181 19.3518 10.8181C19.3517 10.8181 19.3517 10.8181 19.3517 10.8181C19.3516 10.8181 19.3516 10.8181 19.3516 10.8181C19.3515 10.8181 19.3515 10.8181 19.3515 10.8181C19.3514 10.8181 19.3514 10.8181 19.3514 10.8181C19.3514 10.8181 19.3513 10.8181 19.3513 10.8181C19.3513 10.8181 19.3512 10.8181 19.3512 10.8181C19.3512 10.8181 19.3511 10.8181 19.3511 10.8181C19.3511 10.8181 19.351 10.8181 19.351 10.8181C19.351 10.8181 19.3509 10.8181 19.3509 10.8181C19.3509 10.8181 19.3508 10.8181 19.3508 10.8181C19.3508 10.8181 19.3507 10.8181 19.3507 10.8181C19.3507 10.8181 19.3506 10.8181 19.3506 10.8181C19.3506 10.8181 19.3505 10.8181 19.3505 10.8181C19.3505 10.8181 19.3504 10.8181 19.3504 10.8181C19.3504 10.8181 19.3503 10.8181 19.3503 10.8181C19.3503 10.8181 19.3502 10.8181 19.3502 10.8181C19.3502 10.8181 19.3501 10.8181 19.3501 10.8181C19.3501 10.8181 19.35 10.8181 19.35 10.8181C19.35 10.8181 19.3499 10.8181 19.3499 10.8181C19.3499 10.8181 19.3498 10.8181 19.3498 10.8181C19.3497 10.8181 19.3497 10.8181 19.3497 10.8181C19.3496 10.8181 19.3496 10.8181 19.3496 10.8181C19.3495 10.8181 19.3495 10.8181 19.3495 10.8181C19.3494 10.8181 19.3494 10.8181 19.3493 10.8181C19.3493 10.8181 19.3493 10.8181 19.3492 10.8181C19.3492 10.8181 19.3492 10.8181 19.3491 10.8181C19.3491 10.8181 19.3491 10.8181 19.349 10.8181C19.349 10.8181 19.3489 10.8181 19.3489 10.8181C19.3489 10.8181 19.3488 10.8181 19.3488 10.8181C19.3487 10.8181 19.3487 10.8181 19.3487 10.8181C19.3486 10.8181 19.3486 10.8181 19.3486 10.8181C19.3485 10.8181 19.3485 10.8181 19.3484 10.8181C19.3484 10.8181 19.3484 10.8181 19.3483 10.8181C19.3483 10.8181 19.3482 10.8181 19.3482 10.8181C19.3482 10.8181 19.3481 10.8181 19.3481 10.8181C19.3481 10.8181 19.348 10.8181 19.348 10.8181C19.3479 10.8181 19.3479 10.8181 19.3479 10.8181C19.3478 10.8181 19.3478 10.8181 19.3477 10.8181C19.3477 10.8181 19.3477 10.8181 19.3476 10.8181C19.3476 10.8181 19.3475 10.8181 19.3475 10.8181C19.3475 10.8181 19.3474 10.8181 19.3474 10.8181C19.3473 10.8181 19.3473 10.8181 19.3473 10.8181C19.3472 10.8181 19.3472 10.8181 19.3471 10.8181C19.3471 10.8181 19.3471 10.8181 19.347 10.8181C19.347 10.8181 19.3469 10.8181 19.3469 10.8181C19.3468 10.8181 19.3468 10.8181 19.3468 10.8181C19.3467 10.8181 19.3467 10.8181 19.3466 10.8181C19.3466 10.8181 19.3466 10.8181 19.3465 10.8181C19.3465 10.8181 19.3464 10.8181 19.3464 10.8181C19.3464 10.8181 19.3463 10.8181 19.3463 10.8181C19.3462 10.8181 19.3462 10.8181 19.3461 10.8181C19.3461 10.8181 19.3461 10.8181 19.346 10.8181C19.346 10.8181 19.3459 10.8181 19.3459 10.8181C19.3458 10.8181 19.3458 10.8181 19.3458 10.8181C19.3457 10.8181 19.3457 10.8181 19.3456 10.8181C19.3456 10.8181 19.3456 10.8181 19.3455 10.8181C19.3455 10.8181 19.3454 10.8181 19.3454 10.8181C19.3453 10.8181 19.3453 10.8181 19.3453 10.8181C19.3452 10.8181 19.3452 10.8181 19.3451 10.8181C19.3451 10.8181 19.345 10.8181 19.345 10.8181C19.345 10.8181 19.3449 10.8181 19.3449 10.8181C19.3448 10.8181 19.3448 10.8181 19.3447 10.8181C19.3447 10.8181 19.3447 10.8181 19.3446 10.8181C19.3446 10.8181 19.3445 10.8181 19.3445 10.8181C19.3444 10.8181 19.3444 10.8181 19.3444 10.8181C19.3443 10.8181 19.3443 10.8181 19.3442 10.8181C19.3442 10.8181 19.3441 10.8181 19.3441 10.8181C19.344 10.8181 19.344 10.8181 19.344 10.8181C19.3439 10.8181 19.3439 10.8181 19.3438 10.8181C19.3438 10.8181 19.3437 10.8181 19.3437 10.8181C19.3437 10.8181 19.3436 10.8181 19.3436 10.8181C19.3435 10.8181 19.3435 10.8181 19.3434 10.8181C19.3434 10.8181 19.3433 10.8181 19.3433 10.8181C19.3433 10.8181 19.3432 10.8181 19.3432 10.8181C19.3431 10.8181 19.3431 10.8181 19.343 10.8181C19.343 10.8181 19.343 10.8181 19.3429 10.8181C19.3429 10.8181 19.3428 10.8181 19.3428 10.8181C19.3427 10.8181 19.3427 10.8181 19.3426 10.8181C19.3426 10.8181 19.3426 10.8181 19.3425 10.8181C19.3425 10.8181 19.3424 10.8181 19.3424 10.8181C19.3423 10.8181 19.3423 10.8181 19.3422 10.8181C19.3422 10.8181 19.3422 10.8181 19.3421 10.8181C19.3421 10.8181 19.342 10.8181 19.342 10.8181C19.3419 10.8181 19.3419 10.8181 19.3418 10.8181C19.3418 10.8181 19.3418 10.8181 19.3417 10.8181C19.3417 10.8181 19.3416 10.8181 19.3416 10.8181C19.3415 10.8181 19.3415 10.8181 19.3414 10.8181C19.3414 10.8181 19.3414 10.8181 19.3413 10.8181C19.3413 10.8181 19.3412 10.8181 19.3412 10.8181C19.3411 10.8181 19.3411 10.8181 19.341 10.8181C19.341 10.8181 19.341 10.8181 19.3409 10.8181C19.3409 10.8181 19.3408 10.8181 19.3408 10.8181C19.3407 10.8181 19.3407 10.8181 19.3406 10.8181C19.3406 10.8181 19.3406 10.8181 19.3405 10.8181C19.3405 10.8181 19.3404 10.8181 19.3404 10.8181C19.3403 10.8181 19.3403 10.8181 19.3403 10.8181C19.3402 10.8181 19.3402 10.8181 19.3401 10.8181C19.3401 10.8181 19.34 10.8181 19.34 10.8181C19.3399 10.8181 19.3399 10.8181 19.3399 10.8181C19.3398 10.8181 19.3398 10.8181 19.3397 10.8181C19.3397 10.8181 19.3396 10.8181 19.3396 10.8181C19.3395 10.8181 19.3395 10.8181 19.3395 10.8181C19.3394 10.8181 19.3394 10.8181 19.3393 10.8181C19.3393 10.8181 19.3392 10.8181 19.3392 10.8181C19.3392 10.8181 19.3391 10.8181 19.3391 10.8181C19.339 10.8181 19.339 10.8181 19.3389 10.8181C19.3389 10.8181 19.3388 10.8181 19.3388 10.8181C19.3388 10.8181 19.3387 10.8181 19.3387 10.8181C19.3386 10.8181 19.3386 10.8181 19.3385 10.8181C19.3385 10.8181 19.3385 10.8181 19.3384 10.8181C19.3384 10.8181 19.3383 10.8181 19.3383 10.8181C19.3382 10.8181 19.3382 10.8181 19.3382 10.8181C19.3381 10.8181 19.3381 10.8181 19.338 10.8181C19.338 10.8181 19.3379 10.8181 19.3379 10.8181C19.3379 10.8181 19.3378 10.8181 19.3378 10.8181C19.3377 10.8181 19.3377 10.8181 19.3376 10.8181C19.3376 10.8181 19.3376 10.8181 19.3375 10.8181C19.3375 10.8181 19.3374 10.8181 19.3374 10.8181C19.3373 10.8181 19.3373 10.8181 19.3373 10.8181C19.3372 10.8181 19.3372 10.8181 19.3371 10.8181C19.3371 10.8181 19.337 10.8181 19.337 10.8181C19.337 10.8181 19.3369 10.8181 19.3369 10.8181C19.3368 10.8181 19.3368 10.8181 19.3368 10.8181C19.3367 10.8181 19.3367 10.8181 19.3366 10.8181C19.3366 10.8181 19.3365 10.8181 19.3365 10.8181C19.3365 10.8181 19.3364 10.8181 19.3364 10.8181C19.3363 10.8181 19.3363 10.8181 19.3363 10.8181C19.3362 10.8181 19.3362 10.8181 19.3361 10.8181C19.3361 10.8181 19.336 10.8181 19.336 10.8181C19.336 10.8181 19.3359 10.8181 19.3359 10.8181C19.3358 10.8181 19.3358 10.8181 19.3358 10.8181C19.3357 10.8181 19.3357 10.8181 19.3356 10.8181C19.3356 10.8181 19.3356 10.8181 19.3355 10.8181C19.3355 10.8181 19.3354 10.8181 19.3354 10.8181C19.3354 10.8181 19.3353 10.8181 19.3353 10.8181C19.3352 10.8181 19.3352 10.8181 19.3352 10.8181C19.3351 10.8181 19.3351 10.8181 19.335 10.8181C19.335 10.8181 19.335 10.8181 19.3349 10.8181C19.3349 10.8181 19.3348 10.8181 19.3348 10.8181C19.3348 10.8181 19.3347 10.8181 19.3347 10.8181C19.3347 10.8181 19.3346 10.8181 19.3346 10.8181C19.3345 10.8181 19.3345 10.8181 19.3345 10.8181C19.3344 10.8181 19.3344 10.8181 19.3343 10.8181C19.3343 10.8181 19.3343 10.8181 19.3342 10.8181C19.3342 10.8181 19.3342 10.8181 19.3341 10.8181C19.3341 10.8181 19.334 10.8181 19.334 10.8181C19.334 10.8181 19.3339 10.8181 19.3339 10.8181C19.3339 10.8181 19.3338 10.8181 19.3338 10.8181C19.3337 10.8181 19.3337 10.8181 19.3337 10.8181C19.3336 10.8181 19.3336 10.8181 19.3336 10.8181C19.3335 10.8181 19.3335 10.8181 19.3335 10.8181C19.3334 10.8181 19.3334 10.8181 19.3333 10.8181C19.3333 10.8181 19.3333 10.8181 19.3332 10.8181C19.3332 10.8181 19.3332 10.8181 19.3331 10.8181C19.3331 10.8181 19.3331 10.8181 19.333 10.8181C19.333 10.8181 19.3329 10.8181 19.3329 10.8181C19.3329 10.8181 19.3328 10.8181 19.3328 10.8181C19.3328 10.8181 19.3327 10.8181 19.3327 10.8181C19.3327 10.8181 19.3326 10.8181 19.3326 10.8181C19.3326 10.8181 19.3325 10.8181 19.3325 10.8181C19.3325 10.8181 19.3324 10.8181 19.3324 10.8181C19.3324 10.8181 19.3323 10.8181 19.3323 10.8181C19.3323 10.8181 19.3322 10.8181 19.3322 10.8181C19.3322 10.8181 19.3321 10.8181 19.3321 10.8181C19.3321 10.8181 19.332 10.8181 19.332 10.8181C19.332 10.8181 19.3319 10.8181 19.3319 10.8181C19.3319 10.8181 19.3318 10.8181 19.3318 10.8181C19.3318 10.8181 19.3317 10.8181 19.3317 10.8181C19.3317 10.8181 19.3317 10.8181 19.3316 10.8181C19.3316 10.8181 19.3316 10.8181 19.3315 10.8181C19.3315 10.8181 19.3315 10.8181 19.3314 10.8181C19.3314 10.8181 19.3314 10.8181 19.3313 10.8181C19.3313 10.8181 19.3313 10.8181 19.3313 10.8181C19.3312 10.8181 19.3312 10.8181 19.3312 10.8181C19.3311 10.8181 19.3311 10.8181 19.3311 10.8181C19.331 10.8181 19.331 10.8181 19.331 10.8181C19.331 10.8181 19.3309 10.8181 19.3309 10.8181C19.3309 10.8181 19.3308 10.8181 19.3308 10.8181C19.3308 10.8181 19.3308 10.8181 19.3307 10.8181C19.3307 10.8181 19.3307 10.8181 19.3307 10.8181C19.3306 10.8181 19.3306 10.8181 19.3306 10.8181C19.3305 10.8181 19.3305 10.8181 19.3305 10.8181C19.3305 10.8181 19.3304 10.8181 19.3304 10.8181C19.3304 10.8181 19.3304 10.8181 19.3303 10.8181C19.3303 10.8181 19.3303 10.8181 19.3303 10.8181C19.3302 10.8181 19.3302 10.8181 19.3302 10.8181C19.3302 10.8181 19.3301 10.8181 19.3301 10.8181C19.3301 10.8181 19.3301 10.8181 19.33 10.8181C19.33 10.8181 19.33 10.8181 19.33 10.8181C19.3299 10.8181 19.3299 10.8181 19.3299 10.8181C19.3299 10.8181 19.3298 10.8181 19.3298 10.8181C19.3298 10.8181 19.3298 10.8181 19.3297 10.8181C19.3297 10.8181 19.3297 10.8181 19.3297 10.8181C19.3297 10.8181 19.3296 10.8181 19.3296 10.8181C19.3296 10.8181 19.3296 10.8181 19.3295 10.8181C19.3295 10.8181 19.3295 10.8181 19.3295 10.8181C19.3295 10.8181 19.3294 10.8181 19.3294 10.8181C19.3294 10.8181 19.3294 10.8181 19.3294 10.8181C19.3293 10.8181 19.3293 10.8181 19.3293 10.8181C19.3293 10.8181 19.3293 10.8181 19.3292 10.8181C19.3292 10.8181 19.3292 10.8181 19.3292 10.8181C19.3292 10.8181 19.3291 10.8181 19.3291 10.8181C19.3291 10.8181 19.3291 10.8181 19.3291 10.8181C19.329 10.8181 19.329 10.8181 19.329 10.8181C19.329 10.8181 19.329 10.8181 19.329 10.8181C19.3289 10.8181 19.3289 10.8181 19.3289 10.8181C19.3289 10.8181 19.3289 10.8181 19.3289 10.8181C19.3288 10.8181 19.3288 10.8181 19.3288 10.8181C19.3288 10.8181 19.3288 10.8181 19.3288 10.8181C19.3287 10.8181 19.3287 10.8181 19.3287 10.8181C19.3287 10.8181 19.3287 10.8181 19.3287 10.8181C19.3287 10.8181 19.3286 10.8181 19.3286 10.8181C19.3286 10.8181 19.3286 10.8181 19.3286 10.8181C19.3286 10.8181 19.3286 10.8181 19.3286 10.8181C19.3285 10.8181 19.3285 10.8181 19.3285 10.8181C19.3285 10.8181 19.3285 10.8181 19.3285 10.8181C19.3285 10.8181 19.3285 10.8181 19.3284 10.8181C19.3284 10.8181 19.3284 10.8181 19.3284 10.8181C19.3284 10.8181 19.3284 10.8181 19.3284 10.8181C19.3284 10.8181 19.3284 10.8181 19.3283 10.8181C19.3283 10.8181 19.3283 10.8181 19.3283 10.8181C19.3283 10.8181 19.3283 10.8181 19.3283 10.8181C19.3283 10.8181 19.3283 10.8181 19.3283 10.8181C19.3283 10.8181 19.3282 10.8181 19.3282 10.8181C19.3282 10.8181 19.3282 10.8181 19.3282 10.8181C19.3282 10.8181 19.3282 10.8181 19.3282 10.8181C19.3282 10.8181 19.3282 10.8181 19.3282 10.8181C19.3282 10.8181 19.3282 10.8181 19.3282 10.8181C19.3281 10.8181 19.3281 10.8181 19.3281 10.8181C19.3281 10.8181 19.3281 10.8181 19.3281 10.8181C19.3281 10.8181 19.3281 10.8181 19.3281 10.8181C19.3281 10.8181 19.3281 10.8181 19.3281 10.8181C19.3281 10.8181 19.3281 10.8181 19.3281 10.8181C19.3281 10.8181 19.3281 10.8181 19.3281 10.8181C19.3281 10.8181 19.3281 10.8181 19.3281 10.8181C19.3281 10.8181 19.3281 10.8181 19.3281 10.8181C19.3281 10.8181 19.3281 10.8181 19.3281 10.8181C19.3281 10.8181 19.3281 10.8181 19.3281 10.8181C19.3281 11.4681 19.3281 12.1181 19.3281 12.1181C19.3281 12.1181 19.3281 12.1181 19.3281 12.1181C19.3281 12.1181 19.3281 12.1181 19.3281 12.1181C19.3281 12.1181 19.3281 12.1181 19.3281 12.1181C19.3281 12.1181 19.3281 12.1181 19.3281 12.1181C19.3281 12.1181 19.3281 12.1181 19.3281 12.1181C19.3281 12.1181 19.3281 12.1181 19.3281 12.1181C19.3281 12.1181 19.3281 12.1181 19.3281 12.1181C19.3281 12.1181 19.3281 12.1181 19.3281 12.1181C19.3281 12.1181 19.3281 12.1181 19.3282 12.1181C19.3282 12.1181 19.3282 12.1181 19.3282 12.1181C19.3282 12.1181 19.3282 12.1181 19.3282 12.1181C19.3282 12.1181 19.3282 12.1181 19.3282 12.1181C19.3282 12.1181 19.3282 12.1181 19.3282 12.1181C19.3283 12.1181 19.3283 12.1181 19.3283 12.1181C19.3283 12.1181 19.3283 12.1181 19.3283 12.1181C19.3283 12.1181 19.3283 12.1181 19.3283 12.1181C19.3283 12.1181 19.3284 12.1181 19.3284 12.1181C19.3284 12.1181 19.3284 12.1181 19.3284 12.1181C19.3284 12.1181 19.3284 12.1181 19.3284 12.1181C19.3284 12.1181 19.3285 12.1181 19.3285 12.1181C19.3285 12.1181 19.3285 12.1181 19.3285 12.1181C19.3285 12.1181 19.3285 12.1181 19.3286 12.1181C19.3286 12.1181 19.3286 12.1181 19.3286 12.1181C19.3286 12.1181 19.3286 12.1181 19.3286 12.1181C19.3287 12.1181 19.3287 12.1181 19.3287 12.1181C19.3287 12.1181 19.3287 12.1181 19.3287 12.1181C19.3288 12.1181 19.3288 12.1181 19.3288 12.1181C19.3288 12.1181 19.3288 12.1181 19.3288 12.1181C19.3289 12.1181 19.3289 12.1181 19.3289 12.1181C19.3289 12.1181 19.3289 12.1181 19.329 12.1181C19.329 12.1181 19.329 12.1181 19.329 12.1181C19.329 12.1181 19.3291 12.1181 19.3291 12.1181C19.3291 12.1181 19.3291 12.1181 19.3292 12.1181C19.3292 12.1181 19.3292 12.1181 19.3292 12.1181C19.3292 12.1181 19.3293 12.1181 19.3293 12.1181C19.3293 12.1181 19.3293 12.1181 19.3294 12.1181C19.3294 12.1181 19.3294 12.1181 19.3294 12.1181C19.3295 12.1181 19.3295 12.1181 19.3295 12.1181C19.3295 12.1181 19.3296 12.1181 19.3296 12.1181C19.3296 12.1181 19.3296 12.1181 19.3297 12.1181C19.3297 12.1181 19.3297 12.1181 19.3298 12.1181C19.3298 12.1181 19.3298 12.1181 19.3298 12.1181C19.3299 12.1181 19.3299 12.1181 19.3299 12.1181C19.33 12.1181 19.33 12.1181 19.33 12.1181C19.33 12.1181 19.3301 12.1181 19.3301 12.1181C19.3301 12.1181 19.3302 12.1181 19.3302 12.1181C19.3302 12.1181 19.3303 12.1181 19.3303 12.1181C19.3303 12.1181 19.3304 12.1181 19.3304 12.1181C19.3304 12.1181 19.3305 12.1181 19.3305 12.1181C19.3305 12.1181 19.3306 12.1181 19.3306 12.1181C19.3306 12.1181 19.3307 12.1181 19.3307 12.1181C19.3307 12.1181 19.3308 12.1181 19.3308 12.1181C19.3309 12.1181 19.3309 12.1181 19.3309 12.1181C19.331 12.1181 19.331 12.1181 19.331 12.1181C19.3311 12.1181 19.3311 12.1181 19.3312 12.1181C19.3312 12.1181 19.3312 12.1181 19.3313 12.1181C19.3313 12.1181 19.3314 12.1181 19.3314 12.1181C19.3314 12.1181 19.3315 12.1181 19.3315 12.1181C19.3316 12.1181 19.3316 12.1181 19.3316 12.1181C19.3317 12.1181 19.3317 12.1181 19.3318 12.1181C19.3318 12.1181 19.3319 12.1181 19.3319 12.1181C19.3319 12.1181 19.332 12.1181 19.332 12.1181C19.3321 12.1181 19.3321 12.1181 19.3322 12.1181C19.3322 12.1181 19.3323 12.1181 19.3323 12.1181C19.3323 12.1181 19.3324 12.1181 19.3324 12.1181C19.3325 12.1181 19.3325 12.1181 19.3326 12.1181C19.3326 12.1181 19.3327 12.1181 19.3327 12.1181C19.3328 12.1181 19.3328 12.1181 19.3329 12.1181C19.3329 12.1181 19.333 12.1181 19.333 12.1181C19.3331 12.1181 19.3331 12.1181 19.3332 12.1181C19.3332 12.1181 19.3333 12.1181 19.3333 12.1181V10.8181C19.3333 10.8181 19.3332 10.8181 19.3332 10.8181C19.3331 10.8181 19.3331 10.8181 19.333 10.8181C19.333 10.8181 19.3329 10.8181 19.3329 10.8181C19.3328 10.8181 19.3328 10.8181 19.3327 10.8181C19.3327 10.8181 19.3326 10.8181 19.3326 10.8181C19.3325 10.8181 19.3325 10.8181 19.3324 10.8181C19.3324 10.8181 19.3323 10.8181 19.3323 10.8181C19.3323 10.8181 19.3322 10.8181 19.3322 10.8181C19.3321 10.8181 19.3321 10.8181 19.332 10.8181C19.332 10.8181 19.3319 10.8181 19.3319 10.8181C19.3319 10.8181 19.3318 10.8181 19.3318 10.8181C19.3317 10.8181 19.3317 10.8181 19.3316 10.8181C19.3316 10.8181 19.3316 10.8181 19.3315 10.8181C19.3315 10.8181 19.3314 10.8181 19.3314 10.8181C19.3314 10.8181 19.3313 10.8181 19.3313 10.8181C19.3312 10.8181 19.3312 10.8181 19.3312 10.8181C19.3311 10.8181 19.3311 10.8181 19.331 10.8181C19.331 10.8181 19.331 10.8181 19.3309 10.8181C19.3309 10.8181 19.3309 10.8181 19.3308 10.8181C19.3308 10.8181 19.3307 10.8181 19.3307 10.8181C19.3307 10.8181 19.3306 10.8181 19.3306 10.8181C19.3306 10.8181 19.3305 10.8181 19.3305 10.8181C19.3305 10.8181 19.3304 10.8181 19.3304 10.8181C19.3304 10.8181 19.3303 10.8181 19.3303 10.8181C19.3303 10.8181 19.3302 10.8181 19.3302 10.8181C19.3302 10.8181 19.3301 10.8181 19.3301 10.8181C19.3301 10.8181 19.33 10.8181 19.33 10.8181C19.33 10.8181 19.33 10.8181 19.3299 10.8181C19.3299 10.8181 19.3299 10.8181 19.3298 10.8181C19.3298 10.8181 19.3298 10.8181 19.3298 10.8181C19.3297 10.8181 19.3297 10.8181 19.3297 10.8181C19.3296 10.8181 19.3296 10.8181 19.3296 10.8181C19.3296 10.8181 19.3295 10.8181 19.3295 10.8181C19.3295 10.8181 19.3295 10.8181 19.3294 10.8181C19.3294 10.8181 19.3294 10.8181 19.3294 10.8181C19.3293 10.8181 19.3293 10.8181 19.3293 10.8181C19.3293 10.8181 19.3292 10.8181 19.3292 10.8181C19.3292 10.8181 19.3292 10.8181 19.3292 10.8181C19.3291 10.8181 19.3291 10.8181 19.3291 10.8181C19.3291 10.8181 19.329 10.8181 19.329 10.8181C19.329 10.8181 19.329 10.8181 19.329 10.8181C19.3289 10.8181 19.3289 10.8181 19.3289 10.8181C19.3289 10.8181 19.3289 10.8181 19.3288 10.8181C19.3288 10.8181 19.3288 10.8181 19.3288 10.8181C19.3288 10.8181 19.3288 10.8181 19.3287 10.8181C19.3287 10.8181 19.3287 10.8181 19.3287 10.8181C19.3287 10.8181 19.3287 10.8181 19.3286 10.8181C19.3286 10.8181 19.3286 10.8181 19.3286 10.8181C19.3286 10.8181 19.3286 10.8181 19.3286 10.8181C19.3285 10.8181 19.3285 10.8181 19.3285 10.8181C19.3285 10.8181 19.3285 10.8181 19.3285 10.8181C19.3285 10.8181 19.3284 10.8181 19.3284 10.8181C19.3284 10.8181 19.3284 10.8181 19.3284 10.8181C19.3284 10.8181 19.3284 10.8181 19.3284 10.8181C19.3284 10.8181 19.3283 10.8181 19.3283 10.8181C19.3283 10.8181 19.3283 10.8181 19.3283 10.8181C19.3283 10.8181 19.3283 10.8181 19.3283 10.8181C19.3283 10.8181 19.3283 10.8181 19.3282 10.8181C19.3282 10.8181 19.3282 10.8181 19.3282 10.8181C19.3282 10.8181 19.3282 10.8181 19.3282 10.8181C19.3282 10.8181 19.3282 10.8181 19.3282 10.8181C19.3282 10.8181 19.3282 10.8181 19.3282 10.8181C19.3281 10.8181 19.3281 10.8181 19.3281 10.8181C19.3281 10.8181 19.3281 10.8181 19.3281 10.8181C19.3281 10.8181 19.3281 10.8181 19.3281 10.8181C19.3281 10.8181 19.3281 10.8181 19.3281 10.8181C19.3281 10.8181 19.3281 10.8181 19.3281 10.8181C19.3281 10.8181 19.3281 10.8181 19.3281 10.8181C19.3281 10.8181 19.3281 10.8181 19.3281 10.8181C19.3281 10.8181 19.3281 10.8181 19.3281 10.8181C19.3281 10.8181 19.3281 10.8181 19.3281 10.8181C19.3281 10.8181 19.3281 11.4681 19.3281 12.1181C19.3281 12.1181 19.3281 12.1181 19.3281 12.1181C19.3281 12.1181 19.3281 12.1181 19.3281 12.1181C19.3281 12.1181 19.3281 12.1181 19.3281 12.1181C19.3281 12.1181 19.3281 12.1181 19.3281 12.1181C19.3281 12.1181 19.3281 12.1181 19.3281 12.1181C19.3281 12.1181 19.3281 12.1181 19.3281 12.1181C19.3281 12.1181 19.3281 12.1181 19.3281 12.1181C19.3281 12.1181 19.3281 12.1181 19.3281 12.1181C19.3281 12.1181 19.3281 12.1181 19.3281 12.1181C19.3281 12.1181 19.3281 12.1181 19.3282 12.1181C19.3282 12.1181 19.3282 12.1181 19.3282 12.1181C19.3282 12.1181 19.3282 12.1181 19.3282 12.1181C19.3282 12.1181 19.3282 12.1181 19.3282 12.1181C19.3282 12.1181 19.3282 12.1181 19.3282 12.1181C19.3282 12.1181 19.3283 12.1181 19.3283 12.1181C19.3283 12.1181 19.3283 12.1181 19.3283 12.1181C19.3283 12.1181 19.3283 12.1181 19.3283 12.1181C19.3283 12.1181 19.3283 12.1181 19.3283 12.1181C19.3284 12.1181 19.3284 12.1181 19.3284 12.1181C19.3284 12.1181 19.3284 12.1181 19.3284 12.1181C19.3284 12.1181 19.3284 12.1181 19.3284 12.1181C19.3285 12.1181 19.3285 12.1181 19.3285 12.1181C19.3285 12.1181 19.3285 12.1181 19.3285 12.1181C19.3285 12.1181 19.3285 12.1181 19.3286 12.1181C19.3286 12.1181 19.3286 12.1181 19.3286 12.1181C19.3286 12.1181 19.3286 12.1181 19.3286 12.1181C19.3286 12.1181 19.3287 12.1181 19.3287 12.1181C19.3287 12.1181 19.3287 12.1181 19.3287 12.1181C19.3287 12.1181 19.3287 12.1181 19.3288 12.1181C19.3288 12.1181 19.3288 12.1181 19.3288 12.1181C19.3288 12.1181 19.3288 12.1181 19.3289 12.1181C19.3289 12.1181 19.3289 12.1181 19.3289 12.1181C19.3289 12.1181 19.3289 12.1181 19.329 12.1181C19.329 12.1181 19.329 12.1181 19.329 12.1181C19.329 12.1181 19.329 12.1181 19.3291 12.1181C19.3291 12.1181 19.3291 12.1181 19.3291 12.1181C19.3291 12.1181 19.3292 12.1181 19.3292 12.1181C19.3292 12.1181 19.3292 12.1181 19.3292 12.1181C19.3293 12.1181 19.3293 12.1181 19.3293 12.1181C19.3293 12.1181 19.3293 12.1181 19.3294 12.1181C19.3294 12.1181 19.3294 12.1181 19.3294 12.1181C19.3294 12.1181 19.3295 12.1181 19.3295 12.1181C19.3295 12.1181 19.3295 12.1181 19.3295 12.1181C19.3296 12.1181 19.3296 12.1181 19.3296 12.1181C19.3296 12.1181 19.3297 12.1181 19.3297 12.1181C19.3297 12.1181 19.3297 12.1181 19.3297 12.1181C19.3298 12.1181 19.3298 12.1181 19.3298 12.1181C19.3298 12.1181 19.3299 12.1181 19.3299 12.1181C19.3299 12.1181 19.3299 12.1181 19.33 12.1181C19.33 12.1181 19.33 12.1181 19.33 12.1181C19.3301 12.1181 19.3301 12.1181 19.3301 12.1181C19.3301 12.1181 19.3302 12.1181 19.3302 12.1181C19.3302 12.1181 19.3302 12.1181 19.3303 12.1181C19.3303 12.1181 19.3303 12.1181 19.3303 12.1181C19.3304 12.1181 19.3304 12.1181 19.3304 12.1181C19.3304 12.1181 19.3305 12.1181 19.3305 12.1181C19.3305 12.1181 19.3305 12.1181 19.3306 12.1181C19.3306 12.1181 19.3306 12.1181 19.3307 12.1181C19.3307 12.1181 19.3307 12.1181 19.3307 12.1181C19.3308 12.1181 19.3308 12.1181 19.3308 12.1181C19.3308 12.1181 19.3309 12.1181 19.3309 12.1181C19.3309 12.1181 19.331 12.1181 19.331 12.1181C19.331 12.1181 19.331 12.1181 19.3311 12.1181C19.3311 12.1181 19.3311 12.1181 19.3312 12.1181C19.3312 12.1181 19.3312 12.1181 19.3313 12.1181C19.3313 12.1181 19.3313 12.1181 19.3313 12.1181C19.3314 12.1181 19.3314 12.1181 19.3314 12.1181C19.3315 12.1181 19.3315 12.1181 19.3315 12.1181C19.3316 12.1181 19.3316 12.1181 19.3316 12.1181C19.3317 12.1181 19.3317 12.1181 19.3317 12.1181C19.3317 12.1181 19.3318 12.1181 19.3318 12.1181C19.3318 12.1181 19.3319 12.1181 19.3319 12.1181C19.3319 12.1181 19.332 12.1181 19.332 12.1181C19.332 12.1181 19.3321 12.1181 19.3321 12.1181C19.3321 12.1181 19.3322 12.1181 19.3322 12.1181C19.3322 12.1181 19.3323 12.1181 19.3323 12.1181C19.3323 12.1181 19.3324 12.1181 19.3324 12.1181C19.3324 12.1181 19.3325 12.1181 19.3325 12.1181C19.3325 12.1181 19.3326 12.1181 19.3326 12.1181C19.3326 12.1181 19.3327 12.1181 19.3327 12.1181C19.3327 12.1181 19.3328 12.1181 19.3328 12.1181C19.3328 12.1181 19.3329 12.1181 19.3329 12.1181C19.3329 12.1181 19.333 12.1181 19.333 12.1181C19.3331 12.1181 19.3331 12.1181 19.3331 12.1181C19.3332 12.1181 19.3332 12.1181 19.3332 12.1181C19.3333 12.1181 19.3333 12.1181 19.3333 12.1181C19.3334 12.1181 19.3334 12.1181 19.3335 12.1181C19.3335 12.1181 19.3335 12.1181 19.3336 12.1181C19.3336 12.1181 19.3336 12.1181 19.3337 12.1181C19.3337 12.1181 19.3337 12.1181 19.3338 12.1181C19.3338 12.1181 19.3339 12.1181 19.3339 12.1181C19.3339 12.1181 19.334 12.1181 19.334 12.1181C19.334 12.1181 19.3341 12.1181 19.3341 12.1181C19.3342 12.1181 19.3342 12.1181 19.3342 12.1181C19.3343 12.1181 19.3343 12.1181 19.3343 12.1181C19.3344 12.1181 19.3344 12.1181 19.3345 12.1181C19.3345 12.1181 19.3345 12.1181 19.3346 12.1181C19.3346 12.1181 19.3347 12.1181 19.3347 12.1181C19.3347 12.1181 19.3348 12.1181 19.3348 12.1181C19.3348 12.1181 19.3349 12.1181 19.3349 12.1181C19.335 12.1181 19.335 12.1181 19.335 12.1181C19.3351 12.1181 19.3351 12.1181 19.3352 12.1181C19.3352 12.1181 19.3352 12.1181 19.3353 12.1181C19.3353 12.1181 19.3354 12.1181 19.3354 12.1181C19.3354 12.1181 19.3355 12.1181 19.3355 12.1181C19.3356 12.1181 19.3356 12.1181 19.3356 12.1181C19.3357 12.1181 19.3357 12.1181 19.3358 12.1181C19.3358 12.1181 19.3358 12.1181 19.3359 12.1181C19.3359 12.1181 19.336 12.1181 19.336 12.1181C19.336 12.1181 19.3361 12.1181 19.3361 12.1181C19.3362 12.1181 19.3362 12.1181 19.3363 12.1181C19.3363 12.1181 19.3363 12.1181 19.3364 12.1181C19.3364 12.1181 19.3365 12.1181 19.3365 12.1181C19.3365 12.1181 19.3366 12.1181 19.3366 12.1181C19.3367 12.1181 19.3367 12.1181 19.3368 12.1181C19.3368 12.1181 19.3368 12.1181 19.3369 12.1181C19.3369 12.1181 19.337 12.1181 19.337 12.1181C19.337 12.1181 19.3371 12.1181 19.3371 12.1181C19.3372 12.1181 19.3372 12.1181 19.3373 12.1181C19.3373 12.1181 19.3373 12.1181 19.3374 12.1181C19.3374 12.1181 19.3375 12.1181 19.3375 12.1181C19.3376 12.1181 19.3376 12.1181 19.3376 12.1181C19.3377 12.1181 19.3377 12.1181 19.3378 12.1181C19.3378 12.1181 19.3379 12.1181 19.3379 12.1181C19.3379 12.1181 19.338 12.1181 19.338 12.1181C19.3381 12.1181 19.3381 12.1181 19.3382 12.1181C19.3382 12.1181 19.3382 12.1181 19.3383 12.1181C19.3383 12.1181 19.3384 12.1181 19.3384 12.1181C19.3385 12.1181 19.3385 12.1181 19.3385 12.1181C19.3386 12.1181 19.3386 12.1181 19.3387 12.1181C19.3387 12.1181 19.3388 12.1181 19.3388 12.1181C19.3388 12.1181 19.3389 12.1181 19.3389 12.1181C19.339 12.1181 19.339 12.1181 19.3391 12.1181C19.3391 12.1181 19.3392 12.1181 19.3392 12.1181C19.3392 12.1181 19.3393 12.1181 19.3393 12.1181C19.3394 12.1181 19.3394 12.1181 19.3395 12.1181C19.3395 12.1181 19.3395 12.1181 19.3396 12.1181C19.3396 12.1181 19.3397 12.1181 19.3397 12.1181C19.3398 12.1181 19.3398 12.1181 19.3399 12.1181C19.3399 12.1181 19.3399 12.1181 19.34 12.1181C19.34 12.1181 19.3401 12.1181 19.3401 12.1181C19.3402 12.1181 19.3402 12.1181 19.3403 12.1181C19.3403 12.1181 19.3403 12.1181 19.3404 12.1181C19.3404 12.1181 19.3405 12.1181 19.3405 12.1181C19.3406 12.1181 19.3406 12.1181 19.3406 12.1181C19.3407 12.1181 19.3407 12.1181 19.3408 12.1181C19.3408 12.1181 19.3409 12.1181 19.3409 12.1181C19.341 12.1181 19.341 12.1181 19.341 12.1181C19.3411 12.1181 19.3411 12.1181 19.3412 12.1181C19.3412 12.1181 19.3413 12.1181 19.3413 12.1181C19.3414 12.1181 19.3414 12.1181 19.3414 12.1181C19.3415 12.1181 19.3415 12.1181 19.3416 12.1181C19.3416 12.1181 19.3417 12.1181 19.3417 12.1181C19.3418 12.1181 19.3418 12.1181 19.3418 12.1181C19.3419 12.1181 19.3419 12.1181 19.342 12.1181C19.342 12.1181 19.3421 12.1181 19.3421 12.1181C19.3422 12.1181 19.3422 12.1181 19.3422 12.1181C19.3423 12.1181 19.3423 12.1181 19.3424 12.1181C19.3424 12.1181 19.3425 12.1181 19.3425 12.1181C19.3426 12.1181 19.3426 12.1181 19.3426 12.1181C19.3427 12.1181 19.3427 12.1181 19.3428 12.1181C19.3428 12.1181 19.3429 12.1181 19.3429 12.1181C19.343 12.1181 19.343 12.1181 19.343 12.1181C19.3431 12.1181 19.3431 12.1181 19.3432 12.1181C19.3432 12.1181 19.3433 12.1181 19.3433 12.1181C19.3433 12.1181 19.3434 12.1181 19.3434 12.1181C19.3435 12.1181 19.3435 12.1181 19.3436 12.1181C19.3436 12.1181 19.3437 12.1181 19.3437 12.1181C19.3437 12.1181 19.3438 12.1181 19.3438 12.1181C19.3439 12.1181 19.3439 12.1181 19.344 12.1181C19.344 12.1181 19.344 12.1181 19.3441 12.1181C19.3441 12.1181 19.3442 12.1181 19.3442 12.1181C19.3443 12.1181 19.3443 12.1181 19.3444 12.1181C19.3444 12.1181 19.3444 12.1181 19.3445 12.1181C19.3445 12.1181 19.3446 12.1181 19.3446 12.1181C19.3447 12.1181 19.3447 12.1181 19.3447 12.1181C19.3448 12.1181 19.3448 12.1181 19.3449 12.1181C19.3449 12.1181 19.345 12.1181 19.345 12.1181C19.345 12.1181 19.3451 12.1181 19.3451 12.1181C19.3452 12.1181 19.3452 12.1181 19.3453 12.1181C19.3453 12.1181 19.3453 12.1181 19.3454 12.1181C19.3454 12.1181 19.3455 12.1181 19.3455 12.1181C19.3456 12.1181 19.3456 12.1181 19.3456 12.1181C19.3457 12.1181 19.3457 12.1181 19.3458 12.1181C19.3458 12.1181 19.3458 12.1181 19.3459 12.1181C19.3459 12.1181 19.346 12.1181 19.346 12.1181C19.3461 12.1181 19.3461 12.1181 19.3461 12.1181C19.3462 12.1181 19.3462 12.1181 19.3463 12.1181C19.3463 12.1181 19.3464 12.1181 19.3464 12.1181C19.3464 12.1181 19.3465 12.1181 19.3465 12.1181C19.3466 12.1181 19.3466 12.1181 19.3466 12.1181C19.3467 12.1181 19.3467 12.1181 19.3468 12.1181C19.3468 12.1181 19.3468 12.1181 19.3469 12.1181C19.3469 12.1181 19.347 12.1181 19.347 12.1181C19.3471 12.1181 19.3471 12.1181 19.3471 12.1181C19.3472 12.1181 19.3472 12.1181 19.3473 12.1181C19.3473 12.1181 19.3473 12.1181 19.3474 12.1181C19.3474 12.1181 19.3475 12.1181 19.3475 12.1181C19.3475 12.1181 19.3476 12.1181 19.3476 12.1181C19.3477 12.1181 19.3477 12.1181 19.3477 12.1181C19.3478 12.1181 19.3478 12.1181 19.3479 12.1181C19.3479 12.1181 19.3479 12.1181 19.348 12.1181C19.348 12.1181 19.3481 12.1181 19.3481 12.1181C19.3481 12.1181 19.3482 12.1181 19.3482 12.1181C19.3482 12.1181 19.3483 12.1181 19.3483 12.1181C19.3484 12.1181 19.3484 12.1181 19.3484 12.1181C19.3485 12.1181 19.3485 12.1181 19.3486 12.1181C19.3486 12.1181 19.3486 12.1181 19.3487 12.1181C19.3487 12.1181 19.3487 12.1181 19.3488 12.1181C19.3488 12.1181 19.3489 12.1181 19.3489 12.1181C19.3489 12.1181 19.349 12.1181 19.349 12.1181C19.3491 12.1181 19.3491 12.1181 19.3491 12.1181C19.3492 12.1181 19.3492 12.1181 19.3492 12.1181C19.3493 12.1181 19.3493 12.1181 19.3493 12.1181C19.3494 12.1181 19.3494 12.1181 19.3495 12.1181C19.3495 12.1181 19.3495 12.1181 19.3496 12.1181C19.3496 12.1181 19.3496 12.1181 19.3497 12.1181C19.3497 12.1181 19.3497 12.1181 19.3498 12.1181C19.3498 12.1181 19.3499 12.1181 19.3499 12.1181C19.3499 12.1181 19.35 12.1181 19.35 12.1181C19.35 12.1181 19.3501 12.1181 19.3501 12.1181C19.3501 12.1181 19.3502 12.1181 19.3502 12.1181C19.3502 12.1181 19.3503 12.1181 19.3503 12.1181C19.3503 12.1181 19.3504 12.1181 19.3504 12.1181C19.3504 12.1181 19.3505 12.1181 19.3505 12.1181C19.3505 12.1181 19.3506 12.1181 19.3506 12.1181C19.3506 12.1181 19.3507 12.1181 19.3507 12.1181C19.3507 12.1181 19.3508 12.1181 19.3508 12.1181C19.3508 12.1181 19.3509 12.1181 19.3509 12.1181C19.3509 12.1181 19.351 12.1181 19.351 12.1181C19.351 12.1181 19.3511 12.1181 19.3511 12.1181C19.3511 12.1181 19.3512 12.1181 19.3512 12.1181C19.3512 12.1181 19.3513 12.1181 19.3513 12.1181C19.3513 12.1181 19.3514 12.1181 19.3514 12.1181C19.3514 12.1181 19.3514 12.1181 19.3515 12.1181C19.3515 12.1181 19.3515 12.1181 19.3516 12.1181C19.3516 12.1181 19.3516 12.1181 19.3517 12.1181C19.3517 12.1181 19.3517 12.1181 19.3518 12.1181C19.3518 12.1181 19.3518 12.1181 19.3518 12.1181C19.3519 12.1181 19.3519 12.1181 19.3519 12.1181C19.352 12.1181 19.352 12.1181 19.352 12.1181C19.352 12.1181 19.3521 12.1181 19.3521 12.1181C19.3521 12.1181 19.3522 12.1181 19.3522 12.1181C19.3522 12.1181 19.3522 12.1181 19.3523 12.1181C19.3523 12.1181 19.3523 12.1181 19.3524 12.1181C19.3524 12.1181 19.3524 12.1181 19.3524 12.1181C19.3525 12.1181 19.3525 12.1181 19.3525 12.1181C19.3525 12.1181 19.3526 12.1181 19.3526 12.1181C19.3526 12.1181 19.3526 12.1181 19.3527 12.1181C19.3527 12.1181 19.3527 12.1181 19.3528 12.1181C19.3528 12.1181 19.3528 12.1181 19.3528 12.1181C19.3529 12.1181 19.3529 12.1181 19.3529 12.1181C19.3529 12.1181 19.353 12.1181 19.353 12.1181C19.353 12.1181 19.353 12.1181 19.353 12.1181C19.3531 12.1181 19.3531 12.1181 19.3531 12.1181C19.3531 12.1181 19.3532 12.1181 19.3532 12.1181C19.3532 12.1181 19.3532 12.1181 19.3533 12.1181C19.3533 12.1181 19.3533 12.1181 19.3533 12.1181C19.3533 12.1181 19.3534 12.1181 19.3534 12.1181C19.3534 12.1181 19.3534 12.1181 19.3535 12.1181C19.3535 12.1181 19.3535 12.1181 19.3535 12.1181C19.3535 12.1181 19.3536 12.1181 19.3536 12.1181C19.3536 12.1181 19.3536 12.1181 19.3536 12.1181C19.3537 12.1181 19.3537 12.1181 19.3537 12.1181C19.3537 12.1181 19.3537 12.1181 19.3538 12.1181C19.3538 12.1181 19.3538 12.1181 19.3538 12.1181C19.3538 12.1181 19.3539 12.1181 19.3539 12.1181C19.3539 12.1181 19.3539 12.1181 19.3539 12.1181C19.3539 12.1181 19.354 12.1181 19.354 12.1181C19.354 12.1181 19.354 12.1181 19.354 12.1181C19.3541 12.1181 19.3541 12.1181 19.3541 12.1181C19.3541 12.1181 19.3541 12.1181 19.3541 12.1181C19.3542 12.1181 19.3542 12.1181 19.3542 12.1181C19.3542 12.1181 19.3542 12.1181 19.3542 12.1181C19.3542 12.1181 19.3543 12.1181 19.3543 12.1181C19.3543 12.1181 19.3543 12.1181 19.3543 12.1181C19.3543 12.1181 19.3543 12.1181 19.3544 12.1181C19.3544 12.1181 19.3544 12.1181 19.3544 12.1181C19.3544 12.1181 19.3544 12.1181 19.3544 12.1181C19.3545 12.1181 19.3545 12.1181 19.3545 12.1181C19.3545 12.1181 19.3545 12.1181 19.3545 12.1181C19.3545 12.1181 19.3545 12.1181 19.3545 12.1181C19.3546 12.1181 19.3546 12.1181 19.3546 12.1181C19.3546 12.1181 19.3546 12.1181 19.3546 12.1181C19.3546 12.1181 19.3546 12.1181 19.3546 12.1181C19.3547 12.1181 19.3547 12.1181 19.3547 12.1181C19.3547 12.1181 19.3547 12.1181 19.3547 12.1181C19.3547 12.1181 19.3547 12.1181 19.3547 12.1181C19.3547 12.1181 19.3547 12.1181 19.3547 12.1181C19.3548 12.1181 19.3548 12.1181 19.3548 12.1181C19.3548 12.1181 19.3548 12.1181 19.3548 12.1181C19.3548 12.1181 19.3548 12.1181 19.3548 12.1181C19.3548 12.1181 19.3548 12.1181 19.3548 12.1181C19.3548 12.1181 19.3548 12.1181 19.3548 12.1181C19.3548 12.1181 19.3549 12.1181 19.3549 12.1181C19.3549 12.1181 19.3549 12.1181 19.3549 12.1181C19.3549 12.1181 19.3549 12.1181 19.3549 12.1181C19.3549 12.1181 19.3549 12.1181 19.3549 12.1181C19.3549 12.1181 19.3549 12.1181 19.3549 12.1181C19.3549 12.1181 19.3549 12.1181 19.3549 12.1181C19.3549 12.1181 19.3549 12.1181 19.3549 12.1181H19.3549C19.3549 12.1181 19.3549 11.4681 19.3549 10.8181C19.3549 10.8181 19.3549 10.8181 19.3549 10.8181C19.3549 10.8181 19.3549 10.8181 19.3549 10.8181C19.3549 10.8181 19.3549 10.8181 19.3549 10.8181C19.3549 10.8181 19.3549 10.8181 19.3549 10.8181C19.3549 10.8181 19.3549 10.8181 19.3549 10.8181C19.3549 10.8181 19.3549 10.8181 19.3549 10.8181C19.3549 10.8181 19.3549 10.8181 19.3549 10.8181C19.3549 10.8181 19.3548 10.8181 19.3548 10.8181C19.3548 10.8181 19.3548 10.8181 19.3548 10.8181C19.3548 10.8181 19.3548 10.8181 19.3548 10.8181C19.3548 10.8181 19.3548 10.8181 19.3548 10.8181C19.3548 10.8181 19.3548 10.8181 19.3548 10.8181C19.3548 10.8181 19.3548 10.8181 19.3547 10.8181C19.3547 10.8181 19.3547 10.8181 19.3547 10.8181C19.3547 10.8181 19.3547 10.8181 19.3547 10.8181C19.3547 10.8181 19.3547 10.8181 19.3547 10.8181C19.3547 10.8181 19.3546 10.8181 19.3546 10.8181C19.3546 10.8181 19.3546 10.8181 19.3546 10.8181C19.3546 10.8181 19.3546 10.8181 19.3546 10.8181C19.3546 10.8181 19.3545 10.8181 19.3545 10.8181C19.3545 10.8181 19.3545 10.8181 19.3545 10.8181C19.3545 10.8181 19.3545 10.8181 19.3544 10.8181C19.3544 10.8181 19.3544 10.8181 19.3544 10.8181C19.3544 10.8181 19.3544 10.8181 19.3544 10.8181C19.3543 10.8181 19.3543 10.8181 19.3543 10.8181C19.3543 10.8181 19.3543 10.8181 19.3543 10.8181C19.3542 10.8181 19.3542 10.8181 19.3542 10.8181C19.3542 10.8181 19.3542 10.8181 19.3542 10.8181C19.3541 10.8181 19.3541 10.8181 19.3541 10.8181C19.3541 10.8181 19.3541 10.8181 19.354 10.8181C19.354 10.8181 19.354 10.8181 19.354 10.8181C19.354 10.8181 19.3539 10.8181 19.3539 10.8181C19.3539 10.8181 19.3539 10.8181 19.3539 10.8181C19.3538 10.8181 19.3538 10.8181 19.3538 10.8181C19.3538 10.8181 19.3537 10.8181 19.3537 10.8181C19.3537 10.8181 19.3537 10.8181 19.3537 10.8181C19.3536 10.8181 19.3536 10.8181 19.3536 10.8181C19.3536 10.8181 19.3535 10.8181 19.3535 10.8181C19.3535 10.8181 19.3535 10.8181 19.3534 10.8181C19.3534 10.8181 19.3534 10.8181 19.3534 10.8181C19.3533 10.8181 19.3533 10.8181 19.3533 10.8181C19.3532 10.8181 19.3532 10.8181 19.3532 10.8181C19.3532 10.8181 19.3531 10.8181 19.3531 10.8181C19.3531 10.8181 19.353 10.8181 19.353 10.8181C19.353 10.8181 19.353 10.8181 19.3529 10.8181C19.3529 10.8181 19.3529 10.8181 19.3528 10.8181C19.3528 10.8181 19.3528 10.8181 19.3527 10.8181C19.3527 10.8181 19.3527 10.8181 19.3526 10.8181C19.3526 10.8181 19.3526 10.8181 19.3525 10.8181C19.3525 10.8181 19.3525 10.8181 19.3524 10.8181C19.3524 10.8181 19.3524 10.8181 19.3523 10.8181C19.3523 10.8181 19.3523 10.8181 19.3522 10.8181C19.3522 10.8181 19.3522 10.8181 19.3521 10.8181C19.3521 10.8181 19.352 10.8181 19.352 10.8181C19.352 10.8181 19.3519 10.8181 19.3519 10.8181C19.3519 10.8181 19.3518 10.8181 19.3518 10.8181C19.3517 10.8181 19.3517 10.8181 19.3517 10.8181C19.3516 10.8181 19.3516 10.8181 19.3515 10.8181C19.3515 10.8181 19.3515 10.8181 19.3514 10.8181C19.3514 10.8181 19.3513 10.8181 19.3513 10.8181C19.3512 10.8181 19.3512 10.8181 19.3512 10.8181C19.3511 10.8181 19.3511 10.8181 19.351 10.8181C19.351 10.8181 19.3509 10.8181 19.3509 10.8181C19.3508 10.8181 19.3508 10.8181 19.3508 10.8181C19.3507 10.8181 19.3507 10.8181 19.3506 10.8181C19.3506 10.8181 19.3505 10.8181 19.3505 10.8181C19.3504 10.8181 19.3504 10.8181 19.3503 10.8181C19.3503 10.8181 19.3502 10.8181 19.3502 10.8181C19.3501 10.8181 19.3501 10.8181 19.35 10.8181C19.35 10.8181 19.3499 10.8181 19.3499 10.8181C19.3498 10.8181 19.3498 10.8181 19.3497 10.8181C19.3497 10.8181 19.3496 10.8181 19.3496 10.8181C19.3495 10.8181 19.3495 10.8181 19.3494 10.8181C19.3494 10.8181 19.3493 10.8181 19.3493 10.8181C19.3492 10.8181 19.3492 10.8181 19.3491 10.8181C19.349 10.8181 19.349 10.8181 19.3489 10.8181C19.3489 10.8181 19.3488 10.8181 19.3488 10.8181C19.3487 10.8181 19.3486 10.8181 19.3486 10.8181C19.3485 10.8181 19.3485 10.8181 19.3484 10.8181C19.3484 10.8181 19.3483 10.8181 19.3482 10.8181C19.3482 10.8181 19.3481 10.8181 19.3481 10.8181C19.348 10.8181 19.3479 10.8181 19.3479 10.8181C19.3478 10.8181 19.3478 10.8181 19.3477 10.8181C19.3476 10.8181 19.3476 10.8181 19.3475 10.8181C19.3474 10.8181 19.3474 10.8181 19.3473 10.8181C19.3472 10.8181 19.3472 10.8181 19.3471 10.8181C19.3471 10.8181 19.347 10.8181 19.3469 10.8181C19.3469 10.8181 19.3468 10.8181 19.3467 10.8181C19.3467 10.8181 19.3466 10.8181 19.3465 10.8181C19.3465 10.8181 19.3464 10.8181 19.3463 10.8181C19.3462 10.8181 19.3462 10.8181 19.3461 10.8181C19.346 10.8181 19.346 10.8181 19.3459 10.8181C19.3458 10.8181 19.3458 10.8181 19.3457 10.8181C19.3456 10.8181 19.3455 10.8181 19.3455 10.8181C19.3454 10.8181 19.3453 10.8181 19.3452 10.8181C19.3452 10.8181 19.3451 10.8181 19.345 10.8181C19.345 10.8181 19.3449 10.8181 19.3448 10.8181C19.3447 10.8181 19.3447 10.8181 19.3446 10.8181C19.3445 10.8181 19.3444 10.8181 19.3443 10.8181C19.3443 10.8181 19.3442 10.8181 19.3441 10.8181C19.344 10.8181 19.344 10.8181 19.3439 10.8181C19.3438 10.8181 19.3437 10.8181 19.3436 10.8181C19.3436 10.8181 19.3435 10.8181 19.3434 10.8181C19.3433 10.8181 19.3432 10.8181 19.3432 10.8181C19.3431 10.8181 19.343 10.8181 19.3429 10.8181C19.3428 10.8181 19.3427 10.8181 19.3427 10.8181C19.3426 10.8181 19.3425 10.8181 19.3424 10.8181C19.3423 10.8181 19.3422 10.8181 19.3421 10.8181C19.3421 10.8181 19.342 10.8181 19.3419 10.8181C19.3418 10.8181 19.3417 10.8181 19.3416 10.8181C19.3415 10.8181 19.3414 10.8181 19.3414 10.8181C19.3413 10.8181 19.3412 10.8181 19.3411 10.8181C19.341 10.8181 19.3409 10.8181 19.3408 10.8181C19.3407 10.8181 19.3406 10.8181 19.3405 10.8181C19.3404 10.8181 19.3404 10.8181 19.3403 10.8181C19.3402 10.8181 19.3401 10.8181 19.34 10.8181C19.3399 10.8181 19.3398 10.8181 19.3397 10.8181C19.3396 10.8181 19.3395 10.8181 19.3394 10.8181C19.3393 10.8181 19.3392 10.8181 19.3391 10.8181C19.339 10.8181 19.3389 10.8181 19.3388 10.8181C19.3387 10.8181 19.3386 10.8181 19.3385 10.8181C19.3384 10.8181 19.3383 10.8181 19.3382 10.8181C19.3381 10.8181 19.338 10.8181 19.3379 10.8181C19.3378 10.8181 19.3377 10.8181 19.3376 10.8181C19.3375 10.8181 19.3374 10.8181 19.3373 10.8181C19.3372 10.8181 19.3371 10.8181 19.337 10.8181C19.3369 10.8181 19.3368 10.8181 19.3367 10.8181C19.3366 10.8181 19.3365 10.8181 19.3364 10.8181C19.3362 10.8181 19.3361 10.8181 19.336 10.8181C19.3359 10.8181 19.3358 10.8181 19.3357 10.8181C19.3356 10.8181 19.3355 10.8181 19.3354 10.8181C19.3353 10.8181 19.3352 10.8181 19.335 10.8181C19.3349 10.8181 19.3348 10.8181 19.3347 10.8181C19.3346 10.8181 19.3345 10.8181 19.3344 10.8181C19.3343 10.8181 19.3341 10.8181 19.334 10.8181C19.3339 10.8181 19.3338 10.8181 19.3337 10.8181C19.3336 10.8181 19.3335 10.8181 19.3333 10.8181V12.1181ZM3.01667 19.2979C3.01667 19.7364 3.19672 20.307 3.58133 20.7746C3.9867 21.2675 4.62411 21.65 5.5 21.65V20.35C5.04256 20.35 4.7633 20.1652 4.58534 19.9488C4.38661 19.7072 4.31667 19.4267 4.31667 19.2979H3.01667ZM5.5 21.65C5.94427 21.65 6.58781 21.575 7.14643 21.3183C7.71809 21.0556 8.31667 20.5339 8.31667 19.6383H7.01667C7.01667 19.8321 6.9208 19.9913 6.60357 20.137C6.2733 20.2888 5.8335 20.35 5.5 20.35V21.65ZM8.31667 19.6383C8.31667 19.8236 8.22064 19.9241 8.17602 19.9557C8.13141 19.9874 8.15145 19.9479 8.33333 19.9479V18.6479C7.66394 18.6479 7.01667 18.9776 7.01667 19.6383H8.31667ZM4.31667 19.2979V14.1915H3.01667V19.2979H4.31667ZM4.31667 14.1915C4.31667 13.8752 4.31752 13.4497 4.37309 13.0461C4.43344 12.6078 4.53938 12.3569 4.6311 12.2633L3.70223 11.3538C3.29396 11.7707 3.14989 12.3993 3.08524 12.8688C3.01581 13.373 3.01667 13.8837 3.01667 14.1915H4.31667ZM4.16667 11.1585C4.24211 11.1585 4.29383 11.1735 4.30042 11.1753C4.31481 11.1793 4.31981 11.1818 4.31291 11.179C4.29941 11.1735 4.26977 11.16 4.22498 11.1356C4.1365 11.0874 4.02272 11.0154 3.91222 10.9321C3.7989 10.8466 3.71031 10.7652 3.6569 10.7015C3.63065 10.6702 3.62386 10.6561 3.62574 10.6599C3.62674 10.6619 3.65 10.7079 3.65 10.7872H2.35C2.35 11.1287 2.542 11.3952 2.66081 11.5368C2.80011 11.7029 2.97193 11.8512 3.12945 11.97C3.28978 12.0909 3.45725 12.1977 3.60315 12.2772C3.67554 12.3166 3.75138 12.3541 3.82446 12.3838C3.86776 12.4013 4.0066 12.4585 4.16667 12.4585V11.1585ZM3.65 10.7872C3.65 10.9216 3.57592 11.0072 3.54813 11.0307C3.53416 11.0426 3.55178 11.0242 3.63287 10.9987C3.79127 10.9487 4.01147 10.9266 4.16667 10.9266V9.6266C3.93297 9.6266 3.56984 9.65551 3.24213 9.75878C3.08016 9.80982 2.87903 9.89358 2.70708 10.0395C2.5213 10.1971 2.35 10.4486 2.35 10.7872H3.65ZM4.16667 10.9266C4.38339 10.9266 4.67374 10.8461 4.93808 10.705C5.21996 10.5544 5.54348 10.2973 5.74855 9.88542L4.58478 9.30607C4.5304 9.41531 4.43725 9.49865 4.32567 9.55825C4.27078 9.58756 4.2187 9.60699 4.17897 9.61828C4.13015 9.63216 4.12658 9.6266 4.16667 9.6266V10.9266ZM5.71096 9.95105C6.06484 9.40893 7.35647 7.05488 7.91112 5.97861L6.75555 5.38309C6.19909 6.46285 4.93516 8.76128 4.62237 9.24044L5.71096 9.95105ZM7.85724 6.06559C7.85708 6.0658 7.85879 6.06347 7.86281 6.05879C7.86676 6.05417 7.87243 6.04788 7.87998 6.04013C7.89521 6.02451 7.91644 6.00465 7.94407 5.98208C7.99947 5.93681 8.07598 5.88441 8.1736 5.83481C8.36692 5.73658 8.64153 5.65 9 5.65V4.35C7.85839 4.35 7.09774 4.90351 6.80943 5.29611L7.85724 6.06559ZM4.52148 9.51678C4.41463 10.3898 4.6927 11.067 5.1682 11.5154C5.61657 11.9383 6.19799 12.1181 6.66667 12.1181V10.8181C6.49537 10.8181 6.24346 10.7426 6.06015 10.5697C5.90398 10.4224 5.75203 10.1634 5.81185 9.67471L4.52148 9.51678ZM6.66667 10.8181C6.18753 10.8181 5.57367 10.8176 5.05707 10.8632C4.80108 10.8857 4.53656 10.9221 4.31077 10.9871C4.19781 11.0197 4.07033 11.0661 3.95092 11.1368C3.83514 11.2053 3.67989 11.3245 3.58288 11.5227L4.75046 12.0943C4.69511 12.2074 4.61882 12.2521 4.61312 12.2555C4.60378 12.261 4.61751 12.2516 4.6707 12.2363C4.7772 12.2056 4.94477 12.1781 5.17128 12.1581C5.61969 12.1186 6.1725 12.1181 6.66667 12.1181V10.8181ZM6.66667 10.8181C6.66655 10.8181 6.66643 10.8181 6.66632 10.8181C6.6662 10.8181 6.66609 10.8181 6.66597 10.8181C6.66586 10.8181 6.66574 10.8181 6.66563 10.8181C6.66552 10.8181 6.6654 10.8181 6.66529 10.8181C6.66518 10.8181 6.66507 10.8181 6.66496 10.8181C6.66484 10.8181 6.66473 10.8181 6.66462 10.8181C6.66451 10.8181 6.6644 10.8181 6.66429 10.8181C6.66418 10.8181 6.66408 10.8181 6.66397 10.8181C6.66386 10.8181 6.66375 10.8181 6.66365 10.8181C6.66354 10.8181 6.66343 10.8181 6.66333 10.8181C6.66322 10.8181 6.66311 10.8181 6.66301 10.8181C6.6629 10.8181 6.6628 10.8181 6.6627 10.8181C6.66259 10.8181 6.66249 10.8181 6.66239 10.8181C6.66228 10.8181 6.66218 10.8181 6.66208 10.8181C6.66198 10.8181 6.66188 10.8181 6.66178 10.8181C6.66168 10.8181 6.66158 10.8181 6.66148 10.8181C6.66138 10.8181 6.66128 10.8181 6.66118 10.8181C6.66108 10.8181 6.66098 10.8181 6.66089 10.8181C6.66079 10.8181 6.66069 10.8181 6.6606 10.8181C6.6605 10.8181 6.6604 10.8181 6.66031 10.8181C6.66021 10.8181 6.66012 10.8181 6.66002 10.8181C6.65993 10.8181 6.65984 10.8181 6.65974 10.8181C6.65965 10.8181 6.65956 10.8181 6.65946 10.8181C6.65937 10.8181 6.65928 10.8181 6.65919 10.8181C6.6591 10.8181 6.65901 10.8181 6.65892 10.8181C6.65883 10.8181 6.65874 10.8181 6.65865 10.8181C6.65856 10.8181 6.65847 10.8181 6.65838 10.8181C6.65829 10.8181 6.65821 10.8181 6.65812 10.8181C6.65803 10.8181 6.65795 10.8181 6.65786 10.8181C6.65777 10.8181 6.65769 10.8181 6.6576 10.8181C6.65752 10.8181 6.65743 10.8181 6.65735 10.8181C6.65726 10.8181 6.65718 10.8181 6.6571 10.8181C6.65701 10.8181 6.65693 10.8181 6.65685 10.8181C6.65677 10.8181 6.65669 10.8181 6.6566 10.8181C6.65652 10.8181 6.65644 10.8181 6.65636 10.8181C6.65628 10.8181 6.6562 10.8181 6.65612 10.8181C6.65604 10.8181 6.65597 10.8181 6.65589 10.8181C6.65581 10.8181 6.65573 10.8181 6.65565 10.8181C6.65558 10.8181 6.6555 10.8181 6.65542 10.8181C6.65535 10.8181 6.65527 10.8181 6.6552 10.8181C6.65512 10.8181 6.65505 10.8181 6.65497 10.8181C6.6549 10.8181 6.65482 10.8181 6.65475 10.8181C6.65468 10.8181 6.6546 10.8181 6.65453 10.8181C6.65446 10.8181 6.65439 10.8181 6.65432 10.8181C6.65424 10.8181 6.65417 10.8181 6.6541 10.8181C6.65403 10.8181 6.65396 10.8181 6.65389 10.8181C6.65382 10.8181 6.65375 10.8181 6.65369 10.8181C6.65362 10.8181 6.65355 10.8181 6.65348 10.8181C6.65341 10.8181 6.65335 10.8181 6.65328 10.8181C6.65321 10.8181 6.65315 10.8181 6.65308 10.8181C6.65301 10.8181 6.65295 10.8181 6.65288 10.8181C6.65282 10.8181 6.65275 10.8181 6.65269 10.8181C6.65263 10.8181 6.65256 10.8181 6.6525 10.8181C6.65244 10.8181 6.65237 10.8181 6.65231 10.8181C6.65225 10.8181 6.65219 10.8181 6.65213 10.8181C6.65206 10.8181 6.652 10.8181 6.65194 10.8181C6.65188 10.8181 6.65182 10.8181 6.65176 10.8181C6.6517 10.8181 6.65164 10.8181 6.65159 10.8181C6.65153 10.8181 6.65147 10.8181 6.65141 10.8181C6.65135 10.8181 6.6513 10.8181 6.65124 10.8181C6.65118 10.8181 6.65113 10.8181 6.65107 10.8181C6.65101 10.8181 6.65096 10.8181 6.6509 10.8181C6.65085 10.8181 6.65079 10.8181 6.65074 10.8181C6.65069 10.8181 6.65063 10.8181 6.65058 10.8181C6.65053 10.8181 6.65047 10.8181 6.65042 10.8181C6.65037 10.8181 6.65032 10.8181 6.65026 10.8181C6.65021 10.8181 6.65016 10.8181 6.65011 10.8181C6.65006 10.8181 6.65001 10.8181 6.64996 10.8181C6.64991 10.8181 6.64986 10.8181 6.64981 10.8181C6.64976 10.8181 6.64971 10.8181 6.64967 10.8181C6.64962 10.8181 6.64957 10.8181 6.64952 10.8181C6.64947 10.8181 6.64943 10.8181 6.64938 10.8181C6.64933 10.8181 6.64929 10.8181 6.64924 10.8181C6.6492 10.8181 6.64915 10.8181 6.64911 10.8181C6.64906 10.8181 6.64902 10.8181 6.64897 10.8181C6.64893 10.8181 6.64889 10.8181 6.64884 10.8181C6.6488 10.8181 6.64876 10.8181 6.64871 10.8181C6.64867 10.8181 6.64863 10.8181 6.64859 10.8181C6.64855 10.8181 6.64851 10.8181 6.64847 10.8181C6.64842 10.8181 6.64838 10.8181 6.64834 10.8181C6.6483 10.8181 6.64827 10.8181 6.64823 10.8181C6.64819 10.8181 6.64815 10.8181 6.64811 10.8181C6.64807 10.8181 6.64803 10.8181 6.648 10.8181C6.64796 10.8181 6.64792 10.8181 6.64788 10.8181C6.64785 10.8181 6.64781 10.8181 6.64778 10.8181C6.64774 10.8181 6.6477 10.8181 6.64767 10.8181C6.64763 10.8181 6.6476 10.8181 6.64756 10.8181C6.64753 10.8181 6.6475 10.8181 6.64746 10.8181C6.64743 10.8181 6.6474 10.8181 6.64736 10.8181C6.64733 10.8181 6.6473 10.8181 6.64727 10.8181C6.64723 10.8181 6.6472 10.8181 6.64717 10.8181C6.64714 10.8181 6.64711 10.8181 6.64708 10.8181C6.64705 10.8181 6.64702 10.8181 6.64699 10.8181C6.64696 10.8181 6.64693 10.8181 6.6469 10.8181C6.64687 10.8181 6.64684 10.8181 6.64681 10.8181C6.64679 10.8181 6.64676 10.8181 6.64673 10.8181C6.6467 10.8181 6.64668 10.8181 6.64665 10.8181C6.64662 10.8181 6.6466 10.8181 6.64657 10.8181C6.64654 10.8181 6.64652 10.8181 6.64649 10.8181C6.64647 10.8181 6.64644 10.8181 6.64642 10.8181C6.64639 10.8181 6.64637 10.8181 6.64635 10.8181C6.64632 10.8181 6.6463 10.8181 6.64628 10.8181C6.64625 10.8181 6.64623 10.8181 6.64621 10.8181C6.64618 10.8181 6.64616 10.8181 6.64614 10.8181C6.64612 10.8181 6.6461 10.8181 6.64608 10.8181C6.64606 10.8181 6.64604 10.8181 6.64602 10.8181C6.646 10.8181 6.64598 10.8181 6.64596 10.8181C6.64594 10.8181 6.64592 10.8181 6.6459 10.8181C6.64588 10.8181 6.64586 10.8181 6.64584 10.8181C6.64582 10.8181 6.64581 10.8181 6.64579 10.8181C6.64577 10.8181 6.64576 10.8181 6.64574 10.8181C6.64572 10.8181 6.6457 10.8181 6.64569 10.8181C6.64567 10.8181 6.64566 10.8181 6.64564 10.8181C6.64563 10.8181 6.64561 10.8181 6.6456 10.8181C6.64558 10.8181 6.64557 10.8181 6.64555 10.8181C6.64554 10.8181 6.64553 10.8181 6.64551 10.8181C6.6455 10.8181 6.64549 10.8181 6.64547 10.8181C6.64546 10.8181 6.64545 10.8181 6.64544 10.8181C6.64542 10.8181 6.64541 10.8181 6.6454 10.8181C6.64539 10.8181 6.64538 10.8181 6.64537 10.8181C6.64536 10.8181 6.64535 10.8181 6.64534 10.8181C6.64533 10.8181 6.64532 10.8181 6.64531 10.8181C6.6453 10.8181 6.64529 10.8181 6.64528 10.8181C6.64527 10.8181 6.64526 10.8181 6.64525 10.8181C6.64525 10.8181 6.64524 10.8181 6.64523 10.8181C6.64522 10.8181 6.64522 10.8181 6.64521 10.8181C6.6452 10.8181 6.6452 10.8181 6.64519 10.8181C6.64518 10.8181 6.64518 10.8181 6.64517 10.8181C6.64517 10.8181 6.64516 10.8181 6.64516 10.8181C6.64515 10.8181 6.64515 10.8181 6.64514 10.8181C6.64514 10.8181 6.64513 10.8181 6.64513 10.8181C6.64513 10.8181 6.64512 10.8181 6.64512 10.8181C6.64512 10.8181 6.64511 10.8181 6.64511 10.8181C6.64511 10.8181 6.64511 10.8181 6.6451 10.8181C6.6451 10.8181 6.6451 10.8181 6.6451 10.8181C6.6451 10.8181 6.6451 10.8181 6.6451 10.8181C6.6451 10.8181 6.64509 10.8181 6.64509 10.8181C6.64509 11.4681 6.64509 12.1181 6.6451 12.1181C6.6451 12.1181 6.6451 12.1181 6.6451 12.1181C6.6451 12.1181 6.6451 12.1181 6.6451 12.1181C6.6451 12.1181 6.6451 12.1181 6.64511 12.1181C6.64511 12.1181 6.64511 12.1181 6.64511 12.1181C6.64512 12.1181 6.64512 12.1181 6.64512 12.1181C6.64513 12.1181 6.64513 12.1181 6.64513 12.1181C6.64514 12.1181 6.64514 12.1181 6.64515 12.1181C6.64515 12.1181 6.64515 12.1181 6.64516 12.1181C6.64516 12.1181 6.64517 12.1181 6.64518 12.1181C6.64518 12.1181 6.64519 12.1181 6.64519 12.1181C6.6452 12.1181 6.6452 12.1181 6.64521 12.1181C6.64522 12.1181 6.64522 12.1181 6.64523 12.1181C6.64524 12.1181 6.64525 12.1181 6.64525 12.1181C6.64526 12.1181 6.64527 12.1181 6.64528 12.1181C6.64529 12.1181 6.64529 12.1181 6.6453 12.1181C6.64531 12.1181 6.64532 12.1181 6.64533 12.1181C6.64534 12.1181 6.64535 12.1181 6.64536 12.1181C6.64537 12.1181 6.64538 12.1181 6.64539 12.1181C6.6454 12.1181 6.64541 12.1181 6.64542 12.1181C6.64543 12.1181 6.64544 12.1181 6.64545 12.1181C6.64546 12.1181 6.64548 12.1181 6.64549 12.1181C6.6455 12.1181 6.64551 12.1181 6.64552 12.1181C6.64554 12.1181 6.64555 12.1181 6.64556 12.1181C6.64557 12.1181 6.64559 12.1181 6.6456 12.1181C6.64561 12.1181 6.64563 12.1181 6.64564 12.1181C6.64566 12.1181 6.64567 12.1181 6.64568 12.1181C6.6457 12.1181 6.64571 12.1181 6.64573 12.1181C6.64574 12.1181 6.64576 12.1181 6.64577 12.1181C6.64579 12.1181 6.6458 12.1181 6.64582 12.1181C6.64583 12.1181 6.64585 12.1181 6.64587 12.1181C6.64588 12.1181 6.6459 12.1181 6.64592 12.1181C6.64593 12.1181 6.64595 12.1181 6.64597 12.1181C6.64598 12.1181 6.646 12.1181 6.64602 12.1181C6.64603 12.1181 6.64605 12.1181 6.64607 12.1181C6.64609 12.1181 6.64611 12.1181 6.64613 12.1181C6.64614 12.1181 6.64616 12.1181 6.64618 12.1181C6.6462 12.1181 6.64622 12.1181 6.64624 12.1181C6.64626 12.1181 6.64628 12.1181 6.6463 12.1181C6.64632 12.1181 6.64634 12.1181 6.64636 12.1181C6.64638 12.1181 6.6464 12.1181 6.64642 12.1181C6.64644 12.1181 6.64646 12.1181 6.64648 12.1181C6.6465 12.1181 6.64652 12.1181 6.64654 12.1181C6.64657 12.1181 6.64659 12.1181 6.64661 12.1181C6.64663 12.1181 6.64665 12.1181 6.64668 12.1181C6.6467 12.1181 6.64672 12.1181 6.64674 12.1181C6.64677 12.1181 6.64679 12.1181 6.64681 12.1181C6.64684 12.1181 6.64686 12.1181 6.64688 12.1181C6.64691 12.1181 6.64693 12.1181 6.64695 12.1181C6.64698 12.1181 6.647 12.1181 6.64703 12.1181C6.64705 12.1181 6.64707 12.1181 6.6471 12.1181C6.64712 12.1181 6.64715 12.1181 6.64717 12.1181C6.6472 12.1181 6.64722 12.1181 6.64725 12.1181C6.64728 12.1181 6.6473 12.1181 6.64733 12.1181C6.64735 12.1181 6.64738 12.1181 6.64741 12.1181C6.64743 12.1181 6.64746 12.1181 6.64748 12.1181C6.64751 12.1181 6.64754 12.1181 6.64756 12.1181C6.64759 12.1181 6.64762 12.1181 6.64765 12.1181C6.64767 12.1181 6.6477 12.1181 6.64773 12.1181C6.64776 12.1181 6.64778 12.1181 6.64781 12.1181C6.64784 12.1181 6.64787 12.1181 6.6479 12.1181C6.64793 12.1181 6.64795 12.1181 6.64798 12.1181C6.64801 12.1181 6.64804 12.1181 6.64807 12.1181C6.6481 12.1181 6.64813 12.1181 6.64816 12.1181C6.64819 12.1181 6.64822 12.1181 6.64825 12.1181C6.64828 12.1181 6.64831 12.1181 6.64834 12.1181C6.64837 12.1181 6.6484 12.1181 6.64843 12.1181C6.64846 12.1181 6.64849 12.1181 6.64852 12.1181C6.64855 12.1181 6.64858 12.1181 6.64861 12.1181C6.64864 12.1181 6.64867 12.1181 6.64871 12.1181C6.64874 12.1181 6.64877 12.1181 6.6488 12.1181C6.64883 12.1181 6.64886 12.1181 6.6489 12.1181C6.64893 12.1181 6.64896 12.1181 6.64899 12.1181C6.64902 12.1181 6.64906 12.1181 6.64909 12.1181C6.64912 12.1181 6.64916 12.1181 6.64919 12.1181C6.64922 12.1181 6.64925 12.1181 6.64929 12.1181C6.64932 12.1181 6.64935 12.1181 6.64939 12.1181C6.64942 12.1181 6.64946 12.1181 6.64949 12.1181C6.64952 12.1181 6.64956 12.1181 6.64959 12.1181C6.64963 12.1181 6.64966 12.1181 6.64969 12.1181C6.64973 12.1181 6.64976 12.1181 6.6498 12.1181C6.64983 12.1181 6.64987 12.1181 6.6499 12.1181C6.64994 12.1181 6.64997 12.1181 6.65001 12.1181C6.65004 12.1181 6.65008 12.1181 6.65011 12.1181C6.65015 12.1181 6.65018 12.1181 6.65022 12.1181C6.65026 12.1181 6.65029 12.1181 6.65033 12.1181C6.65036 12.1181 6.6504 12.1181 6.65044 12.1181C6.65047 12.1181 6.65051 12.1181 6.65054 12.1181C6.65058 12.1181 6.65062 12.1181 6.65065 12.1181C6.65069 12.1181 6.65073 12.1181 6.65076 12.1181C6.6508 12.1181 6.65084 12.1181 6.65088 12.1181C6.65091 12.1181 6.65095 12.1181 6.65099 12.1181C6.65103 12.1181 6.65106 12.1181 6.6511 12.1181C6.65114 12.1181 6.65118 12.1181 6.65121 12.1181C6.65125 12.1181 6.65129 12.1181 6.65133 12.1181C6.65137 12.1181 6.6514 12.1181 6.65144 12.1181C6.65148 12.1181 6.65152 12.1181 6.65156 12.1181C6.6516 12.1181 6.65164 12.1181 6.65167 12.1181C6.65171 12.1181 6.65175 12.1181 6.65179 12.1181C6.65183 12.1181 6.65187 12.1181 6.65191 12.1181C6.65195 12.1181 6.65199 12.1181 6.65203 12.1181C6.65206 12.1181 6.6521 12.1181 6.65214 12.1181C6.65218 12.1181 6.65222 12.1181 6.65226 12.1181C6.6523 12.1181 6.65234 12.1181 6.65238 12.1181C6.65242 12.1181 6.65246 12.1181 6.6525 12.1181C6.65254 12.1181 6.65258 12.1181 6.65262 12.1181C6.65266 12.1181 6.6527 12.1181 6.65274 12.1181C6.65278 12.1181 6.65282 12.1181 6.65287 12.1181C6.65291 12.1181 6.65295 12.1181 6.65299 12.1181C6.65303 12.1181 6.65307 12.1181 6.65311 12.1181C6.65315 12.1181 6.65319 12.1181 6.65323 12.1181C6.65327 12.1181 6.65332 12.1181 6.65336 12.1181C6.6534 12.1181 6.65344 12.1181 6.65348 12.1181C6.65352 12.1181 6.65356 12.1181 6.65361 12.1181C6.65365 12.1181 6.65369 12.1181 6.65373 12.1181C6.65377 12.1181 6.65381 12.1181 6.65386 12.1181C6.6539 12.1181 6.65394 12.1181 6.65398 12.1181C6.65402 12.1181 6.65407 12.1181 6.65411 12.1181C6.65415 12.1181 6.65419 12.1181 6.65423 12.1181C6.65428 12.1181 6.65432 12.1181 6.65436 12.1181C6.6544 12.1181 6.65445 12.1181 6.65449 12.1181C6.65453 12.1181 6.65457 12.1181 6.65462 12.1181C6.65466 12.1181 6.6547 12.1181 6.65474 12.1181C6.65479 12.1181 6.65483 12.1181 6.65487 12.1181C6.65492 12.1181 6.65496 12.1181 6.655 12.1181C6.65504 12.1181 6.65509 12.1181 6.65513 12.1181C6.65517 12.1181 6.65522 12.1181 6.65526 12.1181C6.6553 12.1181 6.65535 12.1181 6.65539 12.1181C6.65543 12.1181 6.65548 12.1181 6.65552 12.1181C6.65556 12.1181 6.65561 12.1181 6.65565 12.1181C6.65569 12.1181 6.65574 12.1181 6.65578 12.1181C6.65582 12.1181 6.65587 12.1181 6.65591 12.1181C6.65595 12.1181 6.656 12.1181 6.65604 12.1181C6.65608 12.1181 6.65613 12.1181 6.65617 12.1181C6.65622 12.1181 6.65626 12.1181 6.6563 12.1181C6.65635 12.1181 6.65639 12.1181 6.65644 12.1181C6.65648 12.1181 6.65652 12.1181 6.65657 12.1181C6.65661 12.1181 6.65665 12.1181 6.6567 12.1181C6.65674 12.1181 6.65679 12.1181 6.65683 12.1181C6.65687 12.1181 6.65692 12.1181 6.65696 12.1181C6.65701 12.1181 6.65705 12.1181 6.65709 12.1181C6.65714 12.1181 6.65718 12.1181 6.65723 12.1181C6.65727 12.1181 6.65732 12.1181 6.65736 12.1181C6.6574 12.1181 6.65745 12.1181 6.65749 12.1181C6.65754 12.1181 6.65758 12.1181 6.65762 12.1181C6.65767 12.1181 6.65771 12.1181 6.65776 12.1181C6.6578 12.1181 6.65785 12.1181 6.65789 12.1181C6.65793 12.1181 6.65798 12.1181 6.65802 12.1181C6.65807 12.1181 6.65811 12.1181 6.65816 12.1181C6.6582 12.1181 6.65824 12.1181 6.65829 12.1181C6.65833 12.1181 6.65838 12.1181 6.65842 12.1181C6.65847 12.1181 6.65851 12.1181 6.65856 12.1181C6.6586 12.1181 6.65864 12.1181 6.65869 12.1181C6.65873 12.1181 6.65878 12.1181 6.65882 12.1181C6.65887 12.1181 6.65891 12.1181 6.65895 12.1181C6.659 12.1181 6.65904 12.1181 6.65909 12.1181C6.65913 12.1181 6.65918 12.1181 6.65922 12.1181C6.65926 12.1181 6.65931 12.1181 6.65935 12.1181C6.6594 12.1181 6.65944 12.1181 6.65949 12.1181C6.65953 12.1181 6.65957 12.1181 6.65962 12.1181C6.65966 12.1181 6.65971 12.1181 6.65975 12.1181C6.65979 12.1181 6.65984 12.1181 6.65988 12.1181C6.65993 12.1181 6.65997 12.1181 6.66001 12.1181C6.66006 12.1181 6.6601 12.1181 6.66015 12.1181C6.66019 12.1181 6.66024 12.1181 6.66028 12.1181C6.66032 12.1181 6.66037 12.1181 6.66041 12.1181C6.66045 12.1181 6.6605 12.1181 6.66054 12.1181C6.66059 12.1181 6.66063 12.1181 6.66067 12.1181C6.66072 12.1181 6.66076 12.1181 6.66081 12.1181C6.66085 12.1181 6.66089 12.1181 6.66094 12.1181C6.66098 12.1181 6.66102 12.1181 6.66107 12.1181C6.66111 12.1181 6.66115 12.1181 6.6612 12.1181C6.66124 12.1181 6.66129 12.1181 6.66133 12.1181C6.66137 12.1181 6.66142 12.1181 6.66146 12.1181C6.6615 12.1181 6.66155 12.1181 6.66159 12.1181C6.66163 12.1181 6.66168 12.1181 6.66172 12.1181C6.66176 12.1181 6.6618 12.1181 6.66185 12.1181C6.66189 12.1181 6.66193 12.1181 6.66198 12.1181C6.66202 12.1181 6.66206 12.1181 6.66211 12.1181C6.66215 12.1181 6.66219 12.1181 6.66223 12.1181C6.66228 12.1181 6.66232 12.1181 6.66236 12.1181C6.66241 12.1181 6.66245 12.1181 6.66249 12.1181C6.66253 12.1181 6.66258 12.1181 6.66262 12.1181C6.66266 12.1181 6.6627 12.1181 6.66274 12.1181C6.66279 12.1181 6.66283 12.1181 6.66287 12.1181C6.66291 12.1181 6.66296 12.1181 6.663 12.1181C6.66304 12.1181 6.66308 12.1181 6.66312 12.1181C6.66317 12.1181 6.66321 12.1181 6.66325 12.1181C6.66329 12.1181 6.66333 12.1181 6.66337 12.1181C6.66342 12.1181 6.66346 12.1181 6.6635 12.1181C6.66354 12.1181 6.66358 12.1181 6.66362 12.1181C6.66366 12.1181 6.66371 12.1181 6.66375 12.1181C6.66379 12.1181 6.66383 12.1181 6.66387 12.1181C6.66391 12.1181 6.66395 12.1181 6.66399 12.1181C6.66403 12.1181 6.66408 12.1181 6.66412 12.1181C6.66416 12.1181 6.6642 12.1181 6.66424 12.1181C6.66428 12.1181 6.66432 12.1181 6.66436 12.1181C6.6644 12.1181 6.66444 12.1181 6.66448 12.1181C6.66452 12.1181 6.66456 12.1181 6.6646 12.1181C6.66464 12.1181 6.66468 12.1181 6.66472 12.1181C6.66476 12.1181 6.6648 12.1181 6.66484 12.1181C6.66488 12.1181 6.66492 12.1181 6.66496 12.1181C6.665 12.1181 6.66504 12.1181 6.66508 12.1181C6.66511 12.1181 6.66515 12.1181 6.66519 12.1181C6.66523 12.1181 6.66527 12.1181 6.66531 12.1181C6.66535 12.1181 6.66539 12.1181 6.66543 12.1181C6.66546 12.1181 6.6655 12.1181 6.66554 12.1181C6.66558 12.1181 6.66562 12.1181 6.66566 12.1181C6.66569 12.1181 6.66573 12.1181 6.66577 12.1181C6.66581 12.1181 6.66585 12.1181 6.66588 12.1181C6.66592 12.1181 6.66596 12.1181 6.666 12.1181C6.66603 12.1181 6.66607 12.1181 6.66611 12.1181C6.66615 12.1181 6.66618 12.1181 6.66622 12.1181C6.66626 12.1181 6.66629 12.1181 6.66633 12.1181C6.66637 12.1181 6.6664 12.1181 6.66644 12.1181C6.66648 12.1181 6.66651 12.1181 6.66655 12.1181C6.66659 12.1181 6.66662 12.1181 6.66666 12.1181C6.6667 12.1181 6.66673 12.1181 6.66677 12.1181C6.6668 12.1181 6.66684 12.1181 6.66687 12.1181C6.66691 12.1181 6.66695 12.1181 6.66698 12.1181C6.66702 12.1181 6.66705 12.1181 6.66709 12.1181C6.66712 12.1181 6.66716 12.1181 6.66719 12.1181C6.66723 12.1181 6.66726 12.1181 6.66729 12.1181C6.66733 12.1181 6.66736 12.1181 6.6674 12.1181C6.66743 12.1181 6.66747 12.1181 6.6675 12.1181C6.66753 12.1181 6.66757 12.1181 6.6676 12.1181C6.66763 12.1181 6.66767 12.1181 6.6677 12.1181C6.66774 12.1181 6.66777 12.1181 6.6678 12.1181C6.66783 12.1181 6.66787 12.1181 6.6679 12.1181C6.66793 12.1181 6.66797 12.1181 6.668 12.1181C6.66803 12.1181 6.66806 12.1181 6.66809 12.1181C6.66813 12.1181 6.66816 12.1181 6.66819 12.1181C6.66822 12.1181 6.66825 12.1181 6.66829 12.1181C6.66832 12.1181 6.66835 12.1181 6.66838 12.1181C6.66841 12.1181 6.66844 12.1181 6.66847 12.1181C6.6685 12.1181 6.66853 12.1181 6.66857 12.1181C6.6686 12.1181 6.66863 12.1181 6.66866 12.1181C6.66869 12.1181 6.66872 12.1181 6.66875 12.1181C6.66878 12.1181 6.66881 12.1181 6.66884 12.1181C6.66887 12.1181 6.6689 12.1181 6.66892 12.1181C6.66895 12.1181 6.66898 12.1181 6.66901 12.1181C6.66904 12.1181 6.66907 12.1181 6.6691 12.1181C6.66913 12.1181 6.66915 12.1181 6.66918 12.1181C6.66921 12.1181 6.66924 12.1181 6.66927 12.1181C6.66929 12.1181 6.66932 12.1181 6.66935 12.1181C6.66938 12.1181 6.6694 12.1181 6.66943 12.1181C6.66946 12.1181 6.66949 12.1181 6.66951 12.1181C6.66954 12.1181 6.66957 12.1181 6.66959 12.1181C6.66962 12.1181 6.66965 12.1181 6.66967 12.1181C6.6697 12.1181 6.66972 12.1181 6.66975 12.1181C6.66977 12.1181 6.6698 12.1181 6.66982 12.1181C6.66985 12.1181 6.66988 12.1181 6.6699 12.1181C6.66992 12.1181 6.66995 12.1181 6.66997 12.1181C6.67 12.1181 6.67002 12.1181 6.67005 12.1181C6.67007 12.1181 6.67009 12.1181 6.67012 12.1181C6.67014 12.1181 6.67017 12.1181 6.67019 12.1181C6.67021 12.1181 6.67024 12.1181 6.67026 12.1181C6.67028 12.1181 6.6703 12.1181 6.67033 12.1181C6.67035 12.1181 6.67037 12.1181 6.67039 12.1181C6.67041 12.1181 6.67044 12.1181 6.67046 12.1181C6.67048 12.1181 6.6705 12.1181 6.67052 12.1181C6.67054 12.1181 6.67056 12.1181 6.67059 12.1181C6.67061 12.1181 6.67063 12.1181 6.67065 12.1181C6.67067 12.1181 6.67069 12.1181 6.67071 12.1181C6.67073 12.1181 6.67075 12.1181 6.67077 12.1181C6.67079 12.1181 6.67081 12.1181 6.67082 12.1181C6.67084 12.1181 6.67086 12.1181 6.67088 12.1181C6.6709 12.1181 6.67092 12.1181 6.67094 12.1181C6.67095 12.1181 6.67097 12.1181 6.67099 12.1181C6.67101 12.1181 6.67103 12.1181 6.67104 12.1181C6.67106 12.1181 6.67108 12.1181 6.67109 12.1181C6.67111 12.1181 6.67113 12.1181 6.67114 12.1181C6.67116 12.1181 6.67118 12.1181 6.67119 12.1181C6.67121 12.1181 6.67122 12.1181 6.67124 12.1181C6.67125 12.1181 6.67127 12.1181 6.67128 12.1181C6.6713 12.1181 6.67131 12.1181 6.67133 12.1181C6.67134 12.1181 6.67136 12.1181 6.67137 12.1181C6.67138 12.1181 6.6714 12.1181 6.67141 12.1181C6.67142 12.1181 6.67144 12.1181 6.67145 12.1181C6.67146 12.1181 6.67148 12.1181 6.67149 12.1181C6.6715 12.1181 6.67151 12.1181 6.67153 12.1181C6.67154 12.1181 6.67155 12.1181 6.67156 12.1181C6.67157 12.1181 6.67158 12.1181 6.67159 12.1181C6.67161 12.1181 6.67162 12.1181 6.67163 12.1181C6.67164 12.1181 6.67165 12.1181 6.67166 12.1181C6.67167 12.1181 6.67168 12.1181 6.67169 12.1181C6.6717 12.1181 6.67171 12.1181 6.67171 12.1181C6.67172 12.1181 6.67173 12.1181 6.67174 12.1181C6.67175 12.1181 6.67176 12.1181 6.67176 12.1181C6.67177 12.1181 6.67178 12.1181 6.67179 12.1181C6.67179 12.1181 6.6718 12.1181 6.67181 12.1181C6.67182 12.1181 6.67182 12.1181 6.67183 12.1181C6.67183 12.1181 6.67184 12.1181 6.67185 12.1181C6.67185 12.1181 6.67186 12.1181 6.67186 12.1181C6.67187 12.1181 6.67187 12.1181 6.67188 12.1181C6.67188 12.1181 6.67189 12.1181 6.67189 12.1181C6.67189 12.1181 6.6719 12.1181 6.6719 12.1181C6.6719 12.1181 6.67191 12.1181 6.67191 12.1181C6.67191 12.1181 6.67192 12.1181 6.67192 12.1181C6.67192 12.1181 6.67192 12.1181 6.67192 12.1181C6.67193 12.1181 6.67193 12.1181 6.67193 12.1181C6.67193 12.1181 6.67193 12.1181 6.67193 12.1181C6.67193 12.1181 6.67193 12.1181 6.67193 12.1181C6.67193 11.4681 6.67193 10.8181 6.67193 10.8181C6.67193 10.8181 6.67193 10.8181 6.67193 10.8181C6.67193 10.8181 6.67193 10.8181 6.67193 10.8181C6.67192 10.8181 6.67192 10.8181 6.67192 10.8181C6.67192 10.8181 6.67191 10.8181 6.67191 10.8181C6.67191 10.8181 6.67191 10.8181 6.6719 10.8181C6.6719 10.8181 6.67189 10.8181 6.67189 10.8181C6.67189 10.8181 6.67188 10.8181 6.67188 10.8181C6.67187 10.8181 6.67187 10.8181 6.67186 10.8181C6.67186 10.8181 6.67185 10.8181 6.67184 10.8181C6.67184 10.8181 6.67183 10.8181 6.67183 10.8181C6.67182 10.8181 6.67181 10.8181 6.6718 10.8181C6.6718 10.8181 6.67179 10.8181 6.67178 10.8181C6.67177 10.8181 6.67177 10.8181 6.67176 10.8181C6.67175 10.8181 6.67174 10.8181 6.67173 10.8181C6.67172 10.8181 6.67171 10.8181 6.6717 10.8181C6.67169 10.8181 6.67168 10.8181 6.67167 10.8181C6.67166 10.8181 6.67165 10.8181 6.67164 10.8181C6.67163 10.8181 6.67162 10.8181 6.6716 10.8181C6.67159 10.8181 6.67158 10.8181 6.67157 10.8181C6.67156 10.8181 6.67154 10.8181 6.67153 10.8181C6.67152 10.8181 6.6715 10.8181 6.67149 10.8181C6.67148 10.8181 6.67146 10.8181 6.67145 10.8181C6.67143 10.8181 6.67142 10.8181 6.6714 10.8181C6.67139 10.8181 6.67137 10.8181 6.67136 10.8181C6.67134 10.8181 6.67132 10.8181 6.67131 10.8181C6.67129 10.8181 6.67127 10.8181 6.67126 10.8181C6.67124 10.8181 6.67122 10.8181 6.67121 10.8181C6.67119 10.8181 6.67117 10.8181 6.67115 10.8181C6.67113 10.8181 6.67111 10.8181 6.67109 10.8181C6.67107 10.8181 6.67105 10.8181 6.67103 10.8181C6.67101 10.8181 6.67099 10.8181 6.67097 10.8181C6.67095 10.8181 6.67093 10.8181 6.67091 10.8181C6.67089 10.8181 6.67087 10.8181 6.67085 10.8181C6.67082 10.8181 6.6708 10.8181 6.67078 10.8181C6.67076 10.8181 6.67073 10.8181 6.67071 10.8181C6.67069 10.8181 6.67066 10.8181 6.67064 10.8181C6.67061 10.8181 6.67059 10.8181 6.67056 10.8181C6.67054 10.8181 6.67051 10.8181 6.67049 10.8181C6.67046 10.8181 6.67043 10.8181 6.67041 10.8181C6.67038 10.8181 6.67036 10.8181 6.67033 10.8181C6.6703 10.8181 6.67027 10.8181 6.67025 10.8181C6.67022 10.8181 6.67019 10.8181 6.67016 10.8181C6.67013 10.8181 6.6701 10.8181 6.67007 10.8181C6.67004 10.8181 6.67001 10.8181 6.66998 10.8181C6.66995 10.8181 6.66992 10.8181 6.66989 10.8181C6.66986 10.8181 6.66983 10.8181 6.6698 10.8181C6.66977 10.8181 6.66973 10.8181 6.6697 10.8181C6.66967 10.8181 6.66964 10.8181 6.6696 10.8181C6.66957 10.8181 6.66954 10.8181 6.6695 10.8181C6.66947 10.8181 6.66943 10.8181 6.6694 10.8181C6.66936 10.8181 6.66933 10.8181 6.66929 10.8181C6.66926 10.8181 6.66922 10.8181 6.66918 10.8181C6.66915 10.8181 6.66911 10.8181 6.66907 10.8181C6.66904 10.8181 6.669 10.8181 6.66896 10.8181C6.66892 10.8181 6.66888 10.8181 6.66885 10.8181C6.66881 10.8181 6.66877 10.8181 6.66873 10.8181C6.66869 10.8181 6.66865 10.8181 6.66861 10.8181C6.66857 10.8181 6.66853 10.8181 6.66849 10.8181C6.66844 10.8181 6.6684 10.8181 6.66836 10.8181C6.66832 10.8181 6.66828 10.8181 6.66823 10.8181C6.66819 10.8181 6.66815 10.8181 6.6681 10.8181C6.66806 10.8181 6.66802 10.8181 6.66797 10.8181C6.66793 10.8181 6.66788 10.8181 6.66784 10.8181C6.66779 10.8181 6.66775 10.8181 6.6677 10.8181C6.66765 10.8181 6.66761 10.8181 6.66756 10.8181C6.66751 10.8181 6.66746 10.8181 6.66742 10.8181C6.66737 10.8181 6.66732 10.8181 6.66727 10.8181C6.66722 10.8181 6.66717 10.8181 6.66712 10.8181C6.66707 10.8181 6.66702 10.8181 6.66697 10.8181C6.66692 10.8181 6.66687 10.8181 6.66682 10.8181C6.66677 10.8181 6.66672 10.8181 6.66667 10.8181V12.1181C6.66672 12.1181 6.66677 12.1181 6.66682 12.1181C6.66687 12.1181 6.66692 12.1181 6.66697 12.1181C6.66702 12.1181 6.66707 12.1181 6.66712 12.1181C6.66717 12.1181 6.66722 12.1181 6.66727 12.1181C6.66732 12.1181 6.66737 12.1181 6.66742 12.1181C6.66746 12.1181 6.66751 12.1181 6.66756 12.1181C6.66761 12.1181 6.66765 12.1181 6.6677 12.1181C6.66775 12.1181 6.66779 12.1181 6.66784 12.1181C6.66788 12.1181 6.66793 12.1181 6.66797 12.1181C6.66802 12.1181 6.66806 12.1181 6.6681 12.1181C6.66815 12.1181 6.66819 12.1181 6.66823 12.1181C6.66828 12.1181 6.66832 12.1181 6.66836 12.1181C6.6684 12.1181 6.66844 12.1181 6.66849 12.1181C6.66853 12.1181 6.66857 12.1181 6.66861 12.1181C6.66865 12.1181 6.66869 12.1181 6.66873 12.1181C6.66877 12.1181 6.66881 12.1181 6.66885 12.1181C6.66888 12.1181 6.66892 12.1181 6.66896 12.1181C6.669 12.1181 6.66904 12.1181 6.66907 12.1181C6.66911 12.1181 6.66915 12.1181 6.66918 12.1181C6.66922 12.1181 6.66926 12.1181 6.66929 12.1181C6.66933 12.1181 6.66936 12.1181 6.6694 12.1181C6.66943 12.1181 6.66947 12.1181 6.6695 12.1181C6.66954 12.1181 6.66957 12.1181 6.6696 12.1181C6.66964 12.1181 6.66967 12.1181 6.6697 12.1181C6.66973 12.1181 6.66977 12.1181 6.6698 12.1181C6.66983 12.1181 6.66986 12.1181 6.66989 12.1181C6.66992 12.1181 6.66995 12.1181 6.66998 12.1181C6.67001 12.1181 6.67004 12.1181 6.67007 12.1181C6.6701 12.1181 6.67013 12.1181 6.67016 12.1181C6.67019 12.1181 6.67022 12.1181 6.67025 12.1181C6.67027 12.1181 6.6703 12.1181 6.67033 12.1181C6.67036 12.1181 6.67038 12.1181 6.67041 12.1181C6.67043 12.1181 6.67046 12.1181 6.67049 12.1181C6.67051 12.1181 6.67054 12.1181 6.67056 12.1181C6.67059 12.1181 6.67061 12.1181 6.67064 12.1181C6.67066 12.1181 6.67069 12.1181 6.67071 12.1181C6.67073 12.1181 6.67076 12.1181 6.67078 12.1181C6.6708 12.1181 6.67082 12.1181 6.67085 12.1181C6.67087 12.1181 6.67089 12.1181 6.67091 12.1181C6.67093 12.1181 6.67095 12.1181 6.67097 12.1181C6.67099 12.1181 6.67101 12.1181 6.67103 12.1181C6.67105 12.1181 6.67107 12.1181 6.67109 12.1181C6.67111 12.1181 6.67113 12.1181 6.67115 12.1181C6.67117 12.1181 6.67119 12.1181 6.67121 12.1181C6.67122 12.1181 6.67124 12.1181 6.67126 12.1181C6.67127 12.1181 6.67129 12.1181 6.67131 12.1181C6.67132 12.1181 6.67134 12.1181 6.67136 12.1181C6.67137 12.1181 6.67139 12.1181 6.6714 12.1181C6.67142 12.1181 6.67143 12.1181 6.67145 12.1181C6.67146 12.1181 6.67148 12.1181 6.67149 12.1181C6.6715 12.1181 6.67152 12.1181 6.67153 12.1181C6.67154 12.1181 6.67156 12.1181 6.67157 12.1181C6.67158 12.1181 6.67159 12.1181 6.6716 12.1181C6.67162 12.1181 6.67163 12.1181 6.67164 12.1181C6.67165 12.1181 6.67166 12.1181 6.67167 12.1181C6.67168 12.1181 6.67169 12.1181 6.6717 12.1181C6.67171 12.1181 6.67172 12.1181 6.67173 12.1181C6.67174 12.1181 6.67175 12.1181 6.67176 12.1181C6.67177 12.1181 6.67177 12.1181 6.67178 12.1181C6.67179 12.1181 6.6718 12.1181 6.6718 12.1181C6.67181 12.1181 6.67182 12.1181 6.67183 12.1181C6.67183 12.1181 6.67184 12.1181 6.67184 12.1181C6.67185 12.1181 6.67186 12.1181 6.67186 12.1181C6.67187 12.1181 6.67187 12.1181 6.67188 12.1181C6.67188 12.1181 6.67189 12.1181 6.67189 12.1181C6.67189 12.1181 6.6719 12.1181 6.6719 12.1181C6.67191 12.1181 6.67191 12.1181 6.67191 12.1181C6.67191 12.1181 6.67192 12.1181 6.67192 12.1181C6.67192 12.1181 6.67192 12.1181 6.67193 12.1181C6.67193 12.1181 6.67193 12.1181 6.67193 12.1181C6.67193 12.1181 6.67193 12.1181 6.67193 12.1181C6.67193 12.1181 6.67193 11.4681 6.67193 10.8181C6.67193 10.8181 6.67193 10.8181 6.67193 10.8181C6.67193 10.8181 6.67193 10.8181 6.67193 10.8181C6.67193 10.8181 6.67193 10.8181 6.67192 10.8181C6.67192 10.8181 6.67192 10.8181 6.67192 10.8181C6.67192 10.8181 6.67191 10.8181 6.67191 10.8181C6.67191 10.8181 6.6719 10.8181 6.6719 10.8181C6.6719 10.8181 6.67189 10.8181 6.67189 10.8181C6.67189 10.8181 6.67188 10.8181 6.67188 10.8181C6.67187 10.8181 6.67187 10.8181 6.67186 10.8181C6.67186 10.8181 6.67185 10.8181 6.67185 10.8181C6.67184 10.8181 6.67183 10.8181 6.67183 10.8181C6.67182 10.8181 6.67182 10.8181 6.67181 10.8181C6.6718 10.8181 6.67179 10.8181 6.67179 10.8181C6.67178 10.8181 6.67177 10.8181 6.67176 10.8181C6.67176 10.8181 6.67175 10.8181 6.67174 10.8181C6.67173 10.8181 6.67172 10.8181 6.67171 10.8181C6.67171 10.8181 6.6717 10.8181 6.67169 10.8181C6.67168 10.8181 6.67167 10.8181 6.67166 10.8181C6.67165 10.8181 6.67164 10.8181 6.67163 10.8181C6.67162 10.8181 6.67161 10.8181 6.67159 10.8181C6.67158 10.8181 6.67157 10.8181 6.67156 10.8181C6.67155 10.8181 6.67154 10.8181 6.67153 10.8181C6.67151 10.8181 6.6715 10.8181 6.67149 10.8181C6.67148 10.8181 6.67146 10.8181 6.67145 10.8181C6.67144 10.8181 6.67142 10.8181 6.67141 10.8181C6.6714 10.8181 6.67138 10.8181 6.67137 10.8181C6.67136 10.8181 6.67134 10.8181 6.67133 10.8181C6.67131 10.8181 6.6713 10.8181 6.67128 10.8181C6.67127 10.8181 6.67125 10.8181 6.67124 10.8181C6.67122 10.8181 6.67121 10.8181 6.67119 10.8181C6.67118 10.8181 6.67116 10.8181 6.67114 10.8181C6.67113 10.8181 6.67111 10.8181 6.67109 10.8181C6.67108 10.8181 6.67106 10.8181 6.67104 10.8181C6.67103 10.8181 6.67101 10.8181 6.67099 10.8181C6.67097 10.8181 6.67095 10.8181 6.67094 10.8181C6.67092 10.8181 6.6709 10.8181 6.67088 10.8181C6.67086 10.8181 6.67084 10.8181 6.67082 10.8181C6.67081 10.8181 6.67079 10.8181 6.67077 10.8181C6.67075 10.8181 6.67073 10.8181 6.67071 10.8181C6.67069 10.8181 6.67067 10.8181 6.67065 10.8181C6.67063 10.8181 6.67061 10.8181 6.67059 10.8181C6.67056 10.8181 6.67054 10.8181 6.67052 10.8181C6.6705 10.8181 6.67048 10.8181 6.67046 10.8181C6.67044 10.8181 6.67041 10.8181 6.67039 10.8181C6.67037 10.8181 6.67035 10.8181 6.67033 10.8181C6.6703 10.8181 6.67028 10.8181 6.67026 10.8181C6.67024 10.8181 6.67021 10.8181 6.67019 10.8181C6.67017 10.8181 6.67014 10.8181 6.67012 10.8181C6.67009 10.8181 6.67007 10.8181 6.67005 10.8181C6.67002 10.8181 6.67 10.8181 6.66997 10.8181C6.66995 10.8181 6.66992 10.8181 6.6699 10.8181C6.66988 10.8181 6.66985 10.8181 6.66982 10.8181C6.6698 10.8181 6.66977 10.8181 6.66975 10.8181C6.66972 10.8181 6.6697 10.8181 6.66967 10.8181C6.66965 10.8181 6.66962 10.8181 6.66959 10.8181C6.66957 10.8181 6.66954 10.8181 6.66951 10.8181C6.66949 10.8181 6.66946 10.8181 6.66943 10.8181C6.6694 10.8181 6.66938 10.8181 6.66935 10.8181C6.66932 10.8181 6.66929 10.8181 6.66927 10.8181C6.66924 10.8181 6.66921 10.8181 6.66918 10.8181C6.66915 10.8181 6.66913 10.8181 6.6691 10.8181C6.66907 10.8181 6.66904 10.8181 6.66901 10.8181C6.66898 10.8181 6.66895 10.8181 6.66892 10.8181C6.6689 10.8181 6.66887 10.8181 6.66884 10.8181C6.66881 10.8181 6.66878 10.8181 6.66875 10.8181C6.66872 10.8181 6.66869 10.8181 6.66866 10.8181C6.66863 10.8181 6.6686 10.8181 6.66857 10.8181C6.66853 10.8181 6.6685 10.8181 6.66847 10.8181C6.66844 10.8181 6.66841 10.8181 6.66838 10.8181C6.66835 10.8181 6.66832 10.8181 6.66829 10.8181C6.66825 10.8181 6.66822 10.8181 6.66819 10.8181C6.66816 10.8181 6.66813 10.8181 6.66809 10.8181C6.66806 10.8181 6.66803 10.8181 6.668 10.8181C6.66797 10.8181 6.66793 10.8181 6.6679 10.8181C6.66787 10.8181 6.66783 10.8181 6.6678 10.8181C6.66777 10.8181 6.66774 10.8181 6.6677 10.8181C6.66767 10.8181 6.66763 10.8181 6.6676 10.8181C6.66757 10.8181 6.66753 10.8181 6.6675 10.8181C6.66747 10.8181 6.66743 10.8181 6.6674 10.8181C6.66736 10.8181 6.66733 10.8181 6.66729 10.8181C6.66726 10.8181 6.66723 10.8181 6.66719 10.8181C6.66716 10.8181 6.66712 10.8181 6.66709 10.8181C6.66705 10.8181 6.66702 10.8181 6.66698 10.8181C6.66695 10.8181 6.66691 10.8181 6.66687 10.8181C6.66684 10.8181 6.6668 10.8181 6.66677 10.8181C6.66673 10.8181 6.6667 10.8181 6.66666 10.8181C6.66662 10.8181 6.66659 10.8181 6.66655 10.8181C6.66651 10.8181 6.66648 10.8181 6.66644 10.8181C6.6664 10.8181 6.66637 10.8181 6.66633 10.8181C6.66629 10.8181 6.66626 10.8181 6.66622 10.8181C6.66618 10.8181 6.66615 10.8181 6.66611 10.8181C6.66607 10.8181 6.66603 10.8181 6.666 10.8181C6.66596 10.8181 6.66592 10.8181 6.66588 10.8181C6.66585 10.8181 6.66581 10.8181 6.66577 10.8181C6.66573 10.8181 6.66569 10.8181 6.66566 10.8181C6.66562 10.8181 6.66558 10.8181 6.66554 10.8181C6.6655 10.8181 6.66546 10.8181 6.66543 10.8181C6.66539 10.8181 6.66535 10.8181 6.66531 10.8181C6.66527 10.8181 6.66523 10.8181 6.66519 10.8181C6.66515 10.8181 6.66511 10.8181 6.66508 10.8181C6.66504 10.8181 6.665 10.8181 6.66496 10.8181C6.66492 10.8181 6.66488 10.8181 6.66484 10.8181C6.6648 10.8181 6.66476 10.8181 6.66472 10.8181C6.66468 10.8181 6.66464 10.8181 6.6646 10.8181C6.66456 10.8181 6.66452 10.8181 6.66448 10.8181C6.66444 10.8181 6.6644 10.8181 6.66436 10.8181C6.66432 10.8181 6.66428 10.8181 6.66424 10.8181C6.6642 10.8181 6.66416 10.8181 6.66412 10.8181C6.66408 10.8181 6.66403 10.8181 6.66399 10.8181C6.66395 10.8181 6.66391 10.8181 6.66387 10.8181C6.66383 10.8181 6.66379 10.8181 6.66375 10.8181C6.66371 10.8181 6.66366 10.8181 6.66362 10.8181C6.66358 10.8181 6.66354 10.8181 6.6635 10.8181C6.66346 10.8181 6.66342 10.8181 6.66337 10.8181C6.66333 10.8181 6.66329 10.8181 6.66325 10.8181C6.66321 10.8181 6.66317 10.8181 6.66312 10.8181C6.66308 10.8181 6.66304 10.8181 6.663 10.8181C6.66296 10.8181 6.66291 10.8181 6.66287 10.8181C6.66283 10.8181 6.66279 10.8181 6.66274 10.8181C6.6627 10.8181 6.66266 10.8181 6.66262 10.8181C6.66258 10.8181 6.66253 10.8181 6.66249 10.8181C6.66245 10.8181 6.66241 10.8181 6.66236 10.8181C6.66232 10.8181 6.66228 10.8181 6.66223 10.8181C6.66219 10.8181 6.66215 10.8181 6.66211 10.8181C6.66206 10.8181 6.66202 10.8181 6.66198 10.8181C6.66193 10.8181 6.66189 10.8181 6.66185 10.8181C6.6618 10.8181 6.66176 10.8181 6.66172 10.8181C6.66168 10.8181 6.66163 10.8181 6.66159 10.8181C6.66155 10.8181 6.6615 10.8181 6.66146 10.8181C6.66142 10.8181 6.66137 10.8181 6.66133 10.8181C6.66129 10.8181 6.66124 10.8181 6.6612 10.8181C6.66115 10.8181 6.66111 10.8181 6.66107 10.8181C6.66102 10.8181 6.66098 10.8181 6.66094 10.8181C6.66089 10.8181 6.66085 10.8181 6.66081 10.8181C6.66076 10.8181 6.66072 10.8181 6.66067 10.8181C6.66063 10.8181 6.66059 10.8181 6.66054 10.8181C6.6605 10.8181 6.66045 10.8181 6.66041 10.8181C6.66037 10.8181 6.66032 10.8181 6.66028 10.8181C6.66024 10.8181 6.66019 10.8181 6.66015 10.8181C6.6601 10.8181 6.66006 10.8181 6.66001 10.8181C6.65997 10.8181 6.65993 10.8181 6.65988 10.8181C6.65984 10.8181 6.65979 10.8181 6.65975 10.8181C6.65971 10.8181 6.65966 10.8181 6.65962 10.8181C6.65957 10.8181 6.65953 10.8181 6.65949 10.8181C6.65944 10.8181 6.6594 10.8181 6.65935 10.8181C6.65931 10.8181 6.65926 10.8181 6.65922 10.8181C6.65918 10.8181 6.65913 10.8181 6.65909 10.8181C6.65904 10.8181 6.659 10.8181 6.65895 10.8181C6.65891 10.8181 6.65887 10.8181 6.65882 10.8181C6.65878 10.8181 6.65873 10.8181 6.65869 10.8181C6.65864 10.8181 6.6586 10.8181 6.65856 10.8181C6.65851 10.8181 6.65847 10.8181 6.65842 10.8181C6.65838 10.8181 6.65833 10.8181 6.65829 10.8181C6.65824 10.8181 6.6582 10.8181 6.65816 10.8181C6.65811 10.8181 6.65807 10.8181 6.65802 10.8181C6.65798 10.8181 6.65793 10.8181 6.65789 10.8181C6.65785 10.8181 6.6578 10.8181 6.65776 10.8181C6.65771 10.8181 6.65767 10.8181 6.65762 10.8181C6.65758 10.8181 6.65754 10.8181 6.65749 10.8181C6.65745 10.8181 6.6574 10.8181 6.65736 10.8181C6.65732 10.8181 6.65727 10.8181 6.65723 10.8181C6.65718 10.8181 6.65714 10.8181 6.65709 10.8181C6.65705 10.8181 6.65701 10.8181 6.65696 10.8181C6.65692 10.8181 6.65687 10.8181 6.65683 10.8181C6.65679 10.8181 6.65674 10.8181 6.6567 10.8181C6.65665 10.8181 6.65661 10.8181 6.65657 10.8181C6.65652 10.8181 6.65648 10.8181 6.65644 10.8181C6.65639 10.8181 6.65635 10.8181 6.6563 10.8181C6.65626 10.8181 6.65622 10.8181 6.65617 10.8181C6.65613 10.8181 6.65608 10.8181 6.65604 10.8181C6.656 10.8181 6.65595 10.8181 6.65591 10.8181C6.65587 10.8181 6.65582 10.8181 6.65578 10.8181C6.65574 10.8181 6.65569 10.8181 6.65565 10.8181C6.65561 10.8181 6.65556 10.8181 6.65552 10.8181C6.65548 10.8181 6.65543 10.8181 6.65539 10.8181C6.65535 10.8181 6.6553 10.8181 6.65526 10.8181C6.65522 10.8181 6.65517 10.8181 6.65513 10.8181C6.65509 10.8181 6.65504 10.8181 6.655 10.8181C6.65496 10.8181 6.65492 10.8181 6.65487 10.8181C6.65483 10.8181 6.65479 10.8181 6.65474 10.8181C6.6547 10.8181 6.65466 10.8181 6.65462 10.8181C6.65457 10.8181 6.65453 10.8181 6.65449 10.8181C6.65445 10.8181 6.6544 10.8181 6.65436 10.8181C6.65432 10.8181 6.65428 10.8181 6.65423 10.8181C6.65419 10.8181 6.65415 10.8181 6.65411 10.8181C6.65407 10.8181 6.65402 10.8181 6.65398 10.8181C6.65394 10.8181 6.6539 10.8181 6.65386 10.8181C6.65381 10.8181 6.65377 10.8181 6.65373 10.8181C6.65369 10.8181 6.65365 10.8181 6.65361 10.8181C6.65356 10.8181 6.65352 10.8181 6.65348 10.8181C6.65344 10.8181 6.6534 10.8181 6.65336 10.8181C6.65332 10.8181 6.65327 10.8181 6.65323 10.8181C6.65319 10.8181 6.65315 10.8181 6.65311 10.8181C6.65307 10.8181 6.65303 10.8181 6.65299 10.8181C6.65295 10.8181 6.65291 10.8181 6.65287 10.8181C6.65282 10.8181 6.65278 10.8181 6.65274 10.8181C6.6527 10.8181 6.65266 10.8181 6.65262 10.8181C6.65258 10.8181 6.65254 10.8181 6.6525 10.8181C6.65246 10.8181 6.65242 10.8181 6.65238 10.8181C6.65234 10.8181 6.6523 10.8181 6.65226 10.8181C6.65222 10.8181 6.65218 10.8181 6.65214 10.8181C6.6521 10.8181 6.65206 10.8181 6.65203 10.8181C6.65199 10.8181 6.65195 10.8181 6.65191 10.8181C6.65187 10.8181 6.65183 10.8181 6.65179 10.8181C6.65175 10.8181 6.65171 10.8181 6.65167 10.8181C6.65164 10.8181 6.6516 10.8181 6.65156 10.8181C6.65152 10.8181 6.65148 10.8181 6.65144 10.8181C6.6514 10.8181 6.65137 10.8181 6.65133 10.8181C6.65129 10.8181 6.65125 10.8181 6.65121 10.8181C6.65118 10.8181 6.65114 10.8181 6.6511 10.8181C6.65106 10.8181 6.65103 10.8181 6.65099 10.8181C6.65095 10.8181 6.65091 10.8181 6.65088 10.8181C6.65084 10.8181 6.6508 10.8181 6.65076 10.8181C6.65073 10.8181 6.65069 10.8181 6.65065 10.8181C6.65062 10.8181 6.65058 10.8181 6.65054 10.8181C6.65051 10.8181 6.65047 10.8181 6.65044 10.8181C6.6504 10.8181 6.65036 10.8181 6.65033 10.8181C6.65029 10.8181 6.65026 10.8181 6.65022 10.8181C6.65018 10.8181 6.65015 10.8181 6.65011 10.8181C6.65008 10.8181 6.65004 10.8181 6.65001 10.8181C6.64997 10.8181 6.64994 10.8181 6.6499 10.8181C6.64987 10.8181 6.64983 10.8181 6.6498 10.8181C6.64976 10.8181 6.64973 10.8181 6.64969 10.8181C6.64966 10.8181 6.64963 10.8181 6.64959 10.8181C6.64956 10.8181 6.64952 10.8181 6.64949 10.8181C6.64946 10.8181 6.64942 10.8181 6.64939 10.8181C6.64935 10.8181 6.64932 10.8181 6.64929 10.8181C6.64925 10.8181 6.64922 10.8181 6.64919 10.8181C6.64916 10.8181 6.64912 10.8181 6.64909 10.8181C6.64906 10.8181 6.64902 10.8181 6.64899 10.8181C6.64896 10.8181 6.64893 10.8181 6.6489 10.8181C6.64886 10.8181 6.64883 10.8181 6.6488 10.8181C6.64877 10.8181 6.64874 10.8181 6.64871 10.8181C6.64867 10.8181 6.64864 10.8181 6.64861 10.8181C6.64858 10.8181 6.64855 10.8181 6.64852 10.8181C6.64849 10.8181 6.64846 10.8181 6.64843 10.8181C6.6484 10.8181 6.64837 10.8181 6.64834 10.8181C6.64831 10.8181 6.64828 10.8181 6.64825 10.8181C6.64822 10.8181 6.64819 10.8181 6.64816 10.8181C6.64813 10.8181 6.6481 10.8181 6.64807 10.8181C6.64804 10.8181 6.64801 10.8181 6.64798 10.8181C6.64795 10.8181 6.64793 10.8181 6.6479 10.8181C6.64787 10.8181 6.64784 10.8181 6.64781 10.8181C6.64778 10.8181 6.64776 10.8181 6.64773 10.8181C6.6477 10.8181 6.64767 10.8181 6.64765 10.8181C6.64762 10.8181 6.64759 10.8181 6.64756 10.8181C6.64754 10.8181 6.64751 10.8181 6.64748 10.8181C6.64746 10.8181 6.64743 10.8181 6.64741 10.8181C6.64738 10.8181 6.64735 10.8181 6.64733 10.8181C6.6473 10.8181 6.64728 10.8181 6.64725 10.8181C6.64722 10.8181 6.6472 10.8181 6.64717 10.8181C6.64715 10.8181 6.64712 10.8181 6.6471 10.8181C6.64707 10.8181 6.64705 10.8181 6.64703 10.8181C6.647 10.8181 6.64698 10.8181 6.64695 10.8181C6.64693 10.8181 6.64691 10.8181 6.64688 10.8181C6.64686 10.8181 6.64684 10.8181 6.64681 10.8181C6.64679 10.8181 6.64677 10.8181 6.64674 10.8181C6.64672 10.8181 6.6467 10.8181 6.64668 10.8181C6.64665 10.8181 6.64663 10.8181 6.64661 10.8181C6.64659 10.8181 6.64657 10.8181 6.64654 10.8181C6.64652 10.8181 6.6465 10.8181 6.64648 10.8181C6.64646 10.8181 6.64644 10.8181 6.64642 10.8181C6.6464 10.8181 6.64638 10.8181 6.64636 10.8181C6.64634 10.8181 6.64632 10.8181 6.6463 10.8181C6.64628 10.8181 6.64626 10.8181 6.64624 10.8181C6.64622 10.8181 6.6462 10.8181 6.64618 10.8181C6.64616 10.8181 6.64614 10.8181 6.64613 10.8181C6.64611 10.8181 6.64609 10.8181 6.64607 10.8181C6.64605 10.8181 6.64603 10.8181 6.64602 10.8181C6.646 10.8181 6.64598 10.8181 6.64597 10.8181C6.64595 10.8181 6.64593 10.8181 6.64592 10.8181C6.6459 10.8181 6.64588 10.8181 6.64587 10.8181C6.64585 10.8181 6.64583 10.8181 6.64582 10.8181C6.6458 10.8181 6.64579 10.8181 6.64577 10.8181C6.64576 10.8181 6.64574 10.8181 6.64573 10.8181C6.64571 10.8181 6.6457 10.8181 6.64568 10.8181C6.64567 10.8181 6.64566 10.8181 6.64564 10.8181C6.64563 10.8181 6.64561 10.8181 6.6456 10.8181C6.64559 10.8181 6.64557 10.8181 6.64556 10.8181C6.64555 10.8181 6.64554 10.8181 6.64552 10.8181C6.64551 10.8181 6.6455 10.8181 6.64549 10.8181C6.64548 10.8181 6.64546 10.8181 6.64545 10.8181C6.64544 10.8181 6.64543 10.8181 6.64542 10.8181C6.64541 10.8181 6.6454 10.8181 6.64539 10.8181C6.64538 10.8181 6.64537 10.8181 6.64536 10.8181C6.64535 10.8181 6.64534 10.8181 6.64533 10.8181C6.64532 10.8181 6.64531 10.8181 6.6453 10.8181C6.64529 10.8181 6.64529 10.8181 6.64528 10.8181C6.64527 10.8181 6.64526 10.8181 6.64525 10.8181C6.64525 10.8181 6.64524 10.8181 6.64523 10.8181C6.64522 10.8181 6.64522 10.8181 6.64521 10.8181C6.6452 10.8181 6.6452 10.8181 6.64519 10.8181C6.64519 10.8181 6.64518 10.8181 6.64518 10.8181C6.64517 10.8181 6.64516 10.8181 6.64516 10.8181C6.64515 10.8181 6.64515 10.8181 6.64515 10.8181C6.64514 10.8181 6.64514 10.8181 6.64513 10.8181C6.64513 10.8181 6.64513 10.8181 6.64512 10.8181C6.64512 10.8181 6.64512 10.8181 6.64511 10.8181C6.64511 10.8181 6.64511 10.8181 6.64511 10.8181C6.6451 10.8181 6.6451 10.8181 6.6451 10.8181C6.6451 10.8181 6.6451 10.8181 6.6451 10.8181C6.6451 10.8181 6.6451 10.8181 6.6451 10.8181C6.64509 10.8181 6.64509 11.4681 6.64509 12.1181C6.64509 12.1181 6.6451 12.1181 6.6451 12.1181C6.6451 12.1181 6.6451 12.1181 6.6451 12.1181C6.6451 12.1181 6.6451 12.1181 6.6451 12.1181C6.64511 12.1181 6.64511 12.1181 6.64511 12.1181C6.64511 12.1181 6.64512 12.1181 6.64512 12.1181C6.64512 12.1181 6.64513 12.1181 6.64513 12.1181C6.64513 12.1181 6.64514 12.1181 6.64514 12.1181C6.64515 12.1181 6.64515 12.1181 6.64516 12.1181C6.64516 12.1181 6.64517 12.1181 6.64517 12.1181C6.64518 12.1181 6.64518 12.1181 6.64519 12.1181C6.6452 12.1181 6.6452 12.1181 6.64521 12.1181C6.64522 12.1181 6.64522 12.1181 6.64523 12.1181C6.64524 12.1181 6.64525 12.1181 6.64525 12.1181C6.64526 12.1181 6.64527 12.1181 6.64528 12.1181C6.64529 12.1181 6.6453 12.1181 6.64531 12.1181C6.64532 12.1181 6.64533 12.1181 6.64534 12.1181C6.64535 12.1181 6.64536 12.1181 6.64537 12.1181C6.64538 12.1181 6.64539 12.1181 6.6454 12.1181C6.64541 12.1181 6.64542 12.1181 6.64544 12.1181C6.64545 12.1181 6.64546 12.1181 6.64547 12.1181C6.64549 12.1181 6.6455 12.1181 6.64551 12.1181C6.64553 12.1181 6.64554 12.1181 6.64555 12.1181C6.64557 12.1181 6.64558 12.1181 6.6456 12.1181C6.64561 12.1181 6.64563 12.1181 6.64564 12.1181C6.64566 12.1181 6.64567 12.1181 6.64569 12.1181C6.6457 12.1181 6.64572 12.1181 6.64574 12.1181C6.64576 12.1181 6.64577 12.1181 6.64579 12.1181C6.64581 12.1181 6.64582 12.1181 6.64584 12.1181C6.64586 12.1181 6.64588 12.1181 6.6459 12.1181C6.64592 12.1181 6.64594 12.1181 6.64596 12.1181C6.64598 12.1181 6.646 12.1181 6.64602 12.1181C6.64604 12.1181 6.64606 12.1181 6.64608 12.1181C6.6461 12.1181 6.64612 12.1181 6.64614 12.1181C6.64616 12.1181 6.64618 12.1181 6.64621 12.1181C6.64623 12.1181 6.64625 12.1181 6.64628 12.1181C6.6463 12.1181 6.64632 12.1181 6.64635 12.1181C6.64637 12.1181 6.64639 12.1181 6.64642 12.1181C6.64644 12.1181 6.64647 12.1181 6.64649 12.1181C6.64652 12.1181 6.64654 12.1181 6.64657 12.1181C6.6466 12.1181 6.64662 12.1181 6.64665 12.1181C6.64668 12.1181 6.6467 12.1181 6.64673 12.1181C6.64676 12.1181 6.64679 12.1181 6.64681 12.1181C6.64684 12.1181 6.64687 12.1181 6.6469 12.1181C6.64693 12.1181 6.64696 12.1181 6.64699 12.1181C6.64702 12.1181 6.64705 12.1181 6.64708 12.1181C6.64711 12.1181 6.64714 12.1181 6.64717 12.1181C6.6472 12.1181 6.64723 12.1181 6.64727 12.1181C6.6473 12.1181 6.64733 12.1181 6.64736 12.1181C6.6474 12.1181 6.64743 12.1181 6.64746 12.1181C6.6475 12.1181 6.64753 12.1181 6.64756 12.1181C6.6476 12.1181 6.64763 12.1181 6.64767 12.1181C6.6477 12.1181 6.64774 12.1181 6.64778 12.1181C6.64781 12.1181 6.64785 12.1181 6.64788 12.1181C6.64792 12.1181 6.64796 12.1181 6.648 12.1181C6.64803 12.1181 6.64807 12.1181 6.64811 12.1181C6.64815 12.1181 6.64819 12.1181 6.64823 12.1181C6.64827 12.1181 6.6483 12.1181 6.64834 12.1181C6.64838 12.1181 6.64842 12.1181 6.64847 12.1181C6.64851 12.1181 6.64855 12.1181 6.64859 12.1181C6.64863 12.1181 6.64867 12.1181 6.64871 12.1181C6.64876 12.1181 6.6488 12.1181 6.64884 12.1181C6.64889 12.1181 6.64893 12.1181 6.64897 12.1181C6.64902 12.1181 6.64906 12.1181 6.64911 12.1181C6.64915 12.1181 6.6492 12.1181 6.64924 12.1181C6.64929 12.1181 6.64933 12.1181 6.64938 12.1181C6.64943 12.1181 6.64947 12.1181 6.64952 12.1181C6.64957 12.1181 6.64962 12.1181 6.64967 12.1181C6.64971 12.1181 6.64976 12.1181 6.64981 12.1181C6.64986 12.1181 6.64991 12.1181 6.64996 12.1181C6.65001 12.1181 6.65006 12.1181 6.65011 12.1181C6.65016 12.1181 6.65021 12.1181 6.65026 12.1181C6.65032 12.1181 6.65037 12.1181 6.65042 12.1181C6.65047 12.1181 6.65053 12.1181 6.65058 12.1181C6.65063 12.1181 6.65069 12.1181 6.65074 12.1181C6.65079 12.1181 6.65085 12.1181 6.6509 12.1181C6.65096 12.1181 6.65101 12.1181 6.65107 12.1181C6.65113 12.1181 6.65118 12.1181 6.65124 12.1181C6.6513 12.1181 6.65135 12.1181 6.65141 12.1181C6.65147 12.1181 6.65153 12.1181 6.65159 12.1181C6.65164 12.1181 6.6517 12.1181 6.65176 12.1181C6.65182 12.1181 6.65188 12.1181 6.65194 12.1181C6.652 12.1181 6.65206 12.1181 6.65213 12.1181C6.65219 12.1181 6.65225 12.1181 6.65231 12.1181C6.65237 12.1181 6.65244 12.1181 6.6525 12.1181C6.65256 12.1181 6.65263 12.1181 6.65269 12.1181C6.65275 12.1181 6.65282 12.1181 6.65288 12.1181C6.65295 12.1181 6.65301 12.1181 6.65308 12.1181C6.65315 12.1181 6.65321 12.1181 6.65328 12.1181C6.65335 12.1181 6.65341 12.1181 6.65348 12.1181C6.65355 12.1181 6.65362 12.1181 6.65369 12.1181C6.65375 12.1181 6.65382 12.1181 6.65389 12.1181C6.65396 12.1181 6.65403 12.1181 6.6541 12.1181C6.65417 12.1181 6.65424 12.1181 6.65432 12.1181C6.65439 12.1181 6.65446 12.1181 6.65453 12.1181C6.6546 12.1181 6.65468 12.1181 6.65475 12.1181C6.65482 12.1181 6.6549 12.1181 6.65497 12.1181C6.65505 12.1181 6.65512 12.1181 6.6552 12.1181C6.65527 12.1181 6.65535 12.1181 6.65542 12.1181C6.6555 12.1181 6.65558 12.1181 6.65565 12.1181C6.65573 12.1181 6.65581 12.1181 6.65589 12.1181C6.65597 12.1181 6.65604 12.1181 6.65612 12.1181C6.6562 12.1181 6.65628 12.1181 6.65636 12.1181C6.65644 12.1181 6.65652 12.1181 6.6566 12.1181C6.65669 12.1181 6.65677 12.1181 6.65685 12.1181C6.65693 12.1181 6.65701 12.1181 6.6571 12.1181C6.65718 12.1181 6.65726 12.1181 6.65735 12.1181C6.65743 12.1181 6.65752 12.1181 6.6576 12.1181C6.65769 12.1181 6.65777 12.1181 6.65786 12.1181C6.65795 12.1181 6.65803 12.1181 6.65812 12.1181C6.65821 12.1181 6.65829 12.1181 6.65838 12.1181C6.65847 12.1181 6.65856 12.1181 6.65865 12.1181C6.65874 12.1181 6.65883 12.1181 6.65892 12.1181C6.65901 12.1181 6.6591 12.1181 6.65919 12.1181C6.65928 12.1181 6.65937 12.1181 6.65946 12.1181C6.65956 12.1181 6.65965 12.1181 6.65974 12.1181C6.65984 12.1181 6.65993 12.1181 6.66002 12.1181C6.66012 12.1181 6.66021 12.1181 6.66031 12.1181C6.6604 12.1181 6.6605 12.1181 6.6606 12.1181C6.66069 12.1181 6.66079 12.1181 6.66089 12.1181C6.66098 12.1181 6.66108 12.1181 6.66118 12.1181C6.66128 12.1181 6.66138 12.1181 6.66148 12.1181C6.66158 12.1181 6.66168 12.1181 6.66178 12.1181C6.66188 12.1181 6.66198 12.1181 6.66208 12.1181C6.66218 12.1181 6.66228 12.1181 6.66239 12.1181C6.66249 12.1181 6.66259 12.1181 6.6627 12.1181C6.6628 12.1181 6.6629 12.1181 6.66301 12.1181C6.66311 12.1181 6.66322 12.1181 6.66333 12.1181C6.66343 12.1181 6.66354 12.1181 6.66365 12.1181C6.66375 12.1181 6.66386 12.1181 6.66397 12.1181C6.66408 12.1181 6.66418 12.1181 6.66429 12.1181C6.6644 12.1181 6.66451 12.1181 6.66462 12.1181C6.66473 12.1181 6.66484 12.1181 6.66496 12.1181C6.66507 12.1181 6.66518 12.1181 6.66529 12.1181C6.6654 12.1181 6.66552 12.1181 6.66563 12.1181C6.66574 12.1181 6.66586 12.1181 6.66597 12.1181C6.66609 12.1181 6.6662 12.1181 6.66632 12.1181C6.66643 12.1181 6.66655 12.1181 6.66667 12.1181V10.8181ZM9 5.65H17V4.35H9V5.65ZM19.3333 10.8181H6.66667V12.1181H19.3333V10.8181ZM8.33333 19.9479H17.6667V18.6479H8.33333V19.9479ZM7.35 15.383C7.35 15.4842 7.31724 15.553 7.29304 15.5839C7.2696 15.6139 7.27895 15.584 7.33333 15.584V16.884C8.19939 16.884 8.65 16.0552 8.65 15.383H7.35ZM7.33333 15.584C7.38772 15.584 7.39707 15.6139 7.37363 15.5839C7.34943 15.553 7.31667 15.4842 7.31667 15.383H6.01667C6.01667 16.0552 6.46728 16.884 7.33333 16.884V15.584ZM7.31667 15.383C7.31667 15.2818 7.34943 15.2129 7.37363 15.182C7.39707 15.1521 7.38772 15.1819 7.33333 15.1819V13.8819C6.46728 13.8819 6.01667 14.7107 6.01667 15.383H7.31667ZM7.33333 15.1819C7.27895 15.1819 7.2696 15.1521 7.29304 15.182C7.31724 15.2129 7.35 15.2818 7.35 15.383H8.65C8.65 14.7107 8.19939 13.8819 7.33333 13.8819V15.1819ZM18.6833 15.383C18.6833 15.4842 18.6506 15.553 18.6264 15.5839C18.6029 15.6139 18.6123 15.584 18.6667 15.584V16.884C19.5327 16.884 19.9833 16.0552 19.9833 15.383H18.6833ZM18.6667 15.584C18.7211 15.584 18.7304 15.6139 18.707 15.5839C18.6828 15.553 18.65 15.4842 18.65 15.383H17.35C17.35 16.0552 17.8006 16.884 18.6667 16.884V15.584ZM18.65 15.383C18.65 15.2818 18.6828 15.2129 18.707 15.182C18.7304 15.1521 18.7211 15.1819 18.6667 15.1819V13.8819C17.8006 13.8819 17.35 14.7107 17.35 15.383H18.65ZM18.6667 15.1819C18.6123 15.1819 18.6029 15.1521 18.6264 15.182C18.6506 15.2129 18.6833 15.2818 18.6833 15.383H19.9833C19.9833 14.7107 19.5327 13.8819 18.6667 13.8819V15.1819Z"
        fill="#1C93E3"
      />
    </svg>
  );
}
