import { BUG_ADDED, BUG_REMOVED } from "./actionType";

let lastId = 0;

export default function reducer(state = [], action) {
  switch (action.type) {
    case BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolve: false,
        },
      ];
    case BUG_REMOVED:
      return state.filter((x) => x.id !== action.payload.id);
    default:
      return state;
  }
}
