import { Action } from "redux";

export const CirquitActionType = "@cirquit/action";

export interface CirquitReducer<State> {
  (state: State): State;
  name?: string;
}

export interface CirquitAction<State> extends Action {
  type: typeof CirquitActionType;
  name: string;
  reducer: CirquitReducer<State>;
}

export const createCirquitAction = <State>(
  reducer: CirquitReducer<State>,
  name?: string
): CirquitAction<State> => ({
  type: CirquitActionType,
  name: name || reducer.name || "anonymous",
  reducer
});

export const createCirquitReducer = <State>(initialState: State) => (
  state: State = initialState,
  action: CirquitAction<State>
): State => {
  switch (action.type) {
    case CirquitActionType: {
      return action.reducer(state);
    }
    default: {
      return state;
    }
  }
};
