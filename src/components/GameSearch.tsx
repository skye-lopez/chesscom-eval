import { useState, useEffect } from "react";
import styled from "styled-components";
import { Game, getRecentGamesByUsername } from "../utils/chesscom-api";

export default function GameSearch() {
    const [username, setUsername] = useState<string>("");
    const [searchInProgress, setSearchInProgress] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<Game[]>([]);

    function handleInput(e: React.FormEvent<HTMLInputElement>) {
        setUsername(e.currentTarget.value);
    }

    // FIXME: Correct type
    function handleInputSearch(e: any) {
        if (e.key === "Enter") {
            setSearchInProgress(true);
        }
    }

    useEffect(() => {
        if (!searchInProgress) return;

        async function search() {
            const response = await getRecentGamesByUsername(username);
            if (response.status === 200) {
                setSearchResults(response.games);
            }
            // TODO: Error messaging for 404's etc...
            setSearchInProgress(false);
        }
        search();
    }, [searchInProgress]);

    return (
        <Container>
            <h1>Search for games by chess.com username</h1>
            <Input
                value={username}
                onChange={handleInput}
                onKeyDown={handleInputSearch}
            />
            <p>{searchInProgress.toString()}</p>
            <p>{searchResults[0]?.eco}</p>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input``;
