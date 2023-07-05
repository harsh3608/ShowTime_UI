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
  

export interface PunchedInTimeResponse {
    statusCode: number
    isSuccess: boolean
    response: TimeSpan
    message: string
  }
  
  export interface TimeSpan {
    ticks: number
    days: number
    hours: number
    milliseconds: number
    microseconds: number
    nanoseconds: number
    minutes: number
    seconds: number
    totalDays: number
    totalHours: number
    totalMilliseconds: number
    totalMicroseconds: number
    totalNanoseconds: number
    totalMinutes: number
    totalSeconds: number
  }

  export interface WorkingTimeResponse {
    statusCode: number
    isSuccess: boolean
    response: WorkingTime[]
    message: string
  }
  
  export interface WorkingTime {
    date: string
    workingTime: TimeSpan
  }







