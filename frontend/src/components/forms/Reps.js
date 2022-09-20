import React from "react";
import { EditText, EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";

const Reps = ({ index, value, setValue, onTextInputChanged }) => {
  return (
    <React.Fragment>
      <div className="flex w-96 sm:w-[31.24rem] lg:w-[250px]">
        <span className="inline-flex items-center px-3 text-sm text-gray-600 bg-gray-100 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          Set {index + 1}
        </span>
        <input
          type="text"
          defaultValue={value}
          onChange={(e) => onTextInputChanged(e, index)}
          className="rounded-none rounded-r-lg  border text-gray-700 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </React.Fragment>
  );
};

export default Reps;
