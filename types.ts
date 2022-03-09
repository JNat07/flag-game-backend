
interface usersType{
    name: string
    id:string
}

interface gameRequestsType{
    [key: string]: string[]
}

interface roomsType {
    [key: string]: string[]
}


interface ServerToClientEvents {
    allPlayableUsers: (arg: usersType[]) => void;
    "inform-opponent-ofPlayer": (arg:gameRequestsType[])=> void
}

interface ClientToServerEvents {
    requestDisconnect: () => void
    sendMyName: (arg: string) => void
    "request-Opponent": ({ }) => void
    "remove-Opponent": ({ }) => void    
    "both-Opponent": ({}) => void
}

interface InterServerEvents {
    // none currently
}

interface SocketData {
  name: string;
  age: number;
}

export {usersType,gameRequestsType,roomsType,ServerToClientEvents,ClientToServerEvents,InterServerEvents,SocketData }