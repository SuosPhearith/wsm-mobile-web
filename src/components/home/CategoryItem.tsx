import React from "react";
import { CategoryInterface } from "../../mock/type";

interface Props {
  category: CategoryInterface;
}

const CategoryItem: React.FC<Props> = ({ category }) => {
  return (
    <div className="bg-white rounded-lg p-4 mr-2 flex flex-col items-center min-w-[100px] w-fit">
      <img
        src={category.image}
        alt={category.name}
        className="w-12 h-12 mb-2 object-contain"
      />
      <div className="text-sm font-semibold text-gray-800">{category.name}</div>
    </div>
  );
};

export default CategoryItem;
