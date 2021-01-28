import { useRef, useState } from "react";
import { convertFromRaw, EditorState, RawDraftContentState } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createMentionPlugin, { defaultSuggestionsFilter } from "draft-js-mention-plugin";
import mentions from "./mentions";

const editorStyles: any = {
  editor: {
    boxSizing: "border-box",
    border: "1px solid #ddd",
    cursor: "text",
    padding: "16px",
    borderRadius: "2px",
    marginBottom: "2em",
    boxShadow: "inset 0px 1px 8px -3px #ABABAB",
    background: "#fefefe",
  },
};

const initialValue: RawDraftContentState = {
  blocks: [
    {
      key: "bgj08",
      text: "Matthew test",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [{ offset: 0, length: 7, key: 0 }],
      data: {},
    },
  ],
  entityMap: {
    "0": {
      type: "mention",
      mutability: "SEGMENTED",
      data: {
        mention: {
          name: "Matthew",
          link: "https://twitter.com/mrussell247",
        },
      },
    },
  },
};

const mentionPlugin = createMentionPlugin({
  entityMutability: "IMMUTABLE",
});

export const SimpleMentionEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(initialValue)));
  const [suggestions, setSuggestions] = useState(mentions);
  const divEl = useRef<HTMLDivElement | null>(null);

  const onChange = (editorState: EditorState) => {
    // console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2));
    setEditorState(editorState);
  };

  const onSearchChange = ({ value }: any) => {
    setSuggestions(defaultSuggestionsFilter(value, mentions));
  };

  const onAddMention = (_mention: any) => {
    // console.log(mention, "mention");
    // get the mention object selected
  };

  const focus = () => {
    if (divEl.current) {
      divEl.current!.focus();
    }
  };

  const { MentionSuggestions } = mentionPlugin;
  const plugins = [mentionPlugin];

  return (
    <div style={editorStyles.editor} onClick={focus}>
      <Editor
        // readOnly
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
        ref={divEl}
      />
      <MentionSuggestions onSearchChange={onSearchChange} suggestions={suggestions} onAddMention={onAddMention} />
    </div>
  );
};
