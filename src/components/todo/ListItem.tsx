import { TodoInterface } from "../../mock/type";
import deleveryImage from "../../assets/imgaes/delivery.png";
import { EyeOutline } from "antd-mobile-icons";
import { DotLoading } from "antd-mobile";

interface Props {
  item: TodoInterface;
}

const ListItem = ({ item }: Props) => {
  return (
    <div className="flex justify-between border border-black-1 p-2 px-4 mb-2 bg-white rounded-lg w-full">
      <div className="flex">
        <div className="w-[40px] h-[40px]">
          <img
            src={deleveryImage}
            alt="image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ms-2 flex flex-col justify-center">
          <div className="flex items-center">
            <div className="text-base font-semibold truncate max-w-[200px]">
              {item.name}
            </div>
            <div className="bg-red-200  px-1 rounded-lg ms-2 truncate max-w-[200px]">
              {item.priority}
            </div>
          </div>
          <div>{item.description}</div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        {item.status === "Pending" ? (
          <DotLoading />
        ) : (
          <EyeOutline fontSize={20} />
        )}
      </div>
    </div>
  );
};

export default ListItem;
