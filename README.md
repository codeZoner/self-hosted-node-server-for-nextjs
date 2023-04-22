
# Self Hosted NextJS 12/13 app with Node & SSL Termination
There are a multiple approaches on how to deploy NextJs Apps on self hosted server. This repo, we will be using a server.js file with next module to handle the requests. 

--- 
## 1. Requirements
* A valid sub-domain to host the site
* You will need a **valid pair of SSL cert & key files**.
* Host Port to run the server.
* Node.js JavaScript runtime environment
* NextJS Version: 12 or 13. You can use an existing project or implement in on a basic installation

## 2. Prepare your SSL certificate and key
Copy and Paste the SSL Certicate & Key inside the **certs folder** located in the project's root directory. 
* You can use any location but will need to update the path in the server.js file.
* It is crucial to set proper permissions of the certificate & key files to maintain security and prevent unauthorized access. 
  * Private Key ( *.pem, *.key): Set the permissions to -rw------- (600 in numeric notation). 
  * Certificate (*.crt, *.pem, or *.cert): Set the permissions to -rw-r--r-- (644 in numeric notation).
  
## 3. Edit the **server.js** file
Edit the server.js file to set up the following variables in accordance to your needs
* **subdomain** Example: www.example.com
* **port** Example: 443 (ensure that the port is not being used by any other service)
* **sslConfig** (map the path to the cert/key files here)

## 4. Install all the node packages
* If you are running this sample template, just run 
```bash
  pnpm i 
  # or
  npm install --save
  # or
  yarn
```

* If you are implementing on an existing project, install the **ssl-root-cas** & **fs** packages using your preferred package manager
```bash
pnpm i ssl-root-cas fs
# or
npm install ssl-root-cas fs --save
# or
yarn add ssl-root-cas fs
```

## 5. Edit your **package.json** file
- If running this standalone example, ignore this step 
- If you are implementing on an existing project, then add the following two scripts to your package.json file.
```json
"scripts": {
  "startStage": "NODE_ENV=development node server.js",
  "startProd": "NODE_ENV=production node server.js"
},
```

## 6. **Buid your Next App**
Build your app by running -
```bash
pnpm build
```
## 7. Start the **Server** on Production or Staging and check on your browser

```bash
pnpm run startProd
# or
npm run startProd
# or
yarn run startProd
```
