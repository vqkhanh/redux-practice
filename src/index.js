import store from "./store";
import { BUG_ADDED, BUG_REMOVED } from "./actionType";

const unsubscribe = store.subscribe(() => {
  console.log("store change:", store.getState());
});

store.dispatch({
  type: BUG_ADDED,
  payload: {
    description: "Bug1",
  },
});

unsubscribe();

store.dispatch({
  type: BUG_REMOVED,
  payload: {
    id: 1,
  },
});

console.log(store.getState());
