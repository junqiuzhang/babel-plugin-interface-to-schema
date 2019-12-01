# Babel Plugin Interface To Schema
a babel plugin that transform interface to schema
## Example
**before:**

```
interface IGrandFather {
  gra: number; // GrandFather
}
interface IFather extends IGrandFather {
  fat: number; // Father
}
interface IProps extends IFather {
  son: Array<number>; // Son
}
```
**after:**

```
{
  "Properties": [
    {
      "Name": "gra",
      "Type": "number",
      "Description": "GrandFather",
      "Label": "GrandFather",
      "IsArray": false,
      "IsMetaDataType": false,
      "Version": null,
      "Extension": {
        "editable": true,
        "jsType": "value",
        "editor": {
          "type": "Input",
          "config": {}
        }
      }
    },
    {
      "Name": "fat",
      "Type": "number",
      "Description": "Father",
      "Label": "Father",
      "IsArray": false,
      "IsMetaDataType": false,
      "Version": null,
      "Extension": {
        "editable": true,
        "jsType": "value",
        "editor": {
          "type": "Input",
          "config": {}
        }
      }
    },
    {
      "Name": "son",
      "Type": "object",
      "Description": "Son",
      "Label": "Son",
      "IsArray": true,
      "IsMetaDataType": false,
      "Version": null,
      "Extension": {
        "editable": true,
        "jsType": "value",
        "editor": {
          "type": "TextArea",
          "config": {}
        }
      }
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