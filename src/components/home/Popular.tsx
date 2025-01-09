import { popularItems } from "../../mock/data";
import PopularItem from "./PopularItem";

const Popular = () => {
  return (
    <div className="p-3 mb-16">
      <div className="text-lg font-semibold">#Popular</div>
      <section className="mt-2">
        <div className="flex overflow-auto scrollbar-hide">
        {popularItems.map((item) =>(
          <PopularItem item={item} key={item.id}/>
        ))}
        </div>
      </section>
    </div>
  );
};

export default Popular;
