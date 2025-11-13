"use client";
import { useEffect, useState } from "react";
import ModalProduto from "../components/modalProduto";

interface Doce {
    id: number;
    nome: string;
    preco: number;
    imagem: string;
    quantidadeDisponivel: number;
    categoria?: string | null;
}

export default function BolosNoPote() {
    const [bolos, setBolos] = useState<Doce[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [boloSelecionado, setBoloSelecionado] = useState<any | null>(null);

    async function carregarBolosNoPote() {
        try {
            const resposta = await fetch("https://doceria-backend.onrender.com/admin/ajustes/estoque");
            if (!resposta.ok) throw new Error("Erro ao carregar doces");

            const dados: Doce[] = await resposta.json();

            const filtrados = dados.filter(
                (doce) =>
                    doce.categoria &&
                    doce.categoria.toLowerCase() === "bolo no pote"
            );

            setBolos(filtrados);
        } catch (erro) {
            console.error("Erro ao buscar bolos no pote:", erro);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarBolosNoPote();
    }, []);

    if (carregando) {
        return <p className="text-center mt-6 text-gray-700 font-[quicksand]">Carregando bolos...</p>;
    }

    return (
        <>
            {bolos.length === 0 ? (
                <p className="text-center mt-6 text-gray-700 font-[quicksand]">
                    Nenhum bolo no pote disponível no momento.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {bolos.map((bolo) => (
                        <div
                            key={bolo.id}
                            onClick={() =>
                                setBoloSelecionado({
                                    id: bolo.id,
                                    nome: bolo.nome,
                                    preco: `R$ ${bolo.preco.toFixed(2).replace(".", ",")}`,
                                    img: bolo.imagem || "/placeholder.jpg",
                                    quantidadeDisponivel: bolo.quantidadeDisponivel,
                                })
                            }
                            className="flex items-center bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform cursor-pointer duration-300 hover:scale-[1.03] hover:bg-[#cfcfcfab]"
                        >
                            <img
                                src={bolo.imagem || "/placeholder.jpg"}
                                alt={bolo.nome}
                                className="w-45 h-32 object-cover rounded-l-xl"
                            />

                            <div className="flex flex-col justify-center px-4 py-2 w-full">
                                <p className="font-semibold font-[quicksand] text-[#3e2723] text-lg">
                                    {bolo.nome}
                                </p>

                                <p className="text-green-700 font-bold text-base mt-1">
                                    R$ {bolo.preco.toFixed(2).replace(".", ",")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {boloSelecionado && (
                <ModalProduto
                    produto={boloSelecionado}
                    onFechar={() => setBoloSelecionado(null)}
                />
            )}
        </>
    );
}
