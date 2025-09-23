import { Button } from '../../index';
import css from './RadioButtons.module.css';

//===============================================================

function RadioButtons() {
  const handleOrder = (formData: FormData) => {
    const delivery = formData.get('delivery') as string;
    console.log('Delivery:', delivery);
  };

  return (
    <>
      <h2>Radio Buttons</h2>
      <form action={handleOrder}>
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Delivery method:</legend>
          <label className={css.option}>
            <input type="radio" name="delivery" value="pickup" defaultChecked />
            Pickup
          </label>
          <label className={css.option}>
            <input type="radio" name="delivery" value="courier" />
            Courier
          </label>
          <label className={css.option}>
            <input type="radio" name="delivery" value="drone" />
            Drone delivery
          </label>
        </fieldset>
        <Button text="Place order" variant="normal" type="submit" />
      </form>
    </>
  );
}
export default RadioButtons;
