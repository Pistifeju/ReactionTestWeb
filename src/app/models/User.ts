import { Game } from "./Game";

export interface User {
    id: string;
    email: string;
    username: string;
    recordGame: number;
    games: Array<Game>;
}