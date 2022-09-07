//SNA
const func = () => (next) => (action) => {
  if (typeof action === "function") {
    action();
  } else {
    next(action);
  }
};

export default func;
