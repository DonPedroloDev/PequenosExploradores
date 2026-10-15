import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { asset } from '../lib/assets';
import { cx } from '../lib/cx';
import { Bushes } from './Decor';

export type Section = 'inicio' | 'aprende' | 'juegos' | 'contacto';

const NAV: { id: Section; label: string; to: string; icon: string; iconH: string }[] = [
  { id: 'inicio', label: 'INICIO', to: '/', icon: 'logo.png', iconH: 'h-[50px]' },
  { id: 'aprende', label: 'APRENDE', to: '/aprende', icon: 'icon-aprende.png', iconH: 'h-[52px]' },
  { id: 'juegos', label: 'JUEGOS', to: '/juegos', icon: 'icon-juega.png', iconH: 'h-[44px]' },
  { id: 'contacto', label: 'CONTACTO', to: '/contacto', icon: 'icon-escribenos.png', iconH: 'h-[50px]' },
];

/** La sección activa se calcula por prefijo de ruta (/aprende/* marca APRENDE). */
export function sectionFromPath(pathname: string): Section | null {
  if (pathname === '/') return 'inicio';
  return NAV.find((n) => n.id !== 'inicio' && (pathname === n.to || pathname.startsWith(`${n.to}/`)))?.id ?? null;
}

/** Colores que rotan en las tarjetas no activas del menú móvil. */
const MENU_ROTATION = [
  'border-hoja bg-hoja-suave',
  'border-arena bg-arena-suave',
  'border-coral bg-coral-suave',
];

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="flex items-center gap-[10px] text-tinta no-underline md:items-center md:gap-3 lg:items-start lg:gap-u27"
    >
      <img src={asset('logo.png')} alt="" className="block w-14 lg:w-u94" />
      <span className="block font-display text-m-logo md:text-[22px] md:leading-[21px] lg:mt-0.5 lg:text-u35 lg:leading-u32">
        PEQUEÑOS
        <br />
        EXPLORADORES
      </span>
      <span className="sr-only">, ir al inicio</span>
    </Link>
  );
}

export function Header() {
  const { pathname } = useLocation();
  const active = sectionFromPath(pathname);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Al cerrar por navegación el foco lo maneja Layout (va al contenido), no el botón.
  const restoreFocus = useRef(true);

  // Cerrar al navegar.
  useEffect(() => {
    restoreFocus.current = false;
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    restoreFocus.current = true;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      // Mantener el foco dentro del menú.
      if (e.key === 'Tab' && panelRef.current) {
        const items = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const mq = window.matchMedia('(min-width: 768px)');
    const onResize = () => mq.matches && setOpen(false);

    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onResize);
      if (restoreFocus.current) toggleRef.current?.focus();
    };
  }, [open]);

  let rot = 0;

  return (
    <header className="relative z-20 flex h-20 items-start justify-between pl-4 pr-4 pt-[14px] md:h-[100px] md:pl-6 md:pr-5 md:pt-4 lg:pt-5 lg:pl-u51 lg:pr-u42">
      <Logo />

      {/* Escritorio */}
      <nav aria-label="Principal" className="hidden md:mt-1.5 md:block lg:mt-[9px]">
        <ul className="flex gap-1">
          {NAV.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.to}
                aria-current={active === item.id ? 'page' : undefined}
                className={cx(
                  'block h-11 whitespace-nowrap rounded-full px-3 font-display text-[17px] leading-[44px] text-tinta no-underline transition-colors duration-150 lg:h-12 lg:px-u23 lg:text-u22 lg:leading-[48px]',
                  active === item.id ? 'bg-sol' : 'hover:bg-arena-suave',
                )}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Móvil: botón hamburguesa */}
      <button
        ref={toggleRef}
        type="button"
        aria-label="Abrir menú"
        aria-expanded={open}
        aria-controls="menu-movil"
        onClick={() => setOpen(true)}
        className="mt-0.5 flex h-12 w-12 flex-col items-center justify-center gap-[5px] rounded-2xl bg-sol md:hidden"
      >
        {[0, 1, 2].map((i) => (
          <span key={i} className="block h-[3.5px] w-[22px] rounded-sm bg-tinta" />
        ))}
      </button>

      {/* Menú móvil abierto (M02) */}
      {open && (
        <div
          ref={panelRef}
          id="menu-movil"
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          className="fixed inset-0 z-50 overflow-y-auto bg-crema md:hidden"
        >
          <div className="relative min-h-full pb-[140px]">
            <div className="flex h-20 items-start justify-between px-4 pt-[14px]">
              <Logo onClick={() => setOpen(false)} />
              <button
                ref={closeRef}
                type="button"
                aria-label="Cerrar menú"
                onClick={() => setOpen(false)}
                className="relative mt-0.5 h-12 w-12 rounded-2xl border-3 border-tinta bg-crema"
              >
                <span className="absolute left-[10px] top-[19px] h-[3.5px] w-[22px] rotate-45 rounded-sm bg-tinta" />
                <span className="absolute left-[10px] top-[19px] h-[3.5px] w-[22px] -rotate-45 rounded-sm bg-tinta" />
              </button>
            </div>
            <nav aria-label="Principal" className="px-5 pt-4">
              <ul className="flex flex-col gap-3">
                {NAV.map((item) => {
                  const isActive = active === item.id;
                  const tone = isActive ? 'border-tinta bg-sol' : MENU_ROTATION[rot++ % MENU_ROTATION.length];
                  return (
                    <li key={item.id}>
                      <Link
                        to={item.to}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => setOpen(false)}
                        className={cx(
                          'flex h-[84px] items-center gap-4 rounded-[20px] border-3 px-[18px] font-display text-[30px] text-tinta no-underline',
                          tone,
                        )}
                      >
                        <span className="flex w-16 justify-center">
                          <img src={asset(item.icon)} alt="" className={item.iconH} />
                        </span>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="mt-[34px] flex flex-col items-center gap-1.5">
              <img src={asset('mascot.png')} alt="" className="w-[250px]" />
              <p className="font-body text-lg font-medium leading-[26px] text-hoja-texto">
                Un planeta más verde empieza contigo.
              </p>
            </div>
            <Bushes />
          </div>
        </div>
      )}
    </header>
  );
}
