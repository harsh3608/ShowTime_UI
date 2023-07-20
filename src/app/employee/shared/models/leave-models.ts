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
  leaveType: number
  status: number
  isHalfDay: boolean
  halfDayShift: number
  isPaid: boolean
  managerId: string
  managerName: string
  dateOfRequest: string
  leaveDays: number
}

export interface LeaveAddRequest {
  userId: string
  username: string
  startDate: string
  endDate: string
  reason: string
  leaveType: number
  status: number
  isHalfDay: boolean
  halfDayShift: number
  isPaid: boolean
  managerId: string
  managerName: string
  dateOfRequest: string
  leaveDays: number
}

