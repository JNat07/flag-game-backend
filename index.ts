import { Server } from "socket.io";


interface ObjectType{
    socketId: string,
    name:string
}
var Users: ObjectType[]= []

const io = new Server( {cors: {
    origin: "http://localhost:3000"
}
});
  

var room = []


// when someone joins
io.on("connection", socket => {
 
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


    socket.on("requestOpponent", (opponentID) => {
        console.log("testing")
        socket.to(opponentID).emit("requestOpponentResp", "Testing123")
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
        io.emit("allPlayableUsers", Users)
    });
  
});

io.listen(4000);
