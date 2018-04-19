import "jest";
import {
  getActionType,
  createCirquitReducer,
  createOperation,
  CirquitReducer
} from "./index";
import { Action, createStore, Dispatch } from "redux";

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

const noopReducer: CirquitReducer<State> = state => state;

const incrementActionWithoutNamespace = createOperation<State>(state => ({
  counter: {
    count: state.counter.count + 1
  }
}));

const incrementActionWithNamespace = createOperation<State>(
  state => ({
    counter: {
      count: state.counter.count + 1
    }
  }),
  { namespace: "my-namespace" }
);

describe("interface between redux", () => {
  it("createOperation should return redux action", () => {
    const dispatch = jest.fn<Dispatch<any>>();
    const action = createOperation<State>(noopReducer);
    // type checking
    dispatch(action);
    // dummy assertion
    expect(true).toBe(true);
  });

  it("createCirquitReducer should return redux reducer", () => {
    const reducer = createCirquitReducer<State>(initialState);
    // type checking
    createStore<State, Action, any, any>(reducer);
    expect(true).toBe(true);
  });
});

describe("createOperation", () => {
  it("should return operation action", () => {
    expect(createOperation(noopReducer)).toEqual({
      type: getActionType(),
      meta: {
        reducerName: "noopReducer"
      },
      payload: {
        reducer: noopReducer
      }
    });
  });

  describe("meta option", () => {
    it("should pass through meta options to action meta", () => {
      const meta = { a: "a", b: "b" };
      expect(createOperation(noopReducer, { meta }).meta).toEqual({
        ...meta,
        reducerName: "noopReducer"
      });
    });
  });

  describe("reducerName option", () => {
    it("should be anonymous when reducer is arrow function", () => {
      expect(createOperation(state => state).meta.reducerName).toBe(
        "anonymous"
      );
    });

    it("should be anonymous when reducer is anonymous function", () => {
      expect(
        createOperation(function(state: State) {
          return state;
        }).meta.reducerName
      ).toBe("anonymous");
    });

    it("should named by inferred arrow function", () => {
      const namedReducer = (state: State) => state;
      expect(createOperation(namedReducer).meta.reducerName).toBe(
        "namedReducer"
      );
    });

    it("should named by named function", () => {
      expect(
        createOperation(function namedReducer(state: State) {
          return state;
        }).meta.reducerName
      ).toBe("namedReducer");
    });

    it("should named when invoked with reducerName option", () => {
      const namedReducer = (state: State) => state;
      expect(
        createOperation(namedReducer, {
          meta: { reducerName: "nameParams" }
        }).meta.reducerName
      ).toBe("nameParams");
    });
  });

  describe("namespace option", () => {
    it("should be namespace defined action when specified namespace option", () => {
      expect(
        createOperation(noopReducer, { namespace: "my-namespace" }).type
      ).toBe("@@cirquit/my-namespace");
    });
  });
});

describe("createCirquitReducer's reducer", () => {
  it("should return initialState when invoke with @@init action", () => {
    const reducer = createCirquitReducer(initialState);
    expect(reducer(undefined as any, { type: "@@init" } as any)).toEqual(
      initialState
    );
  });

  it("should return reduced state when invoke with cirquitAction", () => {
    const reducer = createCirquitReducer(initialState);
    expect(reducer(initialState, incrementActionWithoutNamespace)).toEqual({
      counter: {
        count: 1
      }
    });
  });

  describe("namespace option", () => {
    it("should react when action and reducer has same namespace", () => {
      const reducer = createCirquitReducer(initialState, {
        namespace: "my-namespace"
      });
      expect(reducer(initialState, incrementActionWithNamespace)).toEqual({
        counter: {
          count: 1
        }
      });
    });

    it("should not react when action and reducer has different namespace", () => {
      const reducer = createCirquitReducer(initialState, {
        namespace: "another-namespace"
      });
      expect(reducer(initialState, incrementActionWithNamespace)).toEqual(
        initialState
      );
    });

    it("should not react when action has namespace, reducer has not namespace", () => {
      const reducer = createCirquitReducer(initialState);
      expect(reducer(initialState, incrementActionWithNamespace)).toEqual(
        initialState
      );
    });

    it("should not react when action has not namespace, reducer has namespace", () => {
      const reducer = createCirquitReducer(initialState, {
        namespace: "my-namespace"
      });
      expect(reducer(initialState, incrementActionWithoutNamespace)).toEqual(
        initialState
      );
    });
  });
});
