import React, { useEffect, useRef, useState } from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import plusimg from "./imgplus.svg";
import trash from "./trash.svg";
import { useNavigate } from "react-router-dom";
import "./comment.scss";
import { ApiServer } from "../../ApiServer/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GetPlaceData } from "../../reducer/event";
import { useTranslation } from "react-i18next";

const tg = window.Telegram.WebApp;

export default function AddComment() {
  const { t } = useTranslation();
  const placeId = localStorage.getItem("placeId");
  const userId = localStorage.getItem("userId");
  const km = localStorage.getItem("km");

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { placeData } = useSelector((state) => state.event);

  const [formData, setFormData] = useState({
    star: 0, // Initialize formData.star to a default value
  });
  const [fotos, setFotos] = useState([]);
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };
  const handleChange = (event, newValue) => {
    setFormData({
      ...formData,
      star: newValue !== null ? newValue : 0, // Ensure formData.star is always defined
      user: userId,
    });
  };

  const handleFileUploaded = (e) => {
    const files = e.target.files;
    if (!files || !placeData) return;
    const fd = new FormData();
    for(let i=0;i<files.length;i++){
      fd.append(`image`, files[i]);
      fd.append("place", placeId);
      fd.append("user", userId);
    }
   
    axios
      .post("https://admin13.uz/api/image/", fd, {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const fetchData = async () => {
          try {
            const place = await ApiServer.getData(`/place/${placeId}/`);
            dispatch(GetPlaceData(place));
            setFotos(placeData.images);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  const handleAddComment = async () => {
    try {
      await ApiServer.postData(`/comments/${placeId}/create/`, formData);
      navigate(`/${placeId}/${userId}/${km}/comment`);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setFotos(placeData.images?placeData.images:[]);
  }, [placeData]);
  return (
    <main className="comment">
      <section className="px-[16px]">
        <h1 className="text-[24px] font-[500] mt-[16px]">{placeData?.name}</h1>
        <p className="text-[16px] font-[400] mt-[12px]">
          {placeData.full_address ? placeData.full_address : placeData.street}
        </p>
        <div className="w-full flex justify-center items-center my-[32px]">
          <Rating
            name="size-large"
            value={formData.star}
            onChange={handleChange}
            size=""
            style={{
              fontSize: "40px",
              display: "flex",
              gap: "16px",
              color: "#FAC515",
            }}
            emptyIcon={
              <StarIcon
                style={{ opacity: 0.55, color: tg.themeParams.text_color }}
                fontSize="inherit"
              />
            }
          />
        </div>
      </section>
      <div className="hr w-full h-[1px]  mb-[24px] mt-[32px] "></div>
      <section className="px-[16px] mb-[24px]">
        <p className="text-[18px] font-[500]">{t("add_comment_title_info")}</p>
        <textarea
          name="message"
          onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          id="message"
          rows="6"
          className={`mt-[24px] border-[1px] border-solid comment-input p-[10px] bg-transparent text-[16px] font-[400] input-form`}
          placeholder={t("add_comment_btn")}
        ></textarea>
      </section>
      <section className="px-[16px] mb-[70px]">
        {fotos.length > 0 ? (
          <div className="overflow-x-scroll whitespace-nowrap comment-img">
            <div className="inline-flex justify-center items-center">
              <div
                onClick={handleFileInputClick}
                className="bg-white cursor-pointer w-[96px] h-[96px] mr-[16px]  border-[1px] border-solid border-[#D0D5DD] rounded-[8px]"
              >
                <img
                  className="mx-auto mt-[32px] w-[32px] h-[32px]"
                  src={plusimg}
                  alt=""
                />
              </div>
            </div>
            {fotos.map((item) => (
              <div
                key={crypto.randomUUID()}
                className="relative inline-flex justify-center items-center"
              >
                <img
                  className="rounded-[8px] mr-[24px] w-[96px] h-[96px] object-cover "
                  src={item.image}
                  alt=""
                />
              </div>
            ))}
          </div>
        ) : (
          <button
            onClick={handleFileInputClick}
            className="flex gap-[8px] justify-center items-center h-[44px] w-full border-[1px] border-solid border-[#D0D5DD] rounded-[8px]"
          >
            {photoAdd(
              tg.themeParams.button_color
                ? tg.themeParams.button_color
                : "#0A84FF"
            )}
            <h1 className="text-[16px] font-[500] tg-button-text">
              {t("add_photo_btn")}
            </h1>
          </button>
        )}
      </section>
      <div className="max-w-[400px] mx-auto fixed bottom-[10px] w-full flex justify-center items-center">
        <button
          onClick={handleAddComment}
          className="text-[17px] font-[500] text-[#fff] h-[44px] w-[94%] tg-button rounded-[8px]"
        >
          {t("send_btn")}
        </button>
      </div>
      {/* file upload input */}
      <input
        multiple
        type="file"
        name="file"
        hidden
        ref={fileInputRef}
        onChange={handleFileUploaded}
        className="file-input"
      />
    </main>
  );
}
function photoAdd(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="22"
      viewBox="0 0 24 22"
      fill="none"
    >
      <path
        d="M19.1429 11V5.7143C19.1429 4.90478 18.6572 3.28573 16.7144 3.28573H15.2858C15.0001 3.28573 14.4286 3.00001 14.0001 2.57144C13.7144 2.28573 13.2286 1.57144 11.8572 1.57144H9.00007C7.62864 1.57144 7.14293 2.28573 6.85721 2.57144C6.42864 3.00001 5.85721 3.28573 5.5715 3.28573H4.14293C2.20007 3.28573 1.71436 4.90478 1.71436 5.7143V14.8572C1.71436 16.8 3.3334 17.2857 4.14293 17.2857H12.8572M16.0001 17.2857H22.2858M19.1429 14.1429V20.4286M13.8572 10C13.8572 11.8936 12.3222 13.4286 10.4286 13.4286C8.53509 13.4286 7.00007 11.8936 7.00007 10C7.00007 8.10647 8.53509 6.57144 10.4286 6.57144C12.3222 6.57144 13.8572 8.10647 13.8572 10Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
