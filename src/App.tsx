import TopNavigation from "./components/top-navigation";
import RadioList from "./components/radio-list";

const App = () => {
  return (
    <main className="p-3 flex flex-col items-center">
      <TopNavigation />
      <div className="flex flex-col w-300 mt-5">
        <label htmlFor="name" className="text-lg font-semibold">
          Audience Name{" "}
          <span className="text-sm text-gray-400">(Optional)</span>
        </label>
        <input type="text" className="input input-primary w-50 mb-5" />
      </div>
      <div className=" [&>textarea]:w-[49%] w-300 flex justify-between">
        <textarea className="textarea textarea-primary resize-none min-h-60 text-2xl"></textarea>
        <textarea className="textarea textarea-success resize-none min-h-60 text-2xl"></textarea>
      </div>
      <button className="btn mt-3 w-300 bg-success-content text-white text-lg">
        Generate Quick Feedback
      </button>
      <div className="w-300 min-h-80 bg-primary mt-5 rounded-md p-3">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <RadioList title="Audience" options={audience} />
          <RadioList title="English Level" options={englishLevel} />
          <RadioList title="Tone" options={tone} />
          <RadioList title="Focus of Feedback" options={focusOfFeedback} />
          <RadioList title="Length" options={length} />
          <RadioList title="Format" options={format} />
        </section>
      </div>
    </main>
  );
};

export default App;

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

const presets = [
  {
    name: "Quick Student Feedback",
    audience: "Teenager",
    englishLevel: "Intermediate",
    tone: "Supportive",
    focusOfFeedback: "Effort & Improvement",
    length: "Short",
    format: "One-liner",
  },
  {
    name: "Professional Report Review",
    audience: "Adult",
    englishLevel: "Fluent / Native",
    tone: "Professional",
    focusOfFeedback: "Clarity & Organization",
    length: "Detailed",
    format: "Paragraph",
  },
  {
    name: "Beginner ESL Encouragement",
    audience: "Child",
    englishLevel: "Beginner",
    tone: "Encouraging",
    focusOfFeedback: "Grammar & Language Use",
    length: "Medium",
    format: "Paragraph",
  },
  {
    name: "Peer Code Review",
    audience: "Adult",
    englishLevel: "Advanced",
    tone: "Constructive",
    focusOfFeedback: "Accuracy & Details",
    length: "Medium",
    format: "Bullet Points",
  },
  {
    name: "General Balanced Feedback",
    audience: "All Ages",
    englishLevel: "Mixed Levels",
    tone: "Neutral",
    focusOfFeedback: "Content & Ideas",
    length: "Medium",
    format: "Paragraph",
  },
];
