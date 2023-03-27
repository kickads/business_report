import { useForm } from 'react-hook-form';
import { addDoc, collection, setDoc, doc } from 'firebase/firestore';
import { db } from '../config/index.js';

export function CreateYearForm() {
  const { register, handleSubmit, formState, reset } = useForm();

  const submit = async (data) => {
    const year = data.year;

    delete data.year;

    await setDoc(doc(db, "consolidated-report", year), {});

    reset();
  };

  return (
    <form action="/" onSubmit={ handleSubmit(submit) }>
      <div>
        <label htmlFor="year">Year</label> <input
        type="number"
        name="year"
        id="year"
        className="border border-2"{ ...register('year', { required: true }) } />
      </div>
      <button>Guardar</button>
    </form>
  );
}