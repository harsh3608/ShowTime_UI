export interface SingleLeaveResponse {
    statusCode: number
    isSuccess: boolean
    response: LeaveDTO
    message: string
}
  
export interface MultipleLeaveResponse {
    statusCode: number
    isSuccess: boolean
    response: LeaveDTO[]
    message: string
}

export interface LeaveDTO {
    id: string
    userId: string
    username: string
    startDate: string
    endDate: string
    reason: string
    leaveType: string
    isApproved: boolean
    isRejected: boolean
    isHalfDay: boolean
    halfDayShift: string
    isPaid: boolean
    managerId: any
    managerName: string
    dateOfRequest: string
}

export interface LeaveAddRequest {
    userId: string
    username: string
    startDate: string
    endDate: string
    reason: string
    leaveType: string 
    isApproved: boolean
    isRejected: boolean
    isHalfDay: boolean
    halfDayShift: string
    isPaid: boolean
    managerId: any
    managerName: string
    dateOfRequest: string
}

