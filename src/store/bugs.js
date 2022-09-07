import { createSlice } from "@reduxjs/toolkit";

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
export const getUnresolveBugs = (state) =>
  state.entities.bugs.filter((bug) => !bug.resolve);
