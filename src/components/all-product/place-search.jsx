import React, { useEffect, useState } from "react";
import PlaceSearchItem from "./place-search-item";
import { ApiServer } from "../../ApiServer/api";
import LoadingC from "../loading/loader";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const PlaceSearch = () => {
  const [place, setPlace] = useState([]);
  const [loading, setLoading] = useState(true);
  const { placeData } = useSelector((state) => state.event);
  const {t} =useTranslation()

  useEffect(() => {
    const lat = localStorage.getItem("lat");
    const long = localStorage.getItem("long");
    const fetchData = async () => {
      try {
        const res = await ApiServer.getData(
          `/place-search/?latitude=${lat}&longitude=${long}&type=${placeData.type}`
        );
        setLoading(false);
        setPlace(res);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    fetchData();
  }, [placeData]);
  return (
    <section className="px-[16px] mt-[24px]">
      <h1 className="text-[17px] font-[500] mb-[20px] ">{t("place_simillar")}</h1>
      {loading ? (
        <LoadingC />
      ) : (
        <main className="overflow-x-scroll whitespace-nowrap photo-slide p-[10px]">
          {place?.length>0 ? (
            place?.map((item, idx) => <PlaceSearchItem key={idx} item={item} />)
          ) : (
            <h1 className="text-yellow-400">{t("place_simillar_error")}</h1>
          )}
        </main>
      )}
    </section>
  );
};

export default PlaceSearch;
