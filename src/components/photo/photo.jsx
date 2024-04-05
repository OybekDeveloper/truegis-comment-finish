import React, { useState, useEffect, useRef } from "react";
import empty from "./empty.svg";
import "./photo.scss";
import Slider from "react-slick";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { ApiServer } from "../../ApiServer/api";
import addphoto from "./add-photo.svg";
import arrowL from "./arrow-left.svg";
import { GetCommentData, GetPlaceData } from "../../reducer/event";
import LoadingC from "../loading/loader";

export default function Photo() {
  const placeId = localStorage.getItem("placeId");
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const { placeData } = useSelector((state) => state.event);
  const { t } = useTranslation();
  const [selectPhoto, setSelectPhoto] = useState([]);
  const [activeImageCount, setActiveImageCount] = useState(1);
  const [allImageCount, setAllImageCount] = useState(1);
  const [fotos, setFotos] = useState([]);
  const [album, setAlbum] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userFullName, setUserFullName] = useState("");
  const fileInputRef = useRef(null);
  const handleFileInputClick = () => {
    fileInputRef.current.click();
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
        const fetchData = async () => {
          try {
            const place = await ApiServer.getData(`/place/${placeId}/`);
            const comment = await ApiServer.getData(
              `/comments/${placeId}/list`
            );
            dispatch(GetPlaceData(place));
            dispatch(GetCommentData(comment));
            setFotos(placeData.images);
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: null,
    prevArrow: null,
  };

  const handleSelectImage = async (id, idx) => {
    setActiveImageCount(idx + 1);
    setAlbum(true);
    if (fotos.length > 0) {
      const selectedImage = fotos.find((image) => image.id === id);
      const remainingImages = fotos.filter((image) => image.id !== id);
      setSelectPhoto([selectedImage, ...remainingImages]);
      await fetchUserFullName(selectedImage.user); // Fetch user full name for the selected image
    } else {
      setSelectPhoto(fotos);
      setActiveImageCount(1);
    }
  };

  const handleClose = () => {
    setAlbum(false);
  };

  useEffect(() => {
    if (selectPhoto.length > 0) {
      setAllImageCount(selectPhoto.length);
    }
  }, [selectPhoto]);

  useEffect(() => {
    setFotos(placeData.images);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [placeData]);
  // console.log(fotos);
  return (
    <>
      {loading ? (
        <LoadingC />
      ) : (
        <div className="relative">
          {selectPhoto.length > 0 && album && (
            <section className="backdrop-image">
              <div className="overflow-x-scroll whitespace-nowrap photo-slide">
                <div className="flex w-full justify-between gap-[100px] pl-[10px] z-[999]">
                  <div onClick={handleClose} className="cursor-pointer ">
                    <img src={arrowL} alt="" />
                  </div>
                  <h1 className="text-[#fff] ">
                    {activeImageCount}/{allImageCount}
                  </h1>
                  <div></div>
                </div>
                {fotos.length > 1 ? (
                  <Slider {...settings} className="overflow-hidden">
                    {selectPhoto.map((photo, index) => (
                      <div key={index}>
                        <div className="z-[9999] h-[90vh] flex justify-center items-center">
                          <img
                            className="w-full max-h-[380px] object-cover"
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
                    <img
                      src={selectPhoto[0].image}
                      alt="fofot"
                      className="w-screen object-cover"
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
          {fotos.length > 0 ? (
            <section className="grid grid-cols-2 gap-[17px] mt-[23px] px-[16px]">
              {fotos.map((image, index) => (
                <img
                  key={index}
                  onClick={() => {
                    handleSelectImage(image.id, index);
                    setAlbum(true);
                  }}
                  className="w-full object-cover rounded-[6px] h-[140px]"
                  src={image.image}
                  alt="foto"
                />
              ))}
            </section>
          ) : (
            <div className="flex justify-center items-center w-full h-full gap-[16px] flex-col mt-[80px]">
              <img src={empty} alt="" />
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

const userId = localStorage.getItem("userId");

export const fetchUserFullName = async (id, created) => {
  if (userId) {
    try {
      const user = await ApiServer.getData(`/users/${id}/`);
      return (
        <div className="w-screen  pt-[24px] backdrop-image-content flex justify-start items-center gap-[16px]">
          <img
            className="w-[56px] h-[56px] rounded-full object-cover"
            src={user.profile_photo_url}
            alt="user"
          />
          <div className="flex flex-col">
            <h1 className="text-[#fff] text-[18px] font-[500]">
              {user.full_name}
            </h1>
            <h2 className="text-[#fff] text-[14px] font-[500] opacity-[0.7]">
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
