import * as actions from "./store/bugs";
import configureStore from "./store/configureStore";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
  console.log("store change:", store.getState());
});

store.dispatch(actions.bugAdded("bug 1"));
store.dispatch(actions.bugAdded("bug 2"));
store.dispatch(actions.bugAdded("bug 3"));
store.dispatch(actions.bugResolved(1));

// unsubscribe();

// store.dispatch({
//   type: BUG_REMOVED,
//   payload: {
//     id: 1,
//   },
// });

console.log(store.getState());
