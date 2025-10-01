import { useContext, useRef } from "react";
import { StoreContext } from "../store-provider";

const SettingsModal = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { globalSettings, handleGlobalSettingsChange } =
    useContext(StoreContext);

  const arrayGlobalSettings = Object.keys(globalSettings) as Array<
    keyof typeof globalSettings
  >;
  return (
    <>
      <button
        className="btn ml-auto"
        onClick={() => modalRef?.current?.showModal()}
      >
        Layout Settings
      </button>
      <dialog className="modal" ref={modalRef}>
        <div className="modal-box w-90">
          <h3 className="font-bold text-lg mb-3">Layout Settings</h3>
          <ul className="w-full flex flex-col gap-2">
            {arrayGlobalSettings.map((settingName) => (
              <li className="space-x-3 flex justify-between " key={settingName}>
                <label className="label select-none" htmlFor={settingName}>
                  {settingName}:
                </label>
                <input
                  type="checkbox"
                  id={settingName}
                  className="toggle"
                  name={settingName}
                  onChange={handleGlobalSettingsChange}
                  checked={globalSettings[settingName]}
                />
              </li>
            ))}
          </ul>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default SettingsModal;
