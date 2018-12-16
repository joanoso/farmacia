export interface System {
    version: string
    serverTime: string
    serverIP: string
    properties: { [key: string]: string; }
}