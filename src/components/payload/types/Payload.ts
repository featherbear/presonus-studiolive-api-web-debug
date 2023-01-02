export default interface Payload<T = any> {
    code: string
    data: T
    raw?: unknown
    fragments?: unknown[]
    timestamp: number
}