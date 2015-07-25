var fs = require('fs');
var jade = require('jade');

// see: http://jade-lang.com/api/

var html = jade.renderFile('jade/palette.jade', { pretty: true });
fs.writeFileSync('html/palette.html', html);
