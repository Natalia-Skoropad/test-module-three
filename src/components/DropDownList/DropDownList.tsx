import { useId } from 'react';
import { Button } from '../../index';
import css from './DropDownList.module.css';

//===============================================================

function DropDownList() {
  const fieldId = useId();
  const handleOrder = (formData: FormData) => {
    const deliveryTime = formData.get('deliveryTime') as string;
    console.log('Preferred delivery time:', deliveryTime);
  };

  return (
    <>
      <h2>Drop-down List</h2>
      <form className={css.form} action={handleOrder}>
        <label htmlFor={`${fieldId}-deliveryTime`} className={css.label}>
          Preferred delivery time
        </label>
        <select
          name="deliveryTime"
          id={`${fieldId}-deliveryTime`}
          defaultValue=""
          className={css.select}
        >
          <option value="">-- Choose delivery time --</option>
          <option value="morning">Morning (8:00-12:00)</option>
          <option value="afternoon">Afternoon (12:00-16:00)</option>
          <option value="evening">Evening (16:00-20:00)</option>
        </select>
        <Button text="Place order" variant="normal" type="submit" />
      </form>
    </>
  );
}
export default DropDownList;
