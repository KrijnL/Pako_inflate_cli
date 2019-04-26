const pako = require('pako')
const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const fs = require('fs')

var argv = require('minimist')(process.argv.slice(2))

if(argv.c){
    
    _drawBanner()

}

if(argv.f){
    //console.log('reading file......')
    var contents = fs.readFileSync(argv.f, 'utf8')

    var strings = contents.split('\n').filter(s => {return s.trim() !== ''})
    

    strings.forEach(function(string){
        //for some reason (probably encoding) reading the raw string from file isn't the same as pasting it in the code...
        string = Buffer.from(string, 'base64').toString('binary')

        // Convert binary string to character-number array
        var charData    = string.split('').map(function(x){return x.charCodeAt(0);});

        // Turn number array into byte-array
        var binData     = new Uint8Array(charData);

        try{
            // Pako magic
            var data        = pako.inflate(binData);
            
            // Convert gunzipped byteArray back to ascii string:
            var strData     = String.fromCharCode.apply(null, new Uint16Array(data));
        
            console.log(strData);
        }catch(err){
            //console.log(`The string ${string} could not be inflated.`)
            console.log(err)
        }
        
        
    })

}else if(argv.b){
    var strings = [
        "x«VJÎ/Í+Q²2ÕQ*Ê//V²®VÊLQ²RÊËQÒQJI-N.Ê,(ÉÌÏ\u0003\nù¥¦¤\u0016å$æ¥\u0014+Õê@¥\u0015a(K+JÌ;¼<1\u0013IUj\u001e*×¼ôÌâ\fT\f5.©¥%ÅÉHjJ0m\u000b)-Ê\u0006\u0013[\u000b\u0000ïE5"
        ]

    strings.forEach(function(string){
        var b64 = Buffer.from(string, 'binary').toString('base64')
        console.log(b64)
    })
}else{
    _drawBanner()
    console.log("usage: First add the strings to the array in code. then use with option -b to base64 encode: node index.js -b > filename")
    console.log("then decompress with node index.js -f filename")
    console.log("you can optionally pass -c to print a pretty banner and clear the console")
}

function _drawBanner(){
    //clear the console
    clear();


    //Pretty banner
    console.log(
        chalk.yellow(
            figlet.textSync('Pako inflate', {horizontalLayout: 'full'})
        )
    )

    
}