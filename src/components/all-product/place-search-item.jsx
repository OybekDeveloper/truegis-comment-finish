import React, { useEffect, useState } from "react";
import { star } from "../home/img";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetPlaceData } from "../../reducer/event";

const PlaceSearchItem = ({ item }) => {
  const [distance, setDistance] = useState("");
  const [statusWork, setStatusWork] = useState(false);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const { t } = useTranslation();
  const baseUrl =
    "https://s3-alpha-sig.figma.com/img/ad20/076f/45abfffd923a28871fbce3b7287bbb51?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K4p9Rcbpe7BbbPENjcHn5-4y~unkIP4NTIIGYRd0~xYKpLwCHp16wT8sv4Hobl5l3uva4CdK7ObyTQbTq1TlxUNUElCmz9ktiJ4NmIeNVU5UO9iF5FEu5FjIcy120toaUMsZTO-op-vX3mUyi6Io9DgjIf0TpjXVu1cdHblfSbZNJiAHRweBjrMQ9ay054zV2ZvnMgtOQ6G8ll0x~-Fs5f7snD19QNFKEdW0lvHnICby7J4kr3Maw2nXtWjsAZ9cYm9J99zhTTyKFD-pepvrfQXRmTnbm0A5HZ6uZ1BxdayD~1KDLpeeHPnnFEQ~4CsBzlT4ufspynx6UrfprBossw__";
  const workStatus = () => {
    const hours = new Date().getHours();
    const start = item?.work_start_time?.split(":")[0];
    const end = item?.work_end_time?.split(":")[0];
    if (hours > start && hours < end) {
      setStatusWork(true);
    } else if (start === end && item?.work_start_time !== null) {
      setStatusWork(true);
    } else {
      setStatusWork(false);
    }
  };
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
  const handleClickPlace = () => {
    dispatch(GetPlaceData(item));
  };
  useEffect(() => {
    const lat = localStorage.getItem("lat");
    const long = localStorage.getItem("long");
    const distance = calculateDistance(
      item.latitude,
      item.longitude,
      lat,
      long
    );
    setDistance(distance.toFixed(2));
    workStatus();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [item]);

  return (
    <NavLink
      onClick={handleClickPlace}
      to={`/${item.id}/${userId}/${distance}/all-product`}
      className="w-[188px] mr-[16px] cursor-pointer inline-flex flex-col gap-[10px] border-[1px] border-solid rounded-[8px] overflow-hidden"
    >
      <img
        className="w[188px] h-[100px] object-cover"
        src={item.photo_url ? item.photo_url : baseUrl}
        alt=""
      />
      <div className="flex justify-between px-[8px]">
        <p>{item.name.slice(0, 12)}...</p>
        <h1 className="tg-button-text text-[13px] font-[500]">{distance} km</h1>
      </div>
      <div className="flex justify-between px-[8px] mb-[10px]">
        <main className="flex gap-[4px]">
          <img src={star} alt="" />
          <p className="text-[14px] font-[500]">
            {item.rating ? item.rating : 0}
          </p>
        </main>
        <h1
          className={`${
            statusWork ? "text-[#4ECC5E]" : "text-red-500"
          } text-[13px] font-[500]`}
        >
          {statusWork ? `${t("status_true")}` : `${t("status_false")}`}
        </h1>
      </div>
    </NavLink>
  );
};

export default PlaceSearchItem;
