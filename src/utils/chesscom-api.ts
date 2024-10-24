import axios, { Axios, AxiosError, isAxiosError } from "axios";

export interface Game {
    black: {
        "@id": string
        rating: number
        result: string
        username: string
        uuid: string
    }
    white: {
        "@id": string
        rating: number
        result: string
        username: string
        uuid: string
    }
    eco: string
    fen: string
    initial_setup: string
    pgn: string
    rated: boolean
    rules: string
    start_time: number
    tcn: string
    time_class: string
    time_control: string
    url: string
    uuid: string
}

export interface ChessComError {
    code: number
    message: string
}

export interface RecentGamesResponse {
    games: Game[]
    status: number | undefined
    message: string | undefined
}

// Gets all games within the past month by username.
export async function getRecentGamesByUsername(username: string): Promise<RecentGamesResponse> {
    try {
        const now = new Date();
        const url = `https://api.chess.com/pub/player/${username}/games/${now.getFullYear()}/${now.getMonth() + 1}`;
        const { status, data: { games } } = (await axios.get(url));
        const filteredGames = games.filter((game: Game) => (game.rules === "chess"));

        return {
            games: filteredGames,
            status: status,
            message: "",
        };
    } catch (e) {
        if (isAxiosError(e)) {
            const error = e as AxiosError;
            const chessComError = error?.response?.data as ChessComError;
            return {
                games: [],
                status: error.status,
                message: chessComError.message || error.message,
            }
        }
        return {
            games: [],
            status: 500,
            message: "Internal error",
        }
    }
}
