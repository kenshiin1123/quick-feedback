import {
  audience,
  englishLevel,
  tone,
  focusOfFeedback,
  length,
  format,
} from "../store-provider";
import RadioList from "./radio-list";

const Settings: React.FC<{}> = () => {
  return (
    <div className="w-full  min-h-80 bg-primary mt-5 rounded-md p-3">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <RadioList title="Audience" options={audience} />
        <RadioList title="English Level" options={englishLevel} />
        <RadioList title="Tone" options={tone} />
        <RadioList title="Focus of Feedback" options={focusOfFeedback} />
        <RadioList title="Length" options={length} />
        <RadioList title="Format" options={format} />
      </section>
    </div>
  );
};

export default Settings;
