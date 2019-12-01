# Babel Plugin Interface To Schema
a babel plugin that interface to schema
## Example
**before:**

```
export default (props) => {
  const num = [1, 2, 3]
  return <div>
    {
      num.map(o => {
        return <Com num={o} />
      })
    }
  </div>
}
```
**after:**

```
export default (props => {
  const num = [1, 2, 3];
  return <div>
    {num.map((o, i) => {
      return <Com num={o} key={i} />;
    })}
  </div>;
});
```

## Usage
**.babelrc**

```
{
  "plugins": [
    "@babel/plugin-transform-react-jsx",
    "./src/index.js"
  ]
}
```