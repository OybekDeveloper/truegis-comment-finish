import React, { useEffect, useState } from "react";
import "./home.scss";
import { imgplus, line, starte } from "./img";
import { motion } from "framer-motion";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

export default function Home() {
  const { id, km } = useParams();
  const { pathname } = useLocation();
  const navlink = [
    {
      id: 1,
      title: "Umumiy",
      link: `/${id}/${km}/all-product`,
      count: null,
    },

    {
      id: 2,
      title: "Rasm",
      link: `/${id}/${km}/photo`,
      count: 12,
    },
    {
      id: 3,
      title: "Sharhlar",
      link: `/${id}/${km}/comment`,
      count: 23,
    },
    {
      id: 4,
      title: "Joy haqida",
      link: `/${id}/${km}/about`,
      count: null,
    },
  ];
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    localStorage.setItem("id", id);
    localStorage.setItem("km", km);
  }, []);
  console.log(id, km);

  return (
    <main className="home relative ">
      <section className="px-[16px]">
        <h1 className="text-[24px] font-[500] mt-[16px]">Tenge bank</h1>
        <div className="flex items-center gap-[14px]">
          <Rating
            name="text-feedback"
            value={4}
            readOnly
            style={{ color: "#FAC515" }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          <h1 className="text-[14px] font-[500] mt-[4px]">4.0</h1>
          <p className="text-[14px] font-[500] mt-[4px]">100 sharhlar</p>
        </div>
        <div className="flex justify-between items-center mt-[32px]">
          <h1 className="text-[14px] font-[500]">24 soat</h1>
          <div className="flex items-center gap-[8px]">
            <img src={line} alt="" />
            <h1 className="text-[14px] font-[500]">4km</h1>
          </div>
        </div>
      </section>
      <nav className="relative navbar w-full overflow-x-scroll whitespace-nowrap  flex gap-[20px] mt-[40px] px-[16px]">
        {navlink.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              navigate(item.link);
              setActiveTab(item.id);
            }}
            className="font-[500] h-[70px] relative text-[16px]"
          >
            <div className="flex items-center gap-[4px] h-[30px]">
              <span
                className={`${pathname === item.link && "text-[#0A84FF] "}`}
              >
                {item.title}
              </span>
              {item.count && (
                <p className="rounded-[10px] font-[600] px-[9px] py-[7px] bg-[#F2F4F7] text-[#667085]">
                  {item.count}
                </p>
              )}
            </div>

            {pathname === item.link && (
              <motion.div
                layoutId="active-pill"
                className="absolute mt-[10px] h-[3px] w-full bg-blue-400"
              />
            )}
          </button>
        ))}
        <hr className="z-[-10] absolute bottom-[-16px] w-full h-[1px] text-[#EAECF0] mb-[24px]" />
      </nav>

      <Outlet />
      <div className="mb-[40px]"></div>
      {pathname === `/${id}/${km}/photo` ? (
        <div className="mx-auto fixed bottom-[10px] w-full flex justify-center items-center">
          <button
            className="text-[17px] font-[500] text-[#fff] px-[14px] py-[10px] w-[94%] bg-[#0A84FF] rounded-[8px] flex justify-center items-center gap-[8px]"
          >
            <img src={imgplus} alt="sadf" />
            <h1>Rasm qo’shish</h1>
          </button>
        </div>
      ) : (
        <div className="mx-auto fixed bottom-[10px] w-full flex justify-center items-center">
          <button
            onClick={() => navigate(`/${id}/${km}/add-comment`)}
            className="text-[17px] font-[500] text-[#fff] px-[14px] py-[10px] w-[94%] bg-[#0A84FF] rounded-[8px]"
          >
            Sharh qoldirish
          </button>
        </div>
      )}
    </main>
  );
}
