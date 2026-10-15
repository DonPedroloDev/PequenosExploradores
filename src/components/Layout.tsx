import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Bushes } from './Decor';
import { Header } from './Header';

export function Layout() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const prevPath = useRef(pathname);

  // Al cambiar de ruta: arriba del todo y foco al contenido (lectores de pantalla).
  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-crema">
      <a
        href="#contenido"
        className="absolute left-4 top-2 z-[60] -translate-y-24 rounded-full bg-sol px-5 py-3 font-display text-lg text-tinta focus:translate-y-0"
      >
        SALTAR AL CONTENIDO
      </a>
      <div className="mx-auto w-full max-w-page">
        <Header />
      </div>
      <main
        id="contenido"
        ref={mainRef}
        tabIndex={-1}
        className="relative mx-auto w-full max-w-page flex-1 pb-[120px] outline-none focus:shadow-none md:pb-[160px] lg:pb-0"
      >
        <Outlet />
      </main>
      <Bushes />
    </div>
  );
}
