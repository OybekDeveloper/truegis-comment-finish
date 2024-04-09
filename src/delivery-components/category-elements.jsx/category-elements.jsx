import React from "react";
import { minus, plus } from "../images";
import { SelectCategoryModal } from "../../reducer/delivery";
import { useDispatch ,useSelector} from "react-redux";
import CategoryDialog from "./category-dialog";
const CategoryElements = () => {
  const dispatch = useDispatch();
  const {}=useSelector(state=>state.delivery)
  const handleShow = (id) => {
    dispatch(SelectCategoryModal(id));
  };
  return (
    <main className="grid grid-cols-2 gap-x-[16px] gap-y-[32px] mt-[32px]">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item, idx) => (
        <div
          onClick={() => handleShow(item.id)}
          key={idx}
          className="flex flex-col gap-[8px] cursor-pointer"
        >
          <img
            className="rounded-[12px]"
            src="https://s3-alpha-sig.figma.com/img/a44b/fdf5/77240fa345897c1c18065d2be1459a9e?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RaeHvNAv8-5UAA3r29N~MH1GMIo5-7eHaWw1IsSOInIgQ9D4ODamC3GtAU3enT6BRmrdaZzIBaDddTYiyRrv7ylHmWwy5SIjRECz7P92J3bUuthFtT7CD18rUCmwYEH4WboPQW7SyaAWDuYSl2vPLr~vb5D225xc4D6aIBvhSIi~W6b2LnafT9ISTfhPR0pxVgsmnp0EefJrnR54nInxPKAmYoroLcsmK~EsdDvllJ3khdPKlEd0dxXfRV9~ZcNtBkXE-FP2dONG~b90W4348~LMdhAUe0SwgDCutsmvfs1Ro7labSkn4-ory8eCvbtYXmd3xeEYPdYTl~vIPHBS2A__"
            alt=""
          />
          <h1 className="text-[14px] font-[500] text-[#475467]">Chuchvara</h1>
          <div className="flex justify-center items-center px-[16px] py-[8px] rounded-[12px] bg-[#F2F4F7] cursor-pointer text-[#2E90FA] text-[14px] font-[500]">
            26,000 so’m
          </div>
          {/* <div className="flex justify-between items-center px-[16px] py-[8px] rounded-[12px] bg-[#F2F4F7] cursor-pointer">
            <img className="w-[20px] h-[20px] " src={minus} alt="" />
            <h1 className="text-[18px] font-[500] text-[#2E90FA]">2</h1>
            <img className="w-[20px] h-[20px] " src={plus} alt="" />
          </div> */}
        </div>
      ))}
      <CategoryDialog/>
    </main>
  );
};

export default CategoryElements;
