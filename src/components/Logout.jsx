import { IoLogInOutline } from "react-icons/io5";
import { useAuth } from "../hooks/useAuth.js";

export default function Lagout() {
  const { logout } = useAuth();

  return (
    <>
      <div
        className="flex justify-center items-center cursor-pointer"
        onClick={logout}
      >
        <IoLogInOutline size={28} />
      </div>
    </>
  );
}
