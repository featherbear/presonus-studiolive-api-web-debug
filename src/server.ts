import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';

import { Server as HTTPServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { Client as SLAPI } from 'presonus-studiolive-api'

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';


const app = express() // Express server
const server = new HTTPServer(app) // HTTP server
const io = new SocketIOServer(server, { path: '/p' })

app
    .use(
        compression({ threshold: 0 }),
        sirv('static', { dev }),
        sapper.middleware()
    )

let client = new SLAPI("192.168.0.19")

client.on('data', (data) => {
    io.emit('p', data)
})

server.listen(Number(PORT), '0.0.0.0', () => {
    console.log("Web server started")
    client.connect().then(() => {
        console.log("Connected to StudioLive console")
    })
});
