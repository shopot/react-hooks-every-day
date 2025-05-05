import { useDebounceCallback } from './hooks/useDebounceCallback';

export const App = () => {
  const debouncedLog = useDebounceCallback((value: string) => {
    console.log(value);
  }, 2000);

  const handleClick = () => {
    console.log('Click');
    debouncedLog('Hello world!');
  };

  return (
    <div>
      <h1>Hello React</h1>
      <button onClick={handleClick}>Click</button>
    </div>
  );
};
