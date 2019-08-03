const fs = require('fs');
const path = require ('path'); 

//The code below is used to rename files within a folder to consistent enumerated file names. 
//This is done for simplified database seeding.

//num is the number that you would like to use to start your enumeration. This number will increment by one with every file.

let num = 1;

//renameFiles takes in a filepath, file, and what you would like to rename all your files followed by the number.

const renameFiles = (filepath, file, rename) => {
    fs.rename(path.resolve(__dirname, filepath, file), path.resolve(__dirname, filepath, `${rename}${num}.jpg`), (err) => {
        if ( err ) console.log('ERROR: ' + err);
    })
    num++
};

//readAndRename takes in a filepath and a rename and iterates through every file in that filepath's folder and renames it to 
//the convetions set by renameFiles.  

const readAndRename = (filepath, rename) => {fs.readdir(filepath, 'utf8', (err, files)=> {
        if(err) {
            console.log(err);
        } else { 
            files.map(file => renameFiles(filepath, file, rename)); 
        }
    })
};

/*EXAMPLES

The code below takes all files from the users file and renames them as user${num} with num increasing with every file.

readAndRename('./Users', 'users'); 

*/