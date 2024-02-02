import logo from "./assets/Screenshot_2024-02-01_231628-removebg-preview.png";
import { useTaskContext } from "./utils/taskUtils.jsx";

const Header = () => {
  const { state, dispatch } = useTaskContext();
  const { favoriteTasksCount, showOnlyFavorites } = state;

  const handleToggleShowFavorites = () => {
    dispatch({ type: "TOGGLE_SHOW_FAVORITES" });
  };

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

      <div className="flex gap-2">
        <a href="#tasks" className="relative">
          <div className="font-extrabold cursor-pointer bg-[#1C92FFB0] px-4 py-2 rounded">
            Tasks
          </div>
        </a>

        <a href="#tasks" className="relative">
          <>
            {favoriteTasksCount > 0 && (
              <div className="w-6 h-6 bg-white absolute top-[-0.6rem] right-[-0.5rem] rounded-full flex justify-center items-center">
                <span className="text-xs text-black font-bold">
                  {favoriteTasksCount}
                </span>
              </div>
            )}

            <div
              className={`font-extrabold cursor-pointer bg-[#1C92FFB0] px-4 py-2 rounded ${
                favoriteTasksCount === 0 ? "opacity-60 cursor-not-allowed" : ""
              }`}
              onClick={handleToggleShowFavorites}
            >
              {showOnlyFavorites ? "All tasks" : "Favorite tasks"}
            </div>
          </>
        </a>
      </div>
    </header>
  );
};

export default Header;
