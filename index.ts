import { Server } from "socket.io";

const io = new Server( {cors: {
    origin: "http://localhost:3000"
}
});

interface ObjectType{
    socketId: string,
    name:string
}
interface gameRequestsType{
[key: string]: string[]
}

var Users: ObjectType[]= []

var gameRequests: gameRequestsType = {}
  
const removeUser = (playerToRemove:string, myID:string):void => {
    const index = gameRequests[playerToRemove].indexOf(myID);
    gameRequests[playerToRemove].splice(index, 1);       
}

const addUser = (opponentID:string,myID:string):void => {
    gameRequests[opponentID].push(myID);  
}


// when someone joins
io.on("connection", socket => {
    // add new users array of people who want to play against them
    gameRequests[socket.id] = []
    console.log(gameRequests)
 
    // disconnect the user when they request
    socket.on("requestDisconnect", () => {
        socket.disconnect()
    });
    
    socket.on("sendMyName", (arg)=> {
  
        Users.push({
            socketId: socket.id,
            name: arg
        })

        console.log("=============================")
        console.log("User joined")
        console.log("Number of users online: ", Users.length)
        console.log("Current users: ", Users)
        console.log("=============================")
        // emit to all connected clients
        io.emit("allPlayableUsers", Users)

    })


    socket.on("request-Opponent", ({opponentID,myID}) => {

        addUser(opponentID, myID)
    
        // send opponent their own array
        socket.to(opponentID).emit("inform-opponent-ofPlayer",gameRequests[opponentID])
    })

    socket.on("remove-Opponent", ({opponentID,myID}) => {

        removeUser(opponentID, myID)
        
        // send opponent their own array
        socket.to(opponentID).emit("inform-opponent-ofPlayer",gameRequests[opponentID])
    })

    socket.on("both-Opponent", ({ opponentID, whoIwantToPlay, myID }) => {
        // opponentID: socketID want to play against
        // whoIwantToPlay: socketID used to want to play against
        // myID: my socketID

        removeUser(whoIwantToPlay,myID)
        addUser(opponentID,myID)

        // tell old person I don't want to play them
        socket.to(whoIwantToPlay).emit("inform-opponent-ofPlayer", gameRequests[whoIwantToPlay])
        // tell new person I want to play against them 
        socket.to(opponentID).emit("inform-opponent-ofPlayer",gameRequests[opponentID])
    })

    // on user disconnecting, remove from users array and emit lasting players
    socket.on("disconnect", () => {

        // need to remove person person with id
        for (var i = Users.length - 1; i >= 0; --i) {
            if (Users[i].socketId === socket.id) {
                Users.splice(i, 1);

            }
        }

        console.log("=============================")
        console.log("User left")
        console.log("Number of users online: ", Users.length)
        console.log("Current users: ", Users)
        console.log("=============================")

        // delete person who left
        delete gameRequests[socket.id]
        
        io.emit("allPlayableUsers", Users)
    });
  
});

io.listen(4000);
