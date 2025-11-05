"use client";
import { useState } from "react";
import ModalProduto from "../components/modalProduto";


export default function BolosNoPote() {
    
    const bolosNoPote = [
        { id: 1, nome: "Bolo no pote de chocolate", preco: "R$ 10,00", img: "/boloChocolate10.jpeg", quantidadeDisponivel: 10 },
        { id: 2, nome: "Bolo no pote de ninho com nutella", preco: "R$ 10,00", img: "/ninhoComNutella10.jpeg", quantidadeDisponivel: 7 },
        { id: 3, nome: "Bolo no pote de ninho com morango", preco: "R$ 10,00", img: "/ninhoComMorango10.jpeg", quantidadeDisponivel: 5 },
        { id: 4, nome: "Bolo no pote de ninho com chocolate", preco: "R$ 10,00", img: "/ninhoComChocolate10.jpeg", quantidadeDisponivel: 6 },
        { id: 5, nome: "Bolo no pote de red Velvet", preco: "R$ 10,00", img: "/redVelvet10.jpeg", quantidadeDisponivel: 10 },
    ]

    const [boloSelecionado, setBoloSelecionado] = useState < {
        id: number;
        nome: string;
        preco: string;
        img: string;
        quantidadeDisponivel: number;
    } | null>(null)

    return (
        <>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {bolosNoPote.map((bolo) => (
                    <div
                        key={bolo.id}
                        onClick={() => setBoloSelecionado(bolo)}
                        className="flex items-center bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform cursor-pointer duration-300 hover:scale-[1.03] hover:bg-[#cfcfcfab]">

                        <img src={bolo.img} alt={bolo.nome} className='w-45 h-32 object-cover rounded-l-xl' />

                        <div className="flex flex-col justify-center px-4 py-2 w-full">
                            <p className='font-semibold font-[quicksand] text-[#3e2723]  text-lg'>{bolo.nome}</p>

                            <p className='text-green-700 font-bold text-base mt-1'>{bolo.preco}</p>
                        </div>
                    </div>
                ))}
            </div>
            {boloSelecionado && (
                <ModalProduto
                    produto={boloSelecionado}
                    onFechar={() => setBoloSelecionado(null)}
                />
            )}

        </>
    )
}