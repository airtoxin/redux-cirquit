import "jest";
import * as cirquit from "./index";

interface State {
  counter: {
    count: number;
  };
}

const initialState: State = {
  counter: {
    count: 0
  }
};

const noopReducer: cirquit.CirquitReducer<State> = state => state;

const incrementAction = cirquit.createCirquitAction<State>(state => ({
  counter: {
    count: state.counter.count + 1
  }
}));

describe("createCirquitAction", () => {
  it("should return cirquitAction", () => {
    expect(cirquit.createCirquitAction(noopReducer)).toEqual({
      type: cirquit.CirquitActionType,
      name: "noopReducer",
      reducer: noopReducer
    });
  });

  it("should return anonymous named cirquitAction", () => {
    expect(cirquit.createCirquitAction(state => state).name).toBe("anonymous");
  });
});

describe("createCirquitReducer's reducer", () => {
  const reducer = cirquit.createCirquitReducer(initialState);

  it("should return initialState when invoke with @@init action", () => {
    expect(reducer(undefined, { type: "@@init" } as any)).toEqual(initialState);
  });

  it("should return reduced state when invoke with cirquitAction", () => {
    expect(reducer(initialState, incrementAction)).toEqual({
      counter: {
        count: 1
      }
    });
  });
});
