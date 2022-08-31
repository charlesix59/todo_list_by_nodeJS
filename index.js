const jh = require("./jsonHandler")
const http = require('http');
const url = require('url');
const util = require('util');

let workList = jh.readJson("list.json");

const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain;charset=utf8')
    res.setHeader('Access-Control-Allow-Origin','*')
    req.setEncoding('utf8');

    let ret="";
    //用来增加一个任务
    function addWork(){
        let work="";
        req.on('data', chunk => {
            console.log(`可用的数据块: ${chunk}`)
            work=chunk.toString().substring(5);
            work = decodeURIComponent(work);
            let jsonObj=eval(workList)
            jsonObj.push({"work":work})
            // console.log(jsonObj)
            jh.writeJson("list.json",jsonObj)
        })
    }
    //删除任务
    function deleteWork(res){
        req.on('data', chunk => {
            console.log(`可用的数据块: ${chunk}`)
            //获取点击事件的位置
            let index=chunk.toString().substring(3);
            let jsonObj=eval(workList)
            //添加历史
            let work = jsonObj[index].work
            writeHistory(work)
            //删除
            jsonObj.splice(index,1);
            // console.log(jsonObj)
            jh.writeJson("list.json",jsonObj)
        })
    }
    function finishWork(work){

    }
    function modifyWork(work){

    }
    //任务历史
    function writeHistory(work) {
        let jsonStr = jh.readJson("history.json");
        let jsonObj = eval(jsonStr);
        let event = {}
        event.work = work;
        event.finishTime =new Date();
        jsonObj.push(event);
        jh.writeJson("history.json",jsonObj)
    }
    //获取所有任务
    function getAllWork(){
        workList=jh.readJson("list.json");
        ret=JSON.stringify(workList);
    }

    //解析路由
    let pathname = url.parse(req.url).pathname;
    //路由配置
    if (pathname==="/getAllWork"){
        getAllWork()
    }
    else if(pathname==="/addWork"){
        addWork()
    }
    else if(pathname==="/deleteWork"){
        deleteWork()
    }
    res.end(ret)
})

server.listen(port, () => {
})