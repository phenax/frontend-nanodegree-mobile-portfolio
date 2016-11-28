
const http= require('http');
const path= require('path');
const zlib= require('zlib');
const fs= require('fs');
const url= require('url');
const mimeTypes= require('mime');


/**
 * 404 Error Handler
 */
function errorHandler(res) {
	res.writeHead(404, {'Content-Type': 'text/plain'});
	res.end('404 Not Found\n');
}

/**
 * Check if a file exists
 * 
 * @param  {String} filePath    The path name of the file
 * 
 * @return {FileStat|Boolean}   The file stats
 */
function resolvePath(filePath) {

	let fileStat;

	try {
		fileStat = fs.lstatSync(filePath);
	} catch (e) {
		return false;
	}

	return fileStat;
}


/**
 * If encoding is supported, encodes a file 
 * stream with gzip or deflates it.
 * 
 * @param  {FileStream} file$  Readable file stream
 * @param  {Request}    req    The request object
 * @param  {Response}   res    The response object
 * 
 * @return {Object}            The stream and the encoding type in an object
 */
function gzipStream(file$, req) {

	// Check if the client supports gzip or deflate encoding
	const encType= req.headers['accept-encoding'].match(/(gzip|deflate)/i);

	// If the client doesnt support gzip or deflate, 
	// return the stream as it is
	if(encType === null)
		return {
			stream$: file$,
			encoding: null
		};

	const compression$= 
		(encType[0] === 'deflate')? 
			zlib.createDeflate(): 
			zlib.createGzip();

	return {
		stream$: file$.pipe(compression$),
		encoding: encType[0]
	}
}


/**
 * Server request handler
 */
function serverRequestHandler(req, res) {

	console.log("Fetching " + req.url);

	const uri= url.parse(req.url).pathname;
	let filePath = path.join(process.cwd(), unescape(uri));

	// Get file stats
	const fileStat= resolvePath(filePath);

	// If the file exists
	if(fileStat) {

		// If its a directory
		if(fileStat.isDirectory()) {

			// Append index.html to the path
			filePath= path.join(filePath, 'index.html');

			// Check if the file exists
			const stat= resolvePath(filePath);

			// If it doesnt, 404!!
			if(!(stat && stat.isFile())) {
				return errorHandler(res);
			}
		}

		// Get the mime type of the file from the filePath
		const mime= mimeTypes.lookup(filePath);

		// Create a readable stream from the file
		const file$= fs.createReadStream(filePath);

		if(file$) {

			// Enable compression for the file stream
			const compressed= gzipStream(file$, req);

			// If the stream was encoded, set the header
			if(compressed.encoding)
				res.setHeader('Content-Encoding': compressed.encoding);

			res.writeHead(200, { 'Content-Type': mime });

			// Pipe it out to the response
			compressed.stream$.pipe(res);
		} else
			errorHandler(res);

	} else {
		errorHandler(res);
	}
}


http.createServer(serverRequestHandler).listen(8080, ()=> {
	console.log("Server started");
});
