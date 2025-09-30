import TopNavigation from "./components/top-navigation";
import Settings from "./components/settings";
import { useContext } from "react";
import { StoreContext } from "./store-provider";

const App = () => {
  const {
    handleGenerateFeedback,
    name,
    handleNameChange,
    userFeedback,
    handleUserFeedbackChange,
    aiFeedback,
  } = useContext(StoreContext);
  const { isLoading } = useContext(StoreContext);

  return (
    <main className="p-4 sm:p-10 flex flex-col items-center">
      <TopNavigation />
      <div className="flex flex-col w-full mt-5">
        <label htmlFor="name" className="text-sm font-semibold">
          Audience Name
          <span className="text-sm text-gray-400">(Optional)</span>
        </label>
        <input
          type="text"
          className="input input-primary w-50 mb-5"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className="[&>textarea]:w-[100%] gap-2 w-full flex flex-col sm:flex-row justify-between text-lg">
        <textarea
          className="textarea textarea-primary resize-none min-h-60"
          value={userFeedback}
          onChange={handleUserFeedbackChange}
          placeholder="Custom Prompt (optional)"
        />
        <textarea
          className="border rounded p-2 resize-none min-h-60"
          disabled
          value={aiFeedback}
          placeholder="AI Feedback"
        />
      </div>
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
      <Settings />
    </main>
  );
};

export default App;
