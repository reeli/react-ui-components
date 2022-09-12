import { ChangeEvent, ReactNode, useEffect, useRef, useState, FC } from "react";
import {
  Chip,
  ClickAwayListener,
  InputAdornment,
  List,
  ListItem,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { differenceWith, isEmpty, isEqual, map } from "lodash";
import { DisabledListItem } from "./DisabledListItem";
import { useInputKeyDown } from "./hooks/useInputKeyDown";
import { useMultiSelect } from "./hooks/useMultiSelect";
import { OverlayTrigger } from "./OverlayTrigger";
import { Show } from "./Show";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    alignItems: "center",
  },
  chipRoot: {
    borderRadius: 4,
    margin: 4,
  },
  rootContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    borderBottom: "1px solid #ccc",
    "& .MuiFormControl-root": {
      flexGrow: 1,
    },
  },
  input: {
    "& input": {
      marginTop: 2,
      textOverflow: "ellipsis",
    },
  },
  paper: {
    width: 520,
    maxHeight: 200,
    overflow: "scroll",
    marginTop: 4,
  },
  list: {
    margin: 0,
  },
  label: {
    maxWidth: 500,
    whiteSpace: "pre-wrap",
  },
}));

interface IAutocompleteWithTagsProps {
  name: string;
  options: any[];
  value?: any;
  placeholder?: string;
  onChange?: (value: any) => void;
  onInputChange?: (value: any) => void;
  getOptionLabel: (option: any) => ReactNode;
  isLoading?: boolean;
}

export const AutocompleteWithTags: FC<IAutocompleteWithTagsProps> = ({
  value,
  options,
  placeholder,
  onInputChange,
  onChange,
  name,
  getOptionLabel,
  isLoading = false,
}) => {
  const classes = useStyles();

  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const listEl = useRef<HTMLUListElement>(null);
  const listItemEl = useRef<HTMLDivElement>(null);
  const inputEl = useRef<HTMLInputElement>(null);

  const [selectedValues, addValue, removeValue, removeLastSelectedValue] = useMultiSelect(value);
  const list = differenceWith(options, selectedValues, isEqual);

  const [handleInputKeyDown, selectedIdx, resetSelectedIdx] = useInputKeyDown({
    defaultActiveIdx: -1,
    maxIdx: list.length,
    offsetY: listItemEl.current ? listItemEl.current!.getBoundingClientRect().height : 0,
    scrollContainer: listEl,
    onEnter: (_, idx) => {
      if (list[idx]) {
        addValue(list[idx]);
      }
    },
    onBackSpace: (e) => {
      if (inputValue.length === 0) {
        // This code is for IE, since autoFocus in TextField is not working in IE, we should make input field focus manually
        inputEl.current && inputEl.current.focus();
        e.preventDefault();
        removeLastSelectedValue();
      }
    },
  });

  const doReset = () => {
    resetSelectedIdx();
    setVisible(false);
    setInputValue("");
  };

  useEffect(() => {
    onChange && onChange(selectedValues);
    doReset();
  }, [selectedValues]);

  useEffect(() => {
    if (!isLoading) {
      const next = !isLoading;
      setVisible((prev) => (prev !== next ? next : prev));
    }
  }, [isLoading]);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setInputValue(value);
    onInputChange && onInputChange(value);
  };

  return (
    <ClickAwayListener onClickAway={doReset}>
      <div className={classes.container}>
        <InputAdornment position="start">
          <Search color={"action"} />
        </InputAdornment>
        <OverlayTrigger
          visible={visible}
          content={
            <Show onlyShowWhen={!isLoading}>
              <Paper className={classes.paper} elevation={1} ref={listEl}>
                <List className={classes.list}>
                  <Show
                    onlyShowWhen={!isEmpty(list)}
                    displayNodeWhenHide={<DisabledListItem>No Options</DisabledListItem>}
                  >
                    {map(list, (item, idx) => (
                      <ListItem
                        button
                        onClick={() => addValue(item)}
                        key={idx}
                        tabIndex={idx}
                        selected={selectedIdx === idx}
                        ref={listItemEl}
                      >
                        <ListItem value={item}>{getOptionLabel(item)}</ListItem>
                      </ListItem>
                    ))}
                  </Show>
                </List>
              </Paper>
            </Show>
          }
        >
          <div className={classes.rootContainer}>
            {map(selectedValues, (item, idx) => (
              <Chip
                key={idx}
                tabIndex={-1}
                variant="outlined"
                label={getOptionLabel(item)}
                onDelete={() => removeValue(item)}
                classes={{
                  root: classes.chipRoot,
                  label: classes.label,
                }}
              />
            ))}
            <TextField
              autoFocus
              key={selectedValues.length}
              autoComplete={"off"}
              placeholder={placeholder}
              value={inputValue}
              name={name}
              onChange={handleInputChange}
              className={classes.input}
              InputProps={{
                disableUnderline: true,
                onKeyDown: handleInputKeyDown as any,
              }}
              ref={inputEl}
            />
          </div>
        </OverlayTrigger>
      </div>
    </ClickAwayListener>
  );
};
