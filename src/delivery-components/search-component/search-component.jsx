import React, { Suspense, useEffect, useState } from "react";
import { back, search } from "../images";
import { motion } from "framer-motion";
import { foods } from "../foods-image/foodsData";
import LoadingC from "../loading/loader";
import { SelectCategoryActive } from "../../reducer/delivery";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const variants = {
  expand: {
    height: "100vh",
    left: 0,
    top: 0,
    zIndex: "20",
    backgroundColor: "white",
    transition: {
      damping: 22,
      stiffness: 70,
      top: { duration: 0.5 },
    },
  },
  exit: {
    left: 0,
    top: "250px",
    height: "70px",
    zIndex: "10",
    transition: {
      damping: 22,
      stiffness: 40,
      top: { duration: 0.5 },
    },
  },
};

const SearchComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.delivery);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const expandedContainer = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setSearchQuery("");
    setIsExpanded(false);
  };

  const handleActiveCtg = (data) => {
    const body = document.body;
    body.classList.remove("no-scroll");
    dispatch(SelectCategoryActive(data));
    navigate("/delivery/search-category");
  };

  useEffect(() => {
    const body = document.body;
    if (isExpanded) {
      body.classList.add("no-scroll");
    } else {
      body.classList.remove("no-scroll");
    }
  }, [isExpanded]);

  return (
    <motion.section
      variants={variants}
      animate={isExpanded ? "expand" : "exit"}
      initial={"exit"}
      className={`${
        isExpanded ? "fixed" : "absolute"
      } bg-white w-full flex justify-start items-start flex-col px-[16px]`}
    >
      {isExpanded && (
        <section className="w-full flex items-center justify-between py-[17px] shadow-shadow-xs">
          <img
            onClick={handleClose}
            className="cursor-pointer"
            src={back}
            alt=""
          />
          <h1 className="text-[20px] font-[500] text-[#000]">Ovqat izlash</h1>
          <div></div>
        </section>
      )}
      <div className="flex justify-start items-center w-full relative mt-[16px]">
        <img className="absolute left-[14px] " src={search} alt="search" />
        <input
          className="outline-none pr-[14px] pl-[44px] py-[10px] w-full text-[16px] font-[400] text-ellipsis bg-[#F2F4F7] rounded-[12px]"
          type="text"
          placeholder="Mahsulot izlash"
          onFocus={expandedContainer}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {isExpanded &&
        (searchQuery ? (
          <Suspense fallback={<LoadingC />}>
            <main
              className={`grid grid-cols-2 gap-x-[16px] gap-y-[32px] mt-[32px] overflow-y-scroll image-slide ${
                items.length > 0 ? "pb-[70px]" : "pb-[24px]"
              }`}
            >
              {foods[1].props.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-[8px] cursor-pointer"
                >
                  <img
                    className="rounded-[12px] w-full h-[150px] object-cover"
                    src={item.url}
                    alt=""
                  />
                  <h1 className="text-[14px] font-[500] text-[#475467]">
                    {item.title}
                  </h1>
                  <div className="flex justify-center items-center px-[16px] py-[8px] rounded-[12px] bg-[#F2F4F7] cursor-pointer text-[#2E90FA] text-[14px] font-[500]">
                    {item.price}
                  </div>
                </div>
              ))}
            </main>
          </Suspense>
        ) : (
          <section className="mt-[20px] w-full ">
            <h1 className="text-[18px] font-[500] text-[#182230]">
              Kategoriya
            </h1>
            <div className="grid grid-cols-4 gap-x-[30px] gap-y-[24px] mt-[20px]">
              {foods.map((item, idx) => (
                <div
                  onClick={() => handleActiveCtg(item)}
                  key={idx}
                  className="flex flex-col items-center justify-start cursor-pointer gap-[8px] whitespace-nowrap"
                >
                  <img
                    className="w-[48px] h-[48px] rounded-full object-cover "
                    src={item.url}
                    alt=""
                  />
                  <h1 className="font-[500] text-[14px] text-[#475467]">
                    {item.title.length > 8
                      ? item.title.slice(0, 8) + "..."
                      : item.title}
                  </h1>
                </div>
              ))}
            </div>
          </section>
        ))}
    </motion.section>
  );
};

export default SearchComponent;