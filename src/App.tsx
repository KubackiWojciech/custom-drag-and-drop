import React, { createContext, useEffect, useRef, useState } from 'react';
import NotesIcon from '@mui/icons-material/Notes';

import './dragAndDropFile.css'

export default function App() {
  return (
    <DragAndDropFile />
  );
}

const FileListContext = createContext<[File[], (x: File[]) => void]>(null!);

function DragAndDropFile() {
  const [fileList, setFileList] = useState<File[]>([]);

  useEffect(() => {
    container.current.addEventListener('dragover', handleDragOver);
    container.current.addEventListener('drop', handleDrop);

    return () => {
      container.current.removeEventListener('dragover', handleDragOver);
      container.current.removeEventListener('drop', handleDrop);
    };
  }, []);

  const container = useRef<HTMLDivElement>(null!);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    let newFiles = e.dataTransfer?.files;

    if (fileList && newFiles) {
      setFileList([...fileList, ...Array.from(newFiles)]);
    }
    console.log(newFiles)
  };


  return (
    <div className="d-d" ref={container}>
      {
        fileList.map(x => <FileCard file={x}/>)
      }
    </div>
  )
}

function FileCard(param: { file: any }) {
  useEffect(() => {
    console.log(param.file.type.split('/')[0])

  }, [])
  
  return (
    <div className="file-container">
      {
        param.file.type.split('/')[0] === 'image' ?
          <ImageCard file={param.file} />
          : <TextCard file={param.file} />
      }
    </div>
  )
}

function ImageCard(param: { file: any }) {

  return (
    <img src={URL.createObjectURL(param.file)} alt={param.file.name}/>
  )
}

function TextCard(param: { file: any }) {
  return (
    <NotesIcon />
  )
}