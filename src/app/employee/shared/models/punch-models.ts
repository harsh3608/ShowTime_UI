export interface Punch {
    id: string
    punchDateTime: string
    userId: string
    userName: string
    punchStatus: boolean
}

export interface PunchAddResponse {
    statusCode: number
    isSuccess: boolean
    response: Punch
    message: string
}
  

export interface UserStatusResponse {
    statusCode: number
    isSuccess: boolean
    response: boolean
    message: string
}
  

export interface PunchedUsersResponse {
    statusCode: number
    isSuccess: boolean
    response: Punch[]
    message: string
}
  
