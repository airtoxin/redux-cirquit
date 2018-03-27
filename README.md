# redux-cirquit [![Build Status](https://travis-ci.com/airtoxin/redux-cirquit.svg?token=PRvi8x3pzXzuck3j3Jmt&branch=master)](https://travis-ci.com/airtoxin/redux-cirquit)

__short-circuiting redux action and reducer.__

## Concept

Yes, concept of redux is beautiful but bit tired,
because action and reducer is always tight coupling but define separately
so production code ware covered with boilerplate.

redux-cirquit's action is a function that return a reducer.

```js
const increment = amount => createCirquitAction(state => ({
  ...state,
  counter: {
    count: state.counter.count + amount
  }
}));

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

## License

MIT
