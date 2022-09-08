import axios from "axios";
import * as actions from "../api";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, data, onStart, onError, onSuccess } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    try {
      const reponse = await axios.request({
        baseURL: "http://localhost:9001/api",
        url,
        method,
        data,
      });

      // general
      dispatch(actions.apiCallSuccess(reponse.data));
      // specific
      if (onSuccess) dispatch({ type: onSuccess, payload: reponse.data });
      // console.log(reponse.data);
    } catch (error) {
      // general
      dispatch(actions.apiCallFailed(error.message));
      // specific
      if (onError) dispatch({ type: onError, payload: error.message });
    }
  };

export default api;
