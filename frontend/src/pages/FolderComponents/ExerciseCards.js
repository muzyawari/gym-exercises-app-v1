import { useState, useContext, useEffect } from "react";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon, XIcon } from "@heroicons/react/solid";

import { Carousel } from "react-daisyui";

import SelectDropdown from "../../components/forms/SelectDropdown";
import SelectDropdownWeight from "../../components/forms/SelectDropdownWeight";
import { WorkoutsContext } from "../../contexts/WorkoutsContext";

import Weight from "../../components/forms/Weight";
import Reps from "../../components/forms/Reps";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const setAmount = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

export default function ExerciseCards({ exercise }) {
  const { workouts, deleteWorkout } = useContext(WorkoutsContext);
  const [selected, setSelected] = useState(exercise.sets || setAmount[0]);

  console.log(exercise);
  let weightData;
  let repData;

  if (typeof exercise.weight != "undefined") {
    weightData = Object.entries(exercise.weight);
  }

  if (typeof exercise.reps != "undefined") {
    repData = Object.entries(exercise.reps);
  }

  const [weights, setWeights] = useState(weightData || [1]);

  const [reps, setReps] = useState(repData || [1]);

  let weightObject = {};
  let repObject = {};

  useEffect(() => {
    for (let i = 0; i < selected; i++) {
      weightObject[i] = "";
      repObject[i] = "";
    }
    const weightItems = Object.entries(weightObject);
    const repItems = Object.entries(repObject);

    setWeights(weightItems);

    setReps(repItems);
  }, [selected]);

  const onTextInputChanged = (e, index) => {
    weightObject[index] = e.target.value;
  };

  const onRepInputChange = (e, index) => {
    repObject[index] = e.target.value;
  };

  const handleSetsDropdown = async (e) => {
    e.preventDefault();
    const finalExercise = {
      ...exercise,
      sets: selected,
      weight: weightObject,
      reps: repObject,
    };

    try {
      const response = await fetch("/api/workouts/" + exercise._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(finalExercise),
      });
      const jsonData = await response.json();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="pt-6">
      <div>
        <div className="mt-8 max-w-2xl mx-auto px-2 sm:px-4 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
            <div className="lg:col-start-8 lg:col-span-5">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900 capitalize">
                  {exercise.name}
                </h1>
                <button
                  type="button"
                  onClick={() => {
                    deleteWorkout(exercise);
                  }}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">Close panel</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              {/* Reviews */}
              <div className="mt-4">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="text-gray-500 bg-white border border-gray-300 mr-2 focus:outline-none hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 font-medium rounded-full px-2 py-1"
                  >
                    <p className={`capitalize text-xs`}>{exercise.bodyPart}</p>
                  </button>
                  <button
                    type="button"
                    className="text-gray-500 bg-white border border-gray-300 mr-2 focus:outline-none hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 font-medium rounded-full px-2 py-1"
                  >
                    <p className={`capitalize text-xs`}>{exercise.target}</p>
                  </button>
                  <button
                    type="button"
                    className="text-gray-500 bg-white border border-gray-300 mr-2 focus:outline-none hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 font-medium rounded-full px-2 py-1"
                  >
                    <p className={`capitalize text-xs`}>{exercise.equipment}</p>
                  </button>
                </div>
              </div>
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
              <h2 className="sr-only">Images</h2>

              <div className="grid grid-cols-1 ">
                <img
                  src={exercise.gifUrl}
                  alt={exercise.name}
                  className="sm:w-[430px] lg:h-[380px]"
                />
              </div>
            </div>

            <div className="mt-8 lg:col-span-5 lg:w-[250px]">
              <form>
                {/* Color picker */}
                <div className="flex justify-between">
                  <div className="flex-auto ">
                    <h2 className="text-sm font-medium text-gray-900 mb-2">
                      Sets
                    </h2>

                    <Listbox value={selected} onChange={setSelected}>
                      {({ open }) => (
                        <>
                          <div className="mt-1 relative">
                            <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                              <span className="block truncate">{selected}</span>
                              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {setAmount.map((number, index) => (
                                  <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                      classNames(
                                        active
                                          ? "text-white bg-indigo-600"
                                          : "text-gray-900",
                                        "cursor-default select-none relative py-2 pl-3 pr-9"
                                      )
                                    }
                                    value={number}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <span
                                          className={classNames(
                                            selected
                                              ? "font-semibold "
                                              : "font-normal",
                                            "block truncate"
                                          )}
                                        >
                                          {number}
                                        </span>

                                        {selected ? (
                                          <span
                                            className={classNames(
                                              active
                                                ? "text-white"
                                                : "text-indigo-600",
                                              "absolute inset-y-0 right-0 flex items-center pr-4"
                                            )}
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-900 mb-4">
                      Reps
                    </h2>
                  </div>
                  <div className="flex sm:w-[500px] lg:w-[250px]">
                    <Carousel className=" w-96 sm:w-[31.24rem] ">
                      {reps &&
                        reps.map((input, index) => (
                          <Carousel.Item key={index} className="">
                            <Reps
                              index={index}
                              value={input[1]}
                              onTextInputChanged={onRepInputChange}
                            />
                          </Carousel.Item>
                        ))}
                    </Carousel>
                  </div>
                </div>
                {/* Size picker */}
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-900 mb-4">
                      Weights
                    </h2>
                  </div>
                  <div className="flex">
                    <Carousel className=" w-96 sm:w-[31.24rem]">
                      {weights &&
                        weights.map((input, index) => (
                          <Carousel.Item key={index} className="">
                            <Weight
                              index={index}
                              value={input[1]}
                              onTextInputChanged={onTextInputChanged}
                            />
                          </Carousel.Item>
                        ))}
                    </Carousel>
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={handleSetsDropdown}
                  className="mt-8 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </form>

              {/* Product details */}
              {/* <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">
                  Description
                </h2>
              </div> */}

              <div className="mt-8 border-t border-gray-200 pt-8"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
