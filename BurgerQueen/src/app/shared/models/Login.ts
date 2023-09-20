// editar:  si solola uso en un lugar no deberia ir aca para compartir
// export interface Credentials  {
//     email: string,
//     password: string,
// }

export interface UserInformation {
    email: string,
    role: string,
    id: number
}

export interface LoginResponse {
    accessToken: string,
    user: UserInformation
}