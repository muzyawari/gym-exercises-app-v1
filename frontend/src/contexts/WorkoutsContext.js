import React, { useState, useEffect, createContext, useReducer } from "react";

import { useParams } from "react-router-dom";

const WorkoutsContext = createContext();

// export const workoutsReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_WORKOUTS":
//       return {
//         workouts: action.payload,
//       };
//     case "CREATE_WORKOUT":
//       return {
//         workouts: [action.payload, ...state.workouts],
//       };
//     default:
//       return state;
//   }
// };

function WorkoutsProvider({ children }) {
  const [workouts, setWorkouts] = useState([]);
  // useEffect(() => {
  //   const fetchWorkouts = async () => {
  //     const response = await fetch("http://localhost:5000/api/workouts/");
  //     const jsonData = await response.json();

  //     if (response.ok) {
  //       setWorkouts(jsonData);
  //     }
  //   };
  //   fetchWorkouts();
  // }, []);

  // const postWorkouts = async (itemToAdd) => {
  //   const response = await fetch("/api/workouts", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       id: itemToAdd.id,
  //       name: itemToAdd.name,
  //       bodyPart: itemToAdd.bodyPart,
  //       equipment: itemToAdd.equipment,
  //       target: itemToAdd.target,
  //       gifUrl: itemToAdd.gifUrl,
  // 			page: page
  //     }),
  //   });
  //   const json = await response.json();

  //   if (response.ok) {
  //     setWorkouts([...workouts, itemToAdd]);
  //   } else {
  //     console.log(json.error);
  //   }

  // };

  const deleteWorkout = async (item) => {
    console.log("item", item);
    const response = await fetch(`/api/workouts/${item._id}`, {
      method: "DELETE",
    });
    const json = await response.json();

    const removeItem = workouts.filter((workout) => {
      return workout._id !== item._id;
    });
    setWorkouts(removeItem);
    console.log("array", workouts);
    // console.log("json", json);

    // if (response.ok) {
    //   setWorkouts(removeItem);
    // } else {
    //   console.log(json.error);
    // }
  };

  // const [state, dispatch] = useReducer(workoutsReducer, {
  //   workouts: null,
  // });

  const value = {
    workouts,
    setWorkouts,
    // postWorkouts,
    deleteWorkout,
  };

  return (
    <WorkoutsContext.Provider value={value}>
      {children}
    </WorkoutsContext.Provider>
  );
}

export { WorkoutsContext, WorkoutsProvider };
