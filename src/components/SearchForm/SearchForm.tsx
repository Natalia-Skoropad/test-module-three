import { useState } from 'react';

import { Button, ValidatedInput } from '../../index';
import { readString, validateTopic } from '../../utils/validation';
import { useLocalStorageString } from '../../utils/useLocalStorageString';

import css from './SearchForm.module.css';

//===============================================================

interface SearchFormProps {
  onSubmit: (topic: string) => void;
}

const LS_KEY = 'searchForm.topic';

function SearchForm({ onSubmit }: SearchFormProps) {
  const [topic, setTopic] = useLocalStorageString(LS_KEY, '');
  const [error, setError] = useState('');

  const handleChange = (val: string) => {
    setTopic(val);
    setError(validateTopic(val) ?? '');
  };

  const handleSubmit = (formaDate: FormData) => {
    const topic = readString(formaDate, 'topic');

    const err = validateTopic(topic);
    if (err) return setError(err);

    const trimmed = topic.trim();
    onSubmit(trimmed);

    setTopic('');
    setError('');
  };

  return (
    <>
      <h2>Search form</h2>
      <h3>Search</h3>

      <form className={css.form} action={handleSubmit}>
        <ValidatedInput
          name="topic"
          label="Search"
          srOnlyLabel
          placeholder="Enter search topic"
          value={topic}
          onChangeValue={handleChange}
          error={error}
        />
        <Button text="Search" variant="normal" type="submit" />
      </form>
    </>
  );
}

export default SearchForm;
