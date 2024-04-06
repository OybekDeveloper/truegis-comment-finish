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
} from "../home/img";
import "./main.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MapAppSelector from "./map";
import { t } from "i18next";
import LoadingC from "../loading/loader";
// import { View, Button, Linking, Platform } from "react-native";

const tg = window.Telegram.WebApp;
export default function AllProduct() {
  const navigate = useNavigate();
  const placeId = localStorage.getItem("placeId");
  const userId = localStorage.getItem("userId");
  const km = localStorage.getItem("km");
  const dispatch = useDispatch();
  const { delModal, placeData, commentData } = useSelector(
    (state) => state.event
  );
  const [menuActive, setMenuActive] = useState(false);
  const [tableActive, setTableActive] = useState(false);
  const [aboutData, setAboutData] = useState([]);
  const [statusWork, setStatusWork] = useState(true);
  const [imageLength, setImageLength] = useState(0);
  const [loading, setLoading] = useState(true);
  const workStatus = () => {
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const secounds = new Date().getSeconds();
    const start = placeData?.work_start_time?.split(":")[0];
    const end = placeData?.work_end_time?.split(":")[0];
    if (hours > start && hours < end) {
      setStatusWork(true);
    } else if (start === end) {
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
  }, [placeData]);
  console.log(placeData);
  return (
    <>
      {loading ? (
        <LoadingC />
      ) : (
        <main className="all-product">
          <section className="flex flex-col justify-start items-start gap-[16px] my-[24px] px-[16px]">
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
                  text={
                    placeData.street ? placeData.street : "Manzilni ko'rish"
                  }
                />
              </div>
              <div className="w-[70px]">
                <p className=" text-end w-full text-[13px] font-[500]">{`${km} km`}</p>
              </div>
            </div>
          </section>
          <div className="hr w-full h-[1px] mb-[32px]"></div>
          {/* <section className="w-full flex justify-between mb-[20px] px-[16px]">
        <div className="flex justify-start items-center gap-[12px] tg-button-text">
          <img src={yandex} alt="yandex" />
          <h1 className="text-[15px] font-[500]">12,000 so’m</h1>
        </div>
        {LinkSvg2(
          tg.themeParams.text_color ? tg.themeParams.text_color : "#1C93E3"
        )}
      </section>
      <div className="hr w-full h-[1px] mb-[32px]"></div> */}
          {placeData.phone && placeData.website && (
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
              <div className={`hr w-full h-[1px] mt-[24px] mb-[32px]`}></div>
            </>
          )}
          <section className="w-full flex flex-col justify-start px-[16px]">
            <h1 className="font-[500] text-[15px]">{t("social_info")}</h1>
            <div className="flex flex-row gap-[20px] pt-[20px]">
              <a
                href={placeData.instagram}
                className={`${
                  placeData.instagram ? "opacity-1" : "opacity-[0.7]  "
                } social-media`}
              >
                <img src={instagram} alt="" className="w-[48px] h-[48px]" />
              </a>
              <a
                href={placeData.telegram}
                className={`${
                  placeData.telegram ? "opacity-1" : "opacity-[0.7] "
                } social-media`}
              >
                <img src={telegram} alt="" className="w-[48px] h-[48px]" />
              </a>
              <a
                href={placeData.bot}
                className={`${
                  placeData.bot ? "opacity-1" : "opacity-[0.7]  "
                } social-media`}
              >
                <img src={bot} alt="" className="w-[38px] h-[38px]" />
              </a>
              <a
                href={placeData.twitter}
                className={`${
                  placeData.twitter ? "opacity-1" : "opacity-[0.7] "
                } social-media`}
              >
                <img src={twitter} alt="" className="w-[30px] h-[30px]" />
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
          <div className="hr w-full h-[1px] mt-[24px] mb-[32px]"></div>
          <section>
            {placeData.work_days &&
              placeData.work_end_time &&
              placeData.work_start_time && (
                <>
                  <div className="relative flex justify-start items-start gap-[16px] mt-[24px] px-[16px]">
                    <div className="w-full flex flex-col gap-[12px]">
                      <article className="flex justify-between items-center w-full">
                        {placeData?.work_end_time &&
                          placeData.work_end_time && (
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
                      <h1 className="text-[15px] font-[500] ">
                        {t("tuesday")}
                      </h1>
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
                      <h1 className="text-[15px] font-[500] ">
                        {t("thursday")}
                      </h1>
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
                      <h1 className="text-[15px] font-[500] ">
                        {t("saturday")}
                      </h1>
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
                      <h1 className="text-[15px] font-[500]  ">
                        {t("sunday")}
                      </h1>
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
                    className={`hr w-full h-[1px] mt-[24px] mb-[32px]`}
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
              <div className={`hr w-full h-[1px] mt-[24px] mb-[32px]`}></div>
            </>
          )}
          {placeData?.images.length>0 && (
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
                    onClick={() =>
                      navigate(`/${placeId}/${userId}/${km}/photo`)
                    }
                    className="inline-flex flex-col justify-center items-center opacity-[0.7] tg-button w-[90px] h-[100px] rounded-[4px] cursor-pointer"
                  >
                    <img className="" src={arrowRight} alt="add" />
                    <h1 className="text-[12px] font-[400] text-[#fff]">
                      {t("all_photo_info")}
                    </h1>
                  </div>
                )}
              </section>
              <div className={`hr w-full h-[1px] mb-[32px] mt-[24px]`}></div>
            </>
          )}
          {/* <section className="px-[16px] mt-[24px]">
        <h1 className="text-[17px] font-[500] mb-[20px] ">O’xshash joylar</h1>
        <main className="overflow-x-scroll whitespace-nowrap photo-slide">
          {[1, 2, 3, 4].map((item,idx) => (
            <div key={idx} className="w-[188px] mr-[16px] cursor-pointer inline-flex flex-col gap-[10px] border-[1px] border-solid rounded-[8px] overflow-hidden">
              <img
                src={
                  "https://s3-alpha-sig.figma.com/img/ad20/076f/45abfffd923a28871fbce3b7287bbb51?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K4p9Rcbpe7BbbPENjcHn5-4y~unkIP4NTIIGYRd0~xYKpLwCHp16wT8sv4Hobl5l3uva4CdK7ObyTQbTq1TlxUNUElCmz9ktiJ4NmIeNVU5UO9iF5FEu5FjIcy120toaUMsZTO-op-vX3mUyi6Io9DgjIf0TpjXVu1cdHblfSbZNJiAHRweBjrMQ9ay054zV2ZvnMgtOQ6G8ll0x~-Fs5f7snD19QNFKEdW0lvHnICby7J4kr3Maw2nXtWjsAZ9cYm9J99zhTTyKFD-pepvrfQXRmTnbm0A5HZ6uZ1BxdayD~1KDLpeeHPnnFEQ~4CsBzlT4ufspynx6UrfprBossw__"
                }
                alt=""
              />
              <div className="flex justify-between px-[8px]">
                <p>Ipak yo’li bank</p>
                <h1 className="tg-button-text text-[13px] font-[500]">5km</h1>
              </div>
              <div className="flex justify-between px-[8px] mb-[10px]">
                <main className="flex gap-[4px]">
                  <img src={star} alt="" />
                  <p className="text-[14px] font-[500]">4.2</p>
                </main>
                <h1 className="text-[#4ECC5E] font-[400] text-[14px]">Ochiq</h1>
              </div>
            </div>
          ))}
        </main>
      </section> */}
        </main>
      )}
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
