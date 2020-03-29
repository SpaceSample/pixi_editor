import React from 'react';
import AddButtonGroup from './add_button_group';
import FileButtonGroup from './file_button_group';

const EditorToolbar = () => {
  return (
    <div>
      <FileButtonGroup />
      <span>{` | `}</span>
      <AddButtonGroup />
    </div>
  );
};

export default EditorToolbar;