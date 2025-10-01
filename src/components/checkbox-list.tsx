import { useContext } from "react";
import { cn } from "../cn";
import { StoreContext } from "../store-provider";

const CheckboxList: React.FC<{
  title: string;
  options: string[];
  className?: string;
}> = ({ title, options, className }) => {
  const { handleCheckboxChange, settings } = useContext(StoreContext);
  console.log(settings);
  return (
    <div className="bg-primary-content rounded p-4">
      <h2 className="text-xl text-primary font-bold mb-3">{title}</h2>
      <ul className={cn("flex gap-3 flex-col " + className)}>
        {options.map((option) => {
          return (
            <li className={"flex gap-1"} key={option}>
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                onChange={handleCheckboxChange}
                id={option}
                name={option}
                checked={
                  (settings["Focus of Feedback"] &&
                    settings["Focus of Feedback"]
                      .split(",")
                      .includes(option)) ||
                  false
                }
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
      </ul>
    </div>
  );
};

export default CheckboxList;
