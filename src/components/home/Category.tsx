import { categories } from "../../mock/data";
import CategoryItem from "./CategoryItem";

const Category = () => {
  return (
    <div className="p-3">
      <div className="text-lg font-semibold">#Category</div>
      <section className="mt-2">
        <div className="flex w-full overflow-auto scroll-smooth scrollbar-hide">
          {categories.map((item) => (
            <CategoryItem category={item} key={item.id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Category;
