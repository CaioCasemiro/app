
"use client";

import Categorias from './categorias';
import Destaques from './destaques';
import BolosNoPote from './listas/bolosNoPote';
import BoloVulcao from './listas/boloVulcao';
import Bombons from './listas/bombons';
import CopoDaFelicidade from './listas/copoDaFelicidade';
import Escondidinho from './listas/escondidinho';
import Fatias from './listas/fatias';
import { useHorario } from '../hooks/useHorario';
import SacolaDesktop from './components/SacolaDesktop';
import SacolaMobile from './components/SacolaMobile';
import { useSacola } from './context/sacolaContext';

export default function Home() {

  const { textoBarra, corBarra } = useHorario()
  const { abrirSacola } = useSacola()

  return (
    <>
      <div className='fixed top-0 left-0 w-full z-50 md:static md:z-auto'>
        <header className='shadow-md md:shadow-none md:bg-transparent'>
          <div className="flex items-center gap-2">
            <a href="/">
              <img className="w-24 h-20 " src="/logo.png" alt="logo adocicada" />
            </a>
            <h1 className="ml-15 text-xl font-[raleway] font-bold hidden md:block">Adocicada doceria</h1>
          </div>
          <div className="flex items-center gap-6 md:mr-">
            
            <div className='flex items-center  gap-6 mr-1'>
              <a
                  href="https://www.instagram.com/_adocicadadoceria"
                  target="_blank"
                  className="flex  gap-2 hover:underline hover:opacity-80 transition"
                >
                  <img src="/instagram.png" alt="Instagram logo" className="w-12 h-12 hidden md:inline" />
                </a>
              <a
                  href="https://api.whatsapp.com/send/?phone=%2B5589994282685&text&type=phone_number&app_absent=0"
                  target="_blank"
                  className="flex gap-2 hover:underline hover:opacity-80 transition"
                >
                  <img src="/whatsapp.png" alt="WhatsApp logo" className="w-12 h-12" />
                </a>
            </div>

            <a onClick={abrirSacola} className='cursor-pointer lg:hidden'>
              <img className="w-10 h-11 block md:hidden" src="/saco.png" alt="sacola de pedidos" />
            </a>
          </div>
        </header>
        <div className={`w-full ${corBarra} h-6 flex justify-center items-center`}>
          <p className="text-base text-white font-bold">{textoBarra}</p>
        </div>
      </div>

      <div className="lg:flex lg:gap-8">
        <main className="mt-40 md:mt-10 lg:flex-1">
          <section className='px-4 md:px-8 mx-auto mb-12 z-20'>
            <h3 className='text-xl font-[inter] ml-12 lg:ml-17 font-bold mb-8'>Destaques do dia</h3>
            <Destaques />
          </section>

          <section className='px-4 md:px-1 mx-auto'>
            <h3 className='text-xl font-[inter] ml-12 lg:ml-17 font-bold'>Categorias</h3>
            <Categorias />
          </section>

          <section id="bolosNoPote" className='px-4 md:px-8 mx-auto mb-10'>
            <h3 className='text-xl font-[inter] ml-12 lg:ml-17 font-bold mb-10'>Bolos no pote</h3>
            <BolosNoPote />
          </section>

          <section id="copoDaFelicidade" className='px-4 md:px-8 mx-auto mb-10'>
            <h3 className='text-xl font-[inter] ml-12 lg:ml-17 font-bold mb-10'>Copos da felicidade</h3>
            <CopoDaFelicidade />
          </section>

          <section id="boloVulcao" className='px-4 md:px-8 mx-auto mb-10'>
            <h3 className='text-xl font-[inter] ml-12 lg:ml-17 font-bold mb-10'>Bolos vulcão</h3>
            <BoloVulcao />
          </section>

          <section id="escondidinhoDeBrownie" className='px-4 md:px-8 mx-auto mb-10'>
            <h3 className='text-xl font-[inter] ml-12 lg:ml-17 font-bold mb-10'>Escondidinhos de brownie</h3>
            <Escondidinho />
          </section>

          <section id="bomBons" className='px-4 md:px-8 mx-auto mb-10'>
            <h3 className='text-xl font-[inter] ml-12 lg:ml-17 font-bold mb-10'>Bombons</h3>
            <Bombons />
          </section>

          <section id="fatiasDeBolo" className='px-4 md:px-8 mx-auto mb-10'>
            <h3 className='text-xl font-[inter] ml-12 lg:ml-17 font-bold mb-10'>Fatias de bolo</h3>
            <Fatias />
          </section>
        </main>

        <aside className="hidden lg:block lg:w-[360px] lg:mr-4">
          <SacolaDesktop />
        </aside>
      </div>

      <SacolaMobile />

      <footer className="mt-25 py-10 text-[#3e2723] bg-[#E8CCAC] font-[quicksand]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">

          <div className="flex flex-col items-center justify-center sm:items-start text-center sm:text-left space-y-3">
            <img src="/logo.png" alt="Logo Adocicada" className="w-28 h-auto mx-auto" />
            <p className="font-[raleway] text-sm leading-relaxed max-w-[220px] mx-auto mt-2">
              Adoce seu dia com nossos bolos e doces artesanais 💕
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-center text-center space-y-3">
            <h3 className="font-[raleway] font-semibold">Entre em contato</h3>

            <div className="flex flex-col items-center sm:items-start space-y-2 mt-2">
              <a
                href="https://api.whatsapp.com/send/?phone=%2B5589994282685&text&type=phone_number&app_absent=0"
                target="_blank"
                className="flex items-center gap-2 hover:underline hover:opacity-80 transition"
              >
                <img src="/whatsapp.png" alt="WhatsApp logo" className="w-6 h-6" />
                <p>Nosso WhatsApp</p>
              </a>

              <a
                href="https://www.instagram.com/_adocicadadoceria"
                target="_blank"
                className="flex items-center gap-2 hover:underline hover:opacity-80 transition mt-1.5"
              >
                <img src="/instagram.png" alt="Instagram logo" className="w-6 h-6" />
                <p>@_adocicadadoceria</p>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-end text-center sm:text-right space-y-3">
            <h3 className="font-[raleway] font-semibold">Desenvolvido por</h3>

            <div className="flex flex-col items-center sm:items-end space-y-1 mt-2">
              <a
                href="https://www.instagram.com/caiocasemiro__"
                target="_blank"
                className="hover:underline hover:opacity-80 transition"
              >
                @caiocasemiro__
              </a>

              <a
                href="mailto:casemirocaio2@gmail.com"
                className="text-sm hover:underline mt-3"
              >
                casemirocaio2@gmail.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
