import { Link } from 'react-router-dom';
import { CalendarDaysIcon } from '@heroicons/react/24/outline/index.js';

export function MonthsList({ list }) {
  return (
    <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
      <ul role="list" className="-my-5 divide-y divide-gray-200">
        { list.map((item) => (
          <li key={ item.month } className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <CalendarDaysIcon className="w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">{ item.month }</p>
              </div>
              <div>
                <Link
                  to={ `${ item.month }` }
                  state={{ consolidated: item }}
                  className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                > Ver </Link>
              </div>
            </div>
          </li>
        )) }
      </ul>
    </div>
  );
}