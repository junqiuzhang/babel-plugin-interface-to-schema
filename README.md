# Babel Plugin Interface To Schema
a babel plugin that transform interface to schema
## Example
**before:**

```
interface IProps extends IFather {
  boo: boolean; // boolean
  num: number; // number
  str: string; // string
  obj: Object; // object
  obj2: {
    child: IChild;
  };
  arr: Array<boolean>; // Array
  arr2: Array<IChild>;
  arr3: Array<{
    child: IChild;
  }>;
  fun: Function; // Function
  fun2: (n: number) => void; // Function
  child: IChild;
}
interface IChild {
  name: string;
}
```
**after:**

```
{
  "type": "object",
  "title": "IProps",
  "properties": [
    { "title": "gra", "type": "number" },
    { "title": "fat", "type": "number" },
    { "title": "boo", "type": "boolean" },
    { "title": "num", "type": "number" },
    { "title": "str", "type": "string" },
    { "title": "obj", "type": "object" },
    {
      "type": "object",
      "properties": [
        {
          "title": "child",
          "type": "object",
          "properties": [{ "title": "name", "type": "string" }]
        }
      ]
    },
    { "title": "arr", "type": "array", "items": { "type": "boolean" } },
    {
      "title": "arr2",
      "type": "array",
      "items": {
        "type": "object",
        "properties": [{ "title": "name", "type": "string" }]
      }
    },
    {
      "title": "arr3",
      "type": "array",
      "items": {
        "type": "object",
        "properties": [
          {
            "title": "child",
            "type": "object",
            "properties": [{ "title": "name", "type": "string" }]
          }
        ]
      }
    },
    { "title": "fun", "type": "function" },
    { "title": "fun2", "type": "function" },
    {
      "title": "child",
      "type": "object",
      "properties": [{ "title": "name", "type": "string" }]
    }
  ]
}

```

## Usage
**.babelrc**

```
{
  "plugins": [
    "@babel/plugin-syntax-typescript",
    "./src/index.js"
  ]
}
```