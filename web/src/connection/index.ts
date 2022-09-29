export class Connection 
{
    instance : WebSocket;
    constructor ()
    {
        this.instance = new WebSocket("localhost:8000");
    }
}