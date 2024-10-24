import axios from "axios";

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

export async function getRecentGamesByUsername(username: string): Promise<Game[]> {
    const now = new Date();
    const url = `https://api.chess.com/pub/player/${username}/games/${now.getFullYear()}/${now.getMonth() + 1}`;
    const { status, data: { games } } = (await axios.get(url));

    if (status !== 200) {
        // TODO: Handle error;
    }

    return games;
}
