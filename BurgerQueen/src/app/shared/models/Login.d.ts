export interface UserInformation {
    email: string,
    role: string,
    id: number
}

export interface LoginResponse {
    accessToken: string,
    user: UserInformation
}
