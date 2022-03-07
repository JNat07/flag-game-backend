import { UsersType,gameRequestsType } from "./index"


const RequestChange = (gameRequests:gameRequestsType) => {
    console.log("=============================")
    console.log("Change in requests")
    console.log(gameRequests)
    console.log("=============================")
}

const JoinLeave = (joined:boolean, Users:UsersType[]) => {
     console.log("=============================")
        console.log(joined ? "User Joined":"User left")
        console.log("Number of users online: ", Users.length)
        console.log("Current users: ", Users)
        console.log("=============================")
}

export {RequestChange, JoinLeave}