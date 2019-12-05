export class Token {
    access_token: string;
}


export class JwtToken {
    sub: string;
    auth: string[];
    Role: string[];
    iat: number;
    exp: number;
}
