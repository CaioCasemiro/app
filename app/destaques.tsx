"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useState } from "react";
import ModalProduto from "./components/modalProduto";
import 'swiper/css';
import 'swiper/css/navigation';




const produtos = [
    { id: 1, nome: "Bombom de morango", preco: "R$ 12,00", img: "/bombomMorango12.jpeg", quantidadeDisponivel: 10 },
    { id: 2, nome: "Escondidinho de ninho com nutella", preco: "R$ 12,00", img: "/escondidinhoNinhoNutella12.jpeg", quantidadeDisponivel: 10 },
    { id: 3, nome: "Copo de Kit Kat", preco: "R$ 10,00", img: "/kitKat10.jpeg", quantidadeDisponivel: 13 },
    { id: 4, nome: "Bombom de geleia de morango", preco: "R$ 12,00", img: "/geleiaMorango12.jpeg", quantidadeDisponivel: 10 },
    { id: 5, nome: "Copo de maracujá", preco: "R$ 10,00", img: "/maracuja10.jpeg", quantidadeDisponivel: 13 },
];


export default function Destaques() {
    const [produtoSelecionado, setProdutoSelecionado] = useState<{
    id: number;
    nome: string;
    preco: string;
    img: string;
    quantidadeDisponivel: number;
} | null>(null)
    return (
        <>
            <div className='block md:hidden relative'>
                <Swiper
                    modules={[Navigation]}
                    navigation={true}
                    spaceBetween={25}
                    slidesPerView={1.7}
                    centeredSlides={false}
                    className="px-4 overflow-visible"
                >
                    {produtos.map((produto) => (
                        <SwiperSlide
                            key={produto.id}
                            onClick={()=>setProdutoSelecionado(produto)}
                            className="flex! flex-row! items-center bg-white rounded-xl shadow-md overflow-visible hover:shadow-lg transition-transform cursor-pointer duration-300 hover:scale-[1.03] hover:bg-[#cfcfcfab] h-32"
                        >
                            <img src={produto.img}
                                alt={produto.nome}
                                className='flex-none w-20 h-28 object-cover rounded-l-xl' />
                            <div className="flex flex-col justify-center px-3 py-2 flex-1">
                                <p className="font-semibold font-[quicksand] text-[#3e2723] text-sm leading-tight text-wrap wrap-break-word line-clamp-3">{produto.nome}</p>
                                <p className='text-green-700 font-bold text-sm mt-1'>{produto.preco}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {produtos.map((produto) => (
                    <div
                        key={produto.id}
                        onClick={()=>setProdutoSelecionado(produto)}
                        className="flex items-center bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform cursor-pointer duration-300 hover:scale-[1.03] hover:bg-[#cfcfcfab] h-32"
                    >
                        <img
                            src={produto.img}
                            alt={produto.nome}
                            className='w-44 h-32 object-cover rounded-l-xl' />

                        <div className="flex flex-col justify-center px-4 py-2 w-full">
                            <p className='font-semibold font-[quicksand] text-[#3e2723]  text-lg'>{produto.nome}</p>

                            <p className='text-green-700 font-bold text-base mt-1'>{produto.preco}</p>
                        </div>
                    </div>
                ))}
            </div>
            {produtoSelecionado && (
                <ModalProduto
                    produto={produtoSelecionado}
                    onFechar={() => setProdutoSelecionado(null)}
                />
            )}

        </>


    )
}