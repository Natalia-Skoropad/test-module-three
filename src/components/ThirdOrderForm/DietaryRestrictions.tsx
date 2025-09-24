import css from './ThirdOrderForm.module.css';

export default function DietaryRestrictions() {
  return (
    <fieldset className={css.fieldset}>
      <legend className={css.legend}>Dietary restrictions</legend>

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
  );
}
