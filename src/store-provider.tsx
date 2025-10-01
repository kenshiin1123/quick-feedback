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
  "Professional",
  "Casual/Friendly",
  "Supportive",
  "Constructive",
  "Neutral",
];

const englishLevel = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Fluent / Native",
  "Mixed Levels",
];

const focusOfFeedback = [
  "Grammar & Language Use",
  "Content & Ideas",
  "Effort & Improvement",
  "Accuracy & Details",
  "Clarity & Organization",
];

const length = ["Short", "Medium", "Detailed"];

const format = ["Paragraph", "Bullet Points", "One-liner"];

const initialSettings = {
  Audience: audience[0],
  "English Level": englishLevel[0],
  Tone: tone[0],
  "Focus of Feedback": focusOfFeedback[0],
  Length: length[0],
  Format: format[0],
};

export {
  audience,
  tone,
  englishLevel,
  focusOfFeedback,
  length,
  format,
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
      let currentValues = prevSettings["Focus of Feedback"]
        ? prevSettings["Focus of Feedback"].split(",")
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
      localStorage.setItem("Focus of Feedback", finalValue);

      return {
        ...prevSettings,
        ["Focus of Feedback"]: finalValue,
      };
    });
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
        userFeedback,
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
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
