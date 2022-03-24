import { Server, Socket } from "socket.io";
import {
    JoinLeave,
    RequestChange,
    requestChecker,
    removeFromRoom,
    finishedGameEmit,
    notifyRoom,
    removeUserRequest,
    addUser,
    removeUser,
} from "./helpers";
import {
    usersType,
    gameRequestsType,
    roomsType,
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketData,
} from "./types";

const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>({
    cors: {
        origin: "*", // set origin front-end
    },
});

var users: usersType[] = [];
var rooms: roomsType = {};
var gameRequests: gameRequestsType = {};
var allSockets: Socket[] = [];

// when someone joins
io.on("connection", (socket: Socket) => {
    // add new users array of people who want to play against them
    gameRequests[socket.id] = [];
    allSockets.push(socket);

    socket.on("sendMyName", (arg) => {
        users.push({
            id: socket.id,
            name: arg,
        });

        JoinLeave(true, users);

        // emit to all connected clients
        io.emit("allPlayableUsers", users);
    });

    // when request opponent
    socket.on("request-Opponent", ({ opponentID, myID }) => {
        addUser(opponentID, gameRequests, myID);

        // send opponent their own array
        socket
            .to(opponentID)
            .emit("inform-opponent-ofPlayer", gameRequests[opponentID]);
        RequestChange(gameRequests);
        requestChecker(
            opponentID,
            myID,
            gameRequests,
            rooms,
            allSockets,
            io,
            users
        );
    });

    // when take back request of opponent
    socket.on("remove-Opponent", ({ opponentID, myID }) => {
        removeUser(opponentID, gameRequests, myID);
        // send opponent their own array
        socket
            .to(opponentID)
            .emit("inform-opponent-ofPlayer", gameRequests[opponentID]);
        RequestChange(gameRequests);
    });

    socket.on("both-Opponent", ({ opponentID, whoIwantToPlay, myID }) => {
        // opponentID: socketID want to play against
        // whoIwantToPlay: socketID used to want to play against
        // myID: my socketID

        removeUser(whoIwantToPlay, gameRequests, myID);
        addUser(opponentID, gameRequests, myID);

        // tell old person I don't want to play them
        socket
            .to(whoIwantToPlay)
            .emit("inform-opponent-ofPlayer", gameRequests[whoIwantToPlay]);
        // tell new person I want to play against them
        socket
            .to(opponentID)
            .emit("inform-opponent-ofPlayer", gameRequests[opponentID]);
        RequestChange(gameRequests);

        requestChecker(
            opponentID,
            myID,
            gameRequests,
            rooms,
            allSockets,
            io,
            users
        );
    });

    socket.on("finished-my-score", (score: number) => {
        finishedGameEmit(score, socket, rooms, io);
    });

    // on user disconnecting, remove from users array and emit lasting players
    socket.on("disconnect", () => {
        notifyRoom(rooms, socket, io);
        removeFromRoom(rooms, users, socket, socket.id);
        // delete person who left from game requests
        removeUserRequest(gameRequests, socket);
        JoinLeave(false, users);

        RequestChange(gameRequests);

        // emit to all of new absence
        io.emit("allPlayableUsers", users);
    });
});

console.log(process.env.PORT);
console.log("number: ", +process.env.PORT);

// port to listen on
io.listen(+process.env.PORT || 4000);
