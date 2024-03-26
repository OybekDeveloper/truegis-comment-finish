import React, { useState, useEffect, useRef } from "react";
import empty from "./empty.svg";
import "./photo.scss";
import Slider from "react-slick";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
const imgs = [
  {
    id: 1,
    url: "https://www.decowallpaper.com.au/wp-content/uploads/2023/02/M-888..jpg",
  },
  {
    id: 2,
    url: "https://c4.wallpaperflare.com/wallpaper/880/112/963/logo-nike-wallpaper-preview.jpg",
  },
  {
    id: 3,
    url: "https://blogger.googleusercontent.com/img/a/AVvXsEh16ZmNnnuuoNmXuf9B_Yny-qC6IKX3sXz08dhAjydrj9w8001zplc3gIVbMWdzu659oH1P0BkAG1_4FepY6fOiCq_TG90nKg1QSC9MGay_RXakXKe1zjz9ZbRXzOW34RUFH9KKqxIWqg643Go328_AmQvHH4cj4lTu2XzMq_MDbWwk3PMhhdDicxeCaJji",
  },
];

export default function Photo() {
  const { placeData } = useSelector((state) => state.event);

  const [selectPhoto, setSelectPhoto] = useState([]);
  const [activeImageCount, setActiveImageCount] = useState(1);
  const [allImageCount, setAllImageCount] = useState(1);
  const [fotos, setFotos] = useState([]);

  const [album, setAlbum] = useState(false);
  const fileInputRef = useRef(null);
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };
  useEffect(() => {
    if (selectPhoto.length > 0) {
      setAllImageCount(selectPhoto.length);
    }
  }, [selectPhoto]);

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

  const handleSelectImage = (id) => {
    setActiveImageCount(id);
    setAlbum(true);
    if (fotos.length > 1) {
      const selectedImage = fotos.find((image, idx) => idx === id);
      const remainingImages = fotos.filter((image, idx) => idx !== id);
      setSelectPhoto([selectedImage, ...remainingImages]);
    }else{
      setSelectPhoto(fotos)
      setActiveImageCount(1)
    }
  };
  const handleClose = () => {
    setAlbum(false);
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
  return (
    <div>
      {selectPhoto.length > 0 && album && (
        <section className="backdrop-image">
          <div className="overflow-x-scroll whitespace-nowrap photo-slide">
            <h1 className="absolute text-[#fff] top-[32px] text-center w-full">
              {activeImageCount}/{allImageCount}
            </h1>
            <div
              onClick={handleClose}
              className="cursor-pointer absolute top-[33px] right-[24px]"
            >
              <IoMdClose className="text-[24px] text-white" />
            </div>
            {fotos.length>1?(
              <Slider {...settings}>
              {selectPhoto.map((photo, index) => (
                <div key={index} className="z-[9999]">
                  <img
                    className="sliderImg mx-auto"
                    src={photo} // Fixed the src attribute
                    alt={`slide-${index}`}
                  />
                </div>
              ))}
            </Slider>
            ):(
              <img src={selectPhoto[0]} alt="fofot" className="h-[210px] w-screen object-cover"/>
            )}
            
          </div>
        </section>
      )}
      {fotos.length > 0 ? (
        <section className="grid grid-cols-3 grid-rows-3 gap-4 px-[16px] mb-[50px] mt-[32px]">
          {fotos.map((image, index) => (
            //eslint-disable-next-line
            <img
              key={index}
              onClick={() => {
                handleSelectImage(index);
                setAlbum(true);
              }}
              src={image}
              alt={"image description"}
              className={`w-full h-full object-cover ${
                [1, 3, 7, 9, 13, 15].includes(index) && index < imgs.length
                  ? "col-span-2 row-span-2 h-[200px]"
                  : "col-span-1 row-span-1 h-[100px]"
              } rounded-[8px]`}
            />
          ))}
        </section>
      ) : (
        <div className="flex justify-center items-center w-full h-full gap-[16px] flex-col mt-[80px]">
          <img src={empty} alt="" />
          <h1 className="font-[400] text-[14px]">Yuklangan rasmlar yo’q</h1>
        </div>
      )}
    </div>
  );
}
