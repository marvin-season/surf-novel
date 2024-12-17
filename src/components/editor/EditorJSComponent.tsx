"use client";

import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';

interface EditorJSComponentProps {
  data: any;
  onChange: (data: any) => void;
}

const EditorJSComponent: React.FC<EditorJSComponentProps> = ({ data, onChange }) => {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editor-js',
      data,
      onChange: async () => {
        const savedData = await editor.save();
        console.log('savedData',savedData);
        // onChange(savedData);
      },
      // Add more Editor.js configuration here if needed
    });

    editorRef.current = editor;

    return () => {
      // editorRef.current?.destroy();
      // editorRef.current = null;
    };
  }, [data, onChange]);

  return <div id="editor-js" className="h-full bg-white dark:bg-gray-800" />;
};

export default EditorJSComponent;
