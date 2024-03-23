import React, { useState, useEffect, useRef } from "react";
import empty from "./empty.svg";
import "./photo.scss";
import Slider from "react-slick";

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
  const [selectPhoto, setSelectPhoto] = useState([]);
  const [activeImageCount, setActiveImageCount] = useState(1);
  const [allImageCount, setAllImageCount] = useState(1);
  const [slideActive, setSlideActive] = useState(false);
  const fileInputRef = useRef(null);
  const handleFileInputClick = () => {
    fileInputRef.current.click();
};
  useEffect(() => {
    if (selectPhoto.length > 0) {
      setAllImageCount(selectPhoto.length);
      setSlideActive(true);
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
    const selectedImage = imgs.find((image) => image.id === id);
    const remainingImages = imgs.filter((image) => image.id !== id);
    setSelectPhoto([selectedImage, ...remainingImages]);
  };

  return (
    <div>
      {selectPhoto.length > 0 && (
        <section className="backdrop-image">
          <div className="overflow-x-scroll whitespace-nowrap photo-slide">
            <h1 className="absolute text-[#fff] top-[32px] text-center w-full">
              {activeImageCount}/{allImageCount}
            </h1>
            <Slider {...settings}>
              {selectPhoto.map((photo, index) => (
                <div key={index} className="z-[9999]">
                  <img
                    className="sliderImg mx-auto"
                    src={photo.url} // Fixed the src attribute
                    alt={`slide-${index}`}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </section>
      )}
      {imgs.length > 0 ? (
        <section className="grid grid-cols-3 grid-rows-3 gap-4 px-[16px] mb-[50px] mt-[32px]">
          {imgs.map((image, index) => (
            <img
              key={image.id} // Use a unique key
              onClick={() => {
                handleSelectImage(image.id);
                setSlideActive(true);
              }}
              src={image.url}
              alt={"image description"}
              className={`w-full h-full object-cover ${
                [1, 3, 7, 9, 13, 15].includes(index) && index < imgs.length
                  ? "col-span-2 row-span-2"
                  : "col-span-1 row-span-1"
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
