import React, { useState, useContext, useEffect } from 'react';
import { DataContext, readJson } from './data_model';

const FilePerview = () => {
  const [text, setText] = useState('');
  const ctx = useContext(DataContext);
  useEffect(() => {
    if(ctx.state.selectedFile.toLowerCase().endsWith('.json')){
      readJson(ctx.state.selectedFile, data => setText(JSON.stringify(data, null, 2)));
    }
  }, [ctx.state.selectedFile]);

  if(!ctx.state.selectedFile) {
    return (
      <div>No file selected.</div>
    );
  }
  if(ctx.state.selectedFile.toLowerCase().endsWith('.png')||ctx.state.selectedFile.toLowerCase().endsWith('.jpg')||ctx.state.selectedFile.toLowerCase().endsWith('.gif')) {
    return (
      <div>
        <img src={ctx.state.selectedFile} alt={ctx.state.selectedFile} />
      </div>
    );
  }
  if(ctx.state.selectedFile.toLowerCase().endsWith('.json')){
    return (
      <code style={{whiteSpace: 'pre'}}>
        {text};
      </code>
    );
  }
  return (<div>No perview</div>)
};
export default FilePerview;