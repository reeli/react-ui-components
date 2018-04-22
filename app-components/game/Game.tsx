import { css } from 'glamor';
import { filter, find, map, shuffle } from 'lodash';
import * as React from 'react';
import { Score } from './Score';
import { Word } from './Word';
import { WordList } from './WordList';

const containerStyles = css({
  width: '370px',
  height: '480px',
  border: '1px solid #ccc',
  position: 'relative',
  backgroundColor: '#7080E6',
  overflow: 'hidden',
});

interface IWord {
  id: string;
  origin: string;
  target: string;
}

export interface IGameData {
  words: IWord[];
  interferences: string[];
}

interface IGameProps {
  gameData: IGameData;
  timeSpace?: number;
  step?: number;
  clientHeight?: number;
  wordHeight: number;
}

export interface IWordWithState extends IWord {
  top: number;
  left: number;
  isOutOfStage?: boolean;
  isSelected?: boolean;
}

interface IGameState {
  words: IWordWithState[];
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
      isOutOfStage: true,
      isSelected: false,
    };
    const initWords = map(this.props.gameData.words, word => {
      return {
        top: 0,
        left: 0,
        ...word,
        ...initWordState,
      };
    });
    const interferences = map(this.props.gameData.interferences, interference => {
      return {
        id: '',
        origin: '',
        target: interference,
        top: 0,
        left: 0,
        ...initWordState,
      };
    });
    return shuffle(initWords.concat(interferences));
  }

  componentDidUpdate(_: any, prevState: IGameState) {
    if (this.state.isStart && prevState.isStart !== this.state.isStart) {
      this.initWords();
    }
  }

  initWords() {
    const interference = filter(this.state.words, item => {
      return !item.origin;
    });
    const originWords = this.getWordsWithPositions(this.dropInterferences(this.state.words), true);
    this.setState(
      {
        words: [...interference, ...originWords],
      },
      () => {
        this.setMove();
      },
    );
  }

  getWordsWithPositions(words: IWordWithState[], isInit: boolean) {
    const { step = 10, clientHeight = 480, wordHeight } = this.props;
    return map(words, (word: IWordWithState, idx: number) => {
      return {
        ...word,
        top: isInit ? step * -(idx + 1) * (wordHeight / step) : word.top + step,
        left: idx % 2 === 0 ? 100 : 200,
        isOutOfStage: word.top < -wordHeight || word.top > clientHeight,
      };
    });
  }

  setMove() {
    const { timeSpace = 1000 } = this.props;
    setTimeout(() => {
      const interference = filter(this.state.words, item => {
        return !item.origin;
      });
      const originWords = this.getWordsWithPositions(this.dropInterferences(this.state.words), false);
      this.setState(
        {
          words: [...interference, ...originWords],
        },
        () => {
          if (this.state.isStart) {
            this.setMove();
          }
        },
      );
    }, timeSpace);
  }

  handleClick = (word: string) => {
    const current = find(this.state.words, item => item.target === word) as IWordWithState;
    if (current && (!current.isOutOfStage || !current.origin) && !current.isSelected) {
      this.setState({
        words: map(this.state.words, item => {
          if (item.target === word) {
            return {
              ...item,
              isSelected: true,
            };
          }
          return item;
        }),
        scores: current.origin ? this.state.scores + 50 : this.state.scores - 50,
      });
    }
  };

  dropInterferences(words: IWordWithState[]) {
    return filter(words, item => {
      return !!item.origin;
    });
  }

  render() {
    return (
      <div {...css({ width: '370px', position: 'relative' })}>
        <Score scores={this.state.scores} />
        <div {...containerStyles}>
          {this.state.isStart
            ? map(this.dropInterferences(this.state.words), (word, idx: number) => {
                return word.isSelected ? null : (
                  <Word key={idx} text={word.origin} top={word.top} left={word.left} visible={!word.isOutOfStage} />
                );
              })
            : null}
        </div>
        <WordList words={this.state.words} onWordClick={word => this.handleClick(word.target)} />
        <button
          onClick={() => {
            this.setState({
              isStart: true,
            });
          }}
        >
          start
        </button>
        <button
          onClick={() => {
            this.setState({
              isStart: false,
            });
          }}
        >
          end
        </button>
      </div>
    );
  }
}
