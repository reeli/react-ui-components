import * as React from "react";
import { useState } from "react";
import { CompositeDecorator, ContentBlock, ContentState, Editor, EditorState, Modifier } from "draft-js";

function findVariableEntities(
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState,
) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === "MY_ENTITY_TYPE";
  }, callback);
}

const MyWrapper = () => (
  <span contentEditable={false} style={{ color: "red" }}>
    hello&nbsp;
  </span>
);

const decorator = new CompositeDecorator([
  {
    strategy: findVariableEntities,
    component: MyWrapper,
  },
]);

export const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty(decorator));
  const handleChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  const insert = () => {
    let contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const contentStateWithEntity = contentState.createEntity("MY_ENTITY_TYPE", "IMMUTABLE");
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    contentState = Modifier.insertText(contentState, selectionState, " ");
    contentState = Modifier.insertText(contentState, selectionState, "hello", undefined, entityKey);

    let newState = EditorState.push(editorState, contentState, "insert-characters");

    if (!newState.getCurrentContent().equals(editorState.getCurrentContent())) {
      const sel = newState.getSelection();
      const updatedSelection: any = sel.merge({
        anchorOffset: sel.getAnchorOffset() + 1,
        focusOffset: sel.getAnchorOffset() + 1,
      });
      // Forcing the current selection ensures that it will be at it's right place.
      newState = EditorState.forceSelection(newState, updatedSelection);
    }
    setEditorState(newState);
  };

  return (
    <div>
      <button onClick={insert}>Insert span</button>
      <Editor placeholder="placeholder..." editorState={editorState} onChange={handleChange} />
    </div>
  );
};
