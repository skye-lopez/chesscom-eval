import styled from "styled-components";
import Global from "./styles/global";

export default function App() {
    return (
        <AppContainer>
            <Global />
        </AppContainer>
    );
}

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
