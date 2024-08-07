import React, { useState, useEffect } from 'react';
import Example from './Example';

const ExampleWrapper = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    const savedText = localStorage.getItem('text');
    if (savedText) {
      setText(savedText);
    }
  }, []);

  const toggleText = (changedText) => {
    setText(changedText);
    localStorage.setItem('text', changedText);
  };

  return <Example toggleText={toggleText} />;
};

export default ExampleWrapper;
