import { useContext, useState } from "react";
import { cn } from "../cn";
import { StoreContext } from "../store-provider";

const CheckboxList: React.FC<{
  title: string;
  options: string[];
  className?: string;
}> = ({ title, options, className }) => {
  const { handleCheckboxChange, settings, handleClearCheckBox } =
    useContext(StoreContext);

  // pagination state
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(options.length / itemsPerPage);

  // slice the options for current page
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedOptions = options.slice(startIndex, startIndex + itemsPerPage);

  // handlers
  const prevPage = () => setPage((p) => Math.max(p - 1, 1));
  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="bg-primary-content rounded flex flex-col">
      <h2 className="text-xl text-primary font-bold mb-3 select-none mt-4 ml-4 flex">
        {title}{" "}
        {settings["Needs Improvement"] && (
          <div
            className={`badge badge-sm ml-auto mr-3 ${
              settings["Needs Improvement"].split(",")[0] === "" ? "hidden" : ""
            }`}
          >
            {settings["Needs Improvement"].split(",").filter(Boolean).length}{" "}
            Selected
          </div>
        )}
      </h2>
      <ul className={cn("flex gap-3 flex-col mb-4 px-4 " + className)}>
        {paginatedOptions.map((option) => (
          <li className="flex gap-1" key={option}>
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              onChange={handleCheckboxChange}
              id={option}
              name={option}
              checked={
                (settings["Needs Improvement"] &&
                  settings["Needs Improvement"].split(",").includes(option)) ||
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
        ))}
      </ul>

      {/* pagination controls */}
      {totalPages > 1 && (
        <div className="mt-auto flex justify-center w-full mb-2 gap-2 px-4">
          {page > 1 && (
            <button onClick={prevPage} className="btn btn-primary flex-grow">
              Previous page
            </button>
          )}
          {page < totalPages && (
            <button onClick={nextPage} className="btn btn-primary flex-grow">
              Next page
            </button>
          )}
          <button onClick={handleClearCheckBox} className="btn btn-neutral ">
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckboxList;
