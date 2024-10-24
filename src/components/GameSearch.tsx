import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
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
            <SearchAndTitle>
                <Title>chess.com game review</Title>
                <InputContainer>
                    <InputLabel>
                        <InputText>username</InputText>
                    </InputLabel>
                    <Input
                        value={username}
                        onChange={handleInput}
                        onKeyDown={handleInputSearch}
                    />
                </InputContainer>
            </SearchAndTitle>
        </Container>
    );
}

const rainbow = keyframes`
    0% { background-position: 0% 82% }
    50% { background-position: 100% 19% }
    100% { background-position: 0% 82% }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5%;
    background: linear-gradient(124deg, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
    background-size: 1800% 1800%;
    animation: ${rainbow} 18s ease infinite;
`;

const SearchAndTitle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    color: whitesmoke;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 10px;
    padding: 0px 10px;
    margin-top: 10px;
    width: 100%;
    height: 100%;
`;

const InputLabel = styled.div`
    border-right: 2px solid black;
    display: flex;
`;

const InputText = styled.p`
    font-weight: bold;
    margin-right: 10px;
`;

const Input = styled.input`
    border-radius: 10px;
    border: transparent;
    background: transparent;
    padding: 10px;
    font-weight: 500;
    font-size: 18px;
`;
