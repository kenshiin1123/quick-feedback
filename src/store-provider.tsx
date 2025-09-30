import {
  createContext,
  useState,
  useEffect,
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

  useEffect(() => {
    Object.entries(settings).forEach(([key, value]) => {
      if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, value);
      }
    });
  }, [settings]);

  const handleSettingsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
    localStorage.setItem(name, value);
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
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
