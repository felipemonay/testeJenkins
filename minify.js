const jetpack = require('fs-jetpack');
const path = require('path');
const minifier = require('minifier');

const files = jetpack.list(path.join(__dirname, 'dist/front/'));

console.log(files);

for (const file of files) {
    if (/.*(\.js|\.css)$/g.test(file)) {

        console.log(`Start ${file}`);

        const filePath = path.join(__dirname, 'dist/front/', file);
        if (file.indexOf('main.')===-1){
           minifier.minify(filePath, {output: filePath});

        }else{
            console.log(filePath);
            // minifier.minify(filePath, {output: filePath+ 'aas',noComments:1});
        }

    }
}

console.log('End');
