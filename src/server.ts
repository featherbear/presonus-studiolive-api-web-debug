import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';

import { Server as HTTPServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { Client as SLAPI } from 'presonus-studiolive-api'
import type Payload from './components/payload/types/Payload';

const { PORT, HOST, CONSOLE_HOST, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';


const app = express()
const server = new HTTPServer(app)
const io = new SocketIOServer(server, { path: '/p' })

app
    .use(
        compression({ threshold: 0 }),
        sirv('static', { dev }),
        sapper.middleware()
    )

let client = new SLAPI({ host: CONSOLE_HOST ?? "192.168.0.22" }, { logLevel: 'trace' })

// client.on('data', (data) => {
//     let payload: Payload = { code: data.code, data: JSON.stringify(data.data), timestamp: new Date().getTime() }
//     io.emit('p', payload)
// })

client.on(<any>'fragment', (resp: any) => {
    io.emit('p', <Payload>{
        code: resp.code,
        fragments: resp.fragments,
        data: resp.data,
        raw: resp.raw,
        timestamp: new Date().getTime()
    })
})

server.listen(Number(PORT), HOST ?? '0.0.0.0', () => {
    console.log("Web server started")
    client.connect().then(() => {
        console.log(`Connected to ${client.state.get('global.devicename')} (${client.state.get('global.mixer_serial')})`)
    })
});
