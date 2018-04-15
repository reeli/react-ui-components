import { css } from "glamor";
import {
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

interface IGameData {
  words: IWord[];
  interferences: string[]
}

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

export class Game extends React.Component<any, any> {
  state = {
    isStart: false,
    disappearItem: null,
    scores: 0,
    targetWords: [],
  }

  componentDidMount() {
    this.setState({
      targetWords: this.getTargetWords(gameData),
    });
  }

  handleClick = (word: string) => {
    const ele = this.refs[word];
    if (ele && ele.state.top > 0) {
      this.setState({
        disappearItem: word,
      }, () => {
        this.setState({
          scores: this.state.scores + 50,
        })
      })
    }
  };

  getTargetWords(gameData: IGameData) {
    const targetList = map(gameData.words, (word) => {
      return word.target;
    });
    return shuffle(targetList.concat(gameData.interferences));
  }

  render() {
    return (
      <div {...css({ width: "370px" })}>
        <div {...containerStyles}>
          {this.state.isStart
            ? map(gameData.words, (word, idx: number) => {
              return word.target === this.state.disappearItem
                ? null
                : <Word
                  key={idx}
                  text={word.origin}
                  step={20}
                  initPosition={{ top: -idx * 80 }}
                  ref={word.target}
                  clientHeight={480}
                />;
            })
            : null}
        </div>
        <div>
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
