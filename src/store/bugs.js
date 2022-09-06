import { createAction, createReducer } from "@reduxjs/toolkit";

// action creator
export const bugAdded = createAction("bugAdded");
export const bugResolved = createAction("bugResolved");
export const bugRemoved = createAction("bugRemoved");

// reducer
let lastId = 0;

export default createReducer([], {
  // key: value
  // actions: functions (event => event handle)
  [bugAdded.type]: (bugs, action) => {
    bugs.push({
      id: ++lastId,
      description: action.payload.description,
      resolve: false,
    });
  },

  [bugResolved.type]: (bugs, action) => {
    const index = bugs.findIndex((x) => x.id === action.payload.id);
    bugs[index].resolve = true;
  },
});
