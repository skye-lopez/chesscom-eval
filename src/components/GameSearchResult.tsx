import styled from "styled-components";
import { Game } from "../utils/chesscom-api";

interface GameSearchResultProps {
    game: Game
    setGameInfo: Function
}

export default function GameSearchResult({ game, setGameInfo }: GameSearchResultProps) {
    function getWinner(): ("draw" | "black" | "white" | "error") {
        const draw: { [key: string]: boolean } = { "repitition": true, "agreed": true, "stalemate": true, "insufficent": true, "50move": true };
        const win: { [key: string]: boolean } = { "win": true, };
        const loss: { [key: string]: boolean } = { "resigned": true, "timeout": true, "checkmated": true, "lose": true };

        if (draw?.[game.black.result]) {
            return "draw"
        }
        if (win?.[game.black.result]) {
            return "black"
        }
        if (win?.[game.white.result]) {
            return "white"
        }
        return "error" // TODO: Validate that we have all proper ones. (the docs are ambigious)
    }
    const winner = getWinner();
    return (
        <Container>
            <Players>
                <PlayerAndColor>
                    <ColorBox color={"white"} />
                    {`${game.white.username} (${game.white.rating})`}
                </PlayerAndColor>
                <PlayerAndColor>
                    <ColorBox color={"black"} />
                    {`${game.black.username} (${game.black.rating})`}
                </PlayerAndColor>
                {winner === "draw" ?
                    (
                        <WinnerContainer>
                            <ColorBox color={"white"} />
                            <ColorBox color={"black"} />
                            <WinnerText>
                                Draw
                            </WinnerText>
                        </WinnerContainer>
                    )
                    : winner === "black" ? (
                        <WinnerContainer>
                            <ColorBox color={"black"} />
                            <WinnerText>
                                Black won
                            </WinnerText>
                        </WinnerContainer>
                    ) : (
                        <WinnerContainer>
                            <ColorBox color={"white"} />
                            <WinnerText>
                                White won
                            </WinnerText>
                        </WinnerContainer>
                    )
                }

                <Button
                    onClick={() => setGameInfo(game)}
                >
                    Analyze Game
                </Button>
            </Players>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    background: whitesmoke;
    border-radius: 7px;
    padding: 10px;
`;

const Players = styled.div`
    display: flex;
`;

const PlayerAndColor = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ColorBox = styled.div`
    height: 10px;
    width: 10px;
    border-radius: 4px;
    background: ${props => props.color};
    border: ${props => props.color === "white" ? "1.5px solid gray" : "1px solid transparent"};
    margin: 0px 10px;
`;

const WinnerContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: white;
    padding: 2px;
    margin: 0px 10px;
    border-radius: 10px;
`;

const WinnerText = styled.p`
    margin-right: 5px;
`;

const Button = styled.button`
    border: transparent;
    background: cyan;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
    padding: 7px;
    cursor: pointer;
`;
