import * as actions from "../actions";

const initialState = {
  loading: false,
  metrics: []
};

const toF = c => (c * 9) / 5 + 32;

const startLoading = (state, action) => {
  return { ...state, loading: true };
};

const weatherMetricDataReceived = (state, action) => {
  return { ...state, loading: false, metrics: action.metrics.data };
};

const handlers = {
  [actions.FETCH_WEATHER]: startLoading,
  [actions.FETCH_METRIC_DATA]: weatherMetricDataReceived,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
