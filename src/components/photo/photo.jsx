import React, { useState, useEffect, useRef } from "react";
import empty from "./empty.svg";
import "./photo.scss";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { ApiServer } from "../../ApiServer/api";
import addphoto from "./add-photo.svg";
import arrowL from "./arrow-left.svg";
import {
  DeleteModalRedux,
  GetCommentData,
  GetPlaceData,
  GetPlaceImage,
} from "../../reducer/event";
import LoadingC from "../loading/loader";
import trash from "./trash.svg";
import Lottie from "react-lottie";
import LineLoader from "../loading/line-loader";

export default function Photo() {
  const placeId = localStorage.getItem("placeId");
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const { placeData, placeDataImage } = useSelector((state) => state.event);
  const { t } = useTranslation();
  const [selectPhoto, setSelectPhoto] = useState([]);
  const [, setAllImageCount] = useState(1);
  const [album, setAlbum] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const fileInputRef = useRef(null);

  const animationData = require("./empty.json");
  const options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };
  const fetchDatas = async () => {
    try {
      const place = await ApiServer.getData(`/place/${placeId}/`);
      dispatch(GetPlaceData(place));
      dispatch(GetPlaceImage(place.images))
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUploaded = (e) => {
    const file = e.target.files[0];
    if (!file || !placeData) return;
    setLoading(true);

    const fd = new FormData();
    fd.append(`image`, file);
    fd.append("place", placeId);
    fd.append("user", userId);
    axios
      .post("https://admin13.uz/api/image/", fd, {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoading(false);
        fetchDatas(); // Simplified this part
      })
      .catch((err) => console.log(err));
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: null,
    prevArrow: null,
    afterChange: (index) => setCurrentSlide(index),
  };

  const handleSelectImage = async (id, idx) => {
    setAlbum(true);
    if (placeDataImage.length > 0) {
      const selectedImage = placeDataImage.find((image) => image.id === id);
      const remainingImages = placeDataImage.filter((image) => image.id !== id);
      dispatch(GetPlaceImage([selectedImage, ...remainingImages]));
      await fetchUserFullName(selectedImage.user); // Fetch user full name for the selected image
    } else {
      dispatch(GetPlaceImage(placeDataImage));
    }
  };

  const handleClose = () => {
    setAlbum(false);
  };
  const handleDeleteImg = (id) => {
    setLoading(true);
    ApiServer.delData(`/image/${id}/`)
      .then(() => fetchDatas())
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (selectPhoto.length > 0) {
      setAllImageCount(selectPhoto.length);
    }
  }, [selectPhoto]);

  useEffect(() => {
    fetchDatas();
  }, [placeData.images]);
  return (
    <>
      {loading ? (
        <LineLoader />
      ) : (
        <div className="relative">
          {selectPhoto.length > 0 && album && (
            <section className="backdrop-image">
              <div className="overflow-x-scroll whitespace-nowrap photo-slide">
                <div className="flex w-full justify-between gap-[100px] pl-[10px] z-[999]">
                  <div onClick={handleClose} className="cursor-pointer ">
                    <img src={arrowL} alt="" />
                  </div>
                  <h1 className="text-[#fff]">
                    {currentSlide + 1}/{placeDataImage.length}
                  </h1>

                  <div></div>
                </div>
                {placeDataImage.length > 1 ? (
                  <Slider {...settings} className="overflow-hidden">
                    {selectPhoto.map((photo, index) => (
                      <div key={index}>
                        <div className="z-[9999] h-[90vh] flex justify-center items-center">
                          <img
                            className="w-full max-h-[380px] object-contain"
                            src={photo.image}
                            alt={`slide-${index}`}
                          />
                        </div>
                        <div className="absolute text-white bottom-0 z-10 ml-[40px]">
                          <UserFullNameComponent
                            userId={photo.user}
                            created={photo.created}
                          />
                        </div>
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="z-[9999] h-[90vh] flex justify-center items-center">
                    {}
                    <img
                      src={selectPhoto[0].image}
                      alt="fofot"
                      className="w-full max-h-[380px] object-contain"
                    />
                    <div className="absolute text-white bottom-[28px] z-10 ml-[40px]">
                      <UserFullNameComponent
                        userId={selectPhoto[0].user}
                        created={selectPhoto[0].created}
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
          {placeDataImage.length > 0 ? (
            <section className="grid grid-cols-2 gap-[17px] mt-[23px] px-[16px]">
              {placeDataImage.map((image, index) => (
                <div key={index} className="relative">
                  {image.user == userId && (
                    <img
                      onClick={() => handleDeleteImg(image.id)}
                      className="absolute right-2 top-2 cursor-pointer p-1 bg-[#eee] rounded-full"
                      src={trash}
                      alt=""
                    />
                  )}
                  <img
                    onClick={() => {
                      handleSelectImage(image.id, index);
                      setAlbum(true);
                    }}
                    className="w-full object-cover rounded-[6px] h-[140px]"
                    src={image.image}
                    alt="foto"
                  />
                </div>
              ))}
            </section>
          ) : (
            <div className="flex justify-center items-center w-full h-full gap-[16px] flex-col mt-[80px]">
              <Lottie options={options} height={200} />
              <h1 className="font-[400] text-[14px]">{t("empty_photo")}</h1>
            </div>
          )}
          <input
            multiple
            type="file"
            name="file"
            hidden
            ref={fileInputRef}
            onChange={handleFileUploaded}
            className="file-input"
          />
          <div
            onClick={handleFileInputClick}
            className="mx-auto fixed bottom-[20px] flex justify-center items-center right-[16px]"
          >
            <button className="rounded-full pl-[19px] pr-[16px] py-[16px] bg-[#4ECC5E]">
              <img src={addphoto} alt="sadf" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export const fetchUserFullName = async (id, created) => {
  const userId = localStorage.getItem("userId");
  if (userId) {
    try {
      const user = await ApiServer.getData(`/users/${id}/`);
      return (
        <div className="w-screen  pt-[24px] backdrop-image-content flex justify-start items-center gap-[16px]">
          <img
            className="w-[50px] h-[50px] rounded-full object-cover"
            src={user?.profile_photo_url}
            alt="user"
          />
          <div className="flex flex-col">
            <h1 className="text-[#fff] text-[16px] font-[500]">
              {user?.full_name}
            </h1>
            <h2 className="text-[#fff] text-[12px] font-[500] opacity-[0.7]">
              {created?.slice(0, 10)}
            </h2>
          </div>
        </div>
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  return null;
};

const UserFullNameComponent = ({ userId, created }) => {
  const [userFullName, setUserFullName] = useState(null);

  useEffect(() => {
    const getUserFullName = async () => {
      const fullName = await fetchUserFullName(userId, created);
      setUserFullName(fullName);
    };
    getUserFullName();
  }, [userId]);

  return userFullName;
};
