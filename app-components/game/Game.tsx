import { css } from "glamor";
import {
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

export class Game extends React.Component<IGameProps, any> {
  state = {
    isStart: false,
    scores: 0,
    words: map(this.props.gameData.words, (word) => {
      return {
        ...word,
        show: true,
      };
    }),
    targetWords: [],
  };

  componentDidMount() {
    this.setState({
      targetWords: this.getTargetWords(),
    })
  }

  getTargetWords() {
    const targetList = map(this.state.words, (word) => {
      return word.target;
    });
    return shuffle(targetList.concat(this.props.gameData.interferences));
  }

  handleClick = (word: string) => {
    const current = find(this.state.words, (item) => item.target === word);
    if (current && current.show) {
      this.setState({
        words: map(this.state.words, (item) => {
          if (item.target === word) {
            return {
              ...item,
              show: false,
            }
          }
          return item;
        }),
        scores: this.state.scores + 50,
      });
    }
  };

  render() {
    return (
      <div {...css({ width: "370px", position: "relative" })}>
        <div {...containerStyles}>
          {this.state.isStart
            ? map(this.state.words, (word, idx: number) => {
              return !word.show
                ? null
                : <Word
                  key={idx}
                  text={word.origin}
                  step={10}
                  initPosition={{ top: -(idx + 1) * 40, left: idx % 2 === 0 ? 80 : 200 }}
                  clientHeight={480}
                />;
            })
            : null}
        </div>
        <div {...css({ position: "relative", zIndex: 999 })}>
          {map(this.state.targetWords, (word, idx) => {
            return <div
              key={idx}
              onClick={() => this.handleClick(word)}
              {...css({
                display: "inline-block",
                border: "1px solid #ccc",
                margin: "0.5rem",
                padding: "0 0.5rem",
              })}>
              {word}
            </div>
          })}
        </div>
        <Score scores={this.state.scores} />
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
