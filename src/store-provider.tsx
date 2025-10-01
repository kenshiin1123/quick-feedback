import {
  createContext,
  useState,
  type ChangeEvent,
  type PropsWithChildren,
} from "react";
import { generateFeedback } from "./service";

const audience = ["Child", "Teenager", "Adult", "Senior", "All Ages"];

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
  handleCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => {
    e;
  },
});

const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const storedSettings = Object.keys(initialSettings).reduce((acc, key) => {
      const storedValue = localStorage.getItem(key);
      return { ...acc, [key]: storedValue };
    }, {} as SettingsType);
    return storedSettings;
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
      const response = await generateFeedback({ settings, userFeedback, name });
      setAIFeedback(response.text || "");
    } finally {
      setIsLoading(false);
    }
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
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
