"use client";

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton = () => {
  const handleClick = () => {
    window.history.back();
  };

  return (
    <button
      className="absolute top-0 right-0 p-2 bg-white text-black"
      onClick={handleClick}
    >
      Close
    </button>
  );
};

export default CloseButton;
