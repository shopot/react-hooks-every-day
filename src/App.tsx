import { useEffect, useState } from 'react';
import { useDebounceValue } from './hooks/useDebounceValue';

export const App = () => {
  const [value, setValue] = useState('');

  const debouncedValue = useDebounceValue(value, 400);

  useEffect(() => {
    console.log('debouncedValue::', debouncedValue);
  }, [debouncedValue]);

  return (
    <div>
      <h1>Hello React</h1>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};
