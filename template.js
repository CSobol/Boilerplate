'use strict';
exports.description = 'Scaffolding for WCS WebContent projects';
exports.after = "Now you must install the prerequisits by typing _npm install_" +
  "When you are ready to work, type _grunt_ to automatically move files to your JSK instance.";
exports.warnOn = '*';

exports.template = function(grunt, init, done) {
  init.process({}, [
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('author_name'),
    init.prompt('version'),
    init.prompt('repository'),
    {
      name: 'jsk_loc',
      message: 'Location of JSK folder?',
      default: '/System/Library/Oracle/JSK', 
      validator: /JSK$/,
      warning: 'Must be a valid file path which ends in "JSK/"'
    }

  ], function(err, props) {
    props.keywords = [];
    props.devDependencies = {
      "grunt": "*",
      "grunt-browser-sync": "*",
      "grunt-cli": "*",
      "grunt-contrib-compass": "*",
      "grunt-contrib-uglify": "*",
      "grunt-contrib-watch": "*",
      "grunt-sync": "*"
    };
    console.log(props);
    // Files to copy (and process).

    var files = init.filesToCopy(props);

    //rename folder to 
    var destinationFolder = props.name, stringToReplace = 'swsitename'
    for (var file in files) {
    if (file.indexOf(stringToReplace) > -1) {
        var path = files[file],
            newFile = file.replace(stringToReplace, destinationFolder);
        files[newFile] = path;
        delete files[file];
      }
    } 
    // Actually copy (and process) files.
    init.copyAndProcess(files, props);
    init.writePackageJSON('package.json', props);
    var contents = '{\r\n"path" : "static/'+ props.name +'", \r\n"projectName" : "'+ props.name +'", \r\n"build" : "'+ props.jsk_loc +'/App_Server/apache-tomcat-7.0.42/Sites/webapps/static/'+ props.name +'"\r\n}'
    grunt.file.write('config.json', contents)
    // All done!
    done();
  });
};