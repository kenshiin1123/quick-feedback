import { useContext } from "react";
import { StoreContext } from "../store-provider";

const AudienceNameInputWLabel = () => {
  const { name, handleNameChange } = useContext(StoreContext);
  return (
    <div className="flex flex-col w-full mt-5">
      <label htmlFor="name" className="text-sm font-semibold">
        Audience Name
        <span className="text-sm text-gray-400">(Optional)</span>
      </label>
      <input
        type="text"
        className="input input-primary w-50 mb-5"
        value={name}
        onChange={handleNameChange}
      />
    </div>
  );
};

export default AudienceNameInputWLabel;
