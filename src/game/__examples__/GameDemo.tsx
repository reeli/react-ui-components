import { Game, IGameData } from "../Game";

const gameData: IGameData = {
  words: [
    {
      id: "1",
      origin: "Yes",
      target: "Ya",
    },
    {
      id: "2",
      origin: "No",
      target: "Na",
    },
    {
      id: "3",
      origin: "Hello",
      target: "Holla",
    },
    {
      id: "4",
      origin: "Morning",
      target: "Morn",
    },
  ],
  interferences: ["Sorry", "Hi", "You"],
};

export function GameDemo() {
  return <Game gameData={gameData} wordHeight={30} />;
}
