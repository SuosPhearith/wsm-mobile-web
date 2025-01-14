import React from "react";
import { PopularItemInterface } from "../../mock/type";

interface Props {
  item: PopularItemInterface;
}

const PopularItem: React.FC<Props> = ({ item }) => {
  return (
    <div className="bg-white rounded-lg me-2 flex flex-col items-center min-w-[300px]">
      {/* Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-40 object-cover rounded-lg"
      />

    </div>
  );
};

export default PopularItem;
