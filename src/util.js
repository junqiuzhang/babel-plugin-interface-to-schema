const fs = require('fs');
function parsingPath(filename) {
  return filename.split('/').slice(0, -1).join('/');
}
function output(filepath, schemas) {
  if (!fs.existsSync(filepath)) {
    fs.mkdirSync(filepath);
  }
  schemas.forEach((value, key) => {
    fs.writeFileSync(filepath + key + '.json', JSON.stringify(value), 'utf8')
  })
}
module.exports = {
  parsingPath,
  output
};