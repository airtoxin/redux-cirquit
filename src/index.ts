import { Action } from "redux";

export const CirquitActionType = "@cirquit/action";

export const getCirquitActionType = (namespace: string = "") =>
  `${CirquitActionType}@@${namespace}`;

export interface CirquitReducer<State> {
  (state: State): State;
  name?: string;
}

export interface CirquitAction<State> extends Action {
  type: string;
  name: string;
  reducer: CirquitReducer<State>;
}

export interface CirquitActionOptions {
  name?: string;
  namespace?: string;
}

export const createCirquitAction = <State>(
  reducer: CirquitReducer<State>,
  options: CirquitActionOptions = {}
): CirquitAction<State> => ({
  type: getCirquitActionType(options.namespace),
  name: options.name || reducer.name || "anonymous",
  reducer
});

export interface CirquitReducerOptions {
  namespace?: string;
}

export const createCirquitReducer = <State>(
  initialState: State,
  options: CirquitReducerOptions = {}
) => (state: State = initialState, action: CirquitAction<State>): State => {
  switch (action.type) {
    case getCirquitActionType(options.namespace): {
      return action.reducer(state);
    }
    default: {
      return state;
    }
  }
};
