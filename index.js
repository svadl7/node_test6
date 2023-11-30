// server.js

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Serve static files from the "public" directory
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }
  else if(req.url==='/api')
  {
    //https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database 
const {MongoClient} = require('mongodb');

 
async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri ="mongodb+srv://vadlamudisai1:Jaswanth3579@webtrail.o1tsui4.mongodb.net/?retryWrites=true&w=majority"
 

    const client = new MongoClient(uri);
      try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log("Client connected successfully");
 

        await findsomedata(client);


        // Find the listing named "Infinite Views" that we created in create.js
        //await findOneListingByName(client, "Ribeira Charming Duplex");
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

main().catch(console.error);


async function findsomedata(client ){
    const cursor = client.db("Grocery_store").collection("Groceries").find({});
    const results = await cursor.toArray();
    console.log(results);

};


    }
 
    
// async function findOneListingByName( client, nameOfListing){
//     const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({ name: nameOfListing });
//     if (result) {
//         console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
//         console.log(result);
//     } else {
//         console.log(`No listings found with the name '${nameOfListing}'`);
//     }
}

  else {
    // Serve static files from the "public" directory
    const filePath = path.join(__dirname, 'public', req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      } else {
        const contentType = getContentType(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  }
}).listen(2306,()=>console.log("Server is running"));;

// Function to determine content type based on file extension
function getContentType(filePath) {
  const extname = path.extname(filePath);
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.js':
      return 'text/javascript';
    case '.css':
      return 'text/css';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    default:
      return 'application/octet-stream';
  }
}
