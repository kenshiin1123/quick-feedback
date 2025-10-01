import { useContext } from "react";
import { StoreContext } from "../store-provider";

const CustomPromptNAIFeedBack = () => {
  const { userFeedback, handleUserFeedbackChange, aiFeedback, globalSettings } =
    useContext(StoreContext);

  return (
    <div className="[&>textarea]:w-[100%] gap-2 w-full flex flex-col sm:flex-row justify-between text-lg">
      {globalSettings["Custom Prompt"] && (
        <textarea
          className="textarea textarea-primary resize-none min-h-60"
          value={userFeedback}
          onChange={handleUserFeedbackChange}
          placeholder="Custom Prompt (optional)"
        />
      )}
      <textarea
        className="border rounded p-2 resize-none min-h-60"
        disabled
        value={aiFeedback}
        placeholder="AI Feedback"
      />
    </div>
  );
};

export default CustomPromptNAIFeedBack;
