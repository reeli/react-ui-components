import { css } from "glamor";
import { map } from "lodash";
import * as React from "react";
import { IWordWithState } from "./Game";

interface IWordListProps {
  words: IWordWithState[];
  onWordClick: (word: IWordWithState) => void;
}

const getColor = (word: IWordWithState) => {
  if (word.isSelected && !word.origin) {
    return "red";
  }
  if (word.isOutOfStage || !word.isSelected) {
    return "black";
  }
  if (word.isSelected && word.origin) {
    return "green"
  }
  return "black";
};

export const WordList = ({ words, onWordClick }: IWordListProps) => (
  <div>
    {map(words, (word: IWordWithState, idx) => {
      return <div
        key={idx}
        onClick={() => onWordClick(word)}
        {...css({
          display: "inline-block",
          border: "1px solid #ccc",
          margin: "0.5rem",
          padding: "0 0.5rem",
          color: getColor(word),
        })}>
        {word.target}
      </div>
    })}
  </div>
);
