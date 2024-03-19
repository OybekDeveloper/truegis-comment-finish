import React from "react";
import emptry from './empty.svg'
const imgs = [
  // {
  //   id: 1,
  //   url: "https://www.decowallpaper.com.au/wp-content/uploads/2023/02/M-888..jpg",
  // },
  // {
  //   id: 2,
  //   url: "https://c4.wallpaperflare.com/wallpaper/880/112/963/logo-nike-wallpaper-preview.jpg",
  // },
  // {
  //   id: 3,
  //   url: "https://blogger.googleusercontent.com/img/a/AVvXsEh16ZmNnnuuoNmXuf9B_Yny-qC6IKX3sXz08dhAjydrj9w8001zplc3gIVbMWdzu659oH1P0BkAG1_4FepY6fOiCq_TG90nKg1QSC9MGay_RXakXKe1zjz9ZbRXzOW34RUFH9KKqxIWqg643Go328_AmQvHH4cj4lTu2XzMq_MDbWwk3PMhhdDicxeCaJji",
  // },
  // {
  //   id: 1,
  //   url: "https://www.decowallpaper.com.au/wp-content/uploads/2023/02/M-888..jpg",
  // },
  // {
  //   id: 2,
  //   url: "https://c4.wallpaperflare.com/wallpaper/880/112/963/logo-nike-wallpaper-preview.jpg",
  // },
  // {
  //   id: 3,
  //   url: "https://blogger.googleusercontent.com/img/a/AVvXsEh16ZmNnnuuoNmXuf9B_Yny-qC6IKX3sXz08dhAjydrj9w8001zplc3gIVbMWdzu659oH1P0BkAG1_4FepY6fOiCq_TG90nKg1QSC9MGay_RXakXKe1zjz9ZbRXzOW34RUFH9KKqxIWqg643Go328_AmQvHH4cj4lTu2XzMq_MDbWwk3PMhhdDicxeCaJji",
  // },
  // {
  //   id: 1,
  //   url: "https://www.decowallpaper.com.au/wp-content/uploads/2023/02/M-888..jpg",
  // },
  // {
  //   id: 2,
  //   url: "https://c4.wallpaperflare.com/wallpaper/880/112/963/logo-nike-wallpaper-preview.jpg",
  // },
  // {
  //   id: 3,
  //   url: "https://blogger.googleusercontent.com/img/a/AVvXsEh16ZmNnnuuoNmXuf9B_Yny-qC6IKX3sXz08dhAjydrj9w8001zplc3gIVbMWdzu659oH1P0BkAG1_4FepY6fOiCq_TG90nKg1QSC9MGay_RXakXKe1zjz9ZbRXzOW34RUFH9KKqxIWqg643Go328_AmQvHH4cj4lTu2XzMq_MDbWwk3PMhhdDicxeCaJji",
  // },
  // {
  //   id: 1,
  //   url: "https://www.decowallpaper.com.au/wp-content/uploads/2023/02/M-888..jpg",
  // },
  // {
  //   id: 2,
  //   url: "https://c4.wallpaperflare.com/wallpaper/880/112/963/logo-nike-wallpaper-preview.jpg",
  // },
  // {
  //   id: 3,
  //   url: "https://blogger.googleusercontent.com/img/a/AVvXsEh16ZmNnnuuoNmXuf9B_Yny-qC6IKX3sXz08dhAjydrj9w8001zplc3gIVbMWdzu659oH1P0BkAG1_4FepY6fOiCq_TG90nKg1QSC9MGay_RXakXKe1zjz9ZbRXzOW34RUFH9KKqxIWqg643Go328_AmQvHH4cj4lTu2XzMq_MDbWwk3PMhhdDicxeCaJji",
  // },
];

export default function Photo() {
  return (
    <div>
      {imgs.length>0 ?(
        <section className="grid grid-cols-3 grid-rows-3 gap-4 px-[16px] mb-[50px]">
        {imgs.map((image, index) => (
          //eslint-disable-next-line
          <img
            key={index}
            src={image.url}
            alt={"image description"}
            className={`w-full h-full object-cover ${
              [1, 3, 7, 9, 13, 15].includes(index) && index < imgs.length
                ? "col-span-2 row-span-2"
                : "col-span-1 row-span-1"
            }`}
          />
        ))}
      </section>
      ):(
        <div className="flex justify-center items-center w-full h-full gap-[16px] flex-col mt-[80px]">
          <img src={emptry} alt="" />
          <h1 className="font-[400] text-[14px]">Yuklangan rasmlar yo’q</h1>
        </div>
      )}
      
    </div>
  );
}
