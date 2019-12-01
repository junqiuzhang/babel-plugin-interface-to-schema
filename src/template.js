const { Type, TypeEditor } = require('./type');

function getSchema(p) {
  var name = p.key.name;
  var type = p.typeAnnotation.typeAnnotation.type;
  var Comment = !!p.trailingComments ? p.trailingComments[0].value.trim() : '';
  var IsArray = !!p.typeAnnotation.typeAnnotation.typeName && p.typeAnnotation.typeAnnotation.typeName.name === 'Array';
  var Extension = {};
  if (Type[type] === 'boolean' || Type[type] === 'number' || Type[type] === 'string') {
    // boolean number string
    Extension = {
      editable: true,
      jsType: 'value',
      editor: {
        type: TypeEditor[type] || 'TextArea',
        config: {}
      }
    }
  } else if (Type[type] === 'function') {
    // function
    Extension = {
      editable: false,
      jsType: 'function',
      funcType: 'event',
      cbParams: p.typeAnnotation.typeAnnotation.parameters.map(p => ({
        name: p.name,
        type: Type[p.typeAnnotation.typeAnnotation.type]
      }))
    }
  } else if (Type[type] === 'object' && IsArray) {
    // Array
    Extension = {
      editable: true,
      jsType: 'value',
      editor: {
        type: 'TextArea',
        config: {}
      }
    }
  } else if (Type[type] === 'reference' && p.typeAnnotation.typeAnnotation.typeName.name === 'Function') {
    // Function
    Extension = {
      editable: false,
      jsType: 'function',
      funcType: 'event',
      cbParams: Array.isArray(p.typeAnnotation.typeAnnotation.parameters) ? p.typeAnnotation.typeAnnotation.parameters.map(p => ({
        name: p.name,
        type: Type[p.typeAnnotation.typeAnnotation.type]
      })) : []
    }
  } else {
    // object
    Extension = {
      editable: true,
      jsType: 'value',
      editor: {
        type: 'TextArea',
        config: {}
      }
    }
  }
  
  return {
    Name: name,
    Type: Type[type],
    Description: Comment,
    Label: Comment,
    IsArray,
    IsMetaDataType: false,
    Version: null,
    Extension,
  }
}
module.exports = getSchema;