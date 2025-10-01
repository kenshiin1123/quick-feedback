import { useContext } from "react";
import { StoreContext } from "../store-provider";

const GenerateButton = () => {
  const { isLoading, handleGenerateFeedback } = useContext(StoreContext);
  return (
    <button
      className="btn btn-success mt-3 w-full text-white text-lg"
      onClick={handleGenerateFeedback}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="loading loading-spinner" />
      ) : (
        "Generate Quick Feedback"
      )}
    </button>
  );
};

export default GenerateButton;
