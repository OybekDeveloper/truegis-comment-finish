import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import empty from "./empty-comment.svg";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import "./comment.scss";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, m, motion } from "framer-motion";
import Modal from "./modal";
import { ActiveModal, DeleteComment } from "../../reducer/event";
import { useTranslation } from "react-i18next";
import LoadingC from "../loading/loader";
const tg = window.Telegram.WebApp;

export default function Comment() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");
  const { commentData, placeData, delModal } = useSelector(
    (state) => state.event
  );
  const [menuActive, setMenuActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const getInitials = (fullName) => {
    if (!fullName) return "";
    const words = fullName.split(" ");
    const initials = words.map((word) => word[0]);
    return initials.join("").toUpperCase();
  };
  const starCount = (count) => {
    let countStar = commentData.filter((item) => item.star === count);
    return countStar.length;
  };

  useEffect(() => {
    const body = document.querySelector(".home");
    if (menuActive && delModal) {
      body.classList.add("blur-effect");
    } else {
      body.classList.remove("blur-effect");
    }
  }, [menuActive, delModal]);
  const close = () => {
    setMenuActive(false);
  };
  const open = () => {
    setMenuActive(true);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [commentData]);
  return (
    <>
      {loading ? (
        <LoadingC />
      ) : (
        <main className={`${menuActive && ""} comment  mb-[70px] mt-[24px]`}>
          <section className="w-full flex justify-between px-[16px]">
            <div className="w-1/2 flex flex-col gap-2">
              <div className="w-full flex justify-center items-center gap-[12px]">
                <h1 className="text-[18px] font-[500]">5</h1>
                <ProgressBar
                  className="w-full"
                  completed={(starCount(5) / commentData.length) * 100}
                  maxCompleted={100}
                  bgColor="#FAC515"
                  height="6px"
                  animateOnRender={true}
                  customLabel=" "
                />
              </div>
              <div className="flex justify-center items-center gap-[12px]">
                <h1 className="text-[18px] font-[500]">4</h1>
                <ProgressBar
                  className="w-full"
                  completed={(starCount(4) / commentData.length) * 100}
                  maxCompleted={100}
                  bgColor="#FAC515"
                  height="6px"
                  animateOnRender={true}
                  customLabel=" "
                />
              </div>
              <div className="flex justify-center items-center gap-[12px]">
                <h1 className="text-[18px] font-[500]">3</h1>
                <ProgressBar
                  className="w-full"
                  completed={(starCount(3) / commentData.length) * 100}
                  maxCompleted={100}
                  bgColor="#FAC515"
                  height="6px"
                  animateOnRender={true}
                  customLabel=" "
                />
              </div>
              <div className="flex justify-center items-center gap-[12px]">
                <h1 className="text-[18px] font-[500]">2</h1>
                <ProgressBar
                  className="w-full"
                  completed={(starCount(2) / commentData.length) * 100}
                  maxCompleted={100}
                  bgColor="#FAC515"
                  height="6px"
                  animateOnRender={true}
                  customLabel=" "
                />
              </div>
              <div className="flex justify-center items-center gap-[12px]">
                <h1 className="text-[18px] font-[500]">1</h1>
                <ProgressBar
                  className="w-full"
                  completed={(starCount(1) / commentData.length) * 100}
                  maxCompleted={100}
                  bgColor="#FAC515"
                  height="6px"
                  animateOnRender={true}
                  customLabel=" "
                />
              </div>
            </div>
            <div>
              <h1 className="font-[500] text-[30px]">{placeData.rating}</h1>
              <Rating
                name="text-feedback"
                value={placeData.rating ? placeData.rating : 0}
                readOnly
                style={{ color: "#FAC515" }}
                precision={0.5}
                emptyIcon={
                  <StarIcon
                    fontSize="inherit"
                    style={{ opacity: 1, color: "#b4b5b5", fontSize: "18px" }}
                  />
                }
              />
            </div>
          </section>
          {commentData?.length > 0 ? (
            <section className="px-[16px] w-full mt-[48px]">
              <h1 className="text-[18px] font-[500] mb-[12px]">{t("li_3")}</h1>
              <div className="hr w-full h-[1px]  mb-[24px]"></div>
              <div className="w-full flex flex-col gap-[32px]">
                {commentData
                  .slice()
                  .reverse()
                  .map((item, idx) => (
                    <main key={idx} className="">
                      <div className="flex justify-between items-center gap-[12px]">
                        <article className="flex justify-start items-center gap-[12px]">
                          <div className=" text-[16px] font-[600] flex items-center justify-center w-[40px] h-[40px] rounded-full border-[1px] border-solid border-[#dfe0e3] bg-[#f2f4f7] text-[#475467]">
                            {item.user.profile_photo_url ? (
                              <img
                                className="rounded-full object-cover"
                                src={item?.user.profile_photo_url}
                                alt="foto"
                              />
                            ) : (
                              getInitials(item.user.full_name)
                            )}
                          </div>
                          <h1 className="text-[16px] font-[500]">
                            {item.user.full_name}
                          </h1>
                        </article>
                        {item.user.id === +userId && (
                          <div
                            onClick={() => {
                              menuActive ? close() : open();
                              dispatch(ActiveModal(true));
                              dispatch(DeleteComment(item.id));
                            }}
                            className="w-[24px] h-[24px]"
                          >
                            {MenuIcon()}
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between items-center mt-[24px]">
                        <Rating
                          name="text-feedback"
                          value={item.star}
                          readOnly
                          style={{ color: "#FAC515" }}
                          precision={0.5}
                          emptyIcon={
                            <StarIcon
                              fontSize="inherit"
                              style={{
                                opacity: 1,
                                color: "#b4b5b5",
                                fontSize: "18px",
                              }}
                            />
                          }
                        />
                        <p className="text-[14px] font-[400]">
                          {item.created_time.split(" ")[0]}
                        </p>
                      </div>
                      <h1 className="text-[16px] font-[400] mt-[16px]">
                        {item.text}
                      </h1>
                      <div className=" hr w-full h-[1px] mt-[24px]"></div>
                    </main>
                  ))}
              </div>
            </section>
          ) : (
            <div className="w-full flex flex-col justify-center items-center mt-[80px] gap-[16px]">
              <img src={empty} alt="" />
              <p className="text-[14px] font-[400]">{t("empty_comment")}</p>
            </div>
          )}

          {menuActive && delModal && (
            <Modal modalOpen={menuActive} handleClose={close} />
          )}
        </main>
      )}
    </>
  );
}

function MenuIcon(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
        stroke="#475467"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
        stroke="#475467"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
        stroke="#475467"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
