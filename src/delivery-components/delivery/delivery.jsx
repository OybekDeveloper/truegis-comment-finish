import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import "./delivery.scss";
import {
  basket,
  close,
  down,
  exit,
  history,
  ibrohimbek,
  personal,
  web,
} from "../images";
import {
  ExitUserModal,
  OpenDeliveryMenu,
  OpenLangMenu,
  SelectCategoryActive,
  openPersonalModal,
} from "../../reducer/delivery";
import DeliveryLang from "../delivery-lang/delivery-lang";
import SearchComponent from "../search-component/search-component";
import { useClickOutside } from "react-click-outside-hook";
import ExitUser from "./exit-modal";
import PersonalModal from "./personal-modal";

const Delivery = () => {
  const placeId = localStorage.getItem("placeId");
  const userId = localStorage.getItem("userId");
  const tg = window.Telegram.WebApp;
  const navigate = useNavigate();
  const { openMenu, openLang, activeCatgory, selectCategory, foods, items,totalPrice } =
    useSelector((state) => state.delivery);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [registter, setRegister] = useState(false);
  const [ref, isClickedOutside] = useClickOutside();

  console.log(foods);
  const menuitem = [
    {
      id: 1,
      title: "Shaxsiy ma’lumotlarim",
      url: registter ? "/delivery/personal-info" : "login",
      icon: personal,
    },
    {
      id: 2,
      title: "Buyurtmalar tarixi",
      url: "/delivery/order-history",
      icon: history,
    },
    {
      id: 3,
      title: "Savat",
      url: "/delivery/basket",
      icon: basket,
    },
    {
      id: 4,
      title: "Chiqish",
      url: "",
      icon: exit,
    },
  ];

  const handelOpenMenu = () => {
    dispatch(OpenDeliveryMenu());
  };

  const handleOpenLang = () => {
    dispatch(OpenLangMenu());
  };

  const handleActiveCtg = (data) => {
    dispatch(SelectCategoryActive(data));
  };

  const handleClickMenu = (url) => {
    if (url === "") {
      dispatch(ExitUserModal(true));
    }
    if (url === "login") {
      dispatch(openPersonalModal(true));
    } else {
      navigate(url);
    }
    dispatch(OpenDeliveryMenu(false));
  };

  const back = () => {
    navigate(`/${placeId}/${userId}/12`);
  };
  tg.onEvent("backButtonClicked", function () {
    back();
  });

  useEffect(() => {
    const body = document.body;
    const blur = document.querySelector("#back-effect");
    if (openMenu || openLang || selectCategory) {
      body.classList.add("no-scroll");
      blur.classList.add("back-effect");
    } else {
      body.classList.remove("no-scroll");
      blur.classList.remove("back-effect");
    }
  }, [openMenu, openLang, selectCategory]);

  useEffect(() => {
    // navigate("/delivery/home");
  }, []);
  return (
    <div className={`px-[16px] delivery bg-white relative`}>
      {pathname === "/delivery/home" && (
        <>
          <section className="shadow-shadow-xs flex justify-between items-center w-full py-[17px]">
            <div
              onClick={handelOpenMenu}
              className="cursor-pointer w-[48px] h-[48px] rounded-full flex justify-center items-center bg-[#f2f4f7] text-[#475467] border-[1px] border-solid text[#475467] text-[12px] font-[600]"
            >
              OR
            </div>
            <div className="cursor-pointer flex justify-center items-center gap-2">
              <img src={down} alt="down" />
              <h1 className="text-[#344054] text-[14px] font-[500] line-clamp-[20px]">
                {" "}
                Yetkazish manzili qo’shish
              </h1>
            </div>
            <img
              onClick={handleOpenLang}
              className="cursor-pointer"
              src={web}
              alt=""
            />
          </section>
          <section className="overflow-x-scroll whitespace-nowrap w-full image-slide mt-[16px]">
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
          <SearchComponent />
          <section className="sticky top-[-3px] bg-[#fff] overflow-x-scroll whitespace-nowrap w-full image-slide mt-[24px] pt-[5px] pb-[5px]">
            {foods?.map((item, idx) => (
              <div
                onClick={() => handleActiveCtg(item)}
                key={idx}
                className="inline-flex flex-col gap-[8px] mr-[24px] cursor-pointer"
              >
                <img
                  className={`${
                    item.food_id === activeCatgory.food_id
                      ? "border-[#2E90FA]"
                      : "border-[#EAECF0]"
                  } w-[48px] h-[48px] border-[3px] border-solid  rounded-full object-cover`}
                  src={item.url}
                  alt=""
                />
                <h1 className="text-[#475467] text-[14px] font-[400] whitespace-normal">
                  {item.title.length > 10
                    ? item.title.slice(0, 10) + "..."
                    : item.title}
                </h1>
              </div>
            ))}
          </section>
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: items.length>0 ? 0 : "100%" }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.5 }}
            className="w-full mx-auto flex justify-center fixed bottom-[-10px] p-[16px] z-10 left-0 bg-white"
          >
            <button
              onClick={() => navigate("/delivery/basket")}
              className="bg-[#2E90FA] w-full rounded-[8px] flex justify-between items-center py-[8px] px-[16px]"
            >
              <h1 className="text-[#fff] text-[18px] font-[400]">
                {items && items.length} ta mahsulot
              </h1>
              <p className="text-[#fff] text-[18px] font-[500]">{formatPrice(totalPrice)} so’m</p>
            </button>
          </motion.div>
        </>
      )}
      <Outlet />
      <motion.section
        initial={{ opacity: 0, x: "-100%" }}
        animate={{ opacity: 1, x: openMenu ? 0 : "-100%" }}
        exit={{ opacity: 0, x: "-100%" }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-[80%] h-screen bg-[#fff] p-[16px] z-20"
      >
        <div
          onClick={handelOpenMenu}
          className="w-full h-[48px] items-center flex justify-end cursor-pointer"
        >
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
              onClick={() => handleClickMenu(item.url)}
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
        className="menu fixed top-0 left-0 w-[100%] h-screen bg-[#fff] px-[16px] z-20"
      >
        <DeliveryLang />
      </motion.section>
      {(openMenu || openLang) && (
        <div
          ref={ref}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10"
        ></div>
      )}
      <ExitUser />
      <PersonalModal />
    </div>
  );
};

export default Delivery;
function formatPrice(price) {
  // Formatni "20,300" yoki "1,000" shaklida olish
  const formattedPrice = new Intl.NumberFormat("en-US").format(price);

  return formattedPrice;
}
