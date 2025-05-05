import { useCallback, useState } from 'react';

type UseBooleanReturn = {
  value: boolean;
  setValue: (v: boolean) => void;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
};

export const useBoolean = (initialValue: boolean = false): UseBooleanReturn => {
  const [value, setValue] = useState<boolean>(initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((v) => !v), []);

  return { value, setValue, setTrue, setFalse, toggle };
};
