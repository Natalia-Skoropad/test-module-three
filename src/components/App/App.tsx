import { useState } from 'react';
import clsx from 'clsx';

import {
  Button,
  FirstOrderForm,
  SearchForm,
  ArticleList,
  SecondOrderForm,
  RadioButtons,
  Checkboxes,
  DropDownList,
  ThemeToggle,
  Loader,
  ThirdOrderForm,
} from '../../index';

import type { Article } from '../../types/article';
import { fetchArticles } from '../../services/articleService';

import css from './App.module.css';

//===============================================================

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (topic: string) => {
    try {
      setIsError(false);
      setArticles([]);
      setIsLoading(true);
      const data = await fetchArticles(topic);
      setArticles(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setArticles([]);
    setIsError(false);
    setIsLoading(false);
  };

  const handleOrder = (data: string) => {
    console.log('Order received from:', data);
  };

  return (
    <>
      <ThemeToggle />

      <main className={css.container}>
        <section className={clsx(css.card, css.stack)}>
          <SearchForm onSubmit={handleSearch} />

          {isLoading && (
            <div className={css.loaderRow}>
              <Loader label="Loading data…" />
            </div>
          )}

          {isError && (
            <p className={css.error}>
              Whoops, something went wrong! Please try again.
            </p>
          )}
        </section>

        {articles.length > 0 && (
          <section className={clsx(css.card, css.stack)}>
            <div className={css.headerRow}>
              <h2>Results</h2>
              <Button
                text="Reset"
                variant="reset"
                type="button"
                onClick={handleReset}
              />
            </div>

            <ArticleList items={articles} />
          </section>
        )}

        <section className={clsx(css.card, css.stack)}>
          <FirstOrderForm onSubmit={handleOrder} />
        </section>

        <section className={clsx(css.card, css.stack)}>
          <SecondOrderForm />
        </section>

        <section className={clsx(css.card, css.stack)}>
          <RadioButtons />
        </section>

        <section className={clsx(css.card, css.stack)}>
          <Checkboxes />
        </section>

        <section className={clsx(css.card, css.stack)}>
          <DropDownList />
        </section>

        <section className={clsx(css.card, css.stack)}>
          <ThirdOrderForm />
        </section>
      </main>
    </>
  );
}

export default App;
