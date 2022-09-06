// action type
const BUG_ADDED = "BugAdded";
const BUG_REMOVED = "BugRemoved";
const BUG_RESOLVED = "BugResolved";

// action creator
export const bugAdded = (description) => ({
  type: BUG_ADDED,
  payload: {
    description: description,
  },
});

export const bugResolved = (id) => ({
  type: BUG_RESOLVED,
  payload: {
    id,
  },
});

// reducer
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
    case BUG_RESOLVED:
      // const index = state.findIndex((x) => x.id == action.payload.id);
      // if (index !== -1) {
      //   state[index].resolve = true;
      // }
      // return state;

      //or
      return state.map((x) =>
        x.id !== action.payload.id ? x : { ...x, resolve: true }
      );
    case BUG_REMOVED:
      return state.filter((x) => x.id !== action.payload.id);
    default:
      return state;
  }
}
