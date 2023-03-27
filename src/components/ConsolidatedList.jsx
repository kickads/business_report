import { CalendarDaysIcon } from '@heroicons/react/24/outline/index.js';
import { Link } from 'react-router-dom';
import { useBoundStore } from '../state/store';

export function ConsolidatedList({ list }) {
  const yearFound = useBoundStore((state) => state.yearFound);
  const filterList = !yearFound ? list : list.filter(year => year.includes(yearFound));

  return (
    <ul role="list" className="-my-5 divide-y divide-gray-200">
      { filterList.map(name => (
        <li key={ name } className="py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <CalendarDaysIcon className="w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">{ name }</p>
            </div>
            <div>
              <Link
                to={ `/consolidated/${ name }` }
                className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              > Ver </Link>
            </div>
          </div>
        </li>
      )) }
    </ul>
  );
}