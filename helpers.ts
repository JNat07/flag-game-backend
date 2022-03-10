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
    console.log("=============================");
    console.log("Change in requests");
    console.log(gameRequests);
    console.log("=============================");
};

const JoinLeave = (joined: boolean, onlineUsers: usersType[]) => {
    console.log("=============================");
    console.log(joined ? "User Joined" : "User left");
    console.log("Number of users online: ", onlineUsers.length);
    console.log("Current users: ", onlineUsers);
    console.log("=============================");
};

const requestChecker = (
    person1: string,
    person2: string,
    gameRequests: gameRequestsType,
    rooms: roomsType,
    allSockets: Socket[],
    io: any
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
    }
};

const removeFromRoom = (rooms: roomsType, personToRemove: string): void => {
    var opponent: string = "";
    // cycle through all rooms
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

    // need to notify this player
    console.log(opponent);
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

    return [countryA, countryB];
};

export {
    RequestChange,
    JoinLeave,
    requestChecker,
    removeFromRoom,
    chooseCountry,
};
