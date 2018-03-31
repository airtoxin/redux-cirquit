# redux-cirquit [![Build Status](https://travis-ci.org/airtoxin/redux-cirquit.svg?branch=master)](https://travis-ci.org/airtoxin/redux-cirquit)

__Realize command based short-circuiting redux.__

<img src="/logo.png" width="250px" />

## Concept

The aim of redux-cirquit is to realize command based application system on redux ecosystem.

Redux is an implementation of Flux based on __event based__ application system.
Its concept is good but bit tired,
because event system requires to define event elements separately each other (eventName, eventPublisher, eventSubscriber) to keep loose-coupling between eventPublisher and eventSubscriber.

Event based application system is suitable for large sized application, but overkill for small-medium sized application.
And we almost define its event elements tight-coupled.
Tight-couped event system is nearly equals to __command based__ application system.
If you use redux with command based application system, there are no reason to define event elements separately (actionTypes, action, actionCreator and reducer).

Command based application system is much simpler than event based.
There is only exists "command", so your actionCreator (with dispatch) is called as command.
This is a redux-cirquit.

```js
const increment = amount => createCirquitAction(state => ({
  ...state,
  counter: {
    count: state.counter.count + amount
  }
}));
// execute increment command
store.dispatch(increment(1));
```

## Install

`$ npm install redux-cirquit` or `$ yarn add redux-cirquit`

## Usage

```js
import { createStore } from "redux";
import { createCirquitReducer, createCirquitAction } from "redux-cirquit";

const initialState = {
  counter: {
    count: 0
  }
};
const cirquitReducer = createCirquitReducer(initialState);
const store = createStore(cirquitReducer);

const increment = amount => createCirquitAction(state => ({
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

const increment = amount => createCirquitAction(state => ({
  ...state,
  count: state.count + amount
}), { namespace: "counter" });

store.dispatch(increment(1));
```

[Full example](https://github.com/airtoxin/redux-cirquit-example)

## API

### export createCirquitReducer\<State\>(initialState: State, options?: { namespace?: string }): Redux.Reducer\<State\>

Creates redux-cirquit's reducer that manages your application's state.  
If you want to split reducer using `combineReducers`, you must specify reducer name by `namespace` option.

### export createCirquitAction\<State\>(reducer: (state: State) => State, options?: CirquitActionOptions }): Redux.Action

Creates basic redux action to reduce you application's state.  

#### CirquitActionOptions = { namespace?: string, meta?: { name?: string, ...anyProps } }

If you use splited reducer, must set same `namespace` of related reducer to this action.  
`meta` properties is almostly pass through to returned action's meta property except `meta.name` property, so you can define any debugging informations in `meta`.  
`meta.name` is optional property to define action name.
If not specify `meta.name`, [function name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name) or "anonymous" is used.

## Articles

[それでもやっぱり redux は面倒くさい](https://qiita.com/airtoxin/items/1632d523ad95adf6f3fe) (Japanese)

## License

MIT
