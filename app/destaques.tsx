"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';



const produtos = [
    { id: 1, nome: "Bombom de morango", preço: "R$ 12,00", img: "/bombomMorango12.jpeg" },
    { id: 2, nome: "Escondidinho de ninho com nutella", preço: "R$ 12,00", img: "/escondidinhoNinhoNutella12.jpeg" },
    { id: 3, nome: "Copo de Kit Kat", preço: "R$ 10,00", img: "/kitKat10.jpeg" },
    { id: 4, nome: "Geleia de morango", preço: "R$ 12,00", img: "/geleiaMorango12.jpeg" },
    { id: 5, nome: "Copo de maracujá", preço: "R$ 10,00", img: "/maracuja10.jpeg" },
]


export default function Destaques() {
    return (
        <>
            <div className='block md:hidden relative'>
                <Swiper
                    modules={[Navigation]}
                    navigation={true}
                    spaceBetween={25}
                    slidesPerView={2.7}
                    centeredSlides={false}
                    className="px-4 overflow-visible"
                >
                    {produtos.map((produto) => (
                        <SwiperSlide
                            key={produto.id}
                            className="bg-white rounded-lg shadow-md p-3.5 w-48 flex flex-col items-center justify-center text-center mb-10 hover:bg-[#cfcfcfab] transition-transform hover:scale-[1.02]"
                        >
                            <img src={produto.img}
                                alt={produto.nome}
                                className='w-35 mx-auto h-40 object-cover rounded-lg' />
                            <p className='mt-2 font-semibold font-[quicksand] text-center'>{produto.nome}</p>
                            <p className='text-green-700 font-bold mt-1'>{produto.preço}</p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="hidden md:flex md:flex-wrap md:justify-center md:gap-8 mt-6">
                {produtos.map((produto) => (
                    <div
                        key={produto.id}
                        className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center w-[200px] mb-10 hover:bg-[#cfcfcfab] transition-transform hover:scale-[1.03]"
                    >
                        <img
                            src={produto.img}
                            alt={produto.nome}
                            className="w-[80%] h-40 object-cover rounded-md"
                        />
                        <p className="mt-2 font-semibold font-[quicksand] text-center">{produto.nome}</p>
                        <p className="text-green-700 font-bold mt-1">{produto.preço}</p>
                    </div>
                ))}
            </div>


        </>


    )
}