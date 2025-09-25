import { useState } from 'react';
import { Button } from '../../index';

import Timer from './Timer';

import css from './Timer.module.css';

//===============================================================

export default function BoxTimer() {
  const [isOpen, setIsOpen] = useState(false);

  const handleTimer = () => setIsOpen(!isOpen);

  return (
    <>
      <h2>Timer Box</h2>
      <div className={css.timer}>
        <Button
          onClick={handleTimer}
          type="button"
          text={isOpen ? 'Hide timer' : 'Show timer'}
        />
        {isOpen && <Timer />}
      </div>
    </>
  );
}
