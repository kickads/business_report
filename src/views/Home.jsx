import { useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { ConsolidatedList, SearchBar } from '../components';
import { useBoundStore } from '../state/store';
import { DateTime } from 'luxon';

const dt = DateTime.local();

export function Home() {
  const consolidatedYears = useBoundStore((state) => state.consolidatedYears);
  const setLastUpdated = useBoundStore((state) => state.setLastUpdated);
  const lastUpdate = useBoundStore((state) => state.lastUpdate);

  useEffect(() => {
    setLastUpdated();
  }, []);

  return (
    <>
      <SearchBar searched={ consolidatedYears } />
      <p className="text-xs text-gray-400 mt-3">Ultima actualización: <span>{ dt.setLocale('fr').toLocaleString(lastUpdate) }</span></p>
      <div className="mt-6 flow-root">
        { consolidatedYears.length < 1 && <TailSpin height="50" width="50" color="#00afa9" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass="justify-center" visible={true}/> }
        { consolidatedYears.length > 0 && (
          <ConsolidatedList list={ consolidatedYears } />
        ) }
      </div>
    </>
  );
}