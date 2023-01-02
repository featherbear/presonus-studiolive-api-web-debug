export default function ArrayBufferToHex(buffer: ArrayBuffer) {
    return [...new Uint8Array(buffer)].map(b => b.toString(16).padStart(2, '0'))
}