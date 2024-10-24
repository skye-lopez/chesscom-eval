import { useState } from "react";
import styled from "styled-components";
import Global from "./styles/global";
import GameSearch from "./components/GameSearch";
import { Game } from "./utils/chesscom-api";

export default function App() {
    const [gameInfo, setGameInfo] = useState<Game | undefined>();

    return (
        <AppContainer>
            <Global />
            <h1>{gameInfo?.uuid}</h1>
            <GameSearch setGameInfo={setGameInfo} />
        </AppContainer>
    );
}

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
