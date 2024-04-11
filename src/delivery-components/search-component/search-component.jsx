import React, { Suspense, useEffect, useState } from "react";
import { back, search } from "../images";
import { motion } from "framer-motion";
import { foods } from "../foods-image/foodsData";
import LoadingC from "../loading/loader";

const variants = {
  expand: {
    height: "100vh",
    left: 0,
    top: 0,
    zIndex: "1000",
    backgroundColor: "white",
    transition: {
      damping: 22,
      stiffness: 70,
      top: { duration: 0.5 }, // Add custom transition for the top property
    },
  },
  exit: {
    left: 0,
    top: "240px",
    height: "70px",
    zIndex: "10",
    transition: {
      damping: 22,
      stiffness: 40,
      top: { duration: 0.5 }, // Add custom transition for the top property
    },
  },
};

const SearchComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const expandedContainer = () => {
    setIsExpanded(true);
  };

  const handleClose=()=>{
    setSearchQuery('');
    setIsExpanded(false)
  }

  useEffect(() => {
    const body = document.body;
    const blur = document.querySelector("#back-effect");
    if (isExpanded) {
      body.classList.add("no-scroll");
      blur.classList.add("back-effect");
    } else {
      body.classList.remove("no-scroll");
      blur.classList.remove("back-effect");
    }
  }, [isExpanded]);

  return (
    <motion.section
      variants={variants}
      animate={isExpanded ? "expand" : "exit"}
      initial={"exit"}
      className={`absolute bg-white w-full flex justify-start items-start flex-col pt-[24px] mb-[24px] px-[16px]`}
    >
      {isExpanded && (
        <section className="w-full flex items-center justify-between py-[17px] shadow-shadow-xs">
          <img
            onClick={handleClose}
            className="cursor-pointer"
            src={back}
            alt=""
          />
          <h1 className="text-[20px] font-[500] texxt-[#000]">Ovqat izlash</h1>
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
          onChange={(e)=>setSearchQuery(e.target.value)}
        />
      </div>
      {isExpanded &&
        (searchQuery ? (
          <Suspense fallback={<LoadingC />}>
            <main className="grid grid-cols-2 gap-x-[16px] gap-y-[32px] mt-[32px]">
              {foods[1].props.map((item, idx) => (
                <div
                  // onClick={() => handleShow(item.id)}
                  key={idx}
                  className="flex flex-col gap-[8px] cursor-pointer"
                >
                  <img
                    className="rounded-[12px] w-[156px] h-[150px] object-cover"
                    src={item.url}
                    alt=""
                  />
                  <h1 className="text-[14px] font-[500] text-[#475467]">
                    {item.title}
                  </h1>
                  <div className="flex justify-center items-center px-[16px] py-[8px] rounded-[12px] bg-[#F2F4F7] cursor-pointer text-[#2E90FA] text-[14px] font-[500]">
                    {item.price}
                  </div>
                  {/* <div className="flex justify-between items-center px-[16px] py-[8px] rounded-[12px] bg-[#F2F4F7] cursor-pointer">
                <img className="w-[20px] h-[20px] " src={minus} alt="" />
                <h1 className="text-[18px] font-[500] text-[#2E90FA]">2</h1>
                <img className="w-[20px] h-[20px] " src={plus} alt="" />
              </div> */}
                </div>
              ))}
              {/* <CategoryDialog /> */}
            </main>
          </Suspense>
        ) : (
          <section className="mt-[20px] w-full">
            <h1 className="text-[18px] font-[500] text-[#182230]">
              Kategoriya
            </h1>
            <div className="grid grid-cols-4 gap-x-[30px] gap-y-[24px] mt-[20px]">
              {foods.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-start cursor-pointer"
                >
                  <img
                    className="w-[48px] h-[48px] rounded-full object-cover "
                    src={item.url}
                    alt=""
                  />
                  <h1>{item.title.slice(0, 10)}</h1>
                </div>
              ))}
            </div>
          </section>
        ))}
    </motion.section>
  );
};

export default SearchComponent;
