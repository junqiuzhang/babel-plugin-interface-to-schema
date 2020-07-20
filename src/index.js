const { TS_TYPE, JS_TYPE } = require('./type');
const { parsingPath, output } = require('./util');
module.exports = function(babel) {
  const interfacesDeclaration = new Map();
  const interfaceSchema = new Map();
  return {
    name: 'babel-plugin-interface-to-schema',
    visitor: {
      TSInterfaceDeclaration: {
        enter(path, state) {
          interfacesDeclaration.set(path.node.id.name, path.node);
        }
      },
      Program: {
        exit(path, state) {
          function getProperties(inter) {
            // 递归获取继承属性
            let properties = new Map();
            if (Array.isArray(inter.extends)) {
              inter.extends.forEach(e => {
                const extProperties = getProperties(interfacesDeclaration.get(e.expression.name));
                extProperties.forEach((value, key) => {
                  properties.set(key, value);
                })
              })
            }
            // 获取自身属性
            if (Array.isArray(inter.body.body)) {
              inter.body.body.forEach((value, index) => {
                properties.set(value.key.name, value);
              })
            }
            return properties;
          }
          function getPropertySchema(prop) {
            let schema = {};
            // title
            if (prop.key) {
              schema.title = prop.key.name;
            }
            // type
            if (TS_TYPE[prop.type]) {
              schema.type = TS_TYPE[prop.type];
            } else if (prop.typeAnnotation && prop.typeAnnotation.typeAnnotation) {
              schema.type = TS_TYPE[prop.typeAnnotation.typeAnnotation.type];
            }
            // others
            if (schema.type === TS_TYPE.TSTypeLiteral && prop.typeAnnotation && prop.typeAnnotation.typeAnnotation) {
              schema = getPropertySchema(prop.typeAnnotation.typeAnnotation);
            } else if (schema.type === TS_TYPE.TSTypeLiteral && prop.members) {
              schema.type = 'object';
              schema.properties = prop.members.map(getPropertySchema);
            } else if (schema.type === TS_TYPE.TSTypeReference && prop.typeAnnotation && prop.typeAnnotation.typeAnnotation && prop.typeAnnotation.typeAnnotation.typeName && prop.typeAnnotation.typeAnnotation.typeName.name === 'Object') {
              schema.type = 'object';
            } else if (schema.type === TS_TYPE.TSTypeReference && prop.typeAnnotation && prop.typeAnnotation.typeAnnotation && prop.typeAnnotation.typeAnnotation.typeName && prop.typeAnnotation.typeAnnotation.typeName.name === 'Function') {
              schema.type = 'function';
            } else if (schema.type === TS_TYPE.TSTypeReference && prop.typeAnnotation && prop.typeAnnotation.typeAnnotation && prop.typeAnnotation.typeAnnotation.typeName && prop.typeAnnotation.typeAnnotation.typeName.name === 'Array') {
              schema.type = 'array';
              if (prop.typeAnnotation.typeAnnotation.typeParameters) {
                schema.items = getPropertySchema(prop.typeAnnotation.typeAnnotation.typeParameters.params[0]);
              }
            } else if (schema.type === TS_TYPE.TSTypeReference && prop.typeName) {
              schema.type = 'object';
              schema.properties = (interfaceSchema.get(prop.typeName.name) || getInterfaceSchema(interfacesDeclaration.get(prop.typeName.name))).properties;
            } else if (schema.type === TS_TYPE.TSTypeReference && prop.typeAnnotation && prop.typeAnnotation.typeAnnotation && prop.typeAnnotation.typeAnnotation.typeName && !JS_TYPE[prop.typeAnnotation.typeAnnotation.typeName.name]) {
              schema.type = 'object';
              schema.properties = (interfaceSchema.get(prop.typeAnnotation.typeAnnotation.typeName.name) || getInterfaceSchema(interfacesDeclaration.get(prop.typeAnnotation.typeAnnotation.typeName.name))).properties;
            }
            return schema;
          }
          function getInterfaceSchema(inter) {
            const title = inter.id.name;
            const properties = [];
            getProperties(inter).forEach((value, key) => {
              properties.push(getPropertySchema(value));
            })
            return {
              type: 'object',
              title,
              properties
            };
          }
          interfacesDeclaration.forEach((value, key) => {
            interfaceSchema.set(key, getInterfaceSchema(value));
          })
          const filePath = parsingPath(state.file.opts.filename);
          // output(filePath + '/interfaces/', interfacesDeclaration);
          output(filePath + '/schemas/', interfaceSchema);
        }
      }
    }
  };
};