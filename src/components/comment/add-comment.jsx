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
const tg = window.Telegram.WebApp;

export default function AddComment() {
  const id = localStorage.getItem("id");
  const km = localStorage.getItem("km");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const dispatch = useDispatch()
  const { placeData } = useSelector((state) => state.event);

  const [formData, setFormData] = useState({
    star: 0, // Initialize formData.star to a default value
  });
  const [fotos,setFotos]=useState([])
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };
  const handleChange = (event, newValue) => {
    setFormData({
      ...formData,
      star: newValue !== null ? newValue : 0, // Ensure formData.star is always defined
      user: 221,
    });
  };
  
  const handleFileUploaded = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !placeData) return;

    const fd = new FormData();

    for (let i = 0; i < files.length; i++) {
        if (i === 0) {
            fd.append("image", files[0]);
        } else {
            fd.append(`image${i + 1}`, files[i]);
        }
    }

    axios
        .patch(`https://admin13.uz/api/place/${id}/`, fd, {
            headers: {
                accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
          const fetchData = async () => {
            try {
              const place = await ApiServer.getData(`/place/${id}/`);
              dispatch(GetPlaceData(place));
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
      await ApiServer.postData(`/comments/${id}/create/`, formData);
      navigate(`/${id}/${km}/comment`);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const { image, image2, image3, image4 } = placeData;
    const photosArray = [];
    if (image) photosArray.push(image);
    if (image2) photosArray.push(image2);
    if (image3) photosArray.push(image3);
    if (image4) photosArray.push(image4);
    setFotos(photosArray);
  }, [placeData]);
  console.log(placeData)
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
        <p className="text-[18px] font-[500]">
          Joy haqida o’z fikringizni qoldiring
        </p>
        <textarea
          name="message"
          onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          id="message"
          rows="6"
          className={`mt-[24px] border-[1px] border-solid comment-input p-[10px] bg-transparent text-[16px] font-[400] input-form`}
          placeholder={"Sharh yozing"}
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
                  src={item}
                  alt=""
                />
                <img
                  className="absolute bg-[#EAECF0] rounded-full p-[5px] top-0 right-[10px]"
                  src={trash}
                  alt=""
                />
              </div>
            ))}
          </div>
        ) : (
          <button
            onClick={handleFileInputClick}
            className="flex gap-[8px] justify-center items-center px-[16px] py-[12px] w-full border-[1px] border-solid border-[#D0D5DD] rounded-[8px]"
          >
            {photoAdd(
              tg.themeParams.button_color
                ? tg.themeParams.button_color
                : "#0A84FF"
            )}
            <h1 className="text-[16px] font-[500] tg-button-text">
              Rasm qo’shish
            </h1>
          </button>
        )}
      </section>
      <div className="max-w-[400px] mx-auto fixed bottom-[10px] w-full flex justify-center items-center">
        <button
          onClick={handleAddComment}
          className="text-[17px] font-[500] text-[#fff] py-[14px] px-[10px] w-[94%] tg-button rounded-[8px]"
        >
          Yuborish
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
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M10.4167 2.49999H6.5C5.09987 2.49999 4.3998 2.49999 3.86502 2.77247C3.39462 3.01216 3.01217 3.39461 2.77248 3.86501C2.5 4.39979 2.5 5.09986 2.5 6.49999V13.5C2.5 14.9001 2.5 15.6002 2.77248 16.135C3.01217 16.6054 3.39462 16.9878 3.86502 17.2275C4.3998 17.5 5.09987 17.5 6.5 17.5H14.1667C14.9416 17.5 15.3291 17.5 15.647 17.4148C16.5098 17.1836 17.1836 16.5098 17.4148 15.647C17.5 15.3291 17.5 14.9416 17.5 14.1667M15.8333 6.66666V1.66666M13.3333 4.16666H18.3333M8.75 7.08332C8.75 8.0038 8.00381 8.74999 7.08333 8.74999C6.16286 8.74999 5.41667 8.0038 5.41667 7.08332C5.41667 6.16285 6.16286 5.41666 7.08333 5.41666C8.00381 5.41666 8.75 6.16285 8.75 7.08332ZM12.4917 9.93178L5.44262 16.34C5.04614 16.7005 4.84789 16.8807 4.83036 17.0368C4.81516 17.1721 4.86704 17.3064 4.96932 17.3963C5.08732 17.5 5.35523 17.5 5.89107 17.5H13.7133C14.9126 17.5 15.5123 17.5 15.9833 17.2985C16.5745 17.0456 17.0456 16.5745 17.2985 15.9833C17.5 15.5123 17.5 14.9126 17.5 13.7133C17.5 13.3098 17.5 13.108 17.4559 12.9201C17.4005 12.684 17.2941 12.4628 17.1444 12.272C17.0252 12.1202 16.8677 11.9941 16.5526 11.742L14.2215 9.87721C13.9062 9.62491 13.7485 9.49877 13.5748 9.45425C13.4218 9.41501 13.2607 9.42009 13.1104 9.4689C12.94 9.52427 12.7905 9.66011 12.4917 9.93178Z"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
