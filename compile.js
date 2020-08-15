const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const dir_source = path.join(__dirname, "TypeScript");
const dir_output = path.join(__dirname, 'JavaScript');

fs.readdir(dir_source, function(err, files) {
    if (err) {
        console.error("出现错误，操作中断！");
        return;
    }

    let dirs = [];

    function iterator(i) {
        if (i == files.length) {
            let cmd = "tsc -d --outDir " + dir_output;

            for (let file of dirs) {
                cmd += " " + path.join(dir_source, file);
            }
            
            exec(cmd, function(err) {
                if (err) {
                    console.error("出现错误，操作中断！");
                    return;
                }
                console.log("编译成功！");
            });
            
            return;
        }

        fs.stat(path.join(dir_source, files[i]), function(err, data) {   
            if (err) {
                console.error("出现错误，操作中断！");
                return;
            }

            if (data.isFile()) {               
                dirs.push(files[i]);
            }

            iterator(i + 1);
        });   
    }

    iterator(0);
});



