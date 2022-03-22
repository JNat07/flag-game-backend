import { Socket } from "socket.io";
import { usersType, gameRequestsType, roomsType } from "./types";
import {
    equalFlags0,
    equalFlags1,
    equalFlags2,
    equalFlags3,
    equalFlags4,
    countries,
} from "./CountryInfo/countries";

const RequestChange = (gameRequests: gameRequestsType) => {
    console.log("\n=============================");
    console.log("Change in requests");
    console.log(gameRequests);
    console.log("=============================\n");
};

const JoinLeave = (joined: boolean, onlineUsers: usersType[]) => {
    console.log("\n=============================");
    console.log(joined ? "User Joined" : "User left");
    console.log("Number of users online: ", onlineUsers.length);
    console.log("Current users: ", onlineUsers);
    console.log("=============================\n");
};

const removeUser = (
    playerToRemove: string,
    gameRequests: gameRequestsType,
    myID: string
): void => {
    const index = gameRequests[playerToRemove].indexOf(myID);
    if (index > -1) {
        gameRequests[playerToRemove].splice(index, 1);
    }
};

const addUser = (
    opponentID: string,
    gameRequests: gameRequestsType,
    myID: string
): void => {
    gameRequests[opponentID].push(myID);
};

const requestChecker = (
    person1: string,
    person2: string,
    gameRequests: gameRequestsType,
    rooms: roomsType,
    allSockets: Socket[],
    io: any,
    users: usersType[]
): void => {
    // if two people requesting eachother
    if (
        gameRequests[person1].includes(person2) &&
        gameRequests[person2].includes(person1)
    ) {
        // number of rooms
        const numRooms = Object.keys(rooms).length;
        const newRoom = "room" + numRooms;

        // put these two people in a room
        rooms[newRoom] = [person1, person2];

        // loop over all people in sockets and match them with the person 1 and person 2 id's by socket.id and then add people with same ids to room
        allSockets.forEach((element) => {
            if (element.id === person1 || element.id === person2) {
                element.join(newRoom);
            }
        });

        // tell people to start game
        io.to(newRoom).emit("put-in-room");

        var gameCountryList: Array<string[]> = [];
        for (let index = 0; index < Object.keys(countries).length; index++) {
            gameCountryList.push(chooseCountry());
        }

        io.to(newRoom).emit("all-flags", gameCountryList);

        for (var i = users.length - 1; i >= 0; --i) {
            if (users[i].id === person1 || users[i].id === person2) {
                users.splice(i, 1);
            }
        }

        io.emit("allPlayableUsers", users);
    }
};

const finishedGameEmit = (
    score: number,
    socket: Socket,
    rooms: roomsType,
    io: any
) => {
    Object.keys(rooms).forEach((room) => {
        var opponent: string = "";

        // if includes, first save other player as opponent and then delete room
        if (rooms[room].includes(socket.id)) {
            opponent =
                rooms[room][0] === socket.id ? rooms[room][1] : rooms[room][0];
        }

        io.to(opponent).emit("opponent-info", score);
    });
};

const removeFromRoom = (
    rooms: roomsType,
    users: usersType[],
    socket: Socket,
    personToRemove: string
): void => {
    var opponent: string = "";
    // cycle through all rooms

    // need to remove person person with id
    for (var i = users.length - 1; i >= 0; --i) {
        if (users[i].id === socket.id) {
            Object.keys(rooms).forEach((room) => {
                // if includes, first save other player as opponent and then delete room
                if (rooms[room].includes(personToRemove)) {
                    opponent =
                        rooms[room][0] === personToRemove
                            ? rooms[room][1]
                            : rooms[room][0];
                    delete rooms[room];
                }
            });

            users.splice(i, 1);
        }
    }
};

const chooseCountry = (): string[] => {
    var countryA, countryB;

    // run at least once or as long as countries are same
    do {
        countryA =
            Object.keys(countries)[
                (Object.keys(countries).length * Math.random()) << 0
            ];

        countryB =
            Object.keys(countries)[
                (Object.keys(countries).length * Math.random()) << 0
            ];
    } while ( // continue while
        countryA === countryB || // both same
        (equalFlags0.includes(countryA) && equalFlags0.includes(countryB)) || // both flags don't look the same...
        (equalFlags1.includes(countryA) && equalFlags1.includes(countryB)) ||
        (equalFlags2.includes(countryA) && equalFlags2.includes(countryB)) ||
        (equalFlags3.includes(countryA) && equalFlags3.includes(countryB)) ||
        (equalFlags4.includes(countryA) && equalFlags4.includes(countryB))
    );

    // set question
    const question = Math.random() > 0.5 ? countryA : countryB;

    return [countryA, countryB, question];
};

const notifyRoom = (rooms: roomsType, socket: Socket, io: any) => {
    // tell other person in room that their opponent left
    Object.keys(rooms).forEach((room) => {
        if (rooms[room].includes(socket.id)) {
            // tell everyone in room that user left (so tell other player)
            io.to(room).emit("opponent-left");
            // remove all sockets from the room (aka deleting room)
            io.in(room).socketsLeave(room);
            // delete room in rooms
            delete rooms[room];
        }
        return;
    });
};

const removeUserRequest = (gameRequests: gameRequestsType, socket: Socket) => {
    // remove player from receiving requests
    delete gameRequests[socket.id];

    // remove this person's requests in other people's arrays
    Object.keys(gameRequests).forEach((userArr) => {
        if (gameRequests[userArr].includes(socket.id)) {
            var index = gameRequests[userArr].indexOf(socket.id);
            if (index > -1) {
                gameRequests[userArr].splice(index, 1);
            }
        }
    });
};

export {
    RequestChange,
    removeUser,
    JoinLeave,
    requestChecker,
    removeFromRoom,
    chooseCountry,
    finishedGameEmit,
    notifyRoom,
    removeUserRequest,
    addUser,
};
