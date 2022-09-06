import store from "./store";

const unsubscribe = store.subscribe(() => {
  console.log("store change:", store.getState());
});

store.dispatch({
  type: "bugAdded",
  payload: {
    description: "Bug1",
  },
});

unsubscribe();

store.dispatch({
  type: "bugRem/Applications/Visual Studio Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.htmloved",
  payload: {
    id: 1,
  },
});

console.log(store.getState());
