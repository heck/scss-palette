var fs = require('fs');
var path = require('path');
var glob = require('glob');
var sass = require('node-sass');

glob('scss/[^_]*.scss', function(err, files){
  if (err) throw err;
  else {
    files.forEach(function(file){
      var basename = path.basename(file, '.scss');
      sass.render({
        file: file,
        // data: 'body{background:blue; a{color:black;}}',
        // outputStyle: 'compact', // 'compressed',
        // outFile: 'css/palette.css', -- BROKEN???
        // sourceMap: true
        includePaths: ['scss']
      },
      function(err, result) {
        if (err) {
          console.error(err.message);
          console.error(err.file);
          console.error("line: ",err.line," column: ", err.column);
        } else {
          fs.writeFileSync('css/'+basename+'.css', result.css.toString());
          // fs.writeFileSync('css/'+basename+'.css.map', result.map.toString());
        }
      }
    );
    });
  }
});
