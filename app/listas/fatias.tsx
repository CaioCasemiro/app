"use client";
import { useState } from "react";
import ModalProduto from "../components/modalProduto";


export default function Fatias() {
    
    const fatias = [
        { id: 1, nome: "Fatias de doce de leite", preco: "R$ 8,00", img: "/doceDeLeite8.jpeg", quantidadeDisponivel: 10 },
        { id: 2, nome: "Fatias de red velvet", preco: "R$ 8,00", img: "/redVelvet8.jpeg", quantidadeDisponivel: 10 },
        { id: 3, nome: "Fatia de dois amores", preco: "R$ 8,00", img: "/doisAmores8.jpeg", quantidadeDisponivel: 10 },
    ]

    const [fatiaSelecionada, setFatiaSelecionada] = useState<{
        id: number;
        nome: string;
        preco: string;
        img: string;
        quantidadeDisponivel: number;
    } | null>(null)

    return (
        <>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {fatias.map((fatia) => (
                    <div
                        key={fatia.id}
                        onClick={()=>setFatiaSelecionada(fatia)}
                        className="flex items-center bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 cursor-pointer hover:scale-[1.03] hover:bg-[#cfcfcfab]">

                        <img src={fatia.img} alt={fatia.nome} className='w-45 h-32 object-cover rounded-l-xl' />

                        <div className="flex flex-col justify-center px-4 py-2 w-full">
                            <p className='font-semibold font-[quicksand] text-[#3e2723]  text-lg'>{fatia.nome}</p>

                            <p className='text-green-700 font-bold text-base mt-1'>{fatia.preco}</p>
                        </div>
                    </div>
                ))}
            </div>
            {fatiaSelecionada && (
                <ModalProduto
                    produto={fatiaSelecionada}
                    onFechar={() => setFatiaSelecionada(null)}
                />
            )}
        </>
    )
}