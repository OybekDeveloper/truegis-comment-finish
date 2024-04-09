import React, { useEffect, useState } from "react";
import { back, search } from "../images";
import { motion } from "framer-motion";

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

  const expandedContainer = () => {
    setIsExpanded(true);
  };

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
        <section className="w-full flex items-center justify-between mb-[24px]">
          <img
            onClick={() => setIsExpanded(false)}
            className="cursor-pointer"
            src={back}
            alt=""
          />
          <h1 className="text-[20px] font-[500] texxt-[#000]">Ovqat izlash</h1>
          <div></div>
        </section>
      )}
      <div className="flex justify-start items-center w-full relative">
        <img className="absolute left-[14px] " src={search} alt="search" />
        <input
          className="outline-none pr-[14px] pl-[44px] py-[10px] w-full text-[16px] font-[400] text-ellipsis bg-[#F2F4F7] rounded-[12px]"
          type="text"
          placeholder="Mahsulot izlash"
          onFocus={expandedContainer}
        />
      </div>
      <section>
        
      </section>
    </motion.section>
  );
};

export default SearchComponent;
