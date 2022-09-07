import { createSlice } from "@reduxjs/toolkit";

// reducer
let lastId = 0;

const slice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    // actions  => action handles
    userAdded: (users, action) => {
      users.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
  },
});

export const { userAdded } = slice.actions;
export default slice.reducer;
