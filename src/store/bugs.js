import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

// reducer
const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    // actions  => action handles

    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },

    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    //DDD cqrs
    // commamd - event
    // addbug - bugAdded
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },
    // resolveBug (command) - bugResolved (event)
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((x) => x.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
    bugAssignedToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
      const index = bugs.list.findIndex((x) => x.id === bugId);
      bugs.list[index].userId = userId;
    },
  },
});

export const {
  bugAdded,
  bugResolved,
  bugAssignedToUser,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed,
} = slice.actions;
export default slice.reducer;

// action creator
const url = "/bugs";

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;
  console.log(lastFetch);
  dispatch(
    apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
    })
  );
};

export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

export const resolveBug = (id) =>
  apiCallBegan({
    url: url + "/" + id,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });

export const assignBugToUser = (bugId, userId) =>
  apiCallBegan({
    url: url + "/" + bugId,
    method: "patch",
    data: { userId },
    onSuccess: bugAssignedToUser.type,
  });

// selector
// export const getUnresolveBugs = (state) =>
//   state.entities.bugs.list.filter((bug) => !bug.resolved);

// memoization
// bugs => get unresolve bugs from the cache
export const getUnresolveBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.list.filter((x) => !x.resolved)
);

export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.list.filter((x) => x.userId === userId)
  );
