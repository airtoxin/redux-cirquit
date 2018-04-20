# redux-cirquit [![Build Status](https://travis-ci.org/airtoxin/redux-cirquit.svg?branch=master)](https://travis-ci.org/airtoxin/redux-cirquit)

__To realize operation based short-circuiting redux.__

<img src="/logo.png" width="250px" />

## Concept

The aim of redux-cirquit is to realize operation based application system on redux ecosystem.

Redux is an implementation of Flux based on __event based__ application system.
Its concept is good but bit tired,
because event system requires to define event elements separately each other (EventName, EventPublisher, EventSubscriber) to keep loose-coupling between event publisher and subscriber.

Event based application system is suitable for gigantic large sized application, but overkill for small or medium sized application.
And we almost define its event elements (event publisher and subscriber) tightly-coupled.
Tightly-couped event system is nearly equals to __operation based__ application system.
If you use redux with operation based application system, there are no reason to define event elements separately (ActionTypes, Action, ActionCreator and Reducer).

Operation based application system is much simpler than event based.
There is only exists "Operation", so your ActionCreator (with dispatch) is called as operation.
This is a redux-cirquit.

```js
const increment = amount => createOperation(state => ({
  ...state,
  counter: {
    count: state.counter.count + amount
  }
}));
// execute increment operation
store.dispatch(increment(1));
```

## Install

`$ npm install redux-cirquit` or `$ yarn add redux-cirquit`

## Usage

```js
import { createStore } from "redux";
import { createCirquitReducer, createOperation } from "redux-cirquit";

const initialState = {
  counter: {
    count: 0
  }
};
const cirquitReducer = createCirquitReducer(initialState);
const store = createStore(cirquitReducer);

const increment = amount => createOperation(state => ({
  ...state,
  counter: {
    count: state.counter.count + amount
  }
}));

store.dispatch(increment(1)); // state is { counter: { count: 1 } }
```

with combineReducers

```js
const store = createStore(combineReducers({
  counter: createCirquitReducer(initialCounterState, { namespace: "counter" }),
  user: createCirquitReducer(initialUserState, { namespace: "user" })
}));

const increment = amount => createOperation(state => ({
  ...state,
  count: state.count + amount
}), { namespace: "counter" });

store.dispatch(increment(1));
```

[Full example](https://github.com/airtoxin/redux-cirquit-example)

## API

### export createCirquitReducer\<State\>(initialState: State, options?: { namespace?: string }): Redux.Reducer\<State\>

Creates redux-cirquit's reducer.  
If you want to split reducer using `combineReducers`, you should specify `namespace` in option.

### export createOperation\<State\>(reducer: (s: State) => State, options?: OperationOptions }): Redux.Action

Creates operation to reduce state.  
The operation is actually redux's action.

#### OperationOptions = { namespace?: string, meta?: { reducerName?: string, ...anyProps } }

If you use splitted reducer, you should set same `namespace` of reducer related to this action.  
`meta` properties is almostly pass through to returned action's meta property except `meta.reducerName` property, so you can define any debugging informations in `meta`.  
`meta.reducerName` is optional property to define action name.
If not specify `meta.reducerName`, [function name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name) or "anonymous" is used.

### getActionType(namespace: string): string

Get action type used in redux-cirquit internally.

## Articles

[それでもやっぱり redux は面倒くさい](https://qiita.com/airtoxin/items/1632d523ad95adf6f3fe) (Japanese)

## [Changelog](/CHANGELOG.md)

## License

MIT
