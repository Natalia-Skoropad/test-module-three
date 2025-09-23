import { Button } from '../../index';
import css from './Checkboxes.module.css';

//===============================================================

function Checkboxes() {
  const handleOrder = (formData: FormData) => {
    const restrictions = formData.getAll('restrictions') as string[];
    console.log('Dietary restrictions:', restrictions);
  };

  return (
    <>
      <h2>Checkboxes</h2>
      <form action={handleOrder}>
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Dietary restrictions:</legend>
          <label className={css.option}>
            <input type="checkbox" name="restrictions" value="vegan" />
            Vegan
          </label>
          <label className={css.option}>
            <input type="checkbox" name="restrictions" value="gluten-free" />
            Gluten-free
          </label>
          <label className={css.option}>
            <input type="checkbox" name="restrictions" value="nut-free" />
            Nut-free
          </label>
        </fieldset>
        <Button text="Place order" variant="normal" type="submit" />
      </form>
    </>
  );
}

export default Checkboxes;
