#!/usr/bin/env node
const readFileSync =   require("fs").readFileSync;
const privateDecrypt = require("crypto").privateDecrypt;

const [,, ...args] = process.argv;

let [pkPath ,data] = args;

if(!Array.isArray(args) || args.length < 2) {
    console.error("Invalid args!")
    process.exit(1)
}

if(Array.isArray(data)){
    data = data.join("")
}

if(!pkPath || typeof pkPath !== "string") {
    console.error("Private Key Path of type String is required!")
    process.exit(1)
}

if(!data || typeof data !== "string") {
    console.error("Data of type String is required!")
    process.exit(1)
}

let pk = ''

try {
    pk = readFileSync(pkPath, "utf8")
}catch (e) {
    console.error("Error reading private key file!")
    process.exit(1)
}


if(!pk) {
    console.error("Error reading Private Key File!")
    process.exit(1)
}


const buffer = Buffer.from(data, "base64")

try {
    const decrypted = privateDecrypt(
        {
            key: pk.toString(),
        },
        buffer,
    )

    console.log(JSON.parse(decrypted.toString("utf8")))
    process.exit(0)
}catch (e) {
    console.error("Decryption error!")
    process.exit(1)
}


