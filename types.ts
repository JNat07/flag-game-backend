
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

export {usersType,gameRequestsType,roomsType }