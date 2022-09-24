export default interface Payload<T = any> {
    code: string
    data: T,
    timestamp: number
}