import { bugAdded } from "./action";
import store from "./store";

const unsubscribe = store.subscribe(() => {
  console.log("store change:", store.getState());
});

store.dispatch(bugAdded("bug 1"));

// unsubscribe();

// store.dispatch({
//   type: BUG_REMOVED,
//   payload: {
//     id: 1,
//   },
// });

console.log(store.getState());
