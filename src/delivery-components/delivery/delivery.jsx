import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { motion } from "framer-motion";
import "./delivery.scss";
import {
  basket,
  burger,
  close,
  down,
  exit,
  history,
  ibrohimbek,
  personal,
  web,
} from "../images";
import { OpenDeliveryMenu, OpenLangMenu } from "../../reducer/delivery";
import DeliveryLang from "../delivery-lang/delivery-lang";
import SearchComponent from "../search-component/search-component";

const menuitem = [
  {
    id: 1,
    title: "Shaxsiy ma’lumotlarim",
    url: "",
    icon: personal,
  },
  {
    id: 2,
    title: "Buyurtmalar tarixi",
    url: "",
    icon: history,
  },
  {
    id: 3,
    title: "Savat",
    url: "",
    icon: basket,
  },
  {
    id: 4,
    title: "Chiqish",
    url: "",
    icon: exit,
  },
];

export const Delivery = () => {
  const placeId = localStorage.getItem("placeId");
  const userId = localStorage.getItem("userId");
  const tg = window.Telegram.WebApp;
  const navigate = useNavigate();
  const { openMenu,openLang } = useSelector((state) => state.delivery);
  const dispatch = useDispatch()

  const handelOpenMenu=()=>{
    dispatch(OpenDeliveryMenu())
  }

  const handleOpenLang=()=>{
    dispatch(OpenLangMenu())
  }

  const back = () => {
    navigate(`/${placeId}/${userId}/12`);
  };
  tg.onEvent("backButtonClicked", function () {
    back();
  });
  const category_link = [
    {
      id: 1,
      name: "Burger",
      img: burger,
    },
    {
      id: 2,
      name: "Burger",
      img: burger,
    },
    {
      id: 3,
      name: "Burger",
      img: burger,
    },
    {
      id: 4,
      name: "Burger",
      img: burger,
    },
    {
      id: 5,
      name: "Burger",
      img: burger,
    },
    {
      id: 6,
      name: "Burger",
      img: burger,
    },
  ];
    useEffect(() => {
      const body = document.body;
      const blur = document.querySelector("#back-effect");
      if (openMenu || openLang) {
        body.classList.add("no-scroll");
        blur.classList.add("back-effect");
      } else {
        body.classList.remove("no-scroll");
        blur.classList.remove("back-effect");
      }
    }, [openMenu,openLang]);

  useEffect(() => {
    navigate("/delivery/home");
  }, []);

  return (
    <div className={`px-[16px] delivery bg-white relative mb-[20px]`}>
      <section className="flex justify-between items-center w-full pt-[16px] pb-[24px]">
        <div onClick={handelOpenMenu} className="cursor-pointer w-[48px] h-[48px] rounded-full flex justify-center items-center bg-[#f2f4f7] border-[1px] border-solid text[#475467] text-[12px] font-[600]">
          OR
        </div>
        <div className="cursor-pointer flex justify-center items-center gap-2">
          <img src={down} alt="down" />
          <h1 className="text-[#344054] text-[14px] font-[500] line-clamp-[20px]">
            {" "}
            Yetkazish manzili qo’shish
          </h1>
        </div>
        <img onClick={handleOpenLang} className="cursor-pointer" src={web} alt="" />
      </section>
      <section className="overflow-x-scroll whitespace-nowrap w-full image-slide">
        {[1, 2, 3, 4, 5].map((item, idx) => (
          <div key={idx} className="inline-flex mr-2">
            <img
              className=" w-[300px] h-[140px] object-cover rounded-[12px]"
              alt="img"
              src="https://s3-alpha-sig.figma.com/img/feec/d7df/6689d6ed9b06aee81153af617d42d0b2?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NIFl9Ev8q~-tiHQrwZGnmIL-8CQV-lrc01S5bsloATMhntGyik7VS03w7tiQIYVWzi0K7BV20juEe6q7rbfyVlyNDv9Z6RslxFxWqs79~P8nmNBCVRtbQcjQ4h~5Ba6kpyVc9QxmUZHcKq9g2uAAvTTA0rgMksCcTgq8k71pjRJGu0BVMk5pJfZLg4Ll3byLOZDVHPgrEW4DJDWvqTLdmx87FMHSvW9BpUyWpG9gAOnVEA1Qm~oJ8eEB9Az2waBZukVZnd7k~4MMrci0EyAS6ytQll5qSRMBA4bjz7~zYN27onvTYj~Pnt3kDJZhnS5jhN~Z1PWYT5xWVlzauFAkeQ__"
            />
          </div>
        ))}
      </section>
        <div className="w-full h-[70px]"></div>
      <SearchComponent/>
      <section className="sticky top-0 bg-[#fff] overflow-x-scroll whitespace-nowrap w-full image-slide mt-[24px]">
        {category_link?.map((item, idx) => (
          <div
            key={idx}
            className="inline-flex flex-col gap-[8px] mr-[24px] cursor-pointer"
          >
            <img
              className={`${
                idx === 0 ? "border-[#2E90FA]" : "border-[#EAECF0]"
              } w-[48px] h-[48px] border-[3px] border-solid  rounded-full`}
              src={item.img}
              alt=""
            />
            <h1 className="text-[#475467] text-[14px] font-[400]">
              {item.name}
            </h1>
          </div>
        ))}
      </section>
      <Outlet />
      <motion.section
        initial={{ opacity: 0, x: "-100%" }}
        animate={{ opacity: 1, x: openMenu ? 0 : "-100%" }}
        exit={{ opacity: 0, x: 0 }}
        transition={{ duration: 0.5 }}
        className="menu fixed top-0 left-0 w-[80%] h-screen bg-white p-[16px] z-20"
      >
        <div onClick={handelOpenMenu} className="w-full h-[48px] items-center flex justify-end cursor-pointer">
          <img className="w-[20px] h-[20px]" src={close} alt="close" />
        </div>
        <div className="flex justify-start gap-[10px] items-center text-[18px] font-[500] text-[#000]">
          <img
            className="w-[45px] h-[45px] object-cover rounded-full"
            src={ibrohimbek}
            alt=""
          />
          <h1>Ibroximbek restorani</h1>
        </div>
        <div className="w-full h-[1px] bg-[#F2F4F7] my-[24px]"></div>
        <div className="flex flex-col gap-[24px] w-full">
          {menuitem?.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-start items-center gap-[12px] cursor-pointer"
            >
              <img src={item.icon} alt="" />
              <h1
                className={`${
                  idx === 3 ? "text-[#F04438]" : "text-[#182230]"
                } text-[16px] font-[500]`}
              >
                {item.title}
              </h1>
            </div>
          ))}
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: openLang ? 0 : "100%" }}
        exit={{ opacity: 0, x: 0 }}
        transition={{ duration: 0.5 }}
        className="menu fixed top-0 left-0 w-[100%] h-screen bg-white p-[16px] z-20"
      >
        <DeliveryLang/>
      </motion.section>
      {(openMenu) && (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10"></div>
    )}
    </div>
  );
};
