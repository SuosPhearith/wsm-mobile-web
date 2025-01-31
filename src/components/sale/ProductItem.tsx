import { Product } from "../../api/type";
import { priceValue } from "../../utils/share";
import defaultImage from "../../assets/imgaes/logo.png";

interface Props {
  item: Product;
}

const ProductItem = ({ item }: Props) => {
  const inventory = item.inventories.length > 0 ? item.inventories[0] : null;
  const stock = inventory ? inventory.quantity : 0;
  const stockAlert = inventory ? inventory.stock_alert : 0;
  return (
    <div
      key={item.id}
      className="relative rounded-lg overflow-hidden w-full h-full"
    >
      {/* Product Image */}
      <img
        src={
          item.thumbnail
            ? `${import.meta.env.VITE_APP_ASSET_URL}${item.thumbnail}`
            : defaultImage
        }
        alt={item.name}
        className={`w-full h-40 object-contain rounded-lg bg-white`}
      />

      {/* Price Badge */}
      <div className="absolute top-2 right-2 bg-slate-200 shadow-lg text-black text-sm font-bold py-1 px-2 rounded-lg">
        {priceValue(item.unit_price)}
      </div>
      {/* <div className="absolute top-2 left-2 bg-slate-200 shadow-lg text-black  text-sm font-bold py-1 px-2 rounded-full">
        {stock}
      </div> */}

      {/* Product Name */}
      <div className="flex items-center justify-between mt-2">
        <div><span className="text-blue-600">Stock:</span> <span className={`${stock == stockAlert
              ? "text-red-700"
              : stock <= stockAlert
              ? "text-yellow-600"
              : ""}`}>{stock}</span></div>
        <div
          className={`flex justify-center items-center ${
            stock == stockAlert
              ? "text-red-700 bg-red-200"
              : stock <= stockAlert
              ? "text-yellow-600 bg-yellow-200"
              : ""
          } rounded-lg px-2`}
        >
          {stock == stockAlert
            ? "Out of Stock"
            : stock <= stockAlert
            ? "Low Stock"
            : ""}
        </div>
      </div>
      <div className="mt-2 font-medium text-gray-800 line-clamp-2 overflow-hidden">
        {item.name}
      </div>
    </div>
  );
};

export default ProductItem;
