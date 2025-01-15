import { DotLoading, Swiper } from "antd-mobile";
import { useQuery } from "react-query";
import { getSlider } from "../../api/home";

const Slider = () => {
  // Fetch Products
  const { data, isLoading, isError } = useQuery("sliders", getSlider);
  if (isLoading) return <DotLoading color="primary" />;
  if (isError) return <p>Error loading products...</p>;

  const items = data?.sliders.map((slider, index) => (
    <Swiper.Item key={index}>
      <a
        href={slider.route || ""}
        target="_blank"
      >
        <img
          src={`${import.meta.env.VITE_APP_ASSET_URL}${slider.image}`}
          alt={slider.image}
          className="w-full h-full object-cover"
        />
      </a>
    </Swiper.Item>
  ));
  return (
    <div className="p-3">
      <section className="mt-2">
        <Swiper
          style={{
            "--border-radius": "8px",
            "--height" : "200px"
          }}
          defaultIndex={4}
        >
          {items}
        </Swiper>
      </section>
    </div>
  );
};

export default Slider;
