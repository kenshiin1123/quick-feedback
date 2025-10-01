import TopNavigation from "./components/top-navigation";
import Settings from "./components/settings";
import { useContext } from "react";
import { StoreContext } from "./store-provider";
import Footer from "./components/footer";
import GenerateButton from "./components/generate-button";
import CustomPromptNAIFeedBack from "./components/custom-prompt-n-ai-feed-back";
import AudienceNameInputWLabel from "./components/audience-name-input-w-label";
import MainContainer from "./components/main-container";

const App = () => {
  const { globalSettings } = useContext(StoreContext);
  return (
    <div className="p-4 sm:pb-3 flex flex-col items-center">
      <TopNavigation className="order-1" />
      <Settings
        className={`${
          globalSettings["Feedback Options On Top"] ? "order-3" : "order-2"
        }`}
      />
      <MainContainer>
        {globalSettings["Audience Name"] && <AudienceNameInputWLabel />}
        <CustomPromptNAIFeedBack />
        <GenerateButton />
      </MainContainer>
      <Footer className="order-4" />
    </div>
  );
};

export default App;
