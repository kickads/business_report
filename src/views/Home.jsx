import { useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { ConsolidatedList, SearchBar } from '../components';
import { useBoundStore } from '../state/store';

export function Home() {
  const fetchData = useBoundStore((state) => state.fetch);
  const consolidatedYears = useBoundStore((state) => state.consolidatedYears);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SearchBar searchData={ consolidatedYears } />
        <div className="mt-6 flow-root">
          { consolidatedYears.length < 1 && <TailSpin height="50" width="50" color="#00afa9" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass="justify-center" visible={true}/> }
          { consolidatedYears.length > 0 && (
            <ConsolidatedList list={ consolidatedYears } />
          ) }
        </div>
      </div>
    </>
  );
}