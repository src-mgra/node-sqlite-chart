/**** 
cmd: node importFile event.txt
****/

const readline = require('readline');
const fs = require('fs');

var filename = 'c:\\temp\\event.txt'; 

// read commandline
if ( process.argv[2]) {
  filename =  process.argv[2];
}

DoMain();
  
  
// *** main ***
function DoMain() {
// check if file exists
fs.exists(filename, function(exists) {
  if (exists) {
    // File exist + import
    console.log( 'read file -> ' + process.argv[2]);
    DoReadFile(filename);
  } else {
  // File is not existing
    console.log('File ' + filename + ' is not existing');
    process.exit(1);  
  }
  });
// *** End main ***

// read file
function DoReadFile(filename) {
// open file
const rl = readline.createInterface({
  input: fs.createReadStream(filename),
  crlfDelay: Infinity
});
// help fields
var keys = ['action1',
            'action2',
            'action3'];
var LogAction = ['Ereignis1','Ereignis2','Ereignis3'];
var logEntry = {
  logfile:"-",
  logdate:"-",
  referto:'-',
  area:"-",
  status:"-",
  action:"-"
};

var found = '-';
var i = 0;
// read lines
rl.on('line', (line) => {
  i++;
  var j = 0;
  var _res = '-';
  console.log('parse line: '+i);
  for(j=0;j < keys.length;j++) {
    _res = parseKey(line,keys[j]);
    if (_res !== '-') {
      // split line to array (replace tab by space)
      res = _res.split(' ').join('\t').split('\t');
      res.forEach(element => {
        element = element.trim();
      });
      // remove double spaces
      for(k=0;k<res.length;k++) {
        if (res[k] === '') {
          res.splice(k, 1);
          k--;
        }
      }
      // map fields to entry
      logEntry.logfile = filename;
      entryDate = '-';
      entryDate = res[1];
      entryDate.replace('-',' ');
      entryDate.replace('/','-');
      logEntry.logdate = entryDate;
    
      logEntry.status = 'ok';
      logEntry.action = LogAction[j]; 
      logEntry.area = res[3];
      logEntry.referto = res[2];
      logEntry.status = res[4];

      console.log(logEntry);
    };
    found = '-'; 
  };
});

}
}

// check for key
function parseKey(line,key) {
    _found = line.toString().match(key);
    if (_found) {
      return(line);
    } else {
      return '-';
    }
  }