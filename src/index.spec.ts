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

const incrementActionWithoutNamespace = cirquit.createCirquitAction<State>(
  state => ({
    counter: {
      count: state.counter.count + 1
    }
  })
);

const incrementActionWithNamespace = cirquit.createCirquitAction<State>(
  state => ({
    counter: {
      count: state.counter.count + 1
    }
  }),
  { namespace: "my-namespace" }
);

describe("createCirquitAction", () => {
  it("should return cirquitAction", () => {
    expect(cirquit.createCirquitAction(noopReducer)).toEqual({
      type: cirquit.getCirquitActionType(),
      meta: {
        name: "noopReducer"
      },
      reducer: noopReducer
    });
  });

  describe("name option", () => {
    it("should be anonymous when reducer is arrow function", () => {
      expect(cirquit.createCirquitAction(state => state).meta.name).toBe(
        "anonymous"
      );
    });

    it("should be anonymous when reducer is anonymous function", () => {
      expect(
        cirquit.createCirquitAction(function(state: State) {
          return state;
        }).meta.name
      ).toBe("anonymous");
    });

    it("should named by inferred arrow function", () => {
      const namedReducer = (state: State) => state;
      expect(cirquit.createCirquitAction(namedReducer).meta.name).toBe(
        "namedReducer"
      );
    });

    it("should named by named function", () => {
      expect(
        cirquit.createCirquitAction(function namedReducer(state: State) {
          return state;
        }).meta.name
      ).toBe("namedReducer");
    });

    it("should named when invoked with name option", () => {
      const namedReducer = (state: State) => state;
      expect(
        cirquit.createCirquitAction(namedReducer, {
          meta: { name: "nameParams" }
        }).meta.name
      ).toBe("nameParams");
    });
  });

  describe("namespace option", () => {
    it("should be namespace defined action when specified namespace option", () => {
      expect(
        cirquit.createCirquitAction(noopReducer, { namespace: "my-namespace" })
          .type
      ).toBe("@@cirquit/action/my-namespace");
    });
  });
});

describe("createCirquitReducer's reducer", () => {
  it("should return initialState when invoke with @@init action", () => {
    const reducer = cirquit.createCirquitReducer(initialState);
    expect(reducer(undefined, { type: "@@init" } as any)).toEqual(initialState);
  });

  it("should return reduced state when invoke with cirquitAction", () => {
    const reducer = cirquit.createCirquitReducer(initialState);
    expect(reducer(initialState, incrementActionWithoutNamespace)).toEqual({
      counter: {
        count: 1
      }
    });
  });

  describe("namespace option", () => {
    it("should react when action and reducer has same namespace", () => {
      const reducer = cirquit.createCirquitReducer(initialState, {
        namespace: "my-namespace"
      });
      expect(reducer(initialState, incrementActionWithNamespace)).toEqual({
        counter: {
          count: 1
        }
      });
    });

    it("should not react when action and reducer has different namespace", () => {
      const reducer = cirquit.createCirquitReducer(initialState, {
        namespace: "another-namespace"
      });
      expect(reducer(initialState, incrementActionWithNamespace)).toEqual(
        initialState
      );
    });

    it("should not react when action has namespace, reducer has not namespace", () => {
      const reducer = cirquit.createCirquitReducer(initialState);
      expect(reducer(initialState, incrementActionWithNamespace)).toEqual(
        initialState
      );
    });

    it("should not react when action has not namespace, reducer has namespace", () => {
      const reducer = cirquit.createCirquitReducer(initialState, {
        namespace: "my-namespace"
      });
      expect(reducer(initialState, incrementActionWithoutNamespace)).toEqual(
        initialState
      );
    });
  });
});
