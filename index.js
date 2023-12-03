const http = require("http");
const path = require("path");
const fs = require("fs");
const client= require('mongodb').MongoClient;
const url=require("url");
const mongoconnection_details_chips = require('./verify/connection_chips.js');
const mongo_client_connection_chips = new client(mongoconnection_details_chips.connectionurl);

const mongoconnection_details_drinks = require('./verify/connection_drinks.js');
const mongo_client_connection_drinks = new client(mongoconnection_details_drinks.connectionurl);


const mongoconnection_details_tobacco = require('./verify/connection_tobacco.js');
const mongo_client_connection_tobacco = new client(mongoconnection_details_tobacco.connectionurl);


const mongoconnection_details_milk = require('./verify/connection_milk.js');
const mongo_client_connection_milk = new client(mongoconnection_details_milk.connectionurl);


const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const sub_path = parsedUrl.pathname;
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'),
                    (err, content) => {
                                    
                                    if (err) throw err;
                                    res.writeHead(200, { 'Content-Type': 'text/html' });
                                    res.end(content);
                        }
              );
     }

    else if (parsedUrl.pathname.startsWith('/api/')) {
        const headers =
        {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
            "Content-Type": 'application/json'
        };
        switch (sub_path){
            case '/api/chips':
                (async(req,res)=>{
                    try
                    {
                        await mongo_client_connection_chips.connect();
                        const database = mongo_client_connection_chips.db(mongoconnection_details_chips.database);
                        const collection = database.collection(mongoconnection_details_chips.collection);
                        if (req.method === 'GET') {
                            var docs_json = await collection.find({}).toArray();
                            docs_json = JSON.stringify(docs_json, null, 2);
                            res.writeHead(200, headers);
                            res.end(docs_json);
                            console.log(docs_json);
                          }
                          else {
                            res.writeHead(405, {'Content-Type': 'text/plain'});
                            res.end('Method Not supported');
                          } 
                    }catch (err) {
                        console.error(err);
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('server failed to handle the request');
                      }
                })(req,res);
                break;
            case '/api/drinks':
                (async(req,res)=>{
                    try
                    {
                        await mongo_client_connection_drinks.connect();
                        const database = mongo_client_connection_drinks.db(mongoconnection_details_drinks.database);
                        const collection = database.collection(mongoconnection_details_drinks.collection);
                        if (req.method === 'GET') {
                            var docs_json = await collection.find({}).toArray();
                            docs_json = JSON.stringify(docs_json, null, 2);
                            res.writeHead(200, headers);
                            res.end(docs_json);
                            console.log(docs_json);
                          }
                          else {
                            res.writeHead(405, {'Content-Type': 'text/plain'});
                            res.end('Method Not supported');
                          } 
                    }catch (err) {
                        console.error(err);
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('server failed to handle the request');
                      }
                })(req,res);
                break;
            case '/api/tobacco':
                (async(req,res)=>{
                    try
                    {
                        await mongo_client_connection_tobacco.connect();
                        const database = mongo_client_connection_tobacco.db(mongoconnection_details_tobacco.database);
                        const collection = database.collection(mongoconnection_details_tobacco.collection);
                        if (req.method === 'GET') {
                            var docs_json = await collection.find({}).toArray();
                            docs_json = JSON.stringify(docs_json, null, 2);
                            res.writeHead(200, headers);
                            res.end(docs_json);
                            console.log(docs_json);
                          }
                          else {
                            res.writeHead(405, {'Content-Type': 'text/plain'});
                            res.end('Method Not supported');
                          } 
                    }catch (err) {
                        console.error(err);
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('server failed to handle the request');
                      }
                })(req,res);
                break;
            case '/api/milk':
                (async(req,res)=>{
                    try
                    {
                        await mongo_client_connection_milk.connect();
                        const database = mongo_client_connection_milk.db(mongoconnection_details_milk.database);
                        const collection = database.collection(mongoconnection_details_milk.collection);
                        if (req.method === 'GET') {
                            var docs_json = await collection.find({}).toArray();
                            docs_json = JSON.stringify(docs_json, null, 2);
                            res.writeHead(200, headers);
                            res.end(docs_json);
                            console.log(docs_json);
                          }
                          else {
                            res.writeHead(405, {'Content-Type': 'text/plain'});
                            res.end('Method Not supported');
                          } 
                    }catch (err) {
                        console.error(err);
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('server failed to handle the request');
                      }
                })(req,res);
                break;
            default:
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Page Not Found');

 



        }

     }
    else{
        res.end("<h1> 404 nothing is here</h1>");
    }
});
const PORT= 2306;
server.listen(PORT,()=> console.log(`Great our server is running on port ${PORT} `));
