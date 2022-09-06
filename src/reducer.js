let lastId = 0;

export default function reducer(state = [], action) {
  switch (action.type) {
    case "bugAdded":
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolve: false,
        },
      ];
    case "bugRemoved":
      return state.filter((x) => x.id !== action.payload.id);
    default:
      return state;
  }
}
