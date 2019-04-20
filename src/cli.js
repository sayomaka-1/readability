// Hash bang is used to prepare Command CLI

#!/usr/bin/env node
var read = require("./readability.js");
var argv = require("minimist")(process.argv.slice(2));


// If argv contians H command then print all the available commands


if(argv.h){
  process.stdout.write(
    "luin readability\n" +
    "Usage: readability --url [URL] " +
    "prints readability version of [URL].\n" +
    "Usage: readability             " +
    "reads HTML from stdin and prints readable version to stdout.\n" +
    "Usage: readability -h          " +
    "prints this help.\n"
  );
  return;
}


var callback = function(err, article){
  if(err)
    console.error(err);
  process.stdout.write(article.html);
}

// check if the argument contains a URL and it is type of string 

if(typeof argv.url === 'string'){
    // call the read function which is imported from readbility.js
  
  read(argv.url, callback);
   // callback an error and console log it, if there is any
} else {
  
  var html;
  process.stdin.on("data", function(chunk){
    html += chunk;
  });
  process.stdin.on("end", function(){
    read(html, callback);
  });
}
