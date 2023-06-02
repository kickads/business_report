import { TailSpin } from 'react-loader-spinner';
import { ConsolidatedList, SearchBar } from '../components';
import { useBoundStore } from '../state/store';

export function Home() {
  const consolidatedYears = useBoundStore((state) => state.consolidatedYears);

  return (
    <>
      <SearchBar searched={ consolidatedYears } />
      <div className="mt-6 flow-root">
        { consolidatedYears.length < 1 && <TailSpin height="50" width="50" color="#00afa9" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass="justify-center" visible={true}/> }
        { consolidatedYears.length > 0 && (
          <ConsolidatedList list={ consolidatedYears } />
        ) }
      </div>
    </>
  );
}