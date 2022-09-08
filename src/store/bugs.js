import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

// reducer
let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    // actions  => action handles

    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
    },

    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastId,
        description: action.payload.description,
        resolve: false,
      });
    },
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((x) => x.id === action.payload.id);
      bugs[index].resolve = true;
    },
    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.list.findIndex((x) => x.id === bugId);
      bugs[index].userId = userId;
    },
  },
});

export const { bugAdded, bugResolved, bugAssignedToUser, bugsReceived } =
  slice.actions;
export default slice.reducer;

// action creator
const url = "/bugs";
export const loadBugs = () =>
  apiCallBegan({
    url,
    onSuccess: bugsReceived.type,
  });

// selector
// export const getUnresolveBugs = (state) =>
//   state.entities.bugs.list.filter((bug) => !bug.resolve);

// memoization
// bugs => get unresolve bugs from the cache
export const getUnresolveBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.list.filter((x) => !x.resolve)
);

export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.list.filter((x) => x.userId === userId)
  );
