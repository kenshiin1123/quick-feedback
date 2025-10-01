import { useContext, useRef } from "react";
import { StoreContext } from "../store-provider";

const SettingsModal = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { globalSettings, handleGlobalSettingsChange } =
    useContext(StoreContext);

  return (
    <>
      <button
        className="btn ml-auto"
        onClick={() => modalRef?.current?.showModal()}
      >
        Settings
      </button>
      <dialog className="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">Settings</h3>
          <div className="space-x-3">
            <label className="label select-none" htmlFor="feedback-options">
              Feedback Options on top:
            </label>
            <input
              type="checkbox"
              id="feedback-options"
              className="toggle"
              name="Feedback Options On Top"
              onChange={handleGlobalSettingsChange}
              checked={globalSettings["Feedback Options On Top"]}
            />
          </div>
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
