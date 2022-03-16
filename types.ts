interface usersType {
    name: string;
    id: string;
}

interface gameRequestsType {
    [key: string]: string[];
}

interface roomsType {
    [key: string]: string[];
}

interface ServerToClientEvents {
    allPlayableUsers: (arg: usersType[]) => void;
    "inform-opponent-ofPlayer": (arg: gameRequestsType[]) => void;
    "opponent-left": () => void;
}

interface ClientToServerEvents {
    requestDisconnect: () => void;
    sendMyName: (arg: string) => void;
    "request-Opponent": ({}) => void;
    "remove-Opponent": ({}) => void;
    "both-Opponent": ({}) => void;
    "game-event": (arg: string) => void;
}

interface InterServerEvents {
    // none currently
}

interface SocketData {
    name: string;
    age: number;
}

interface flagInfoType {
    [key: string]: string;
}

export type {
    usersType,
    gameRequestsType,
    roomsType,
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketData,
    flagInfoType,
};
