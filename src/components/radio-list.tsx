import { useContext } from "react";
import { cn } from "../cn";
import { StoreContext } from "../store-provider";

const RadioList: React.FC<{
  title: string;
  options: string[];
  className?: string;
  customInput?: boolean;
}> = ({ title, options, className, customInput = false }) => {
  const { handleSettingsChange: onSettingsChange, settings } =
    useContext(StoreContext);
  const selectedValue = settings[title as keyof typeof settings];

  return (
    <div className="bg-primary-content rounded p-4">
      <h2 className="text-xl text-primary font-bold mb-3">{title}</h2>
      <ul className={cn("flex gap-3 flex-col " + className)}>
        {options.map((option) => {
          return (
            <li className={"flex gap-1"} key={option}>
              <input
                type="radio"
                className="radio radio-primary"
                onChange={onSettingsChange}
                id={option}
                name={title}
                checked={selectedValue === option}
                value={option}
              />
              <label
                htmlFor={option}
                className="label text-primary text-lg font-semibold select-none h-full w-full"
              >
                {option}
              </label>
            </li>
          );
        })}
        {customInput && (
          <li className={"flex gap-1 flex-col"} key={title}>
            <label
              htmlFor={`${title}-custom`}
              className="label text-primary text-lg font-semibold select-none h-full w-full"
            >
              {`Custom ${title}`}
            </label>
            <input
              type="text"
              className="input input-primary input-sm"
              onChange={onSettingsChange}
              value={options.includes(selectedValue) ? "" : settings.Length}
              id={`${title}-custom`}
              name={title}
              checked={selectedValue === `${title}-custom`}
            />
          </li>
        )}
      </ul>
    </div>
  );
};

export default RadioList;
