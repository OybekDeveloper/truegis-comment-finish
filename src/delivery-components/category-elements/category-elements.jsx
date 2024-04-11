import React, { Suspense } from "react";
import { minus, plus } from "../images";
import { SelectCategoryModal } from "../../reducer/delivery";
import { useDispatch, useSelector } from "react-redux";
import CategoryDialog from "./category-dialog";
import LoadingC from "../loading/loader";
const CategoryElements = () => {
  const dispatch = useDispatch();
  const { activeCatgory } = useSelector((state) => state.delivery);
  const handleShow = (id) => {
    dispatch(SelectCategoryModal(id));
  };
  return (
    <Suspense fallback={<LoadingC />}>
      <main className="grid grid-cols-2 gap-x-[16px] gap-y-[32px] mt-[32px]">
        {activeCatgory.props.map((item, idx) => (
          <div
            onClick={() => handleShow(item.id)}
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
        <CategoryDialog />
      </main>
    </Suspense>
  );
};

export default CategoryElements;
