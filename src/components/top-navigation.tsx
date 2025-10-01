import { cn } from "../cn";
import SettingsModal from "./settings-modal";

const TopNavigation: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn(`navbar bg-base-100 shadow-sm ${className}`)}>
      <a className="btn btn-ghost text-xl">Quick Feedback</a>
      <SettingsModal />
    </div>
  );
};

export default TopNavigation;
