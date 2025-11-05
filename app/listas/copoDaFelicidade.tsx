"use client";
import { useState } from "react";
import ModalProduto from "../components/modalProduto";


export default function CopoDaFelicidade() {
    
    const coposDaFelicidade = [
        { id: 1, nome: "Choconinho", preco: "R$ 10,00", img: "/choconinho10.jpeg", quantidadeDisponivel: 13 },
        { id: 2, nome: "Chocotudo", preco: "R$ 10,00", img: "/chocotudo10.jpeg", quantidadeDisponivel: 13 },
        { id: 3, nome: "Copo de maracujá", preco: "R$ 10,00", img: "/maracuja10.jpeg", quantidadeDisponivel: 13 },
        { id: 4, nome: "Copo de Kit Kat", preco: "R$ 10,00", img: "/kitKat10.jpeg", quantidadeDisponivel: 13 },
        { id: 5, nome: "Copo dos desejos", preco: "R$ 10,00", img: "/desejos10.jpeg", quantidadeDisponivel: 13 },
    ]

    const [copoSelecionado, setCopoSelecionado] = useState<{
        id: number;
        nome: string;
        preco: string;
        img: string;
        quantidadeDisponivel: number;
    } | null>(null)

    return (
        <>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {coposDaFelicidade.map((copo) => (
                    <div
                        key={copo.id}
                        onClick={() => setCopoSelecionado(copo)}
                        className="flex items-center bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 cursor-pointer hover:scale-[1.03] hover:bg-[#cfcfcfab]">

                        <img src={copo.img} alt={copo.nome} className='w-45 h-32 object-cover rounded-l-xl' />

                        <div className="flex flex-col justify-center px-4 py-2 w-full">
                            <p className='font-semibold font-[quicksand] text-[#3e2723]  text-lg'>{copo.nome}</p>

                            <p className='text-green-700 font-bold text-base mt-1'>{copo.preco}</p>
                        </div>
                    </div>
                ))}
            </div>
            {copoSelecionado && (
                <ModalProduto
                    produto={copoSelecionado}
                    onFechar={() => setCopoSelecionado(null)}
                />
            )}
        </>
    )
}