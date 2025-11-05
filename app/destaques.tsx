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
                    slidesPerView={2.7}
                    centeredSlides={false}
                    className="px-4 overflow-visible"
                >
                    {produtos.map((produto) => (
                        <SwiperSlide
                            key={produto.id}
                            onClick={()=>setProdutoSelecionado(produto)}
                            className="bg-white rounded-lg shadow-md p-3.5 w-48 flex flex-col items-center justify-between text-center mb-10 hover:bg-[#cfcfcfab] cursor-pointer transition-transform hover:scale-[1.02] h-[280px]!"
                        >
                            <img src={produto.img}
                                alt={produto.nome}
                                className='w-35 mx-auto h-40 object-cover rounded-lg' />
                            <p className='mt-3.5 font-semibold font-[quicksand] text-center'>{produto.nome}</p>
                            <p className='text-green-700 font-bold mt-1'>{produto.preco}</p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="hidden md:flex md:flex-wrap md:justify-center md:gap-8 mt-6">
                {produtos.map((produto) => (
                    <div
                        key={produto.id}
                        onClick={()=>setProdutoSelecionado(produto)}
                        className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center w-[200px] mb-10 hover:bg-[#cfcfcfab] transition-transform cursor-pointer hover:scale-[1.03]"
                    >
                        <img
                            src={produto.img}
                            alt={produto.nome}
                            className="w-[80%] h-40 object-cover rounded-md"
                        />
                        <p className="mt-2 font-semibold font-[quicksand] text-center">{produto.nome}</p>
                        <p className="text-green-700 font-bold mt-1">{produto.preco}</p>
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