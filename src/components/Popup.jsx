/* eslint-disable react/prop-types */
import deleteLogo from "../assets/delete.svg";

const Popup = ({ message, onConfirm, onCancel, title }) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-filter backdrop-blur-md mx-4">
      <div className="bg-gray-500 p-8 rounded-lg shadow-lg drop-animation">
        <div className="flex items-center">
          <img src={deleteLogo} alt="" />
          <span className="">
            <p className=" text-xl font-bold">Can you confirm?</p>
            <p className="text-white">
              {message}{" "}
              <span className=" font-bold text-green-400 ">{title}</span>
            </p>
          </span>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={onCancel}
            className="bg-gradient-to-r from-blue-500 to-blue-600 py-2 px-4 rounded text-white hover:text-gray-200 mr-2 cursor-pointer focus:outline-none"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded cursor-pointer focus:outline-none"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
