import { useCallback, useEffect, useRef } from 'react';
import { createStyles } from 'antd-style';

const useStyles = createStyles(() => ({
  container: {
    transition: 'opacity 0.3s ease-in-out',
    '&::before': {
      content: '" "',
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: 'rgb(255 255 255 / 30%)',
      backdropFilter: 'blur(3px)',
      width: '100%',
      height: '100%',
      display: 'block',
    },
  },
  visible: {
    '&:before': {
      display: 'none',
    },
  },
}));

export const useBlurContent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { styles } = useStyles();

  const handleMouseEnter = useCallback(() => {
    if (ref.current) {
      ref.current.classList.add(styles.visible);
    }
  }, [styles.visible]);

  const handleMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.classList.remove(styles.visible);
    }
  }, [styles.visible]);

  useEffect(() => {
    const element = ref.current;

    if (element) {
      element.classList.add(styles.container);
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [handleMouseEnter, handleMouseLeave, styles.container]);

  return ref;
};
