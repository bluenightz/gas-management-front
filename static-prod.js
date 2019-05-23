const express = require('express')
const path = require('path')
const server = express()
const STATIC_PATH = path.join(__dirname, 'dist')
const IMAGES_PATH = path.join(__dirname, 'assets/images')
const CSS_PATH = path.join(__dirname, 'dist/css')

console.log(STATIC_PATH)

server.use(express.static( STATIC_PATH ))
server.use(express.static( CSS_PATH ))
server.use('/assets/images', express.static( IMAGES_PATH ))

server.get('/', (req, res) => {
    res.sendFile(path.resolve('./dist/index.html'))
})

server.listen(8080, () => {
    console.log("server start...")
})