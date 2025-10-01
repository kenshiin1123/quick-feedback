import { useContext } from "react";
import { StoreContext } from "../store-provider";
import { toast } from "sonner";

const GenerateButton = () => {
  const { isLoading, handleGenerateFeedback, aiFeedback } =
    useContext(StoreContext);

  const handleCopyFeedback = () => {
    navigator.clipboard.writeText(aiFeedback);
    toast.success("Successfully copied feedback.");
  };

  return (
    <div className="[&>button]:sm:w-[50%] flex flex-col sm:flex-row gap-2 w-full">
      <button
        className="btn btn-success mt-3 text-white text-lg flex-grow"
        onClick={handleGenerateFeedback}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loading loading-spinner" />
        ) : aiFeedback.length > 0 ? (
          "Regenerate Feedback"
        ) : (
          "Generate Quick Feedback"
        )}
      </button>
      {aiFeedback.length > 0 && (
        <button
          className="btn btn-primary mt-3 text-white text-lg flex-grow"
          onClick={handleCopyFeedback}
          disabled={!aiFeedback}
        >
          Copy Feedback
        </button>
      )}
    </div>
  );
};

export default GenerateButton;
