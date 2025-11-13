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

export default function Fatias() {
    const [fatias, setFatias] = useState<Doce[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [fatiaSelecionada, setFatiaSelecionada] = useState<any | null>(null);

    async function carregarFatias() {
        try {
            const resposta = await fetch("https://doceria-backend.onrender.com/admin/ajustes/estoque");
            if (!resposta.ok) throw new Error("Erro ao carregar doces");

            const dados: Doce[] = await resposta.json();

            const filtrados = dados.filter(
                (doce) =>
                    doce.categoria &&
                    doce.categoria.toLowerCase() === "fatia"
            );

            setFatias(filtrados);
        } catch (erro) {
            console.error("Erro ao buscar fatias:", erro);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarFatias();
    }, []);

    if (carregando) {
        return <p className="text-center mt-6 text-gray-700 font-[quicksand]">Carregando fatias...</p>;
    }

    return (
        <>
            {fatias.length === 0 ? (
                <p className="text-center mt-6 text-gray-700 font-[quicksand]">
                    Nenhuma fatia disponível no momento.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {fatias.map((fatia) => (
                        <div
                            key={fatia.id}
                            onClick={() =>
                                setFatiaSelecionada({
                                    id: fatia.id,
                                    nome: fatia.nome,
                                    preco: `R$ ${fatia.preco.toFixed(2).replace(".", ",")}`,
                                    img: fatia.imagem || "/placeholder.jpg",
                                    quantidadeDisponivel: fatia.quantidadeDisponivel,
                                })
                            }
                            className="flex items-center bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform cursor-pointer duration-300 hover:scale-[1.03] hover:bg-[#cfcfcfab]"
                        >
                            <img
                                src={fatia.imagem || "/placeholder.jpg"}
                                alt={fatia.nome}
                                className="w-45 h-32 object-cover rounded-l-xl"
                            />

                            <div className="flex flex-col justify-center px-4 py-2 w-full">
                                <p className="font-semibold font-[quicksand] text-[#3e2723] text-lg">
                                    {fatia.nome}
                                </p>

                                <p className="text-green-700 font-bold text-base mt-1">
                                    R$ {fatia.preco.toFixed(2).replace(".", ",")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {fatiaSelecionada && (
                <ModalProduto
                    produto={fatiaSelecionada}
                    onFechar={() => setFatiaSelecionada(null)}
                />
            )}
        </>
    );
}
