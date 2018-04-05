import { Action, AnyAction, Reducer } from "redux";

export const getCirquitActionType = (namespace: string = "") =>
  `@@cirquit/action/${namespace}`;

export interface CirquitReducer<State> {
  (state: State): State;
  name?: string;
}

export interface CirquitActionMeta {
  reducerName?: string;
  [key: string]: any;
}

export interface CirquitAction<State> extends Action {
  type: string;
  meta: CirquitActionMeta;
  payload: {
    reducer: CirquitReducer<State>;
  };
}

export interface CirquitActionOptions {
  namespace?: string;
  meta?: CirquitActionMeta;
}

export const createCirquitAction = <State>(
  reducer: CirquitReducer<State>,
  options: CirquitActionOptions = {}
): CirquitAction<State> => ({
  type: getCirquitActionType(options.namespace),
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
): Reducer<State> => (
  state: State = initialState,
  action: AnyAction /* Use temporal AnyAction instead of CirquitAction<State> https://github.com/Microsoft/TypeScript/issues/16795 */
): State => {
  switch (action.type) {
    case getCirquitActionType(options.namespace): {
      return (action as CirquitAction<State>).payload.reducer(state);
    }
    default: {
      return state;
    }
  }
};
