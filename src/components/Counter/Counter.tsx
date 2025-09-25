import { useState, useEffect } from 'react';
import { Button } from '../../index';

import css from './Counter.module.css';

//===============================================================

export default function Counter() {
  const [clicks, setClicks] = useState<number>(() => {
    const raw = localStorage.getItem('saved-clicks');
    if (!raw) return 0;
    const n = Number(raw);
    return Number.isFinite(n) ? n : 0;
  });

  useEffect(() => {
    localStorage.setItem('saved-clicks', String(clicks));
  }, [clicks]);

  return (
    <div className={css.div}>
      <Button onClick={() => setClicks(clicks + 1)} type="button">
        You clicked {clicks} time{clicks === 1 ? '' : 's'}
      </Button>

      <Button
        onClick={() => setClicks(0)}
        type="button"
        text="Reset"
        variant="reset"
      />
    </div>
  );
}
