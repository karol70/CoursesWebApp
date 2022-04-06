export interface claim{
    name: string;
    value: string;
}

export interface userCredentials{
    email:string;
    userName?: string;
    password: string;
}
export interface userCredentialsLogin{
    email:string;
    password: string;
}
export interface authenticationResponse{
    token: string;
    expiration: Date;
}