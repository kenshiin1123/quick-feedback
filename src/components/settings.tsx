import { cn } from "../cn";
import {
  audience,
  englishLevel,
  tone,
  focusOfFeedback,
  length,
  format,
} from "../store-provider";
import CheckboxList from "./checkbox-list";
import RadioList from "./radio-list";

const Settings: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        `w-full  min-h-80 bg-primary mt-5 rounded-md p-3 mb-3 ${className}`
      )}
    >
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <RadioList title="Audience" options={audience} />
        <RadioList title="English Level" options={englishLevel} />
        <RadioList title="Tone" options={tone} />
        <CheckboxList title="Focus of Feedback" options={focusOfFeedback} />
        <RadioList title="Length" options={length} customInput />
        <RadioList title="Format" options={format} />
        {/* <RadioList title="Performance" options={performance} /> */}
      </section>
    </div>
  );
};

export default Settings;
