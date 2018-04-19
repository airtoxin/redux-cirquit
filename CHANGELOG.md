# CHANGELOG

## 2.0.0 (2018-04-??)

### Bugfix

+ Fix broken compilation of destructuring ([#9](https://github.com/airtoxin/redux-cirquit/pull/9),[#10](https://github.com/airtoxin/redux-cirquit/pull/10),[#11](https://github.com/airtoxin/redux-cirquit/pull/11))

### Feature and Breaking change

+ Rename `CirquitAction` to `Operation` ([#8](https://github.com/airtoxin/redux-cirquit/pull/8))

This change only affect to createCirquitAction method's name.

__before__

```js
createCirquitAction(/* any arguments */);
```

__after__

```js
createOperation(/* any arguments */);
```

## 1.4.0 (2018-04-05)

### Features

+ Add temporal improvement of TypeScript's typings ([#6](https://github.com/airtoxin/redux-cirquit/pull/6))
+ Add auto generated type definitions of flow ([#7](https://github.com/airtoxin/redux-cirquit/pull/7))

## 1.3.0 (2018-04-01)

### Features

+ add `namespace` option to targeting reducer ([#3](https://github.com/airtoxin/redux-cirquit/pull/3))
+ change action interface that created by `createCirquitAction` ([#4](https://github.com/airtoxin/redux-cirquit/pull/4))

### Breaking change

+ `createCirquitAction` is now receives object formed option.

__before__

```js
createCirquitAction(reducer, "my-reducer");
```

__after__

```js
createCirquitAction(reducer, {
  reducerName: "my-reducer"
});
```

## 1.2.0 (2018-03-31)

### Features

+ add optional `name` argument to define reducer's name explicitly ([#2](https://github.com/airtoxin/redux-cirquit/pull/2))

## 1.1.0 (2018-03-27)

First release
