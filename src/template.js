const type = require('./type');
const editor = {
  number: 'Input',
  string: 'Input',
  boolean: 'Switch'
}
function getSchema(p) {
  var Name = p.key.name;
  var Type = type[p.typeAnnotation.typeAnnotation.type]
  var Comment = Array.isArray(p.trailingComments) ? p.trailingComments[0].value.trim() : '';
  var IsArray = !!p.typeAnnotation.typeAnnotation.typeName && p.typeAnnotation.typeAnnotation.typeName.name === 'Array';
  var Extension = Type !== 'object' ? {
    editable: true,
    jsType: 'value',
    editor: {
      type: editor[Type] || 'TextArea',
      config: {}
    },
  } : {
    editable: false,
    jsType: 'function',
    funcType: 'event',
    cbParams: []
  }
  return {
    Name,
    Type,
    Description: Comment,
    Label: Comment,
    IsArray,
    IsMetaDataType: false,
    Version: null,
    Extension,
  }
}
module.exports = getSchema;