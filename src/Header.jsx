import logo from "./assets/logo.png";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-10 py-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-xl">
      <img src={logo} alt="" className=" w-[12rem]" />
      <p className="">Login</p>
    </div>
  );
};

export default Header;
