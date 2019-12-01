const template = require('./template');
module.exports = function(babel) {
  var t = babel.types;
  var _this = {};
  return {
    name: 'babel-plugin-interface-to-schema',
    visitor: {
      TSInterfaceDeclaration: {
        enter(path, state) {
          _this[path.node.id.name] = path.node
        }
      },
      Program: {
        exit(path, state) {
          var entry = state.opts.entry || 'IProps';
          var properties = [];
          function getProperties(inter) {
            // 递归获取
            if (Array.isArray(inter.extends)) {
              inter.extends.forEach(e => getProperties(_this[e.expression.name]))
            }
            // 获取属性
            if (Array.isArray(inter.body.body)) {
              properties = properties.concat(inter.body.body);
            }
          }
          getProperties(_this[entry]);
          var jsonSchema = {
            Properties: properties.map(p => template(p)),
          };
          console.log(properties);
          console.log(JSON.stringify(jsonSchema));
        }
      }
    }
  };
};