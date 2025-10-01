import { useContext, type PropsWithChildren } from "react";
import { StoreContext } from "../store-provider";

const MainContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const { globalSettings } = useContext(StoreContext);

  return (
    <main
      className={`w-full ${
        globalSettings["Feedback Options On Top"] ? "order-2" : "order-3"
      }`}
    >
      {children}
    </main>
  );
};

export default MainContainer;
