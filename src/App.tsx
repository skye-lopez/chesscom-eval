import styled from "styled-components";
import Global from "./styles/global";
import GameSearch from "./components/GameSearch";

export default function App() {
    return (
        <AppContainer>
            <Global />
            <GameSearch />
        </AppContainer>
    );
}

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
