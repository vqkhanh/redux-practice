import {
  bugAdded,
  bugResolved,
  getUnresolveBugs,
  bugAssignedToUser,
  getBugsByUser,
} from "./store/bugs";
import { projectAdded } from "./store/projects";
import configureStore from "./store/configureStore";
import { userAdded } from "./store/users";

const store = configureStore();

store.dispatch({
  type: "apiCallBegan", // api request
  payload: {
    url: "/bugs",
    onSuccess: "bugsReceived",
    onError: "bugsRequestFailed",
  },
});

// const unsubscribe = store.subscribe(() => {
//   console.log("store change:", store.getState());
// });

// store.dispatch((dispatch, getState) => {
// call API
// When the promise is resolve => dispatch()
// dispatch({ type: "bugsReceived", bugs: [1, 2, 3] });
// If the promise is rejected => dispatch other function
// can not do that above with plan function
// });

// store.dispatch({
//   type: "error",
//   payload: { message: "A error occured" },
// });

// store.dispatch(userAdded({ name: "user 1" }));
// store.dispatch(userAdded({ name: "user 2" }));
// store.dispatch(projectAdded({ description: "project 1" }));
// store.dispatch(bugAdded({ description: "bug 1" }));
// store.dispatch(bugAdded({ description: "bug 2" }));
// store.dispatch(bugAdded({ description: "bug 3" }));
// store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));
// store.dispatch(bugResolved({ id: 1 }));

// const unResolveBugs = getUnresolveBugs(store.getState());
// const unResolveBugs2 = getUnresolveBugs(store.getState());

// // console.log(store.getState());
// console.log(unResolveBugs === unResolveBugs2);

// const bugs = getBugsByUser(2)(store.getState());
// console.log(bugs);
