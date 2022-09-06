import { createAction } from "@reduxjs/toolkit";

// action creator
export const bugAdded = createAction("bugAdded");
export const bugResolved = createAction("bugResolved");
export const bugRemoved = createAction("bugRemoved");

// reducer
let lastId = 0;

export default function reducer(state = [], action) {
  switch (action.type) {
    case bugAdded.type:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolve: false,
        },
      ];
    case bugResolved.type:
      return state.map((x) =>
        x.id !== action.payload.id ? x : { ...x, resolve: true }
      );
    case bugRemoved.type:
      return state.filter((x) => x.id !== action.payload.id);
    default:
      return state;
  }
}
