import { Outlet } from 'react-router-dom';
import { Wrapper } from '../components';
import logo from '../assets/mgs/logo_kickads.png';

export function PublicLayout() {
  return (
    <>
      <header className="flex items-center justify-center">
        <img src={ logo } alt="Kickads" className="h-20 align-middle" />
      </header>
      <main>
        <Wrapper>
          <Outlet />
        </Wrapper>
      </main>
    </>
  );
}