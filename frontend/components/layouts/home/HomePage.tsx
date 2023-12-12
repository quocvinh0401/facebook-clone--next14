import Body from "./Body";
import Contact from "./Contact";
import MenuLeft from "./MenuLeft";

const HomePage = () => {
  return (
    <div className="relative flex justify-center md:justify-between">
      <MenuLeft />
      <Body />
      <Contact />
    </div>
  );
};
export default HomePage;
