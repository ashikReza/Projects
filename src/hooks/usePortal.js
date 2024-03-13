import { useState } from "react";

export default function usePortal() {
  const [showPortal, setShowPortal] = useState(false);

  const togglePortal = () => {
    setShowPortal((prevState) => !prevState);
  };

  return {
    showPortal,
    togglePortal,
  };
}
