import { useState } from 'react';

import { Button, ValidatedInput } from '../../index';
import { readString, validateTopic } from '../../utils/validation';

import css from './SearchForm.module.css';

//===============================================================

interface SearchFormProps {
  onSubmit: (topic: string) => void;
}

function SearchForm({ onSubmit }: SearchFormProps) {
  const [topicError, setTopicError] = useState('');

  const handleSubmit = (fd: FormData) => {
    const topic = readString(fd, 'topic');
    const err = validateTopic(topic);
    if (err) return setTopicError(err);

    setTopicError('');
    onSubmit(topic.trim());
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
          validator={validateTopic}
          externalError={topicError}
          onErrorChange={setTopicError}
        />
        <Button text="Search" variant="normal" type="submit" />
      </form>
    </>
  );
}

export default SearchForm;
