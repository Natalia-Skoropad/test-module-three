import css from './ThirdOrderForm.module.css';

export default function DeliveryMethod() {
  return (
    <fieldset className={css.fieldset}>
      <legend className={css.legend}>Delivery method</legend>

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
  );
}
