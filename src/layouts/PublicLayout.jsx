import { Outlet, useParams } from 'react-router-dom';
import { Wrapper } from '../components';
import logo from '../assets/mgs/logo_kickads.png';

export function PublicLayout() {
  const { year } = useParams();

  return (
    <>
      <header className="flex items-center justify-center relative">
        <img src={ logo } alt="Kickads" className="h-20 align-middle" />
        { year && (<span className="absolute top-[50px] right-[280px] px-3 py-1 text-kickads bg-kickads text-white rounded-xl text-xs font-medium">{ year }</span>) }
      </header>
      <main>
        <Wrapper>
          <Outlet />
        </Wrapper>
      </main>
    </>
  );
}