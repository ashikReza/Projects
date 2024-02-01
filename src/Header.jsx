import logo from "./assets/Screenshot_2024-02-01_231628-removebg-preview.png";

const Header = () => {
  return (
    <header
      className="px-6 sm:px-20 py-2 sm:py-4 fixed top-0 w-full z-50 backdrop-blur-lg flex justify-between items-center"
      style={{ backgroundColor: "rgba(225, 225, 255, 0.3)" }}
    >
      <div className="w-16">
        <a href="#home">
          <img src={logo} alt="" />
        </a>
      </div>

      <a href="#tasks" className="relative">
        <div className="w-6 h-6 bg-white absolute top-[-0.6rem] right-[-0.5rem] rounded-full flex justify-center items-center ">
          {/* show number */}
          </div>
        <div className=" font-extrabold cursor-pointer bg-[#1C92FFB0] px-4 py-2 rounded ">
          Favorite task
        </div>
      </a>
    </header>
  );
};

export default Header;
