import { Fragment, useState, useEffect, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";

import { Oval } from "react-loader-spinner";

import { WorkoutsContext } from "../contexts/WorkoutsContext";

import ExerciseCards from "./FolderComponents/ExerciseCards";

import { exerciseOptions, fetchData } from "../utils/fetchData";

import { useParams } from "react-router-dom";

// import SearchExercises from "../components/SearchExercises";

const Folders = () => {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  const [addExercise, setAddExercise] = useState([]);

  const { workouts, setWorkouts } = useContext(WorkoutsContext);

  const { page } = useParams();

  console.log(workouts);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`/api/workouts/page/${page}`);
      const jsonData = await response.json();

      if (response.ok) {
        setWorkouts(jsonData.workouts);
      }
    };
    fetchWorkouts();
  }, []);

  const postWorkouts = async (itemToAdd) => {
    const response = await fetch("/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: itemToAdd.name,
        bodyPart: itemToAdd.bodyPart,
        equipment: itemToAdd.equipment,
        target: itemToAdd.target,
        gifUrl: itemToAdd.gifUrl,
        page: page,
      }),
    });
    const json = await response.json();

    console.log("json", json);

    if (response.ok) {
      setWorkouts([...workouts, json]);
    } else {
      console.log(json.error);
    }
  };

  // console.log(workouts);

  const handleSearch = async () => {
    setLoading(true);
    const exerciseData = await fetchData(
      "https://exercisedb.p.rapidapi.com/exercises",
      exerciseOptions
    );

    const searchedExercises = exerciseData.filter(
      (item) =>
        item.name.toLowerCase().includes(search) ||
        item.target.toLowerCase().includes(search) ||
        item.equipment.toLowerCase().includes(search) ||
        item.bodyPart.toLowerCase().includes(search)
    );
    setLoading(false);
    setExercises(searchedExercises);
    setSearch("");
  };

  const handleExerciseClick = async (itemToAdd) => {
    const existingExercise = workouts.find(
      (exercise) => exercise.id === itemToAdd.id
    );
    if (!existingExercise) {
      postWorkouts(itemToAdd);
    } else {
      console.log("h");
    }
  };

  return (
    <>
      {/* <div className="flex-1 flex justify-between px-4 md:px-0 mt-4">
        <div className="flex-1 flex">
          <form className="w-full flex md:ml-0" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                <SearchIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                id="search-field"
                className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-600 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                placeholder="Search"
                type="search"
                name="search"
              />
            </div>
          </form>
        </div>
      </div> */}

      <div
        className="relative w-full mt-6 cursor-pointer "
        onClick={() => setOpen((prevOpen) => !prevOpen)}
      >
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <p className="pl-10 text-gray-500 text-sm">
          Open To Search Gym Exercises...
        </p>
      </div>

      {/* <p className="pl-2 text-gray-500">Search For Gym Exercises</p> */}

      {workouts &&
        workouts.map((exercise) => (
          <ExerciseCards exercise={exercise} key={exercise._id} />
        ))}

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-hidden"
          onClose={setOpen}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-md  ">
                  <div className="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl ">
                    <div className="min-h-0 overflow-y-auto flex-1 flex flex-col py-6 ">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Search for Gym Workouts
                          </Dialog.Title>
                          <div className="ml-3 h-7 flex items-center">
                            <button
                              type="button"
                              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 relative flex-1 px-4 sm:px-6">
                        {/* Exercise Search */}

                        <div className="flex-1 flex justify-between md:px-0  border-gray-500 rounded-full top-0 ">
                          <div className="flex-1 flex">
                            <label htmlFor="search-field" className="sr-only">
                              Search
                            </label>
                            <div className="relative w-full text-gray-400 focus-within:text-gray-600  ">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                <SearchIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </div>
                              <input
                                id="search-field"
                                className="block h-full w-full border-transparent border border-gray-300 rounded-lg  bg-gray-50 py-2 pl-10 pr-3 text-gray-600 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                                placeholder="Search"
                                type="search"
                                name="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                              />
                            </div>
                            <button
                              type="submit"
                              className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-600 rounded-lg border border-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              onClick={handleSearch}
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          {loading && (
                            <div role="status" className="m-48">
                              <svg
                                aria-hidden="true"
                                class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentFill"
                                />
                              </svg>
                              <span class="sr-only">Loading...</span>
                            </div>
                          )}

                          <div className="flow-root">
                            <ul className="-my-6 divide-y divide-gray-200">
                              {exercises.map((exercise) => (
                                <li key={exercise.id} className="py-6 flex">
                                  <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                    <img
                                      className="w-full h-full object-center object-cover"
                                      src={exercise.gifUrl}
                                      alt={exercise.name}
                                      loading="lazy"
                                    />
                                  </div>
                                  <div className="ml-4 flex-1 flex flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <p className="capitalize">
                                            {exercise.name}
                                          </p>
                                        </h3>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {exercise.color}
                                      </p>
                                    </div>
                                    <div className="flex-1 flex items-end justify-between	 text-sm">
                                      <div className="flex justify-between text-sm">
                                        <button
                                          type="button"
                                          className="text-gray-500 bg-white border border-gray-300 mr-2 focus:outline-none hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 font-medium rounded-full px-2 py-1"
                                        >
                                          <p className={`capitalize text-xs`}>
                                            {exercise.target.length > 7
                                              ? exercise.target.substring(
                                                  0,
                                                  5
                                                ) + "..."
                                              : exercise.target}
                                          </p>
                                        </button>

                                        <button
                                          type="button"
                                          className="text-gray-500 bg-white border border-gray-300  focus:outline-none hover:bg-gray-200 focus:ring-4  focus:ring-gray-200 font-medium rounded-full text-sm px-2 py-1 "
                                        >
                                          <p className={`capitalize text-xs`}>
                                            {exercise.bodyPart}
                                          </p>
                                        </button>
                                      </div>

                                      <div className="flex ">
                                        <button
                                          onClick={() =>
                                            handleExerciseClick(exercise)
                                          }
                                          className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-700 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                                        >
                                          <span className="relative px-4 py-1 transition-all ease-in duration-75 bg-white  text-sm rounded-md group-hover:bg-opacity-0">
                                            Add
                                          </span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Folders;
