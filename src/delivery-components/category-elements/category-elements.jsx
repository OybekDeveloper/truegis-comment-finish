import React, { Suspense, useEffect } from "react";
import { minus, plus } from "../images";
import { SelectCategoryModal } from "../../reducer/delivery";
import { useDispatch, useSelector } from "react-redux";
import CategoryDialog from "./category-dialog";
import LoadingC from "../loading/loader";
import CategoryItem from "./category-item";
const CategoryElements = () => {
  const { activeCatgory, items } = useSelector((state) => state.delivery);
  return (
    <Suspense fallback={<LoadingC />}>
      <main
        className={`grid grid-cols-2 gap-x-[16px] gap-y-[32px] mt-[32px] ${
          items.length > 0 ? "mb-[60px]" : "mb-0"
        }`}
      >
        {activeCatgory?.props.map((item, idx) => (
          <CategoryItem
            key={idx}
            item={item}
            categoryId={activeCatgory.food_id}
          />
        ))}
        <CategoryDialog categoryId={activeCatgory?.food_id} />
      </main>
      
    </Suspense>
  );
};

export default CategoryElements;
