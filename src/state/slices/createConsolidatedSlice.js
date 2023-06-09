const initialState = [];

export const createConsolidatedSlice = (set) => ({
  consolidatedYears: [ '2023' ],
  consolidatedData: initialState,
  lastUpdate: '',
  yearFound: '',
  findConsolidatedYear: (newYearFound) => set((state) => ({ yearFound: newYearFound })),
  getConsolidatedById: async (id) => {
    const fetchData = await fetch('https://sidekickads.com/apiRest/financeTotals?hash=5f8995e54e87c8a947bec5d75fa0a7b4&year=2023');
    const jsonFetch = await fetchData.json();

    set({ consolidatedData: jsonFetch.data });
  },
  setLastUpdated: async () => {
    const fetchData = await fetch('https://sidekickads.com/apiRest/financeTotals?hash=5f8995e54e87c8a947bec5d75fa0a7b4&year=2023');
    const jsonFetch = await fetchData.json();
    console.log(jsonFetch.totals.last_modified);

    set(() => ({ lastUpdate: jsonFetch.totals.last_modified}));
  }
});