"use client";
import { useState } from "react";
import ModalProduto from "../components/modalProduto";

export default function Bombons(){

    const bombons = [
        { id: 1, nome: "Morango", preco: "R$ 12,00", img: "/bombomMorango12.jpeg", quantidadeDisponivel: 10  },
        { id: 2, nome: "Uva", preco: "R$ 12,00", img: "/bombomUva12.jpeg", quantidadeDisponivel: 10  },
        { id: 3, nome: "Geleia de morango", preco: "R$ 12,00", img: "/geleiaMorango12.jpeg", quantidadeDisponivel: 10  },
    ]

    const [bombomSelecionado, setBombomSelecionado] = useState<{
            id: number;
            nome: string;
            preco: string;
            img: string;
            quantidadeDisponivel: number;
        } | null>(null)

    return(
        <>
        
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {bombons.map((bombom) => (
                    <div
                        key={bombom.id}
                        onClick={()=>setBombomSelecionado(bombom)}
                        className="flex items-center bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 cursor-pointer hover:scale-[1.03] hover:bg-[#cfcfcfab]">

                        <img src={bombom.img} alt={bombom.nome} className='w-45 h-32 object-cover rounded-l-xl' />

                        <div className="flex flex-col justify-center px-4 py-2 w-full">
                            <p className='font-semibold font-[quicksand] text-[#3e2723]  text-lg'>{bombom.nome}</p>

                            <p className='text-green-700 font-bold text-base mt-1'>{bombom.preco}</p>
                        </div>
                    </div>
                ))}
            </div>
            {bombomSelecionado && (
                            <ModalProduto
                                produto={bombomSelecionado}
                                onFechar={() => setBombomSelecionado(null)}
                            />
                        )}
        </>
    )
}