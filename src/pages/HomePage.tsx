import  Header  from "../components/home/Header";
import Popular from "../components/home/Popular";
import  Slider  from "../components/home/Slider";

const HomePage = () => {
  return (
    <>
      {/* header */}
      <Header />
      {/* slider */}
      <Slider />
      {/* popular */}
      <Popular />
    </>
  );
};

export default HomePage;
