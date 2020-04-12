import React, { useState } from 'react';
import SpriteTree from './sprite_tree';
import FileTree from './file_tree';
import Paper from '@material-ui/core/Paper';

function Folder({ lable, initShow, children }) {
  const [show, setShow] = useState(initShow);
  const switchShow = () => {
    setShow(!show);
  }
  return (
    <div>
      <div onClick={switchShow} style={{padding: '5px 10px', backgroundColor: show?'#667':'#666'}}><span>{show ? ' ➖ ' : ' ➕ '}</span>{lable}</div>
      <div style={{ display: (show ? 'block' : 'none') }}>{children}</div>
    </div>
  );
}

function LeftPanel() {
  return (
    <Paper>
      <Folder lable="Sprite Tree" initShow={true}>
        <SpriteTree />
      </Folder>
      <Folder lable="File Tree" initShow={false}>
        <FileTree />
      </Folder>
    </Paper>
  );
}

export default LeftPanel;