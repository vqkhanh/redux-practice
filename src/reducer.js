import * as actions from "./actionType";

let lastId = 0;

export default function reducer(state = [], action) {
  switch (action.type) {
    case actions.BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolve: false,
        },
      ];
    case actions.BUG_RESOLVED:
      // const index = state.findIndex((x) => x.id == action.payload.id);
      // if (index !== -1) {
      //   state[index].resolve = true;
      // }
      // return state;

      //or
      return state.map((x) =>
        x.id !== action.payload.id ? x : { ...x, resolve: true }
      );
    case actions.BUG_REMOVED:
      return state.filter((x) => x.id !== action.payload.id);
    default:
      return state;
  }
}
