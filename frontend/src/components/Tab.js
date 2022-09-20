import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { DashboardContext } from "../contexts/DashboardContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Tab = ({ folders }) => {
  const { value } = useContext(DashboardContext);

  return (
    <div className="block h-full w-full">
      {/* {folders.map((folder) => (
        <nav className="flex space-x-4" aria-label="Tabs">
          <a
            key={folder}
            href={tab}
            className={classNames(
              location
                ? "bg-indigo-100 text-indigo-700 object-cover"
                : "text-gray-500 hover:text-gray-700 object-cover",
              "px-3 py-2 font-medium text-sm rounded-md"
            )}
            // aria-current={tab.current ? "page" : undefined}
          >
            {folder}
          </a>
        </nav>
      ))} */}
    </div>
  );
};

export default Tab;
