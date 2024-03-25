import React from "react";
import BackDrop from "./backdrop";
import { motion } from "framer-motion";
import { ApiServer } from "../../ApiServer/api";
import { useDispatch, useSelector } from "react-redux";
import { ActiveModal } from "../../reducer/event";
const tg = window.Telegram.WebApp;

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "100%",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { deleteId } = useSelector((state) => state.event);
  const handleDelete = async () => {
    try {
      await ApiServer.delData(`/comments/${deleteId}/`);
      dispatch(ActiveModal(false));
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = () => {
    dispatch(ActiveModal(false));
  };
  console.log(deleteId);
  return (
    <BackDrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className=" menu flex flex-col gap-[24px] w-full h-[200px] bg-[#fff] rounded-t-[24px] px-[16px]"
      >
        <div>
          <div className="w-[44px] h-[4px] bg-[#D9D9D9] mt-[12px] mx-auto"></div>
          <section className="max-w-[400px] mx-auto flex flex-col gap-[24px] mt-[32px]">
            <div
              onClick={handleEdit}
              className="cursor-pointer flex justify-start items-center gap-[12px] "
            >
              {EditSvg(
                tg.themeParams.button_color
                  ? tg.themeParams.button_color
                  : "#0A84FF"
              )}
              <h1 className="tg-button-text text-[18px] font-[500]">
                Tahrirlash
              </h1>
            </div>
            <div
              onClick={handleDelete}
              className="cursor-pointer flex justify-start items-center gap-[12px] "
            >
              {deleteSvg()}
              <h1 className="text-[#F04438] text-[18px] font-[500]">
                O’chirish
              </h1>
            </div>
          </section>
        </div>
      </motion.div>
    </BackDrop>
  );
};

export default Modal;

function EditSvg(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M21 21H13M2.5 21.5L8.04927 19.3657C8.40421 19.2292 8.58168 19.1609 8.74772 19.0718C8.8952 18.9926 9.0358 18.9012 9.16804 18.7986C9.31692 18.6831 9.45137 18.5486 9.72028 18.2797L21 7C22.1046 5.89543 22.1046 4.10457 21 3C19.8955 1.89543 18.1046 1.89543 17 3L5.72028 14.2797C5.45138 14.5486 5.31692 14.6831 5.20139 14.832C5.09877 14.9642 5.0074 15.1048 4.92823 15.2523C4.83911 15.4183 4.77085 15.5958 4.63433 15.9507L2.5 21.5ZM2.5 21.5L4.55812 16.149C4.7054 15.766 4.77903 15.5746 4.90534 15.4869C5.01572 15.4102 5.1523 15.3813 5.2843 15.4065C5.43533 15.4353 5.58038 15.5804 5.87048 15.8705L8.12957 18.1295C8.41967 18.4196 8.56472 18.5647 8.59356 18.7157C8.61877 18.8477 8.58979 18.9843 8.51314 19.0947C8.42545 19.221 8.23399 19.2946 7.85107 19.4419L2.5 21.5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function deleteSvg(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5"
        stroke="#F04438"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
