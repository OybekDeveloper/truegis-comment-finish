import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import './home.scss'
import { line } from "./img";
import {motion} from 'framer-motion'
import { NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

export default function Home() {
  const {id,km}=useParams()
  const {pathname}=useLocation()
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
  const navigate= useNavigate()
  const [activeTab, setActiveTab] = useState(1);

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  useEffect(()=>{
    localStorage.setItem("id",id)
    localStorage.setItem("km",km)
  },[])
  console.log(id,km);

  return (
    <main className="home max-w-[400px] mx-auto">
      <section className="px-[16px]">
        <h1 className="mt-[16px]">Tenge bank</h1>
        <div className="flex items-center gap-[14px]">
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
          />
          <h1 className="text-[14px] font-[500] mt-[4px]">4.0</h1>
          <p className="text-[14px] font-[500] mt-[4px]">100 sharhlar</p>
        </div>
        <div className="flex justify-between items-center mt-[32px]">
          <h1>24 soat</h1>
          <div className="flex items-center gap-[8px]">
            <img src={line} alt="" />
            <h1>4km</h1>
          </div>
        </div>
      </section>
      <nav className="navbar w-full overflow-x-scroll whitespace-nowrap  flex gap-[20px] mt-[40px] px-[16px]">
        {navlink.map((item) => (
          <button
            key={item.id}
            onClick={() => {navigate(item.link);setActiveTab(item.id)}}
            className="font-[500] h-[70px] relative text-[16px]"
          >
            <div className="flex items-center gap-[4px] h-[30px]">
              <span className={`${(pathname===item.link) && "text-[#0A84FF] "}`}>{item.title}</span>
              {item.count && (<p className="rounded-[10px] font-[600] px-[9px] py-[7px] bg-[#F2F4F7] text-[#667085]">{item.count}</p>)}
            </div>

            {(pathname===item.link) && (
              <motion.div layoutId="active-pill" className="absolute mt-[10px] h-[3px] w-full bg-blue-400" />
            )}
          </button>
        ))}
      </nav>
      <Outlet/>
    </main>
  );
}
