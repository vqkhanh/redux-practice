import { bugAdded, bugResolved, getUnresolveBugs } from "./store/bugs";
import { projectAdded } from "./store/projects";
import configureStore from "./store/configureStore";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
  console.log("store change:", store.getState());
});

store.dispatch(projectAdded({ description: "project 1" }));
store.dispatch(bugAdded({ description: "bug 1" }));
store.dispatch(bugAdded({ description: "bug 2" }));
store.dispatch(bugAdded({ description: "bug 3" }));
store.dispatch(bugResolved({ id: 1 }));

const unResolveBugs = getUnresolveBugs(store.getState());
const unResolveBugs2 = getUnresolveBugs(store.getState());

// console.log(store.getState());
console.log(unResolveBugs === unResolveBugs2);
