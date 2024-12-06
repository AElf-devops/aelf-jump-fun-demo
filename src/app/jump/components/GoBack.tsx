function GoBack({ handleBack }: { handleBack: () => void }) {
  return (
    <button
      onClick={handleBack}
      className="text-white text-lg flex mb-6 justify-center items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span className="font-bold">go back</span>
    </button>
  );
}
export default GoBack;
