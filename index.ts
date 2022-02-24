import { Server } from "socket.io";

var Users: string[] = []

const io = new Server( {cors: {
    origin: "http://localhost:3000"
  }});


// when someone joins
io.on("connection", socket => {
    Users.push(socket.id)

    console.log("=============================")
    console.log("User joined")
    console.log("Number of users online: ", Users.length)
    console.log("Current users: ", Users)
    console.log("=============================")
    // emit to all connected clients
    io.emit("allPlayableUsers", Users)

    // disconnect the user when they request
    socket.on("requestDisconnect", () => {
        socket.disconnect()
    });
    

    // on user disconnecting, remove from users array and emit lasting players
    socket.on("disconnect", () => {
        Users.splice(Users.indexOf(socket.id), 1);
        console.log("=============================")
        console.log("User left")
        console.log("Number of users online: ", Users.length)
        console.log("Current users: ", Users)
        console.log("=============================")
        socket.emit("allPlayableUsers", Users)
    });
  
});

io.listen(4000);
