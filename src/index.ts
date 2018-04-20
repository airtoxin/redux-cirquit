import { Action, Reducer } from "redux";

export const getActionType = (namespace: string = "") =>
  `@@cirquit/${namespace}`;

export interface CirquitReducer<State> {
  (state: State): State;
  name?: string;
}

export interface OperationMeta {
  reducerName?: string;
  [key: string]: any;
}

export interface Operation<State> extends Action {
  type: string;
  meta: OperationMeta;
  payload: {
    reducer: CirquitReducer<State>;
  };
}

export interface OperationOptions {
  namespace?: string;
  meta?: OperationMeta;
}

export const createOperation = <State>(
  reducer: CirquitReducer<State>,
  options: OperationOptions = {}
): Operation<State> => ({
  type: getActionType(options.namespace),
  meta: {
    ...options.meta,
    reducerName:
      (options.meta && options.meta.reducerName) || reducer.name || "anonymous"
  },
  payload: {
    reducer
  }
});

export interface CirquitReducerOptions {
  namespace?: string;
}

export const createCirquitReducer = <State>(
  initialState: State,
  options: CirquitReducerOptions = {}
): Reducer<State, Operation<State>> => (
  state: State = initialState,
  action: Operation<State>
): State => {
  switch (action.type) {
    case getActionType(options.namespace): {
      return action.payload.reducer(state);
    }
    default: {
      return state;
    }
  }
};
