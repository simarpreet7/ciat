//+ error atarpan  + 
const fs = require('fs');
const _ = require("lodash")
const dirTree = require("directory-tree");
var path=require('path')
var cmd=require('node-cmd')
var tree = dirTree(__dirname);
tree.children.forEach((data)=>{
 if(data.type=="directory"){
     let arr=data.path.split("\\");
    if(arr[arr.length-1].includes('ciat')){
        let cmdStr='Xcopy /E /Y .\\copy '+data.path
        console.log(cmdStr)
        const processRef=cmd.run(cmdStr);
        processRef.stdout.on(
        'data',
        function(data) {
           console.log(data)
        }
        );
    }
 }
})