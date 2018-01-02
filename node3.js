//Node.js 3.1 Streams
//need to access data chunk by chunk, to prevent it from being held in memory
//streams provide channels for data to flow through, can be readable, writeable, or both
//using API for streams in Node version v0.10.x (a.k.a streams2)
http.createServer(function(request, response) request = readable stream response = writable stream

        //How to read from the request:
        //readable stream encloses EventEmitter
        EventEmitter-- > emits events(readable) and(end)

        http.createServer(function(request, response) {
            response.writeHead(200);
            request.on('readable', function() { //listen to readable event
                var chunk = null;
                while (null !== (chunk = request.read())) { //read out a chunk from the data, 
                    console.log(chunk.toString()); //if it isn't null it will be printed to the console
                    //.toString() is called because chunks are buffers and could include binary
                    response.write(chunk); //echos back the data requested to client
                }
            });
            request.on('end', function() { //listen to end event and finish response
                response.end();
            });
        }).listen(8080)

        //This code performs the same tasks as above, using pipe to connect the request.on functions
        http.createServer(function(request, response) {
            response.writeHead(200);
            request.pipe(response);
        }).listen(8080)

        //check stability score in API documentation

        var fs = require('fs'); //requires filesystem module
        var file = fs.createReadStream("readme.md"); //original file
        var newFile = fs.createWriteStream("readme_copy.md"); //destination file

        file.pipe(newFile); //stream file from one place to another

        //pipe any readStream into any writeStream
        //read from the request, and pipe it to a file

        var fs = require('fs');
        var http = require('http');

        http.createServer(function(request, response) { //read from request
            var newFile = fs.createWriteStream("readme_copy.md"); //write to a file
            request.pipe(newFile);

            request.on('end', function() {
                response.end('uploaded!');
            });
        }).listen(8080);

        //when calling on the console:
        $ curl--upload - file readme.md http: //localhost:8080

        //File upload progress

        var fs = require('fs');
        var http = require('http');

        http.createServer(function(request, response) { //read from request
            var newFile = fs.createWriteStream("readme_copy.md"); //write to a file
            var fileBytes = request.headers['content-length'];
            var uploadedBytes = 0;

            request.on('readable', function() {
                var chunk = null;
                while (null !== (chunk = request.read())) {
                    uploadedBytes += chunk.length;
                    var progress = (uploadedBytes / fileBytes) * 100;
                    response.write("progress:" + parseInt(progress, 10) + "%\n"); //prints out % of upload progress
                }
            })

            request.pipe(newFile);

            request.on('end', function() {
                response.end('uploaded!');
            });
        }).listen(8080);

        // 3.2 File Read Stream 140 PTS
        // Lets use the fs module to read a file and log its contents to the console.
        // Use the fs module to create a Readable stream for fruits.txt. Store the new stream in a variable called file.
        //Next, listen to the readable event on the newly created stream and give it a callback.
        //Inside the callback, read the data chunks from the stream and print them to the console using console.log() - you might want to use a while loop to do this. Don't forget to call toString() on the data before printing it.

        var fs = require('fs');
        var file = fs.createReadStream("fruits.txt"); file.on('readable', function() {
            var chunk = null;
            while (null !== (chunk = file.read())) {
                console.log(chunk.toString());
            }
        });

        // 3.3 File Piping 140 PTS
        // Instead of manually listening for the 'readable' event on the Readable stream, let's use pipe to read from the stream and write directly to process.stdout.
        // Start by removing the code for the readable handler.
        //Call file.pipe(), passing it the stream to write to.
        var fs = require('fs');

        var file = fs.createReadStream('fruits.txt');

        file.on('readable', function() {
            var chunk;
            while (null !== (chunk = file.read())) {
                console.log(chunk.toString());
            }
        });
        //code becomes:
        var fs = require('fs');

        var file = fs.createReadStream('fruits.txt');

        file.pipe(process.stdout);


        // 3.4 Fixing Pipe 240 PTS
        // The following code will throw an error because pipe automatically closed our writable stream.
        // You'll need to consult the pipe documentation to figure out the option which keeps the Write stream open and dispatches the end event.

        var fs = require('fs');

        var file = fs.createReadStream('origin.txt');
        var destFile = fs.createWriteStream('destination.txt');

        file.pipe(destFile, { end: false }); //added {end: false}

        file.on('end', function() {
            destFile.end('Finished!');
        });

        // 3.5 Download Server 240 PTS
        // Let's create an HTTP server that will serve index.html.
        // Use pipe() to send index.html to the response.

        var fs = require('fs');
        var http = require('http');

        http.createServer(function(request, response) {
            response.writeHead(200, { 'Content-Type': 'text/html' });

            var file = fs.createReadStream('index.html');
            file.pipe(response); //added
        }).listen(8080);
