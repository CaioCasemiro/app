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

export default function Bombons() {
    const [bombons, setBombons] = useState<Doce[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [bombomSelecionado, setBombomSelecionado] = useState<any | null>(null);

    async function carregarBombons() {
        try {
            const resposta = await fetch("https://doceria-backend.onrender.com/admin/ajustes/estoque");
            if (!resposta.ok) throw new Error("Erro ao carregar doces");

            const dados: Doce[] = await resposta.json();

            const filtrados = dados.filter(
                (doce) =>
                    doce.categoria &&
                    doce.categoria.toLowerCase() === "bombom"
            );

            setBombons(filtrados);
        } catch (erro) {
            console.error("Erro ao buscar bombons:", erro);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarBombons();
    }, []);

    if (carregando) {
        return <p className="text-center mt-6 text-gray-700 font-[quicksand]">Carregando bombons...</p>;
    }

    return (
        <>
            {bombons.length === 0 ? (
                <p className="text-center mt-6 text-gray-700 font-[quicksand]">
                    Nenhum bombom disponível no momento.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {bombons.map((bombom) => (
                        <div
                            key={bombom.id}
                            onClick={() =>
                                setBombomSelecionado({
                                    id: bombom.id,
                                    nome: bombom.nome,
                                    preco: `R$ ${bombom.preco.toFixed(2).replace(".", ",")}`,
                                    img: bombom.imagem || "/placeholder.jpg",
                                    quantidadeDisponivel: bombom.quantidadeDisponivel,
                                })
                            }
                            className="flex items-center bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform cursor-pointer duration-300 hover:scale-[1.03] hover:bg-[#cfcfcfab]"
                        >
                            <img
                                src={bombom.imagem || "/placeholder.jpg"}
                                alt={bombom.nome}
                                className="w-45 h-32 object-cover rounded-l-xl"
                            />

                            <div className="flex flex-col justify-center px-4 py-2 w-full">
                                <p className="font-semibold font-[quicksand] text-[#3e2723] text-lg">
                                    {bombom.nome}
                                </p>

                                <p className="text-green-700 font-bold text-base mt-1">
                                    R$ {bombom.preco.toFixed(2).replace(".", ",")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {bombomSelecionado && (
                <ModalProduto
                    produto={bombomSelecionado}
                    onFechar={() => setBombomSelecionado(null)}
                />
            )}
        </>
    );
}
