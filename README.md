# redux-cirquit [![Build Status](https://travis-ci.com/airtoxin/redux-cirquit.svg?token=PRvi8x3pzXzuck3j3Jmt&branch=master)](https://travis-ci.com/airtoxin/redux-cirquit)

__short-circuiting redux action and reducer.__

<img src="/logo.png" width="250px" />

## Concept

The concept of redux is beautiful but bit tired,
because action-types, action, actionCreator and reducer are always tight coupled each other, but those are defined separately.
so production code ware covered with boilerplate.

Aim of redux-cirquit is to reduce those boilerplate.

```js
const increment = amount => createCirquitAction(state => ({
  ...state,
  counter: {
    count: state.counter.count + amount
  }
}));

store.dispatch(increment(1));
```

exported function `createCirquitAction` invoke with reducer function.
It returns redux action, so you can dispatch its action in redux way.

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

[Full example](https://github.com/airtoxin/redux-cirquit-example)

## License

MIT
