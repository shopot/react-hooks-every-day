import React from 'react';

import './App.css';
import { useResizeObserver } from './hooks/useResizeObserver';

export const App = () => {
  const refDiv = React.useRef<HTMLDivElement>(null!);
  const size = useResizeObserver(refDiv, (size) => {
    console.log(JSON.stringify(size));
  });

  console.log(size);

  return (
    <div className="box">
      <h1>Hello React</h1>
      <div className="content" ref={refDiv}>
        useResizeObserver
      </div>
    </div>
  );
};
