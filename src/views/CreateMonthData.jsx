import { useForm } from 'react-hook-form';
import {
  setDoc,
  doc,
  arrayUnion
} from 'firebase/firestore';
import { db } from '../config';

export function CreateMonthData() {
  const { register, handleSubmit, formState, reset } = useForm();

  const submit = async (data) => {
    const year = data.year;
    data.id = year;

    delete data.year;

    await setDoc(doc(db, 'consolidated-report', year), {
      data: arrayUnion({ ...data })
    }, { merge: true });

    reset();
  };

  return (
    <>
      <form action="/" onSubmit={ handleSubmit(submit) }>
        <div>
          <label htmlFor="year">Year</label> <input
          type="number"
          name="year"
          id="year"
          className="border border-2"{ ...register('year', { required: true }) } />
        </div>
        <div>
          <label htmlFor="month">Month</label> <input
          type="text"
          name="month"
          id="month"
          className="border border-2"{ ...register('month', { required: true }) } />
        </div>
        <div>
          <label htmlFor="revenue">Revenue</label> <input
          type="number"
          name="revenue"
          id="revenue"
          className="border border-2"{ ...register('revenue', { required: true }) } />
        </div>
        <div>
          <label htmlFor="spend">Spend</label> <input
          type="number"
          name="spend"
          id="spend"
          className="border border-2"{ ...register('spend', { required: true }) } />
        </div>
        <div>
          <label htmlFor="profit">Profit</label> <input
          type="number"
          name="profit"
          id="profit"
          className="border border-2"{ ...register('profit', { required: true }) } />
        </div>

        <button>Guardar</button>
      </form>
    </>
  );
}