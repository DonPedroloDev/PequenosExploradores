import { useEffect, useReducer, useRef, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Cloud, Rays } from '../components/Decor';
import { Field } from '../components/Field';
import { usePageTitle } from '../hooks/usePageTitle';
import { asset } from '../lib/assets';
import { sendContact, type ContactPayload } from '../lib/contact';
import { validar, validarCampo, type Campo, type Errores } from '../lib/validacion';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type State = { values: ContactPayload; errors: Errores; touched: Partial<Record<Campo, boolean>>; status: Status };
type Action =
  | { type: 'change'; campo: Campo; valor: string }
  | { type: 'blur'; campo: Campo }
  | { type: 'submit'; errors: Errores }
  | { type: 'sent' }
  | { type: 'failed' }
  | { type: 'reset' };

const INICIAL: State = { values: { nombre: '', correo: '', mensaje: '' }, errors: {}, touched: {}, status: 'idle' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'change': {
      const values = { ...state.values, [action.campo]: action.valor };
      // Si el campo ya se tocó, el error se actualiza mientras escribe.
      const errors = state.touched[action.campo]
        ? { ...state.errors, [action.campo]: validarCampo(action.campo, action.valor) }
        : state.errors;
      return { ...state, values, errors, status: state.status === 'error' ? 'idle' : state.status };
    }
    case 'blur':
      return {
        ...state,
        touched: { ...state.touched, [action.campo]: true },
        errors: { ...state.errors, [action.campo]: validarCampo(action.campo, state.values[action.campo]) },
      };
    case 'submit': {
      const ok = Object.keys(action.errors).length === 0;
      return {
        ...state,
        errors: action.errors,
        touched: { nombre: true, correo: true, mensaje: true },
        status: ok ? 'sending' : state.status,
      };
    }
    case 'sent':
      return { ...state, status: 'sent' };
    case 'failed':
      return { ...state, status: 'error' };
    case 'reset':
      return INICIAL;
  }
}

const CAMPOS: Campo[] = ['nombre', 'correo', 'mensaje'];

export default function Contacto() {
  usePageTitle('Contacto');
  const [state, dispatch] = useReducer(reducer, INICIAL);
  const refs = useRef<Partial<Record<Campo, HTMLInputElement | HTMLTextAreaElement | null>>>({});
  const confirmRef = useRef<HTMLHeadingElement>(null);
  const { values, errors, status } = state;
  const enviando = status === 'sending';

  const trasReset = useRef(false);

  // Foco: a la confirmación al enviar; al primer campo después de "Escribir otro mensaje".
  useEffect(() => {
    if (status === 'sent') confirmRef.current?.focus();
    if (status === 'idle' && trasReset.current) {
      trasReset.current = false;
      refs.current.nombre?.focus();
    }
  }, [status]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (enviando) return;
    const errs = validar(values);
    dispatch({ type: 'submit', errors: errs });
    const primero = CAMPOS.find((c) => errs[c]);
    if (primero) {
      refs.current[primero]?.focus();
      return;
    }
    try {
      await sendContact({ nombre: values.nombre.trim(), correo: values.correo.trim(), mensaje: values.mensaje.trim() });
      dispatch({ type: 'sent' });
    } catch {
      dispatch({ type: 'failed' });
    }
  };

  const bind = (campo: Campo) => ({
    ref: (el: HTMLInputElement | HTMLTextAreaElement | null) => {
      refs.current[campo] = el;
    },
    name: campo,
    value: values[campo],
    error: errors[campo],
    disabled: enviando,
    onChange: (e: { target: { value: string } }) => dispatch({ type: 'change', campo, valor: e.target.value }),
    onBlur: () => dispatch({ type: 'blur', campo }),
  });

  return (
    <div className="relative px-5 md:mx-auto md:max-w-[760px] md:px-10 lg:grid lg:max-w-none lg:grid-cols-[calc(766*var(--u))_calc(550*var(--u))] lg:px-0">
      <Cloud n={2} className="absolute hidden lg:left-u22 lg:top-u122 lg:block lg:w-u111" />

      {/* Columna izquierda: título y buzón */}
      <div className="relative flex flex-col items-center text-center lg:block lg:h-u710">
        <div className="mt-[18px] flex items-center justify-center gap-2 lg:contents">
          <Rays className="w-[22px] lg:absolute lg:left-u138 lg:top-u44 lg:w-u40" />
          <h1 className="text-[52px] leading-[56px] md:text-[66px] md:leading-[66px] lg:absolute lg:left-u36 lg:top-u44 lg:w-u800 lg:text-u84 lg:leading-u80">
            ¡ESCRÍBENOS!
          </h1>
          <Rays flip className="w-[22px] lg:absolute lg:left-u706 lg:top-u46 lg:w-u44" />
        </div>
        <p className="mt-2 text-m-lead font-medium md:text-[24px] md:leading-8 lg:absolute lg:left-u36 lg:top-u137 lg:m-0 lg:w-u800 lg:text-u30 lg:leading-u36">
          Envíanos tus ideas, dudas o mensajes <br className="hidden md:inline" />
          para cuidar juntos el planeta.
        </p>
        <img
          src={asset('mailbox.png')}
          alt="Buzón con una carta"
          className={`mt-3 md:w-[340px] lg:absolute lg:left-u96 lg:top-u226 lg:m-0 lg:w-u593 ${status === 'sent' ? 'w-[220px]' : 'w-[250px]'}`}
        />
      </div>

      {/* Columna derecha: formulario o confirmación */}
      <div className="lg:pt-u62">
        {status === 'sent' ? (
          <section
            aria-labelledby="enviado"
            className="mt-[14px] flex flex-col items-center rounded-[22px] border-3 border-hoja-form bg-hoja-form_bg px-5 pb-[22px] pt-[26px] text-center motion-safe:animate-aparece md:px-10 lg:mt-0 lg:h-u568 lg:justify-center lg:rounded-card-lg lg:px-12 lg:py-0"
          >
            <span className="flex h-[92px] w-[92px] items-center justify-center rounded-full border-3 border-tinta bg-sol lg:h-[120px] lg:w-[120px]">
              <svg viewBox="0 0 56 44" className="h-[34px] w-11 lg:h-11 lg:w-14" aria-hidden="true">
                <path d="M6 22 L21 37 L50 7" stroke="#0F2E22" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h2 id="enviado" ref={confirmRef} tabIndex={-1} className="mt-[18px] text-[32px] leading-9 outline-none lg:mt-7 lg:text-[44px] lg:leading-[48px]">
              ¡MENSAJE ENVIADO!
            </h2>
            <p className="mt-[10px] text-lg leading-[26px] [text-wrap:pretty] lg:mt-3 lg:text-[22px] lg:leading-8">
              Gracias, {values.nombre.trim()}. Leeremos tu mensaje y te responderemos a{' '}
              <b className="break-all font-semibold">{values.correo.trim()}</b>
            </p>
            <Button
              onClick={() => {
                trasReset.current = true;
                dispatch({ type: 'reset' });
              }}
              className="mt-[22px] h-[58px] w-full text-[21px] lg:mt-8 lg:h-16 lg:w-auto lg:px-9 lg:text-[26px]"
            >
              ESCRIBIR OTRO MENSAJE
            </Button>
            <Link to="/" className="mt-[14px] font-display text-base text-hoja underline underline-offset-4 hover:text-tinta lg:mt-[18px] lg:text-lg">
              VOLVER AL INICIO
            </Link>
          </section>
        ) : (
          <form
            noValidate
            onSubmit={onSubmit}
            aria-label="Formulario de contacto"
            className="mt-[14px] flex flex-col gap-4 rounded-[22px] border-3 border-hoja-form bg-hoja-form_bg px-[18px] pb-[18px] pt-5 md:px-8 md:pt-7 lg:mt-0 lg:min-h-u568 lg:gap-[22px] lg:rounded-card-lg lg:px-[30px] lg:pb-5 lg:pt-[31px]"
          >
            <Field label="NOMBRE" placeholder="Escribe tu nombre" autoComplete="given-name" {...bind('nombre')} />
            <Field label="CORREO" type="email" inputMode="email" placeholder="Escribe tu correo" autoComplete="email" {...bind('correo')} />
            <Field label="MENSAJE" multiline placeholder="Cuéntanos qué quieres compartir" {...bind('mensaje')} />

            <div className="mt-1 flex flex-col items-center lg:mt-px">
              <Button
                type="submit"
                disabled={enviando}
                aria-disabled={enviando}
                className="w-full text-[24px] lg:h-[65px] lg:w-[380px] lg:text-[31px]"
              >
                {enviando ? 'ENVIANDO…' : 'ENVIAR MENSAJE'}
              </Button>
              <p role="status" className="mt-3 flex items-center justify-center gap-[10px] text-[17px] font-medium leading-[22px] text-hoja-texto lg:mt-[17px] lg:gap-3 lg:text-[21px] lg:leading-6">
                {status === 'error' ? (
                  <span className="font-semibold text-error">¡Ups! No pudimos enviar tu mensaje. Intenta otra vez.</span>
                ) : (
                  <>
                    <Rays className="w-[13px] lg:w-4" />
                    ¡Nos encantará leerte!
                    <Rays flip className="w-[13px] lg:w-4" />
                  </>
                )}
              </p>
            </div>
          </form>
        )}
      </div>

      <Cloud n={3} className="absolute hidden lg:left-u1278 lg:top-u2 lg:block lg:w-u145" />
    </div>
  );
}
