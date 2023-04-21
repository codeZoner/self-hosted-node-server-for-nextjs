/** 
 * Title: Self Hosting a Next.js App with SSL 
 * Description: Sample implementation of Custom server config
 * NextJS Compatibility: 12 & 13
 * Author: Fahim Hossain
 * Designation: Founder & CEO at ARITS Limited
 * Website: https://www.aritsltd.com
 */



/** 
 * Import all required modules
 */
// If using non-ssl port replace https module with http module
// const http = require('http');
const https = require('https');
const fs = require('fs');
const { parse } = require('url');
const next = require('next');

/**
 * Set the sub domain for the site
 */
const subDomain = 'customnextserver.aritsltd.com';

/**
 * Using Default SSL port to access the site over 
 * https://subdomain.domain.com
 * Otherwise, if running on any other port (e.g. 8080),
 * you will need to specify the port number in the URL
 * Example - https://subdomain.domain.com:8080
*/
const port = 443;

/*
 *************************************************************
 * SSL Certificate & Key 
 * An Object Literal is used to store the SSL certificate & key
 * Change the path to the location of your SSL certificate and key 
 *************************************************************
 *************************************************************
 * For SSL certificate and key files, it is crucial to set the correct permissions
 ************************************************************
        * For SSL certificate and key files, it is crucial to set 
        * proper permissions to maintain security and prevent unauthorized access. 
        * Here are the recommended permissions for each type of file:
        * Private Key (*.pem, *.key): The private key file should have strict permissions, as it's sensitive information. 
        * Set the permissions to -rw------- (600 in numeric notation). 
        * Certificate (*.pem, *.crt, or *.cert): Certificate files can have more relaxed permissions, as they do not contain sensitive information. 
        * Set the permissions to -rw-r--r-- (644 in numeric notation). 
 ************************************************************
 */

const sslConfig = {
    cert: fs.readFileSync('./certs/cert.pem'),
    key: fs.readFileSync('./certs/key.pem'),
};


/** 
 * Set the environment variable for development or production
 */
const dev = process.env.NODE_ENV !== 'production';



/**
 * Initialize the Next.js app with the provided configuration
 */
const app = next({ dev, subDomain, port });

/**
 * Define the request handler for the Next.js App
 */
const handle = app.getRequestHandler();

/**
 * Prepare the Next.js app and start the server
 */
app.prepare().then(() => {
    /** 
     * Wrapping the request handling logic with the https.createServer() callback function. 
     * This ensures that the request and response objects (req and res) are available when handling incoming requests. 
     * If using non-ssl replace with http module
    */
    // http.createServer(async (req, res) => {
    https.createServer(sslConfig, async (req, res) => {
        try {
            /** 
             * Parse the URL, including the query portion
             */
            const parsedUrl = parse(req.url, true);
            /** 
             * Destructure the parsedUrl object to obtain the pathname and query properties
            */
            /** 
             * Indent this if you are using custom routing logic
             * read the next comment block for more details
            */
            await handle(req,res,parsedUrl);
            
            /** 
             **************************************************************
             * Indent the code below if you are using custom routing logic and 
             * comment out the handle() function above
            **************************************************************
             * Route the request based on the pathname and redirect 
             * Remove if you are not suing custom routing logic
            */

            // const { pathname, query } = parsedUrl;
            // if (pathname === '/a') {
            //     /**
            //      * The app.render() function is a part of the Next.js framework,
            //      * and it is used to render a specific page on the server side.
            //      * This function is useful when you want to handle custom routing logic in the Next.js application.
            //      */
            //     await app.render(req, res, '/a', query);
            // } else {
            //     /**
            //      * If pathname is not match, use the handle method to process the request
            //      */
            //     await handle(req, res, parsedUrl);
            // }
            
            
        } catch (err) {
            /**
             * Log the error and respond with an internal server error message
             * Only print the log if the server is running on dev mode
             */
            if (dev) {
                console.error('Error occurred handling', req.url, err);
            }
            res.statusCode = 500;
            res.end('Internal server error');
        }
    }).listen(port, (err) => {
        if (err) throw err;
        console.log(`>> Initialized. Ready to handle requests at https://${subDomain}:${port}`);
    });
})