import {
  createContext,
  useState,
  type ChangeEvent,
  type PropsWithChildren,
} from "react";
import { generateFeedback, type Settings } from "./service";
import stringToBoolean from "./stringToBoolean";

const audience = ["Child", "Teenager", "Adult", "Senior", "All Ages"];

const initialGlobalSettings = {
  "Feedback Options On Top": false,
  "Custom Prompt": true,
  "Audience Name": true,
};

const tone = [
  "Casual", // Friendly, relaxed, approachable
  "Constructive", // Focused on improvement, clear guidance
  "Direct", // Straightforward, no sugarcoating
  "Encouraging", // Positive, motivating, supportive
  "Neutral", // Objective, factual, balanced
  "Professional", // Formal, businesslike, polished language
  "Strict", // Firm, high-expectation, disciplined
];

const englishLevel = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Fluent / Native",
  "Mixed Levels",
];

const needsImprovement = [
  "Grammar & Language",
  "Content & Ideas",
  "Clarity & Organization",
  "Accuracy & Detail",
  "Effort & Consistency",
  "Critical Thinking",
  "Focus",
  "Participation",
  "Following Instructions",
  "Behavior",
  "None / Overall Good",
];

const length = ["Short", "Medium", "Detailed", "Flexible / Expandable"];

const format = ["Paragraph", "Bullet Points", "One-liner"];

const initialSettings = {
  Audience: audience[0],
  "English Level": englishLevel[0],
  Tone: tone[0],
  "Needs Improvement": "",
  Length: length[0],
  Format: format[0],
  // Performance: performance[0],
};

export {
  audience,
  tone,
  englishLevel,
  needsImprovement,
  length,
  format,
  // performance,
  initialSettings,
};

export type SettingsType = typeof initialSettings;

export const StoreContext = createContext({
  settings: initialSettings,
  name: "",
  userFeedback: "",
  aiFeedback: "",
  isLoading: false,
  handleSettingsChange: (e: ChangeEvent<HTMLInputElement>) => {
    e;
  },
  handleGenerateFeedback: () => {},
  handleNameChange: (event: ChangeEvent<HTMLInputElement>) => {
    event;
  },
  handleUserFeedbackChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
    event;
  },
  globalSettings: initialGlobalSettings,
  handleGlobalSettingsChange: (e: ChangeEvent<HTMLInputElement>) => {
    e;
  },
  handleCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => {
    e;
  },
  handleClearCheckBox: () => {},
});

const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const storedSettings: SettingsType = { ...initialSettings };
    for (const key in initialSettings) {
      storedSettings[key as keyof SettingsType] =
        localStorage.getItem(key) || initialSettings[key as keyof SettingsType];
    }
    return storedSettings;
  });
  const [globalSettings, setGlobalSettings] = useState(() => {
    return {
      "Feedback Options On Top": stringToBoolean(
        localStorage.getItem("Feedback Options On Top") || "1"
      ),
      "Custom Prompt": stringToBoolean(
        localStorage.getItem("Custom Prompt") || "1"
      ),
      "Audience Name": stringToBoolean(
        localStorage.getItem("Audience Name") || "1"
      ),
    };
  });

  const [name, setName] = useState(() => localStorage.getItem("name") || "");
  const [userFeedback, setUserFeedback] = useState(
    () => localStorage.getItem("userFeedback") || ""
  );
  const [aiFeedback, setAIFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSettingsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
    localStorage.setItem(name, value);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setSettings((prevSettings) => {
      let currentValues = prevSettings["Needs Improvement"]
        ? prevSettings["Needs Improvement"].split(",")
        : [];

      if (checked) {
        // Add the value if it's not already there
        if (!currentValues.includes(value)) {
          currentValues.push(value);
        }
      } else {
        // Remove the value
        currentValues = currentValues.filter((item) => item !== value);
      }

      const finalValue = currentValues.join(",");
      localStorage.setItem("Needs Improvement", finalValue);

      return {
        ...prevSettings,
        ["Needs Improvement"]: finalValue,
      };
    });
  };

  const handleClearCheckBox = () => {
    setSettings((prevSettings) => {
      return { ...prevSettings, "Needs Improvement": "" };
    });

    localStorage.removeItem("Needs Improvement");
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    localStorage.setItem("name", event.target.value || "");
  };

  const handleUserFeedbackChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUserFeedback(event.target.value);
    localStorage.setItem("userFeedback", event.target.value || "");
  };

  const handleGenerateFeedback = async () => {
    setIsLoading(true);
    try {
      const result = await generateFeedback({
        settings: settings as Partial<Settings>, // can be partial
        userFeedback: globalSettings["Custom Prompt"] ? userFeedback : "",
        name: globalSettings["Audience Name"] ? name : "",
      });
      setAIFeedback(result);
    } catch (err) {
      console.error("generateFeedback error:", err);
      setAIFeedback(
        "Sorry — I couldn't generate feedback right now. Try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGlobalSettingsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const checked = event.currentTarget.checked;

    setGlobalSettings((prevGlobalSettings) => {
      return {
        ...prevGlobalSettings,
        [name]: checked,
      };
    });
    localStorage.setItem(name, String(checked));
  };

  return (
    <StoreContext.Provider
      value={{
        settings,
        name,
        userFeedback,
        aiFeedback,
        isLoading,
        handleSettingsChange,
        handleGenerateFeedback,
        handleNameChange,
        handleUserFeedbackChange,
        handleCheckboxChange,
        globalSettings,
        handleGlobalSettingsChange,
        handleClearCheckBox,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
