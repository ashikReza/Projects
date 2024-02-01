const Header = () => {
  return (
    <header
      className="p-6 md:py-8 fixed top-0 w-full z-50 backdrop-blur-lg "
      style={{ backgroundColor: "rgba(225, 225, 255, 0.3)" }}
    >
      <h1 className="text-white font-extrabold text-2xl px-8 sm:px-12">
        Awsome Pomodoro
      </h1>
    </header>
  );
};

export default Header;
