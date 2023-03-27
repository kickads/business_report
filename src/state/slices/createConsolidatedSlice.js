import { collection, getDocs, query, doc, getDoc } from 'firebase/firestore';
import { db } from '../../config';

const initialState = [];

export const createConsolidatedSlice = (set) => ({
  consolidatedYears: initialState,
  consolidatedData: [],
  fetch: async () => {
    const dataYears = [];
    const q = query(collection(db, 'consolidated-report'));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      dataYears.push({ year: doc.id });
    });

    set({ consolidatedYears: dataYears });
  },
  getConsolidatedById: async(id) => {
    const docRef = doc(db, 'consolidated-report', id);
    const docSnap = await getDoc(docRef);

    set({ consolidatedData: docSnap.data().data });
  }
});