import { Product } from "../../api/type";
import { priceValue } from "../../utils/share";

interface Props {
  item: Product;
}

const ProductItem = ({ item }: Props) => {
  return (
    <div key={item.id} className="relative rounded-lg overflow-hidden">
      {/* Product Image */}
      <img
        src={`${import.meta.env.VITE_APP_ASSET_URL}${item.thumbnail}`}
        alt={item.name}
        className="w-full h-30 object-cover rounded-lg"
      />

      {/* Price Badge */}
      <div className="absolute top-2 right-2 bg-black text-white text-sm font-bold py-1 px-2 rounded-lg">
        {priceValue(item.unit_price)}
      </div>

      {/* Product Name */}
      <div className="mt-2 font-medium text-gray-800">{item.name}</div>
    </div>
  );
};

export default ProductItem;
