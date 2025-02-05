import { Swiper } from "antd-mobile";
import { useQuery } from "react-query";
import { getSlider } from "../../api/home";

const Slider = () => {
  // Fetch Sliders
  const { data, isLoading, isError } = useQuery("sliders", getSlider);

  if (isLoading)
    return (
      <div className="p-4">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
        </div>
      </div>
    );

  if (isError) return <p className="text-center text-red-500">Failed to load sliders...</p>;

  const items = data?.sliders.map((slider, index) => (
    <Swiper.Item key={index}>
      <a href={slider.route || ""} target="_blank" className="relative block">
        {/* Image with a soft shadow and smooth animation */}
        <img
          src={`${import.meta.env.VITE_APP_ASSET_URL}${slider.image}`}
          alt={`Slide ${index}`}
          className="w-full h-full object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
        />
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl"></div>
      </a>
    </Swiper.Item>
  ));

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-800">🔥 Trending Now</h3>
      <section className="mt-3">
        <Swiper
          style={{
            "--border-radius": "12px",
            "--height": "220px",
          }}
          autoplay
          loop
          defaultIndex={0}
        >
          {items}
        </Swiper>
      </section>
    </div>
  );
};

export default Slider;
