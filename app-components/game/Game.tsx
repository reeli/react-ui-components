import { css } from "glamor";
import {
  filter,
  find,
  map,
  shuffle,
} from "lodash";
import * as React from "react";
import { Score } from "./Score";
import { Word } from "./Word";

const containerStyles = css({
  width: "370px",
  height: "480px",
  border: "1px solid #ccc",
  position: "relative",
  backgroundColor: "#7080E6",
  overflow: "hidden",
});


interface IWord {
  id: string;
  origin: string;
  target: string;
}

export interface IGameData {
  words: IWord[];
  interferences: string[]
}

interface IGameProps {
  gameData: IGameData;
}

interface IWordState extends IWord {
  hide?: boolean;
  isOutOfStage?: boolean;
  isChecked?: boolean;
}

interface IGameState {
  words: IWordState[];
  scores: number;
  isStart: boolean;
}

export class Game extends React.Component<IGameProps, IGameState> {
  state = {
    isStart: false,
    scores: 0,
    words: this.getWords(),
  };

  getWords() {
    const initWordState = {
      hide: false,
      isOutOfState: true,
      isChecked: false,
    };
    const initWords = map(this.props.gameData.words, (word) => {
      return {
        ...word,
        ...initWordState,
      };
    });
    const interferences = map(this.props.gameData.interferences, (interference) => {
      return {
        id: "",
        origin: "",
        target: interference,
        ...initWordState,
      }
    });
    return shuffle(initWords.concat(interferences));
  }

  handleClick = (word: string) => {
    const current = find(this.state.words, (item) => item.target === word) as IWordState;
    if (current && !current.hide && !current.isOutOfStage) {
      this.setState({
        words: map(this.state.words, (item) => {
          if (item.target === word) {
            return {
              ...item,
              hide: true,
              isChecked: true,
            }
          }
          return item;
        }),
        scores: this.state.scores + 50,
      });
    }
  };

  dropInterferences(words: IWordState[]) {
    return filter(words, (item) => {
      return !!item.origin
    });
  }

  render() {
    return (
      <div {...css({ width: "370px", position: "relative" })}>
        <Score scores={this.state.scores} />
        <div {...containerStyles}>
          {this.state.isStart
            ? map(this.dropInterferences(this.state.words), (word, idx: number) => {
              return word.hide
                ? null
                : <Word
                  key={idx}
                  text={word.origin}
                  step={10}
                  initPosition={{ top: -(idx + 1) * 40, left: idx % 2 === 0 ? 80 : 200 }}
                  clientHeight={480}
                  outOfStage={(isOutOfStage) => {
                    this.setState({
                      words: map(this.state.words, (item) => {
                        if (item.id === word.id) {
                          return {
                            ...item,
                            isOutOfStage,
                          };
                        }
                        return item;
                      }),
                    })
                  }}
                />;
            })
            : null}
        </div>
        <div {...css({ position: "relative", zIndex: 999 })}>
          {map(this.state.words, (word: IWordState, idx) => {
            return <div
              key={idx}
              onClick={() => this.handleClick(word.target)}
              {...css({
                display: "inline-block",
                border: "1px solid #ccc",
                margin: "0.5rem",
                padding: "0 0.5rem",
                color: word.isOutOfStage ? "#000" : (word.isChecked ? "green" : "red"),
              })}>
              {word.target}
            </div>
          })}
        </div>
        <button onClick={() => {
          this.setState({
            isStart: true,
          });
        }}>start
        </button>
        <button onClick={() => {
          this.setState({
            isStart: false,
          });
        }}>end
        </button>
      </div>
    )
  }
}
