import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

// reducer
let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    // actions  => action handles
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolve: false,
      });
    },
    bugResolved: (bugs, action) => {
      const index = bugs.findIndex((x) => x.id === action.payload.id);
      bugs[index].resolve = true;
    },
  },
});

export const { bugAdded, bugResolved } = slice.actions;
export default slice.reducer;

// selector
// export const getUnresolveBugs = (state) =>
//   state.entities.bugs.filter((bug) => !bug.resolve);

// memoization
// bugs => get unresolve bugs from the cache
export const getUnresolveBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((x) => !x.resolve)
);
