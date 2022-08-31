const fs = require("fs");

function test(){
    console.log("Hello world!")
}
function readJson(name){
    let jsonFile = fs.readFileSync("./"+name);
    let toDoList = JSON.parse(jsonFile);    //解析json，并直接返回json对象
    // console.log(toDoList);
    return toDoList;
}
function writeJson(name,data){
    fs.writeFileSync("./"+name,JSON.stringify(data));
}

module.exports = {
    readJson,
    writeJson
}