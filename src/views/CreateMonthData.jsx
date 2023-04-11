import { useForm } from 'react-hook-form';
import {
  setDoc,
  doc,
  arrayUnion
} from 'firebase/firestore';
import { db } from '../config';
import { useEffect, useRef, useState } from 'react';

export function CreateMonthData() {
  const { register, handleSubmit, formState, reset } = useForm();
  const [ show, setShow ] = useState(false);

  const submit = async (data) => {
    console.log(data);
    // console.log(data);
    const year = data.year;
    data.id = year;

    delete data.year;

    // await setDoc(doc(db, 'consolidated-report', year), {
    //   data: arrayUnion({
    //     ...data,
    //     values: {
    //       usd: data.usd,
    //       cop: data.cop,
    //       mxn: data.mxn,
    //       ars: data.ars,
    //     }
    //   })
    // }, { merge: true });

    await setDoc(doc(db, 'consolidated-report', year), {
      data: arrayUnion({ ...data })
    }, { merge: true });

    reset();
  };

  const handleInputChange = (e) => {
    if (!e.target.checked) {
      setShow(!show);
    } else {
      setShow(!show);
    }
  };

  return (
    <>
      <form action="/" onSubmit={ handleSubmit(submit) }>
        <div>
          <label htmlFor="year">Year</label>
          <input
            type="number"
            name="year"
            id="year"
            className="border border-2"{ ...register('year', { required: true }) }
          />
        </div>
        <div>
          <label htmlFor="month">Month</label>
          <input
            type="text"
            name="month"
            id="month"
            className="border border-2"{ ...register('month', { required: true }) }
          />
        </div>
        <div>
          <label htmlFor="revenue">Revenue</label>
          <input
            type="number"
            name="revenue"
            id="revenue"
            className="border border-2"{ ...register('revenue', { required: true }) }
          />
        </div>
        <div>
          <label htmlFor="spend">Spend</label>
          <input
            type="number"
            name="spend"
            id="spend"
            className="border border-2"{ ...register('spend', { required: true }) }
          />
        </div>
        <div>
          <label htmlFor="profit">Profit</label>
          <input
            type="number"
            name="profit"
            id="profit"
            className="border border-2"{ ...register('profit', { required: true }) }
          />
        </div>
        
        <div>
          <label htmlFor="show">Show</label>
          <input type="checkbox" name="show" id="show" onChange={ handleInputChange } />
        </div>

        {
          show && (
            <>
              <div>
                <label htmlFor="usd">USD</label>
                <input
                  type="number"
                  name="usd"
                  id="usd"
                  className="border border-2"{ ...register('usd', { required: true }) }
                />
              </div>
              <div>
                <label htmlFor="ars">ARS</label>
                <input
                  type="number"
                  name="ars"
                  id="ars"
                  className="border border-2"{ ...register('ars', { required: true }) }
                />
              </div>
              <div>
                <label htmlFor="mxn">MXN</label>
                <input
                  type="number"
                  name="mxn"
                  id="mxn"
                  className="border border-2"{ ...register('mxn', { required: true }) }
                />
              </div>
              <div>
                <label htmlFor="cop">COP</label>
                <input
                  type="number"
                  name="cop"
                  id="cop"
                  className="border border-2"{ ...register('cop', { required: true }) }
                />
              </div>
            </>
          )
        }

        <button>Guardar</button>
      </form>
    </>
  );
}