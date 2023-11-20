export interface User {
    _id?: string,
    name?: string,
    email: string,
    password?: string,
    role?: string,


}
export interface Signin {
    email: string;
    password: string;
}