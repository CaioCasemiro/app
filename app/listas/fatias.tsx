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
                    {fatias.map((fatia) => {
                        const estaIndisponivel = fatia.quantidadeDisponivel <= 0;

                        return (
                            <div
                                key={fatia.id}
                                onClick={() => {
                                    if (!estaIndisponivel) {
                                        setFatiaSelecionada({
                                            id: fatia.id,
                                            nome: fatia.nome,
                                            preco: `R$ ${fatia.preco.toFixed(2).replace(".", ",")}`,
                                            imagem: fatia.imagem || "/placeholder.jpg",
                                            quantidadeDisponivel: fatia.quantidadeDisponivel,
                                        });
                                    }
                                }}
                                className={`relative flex items-center bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
                                    estaIndisponivel
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:shadow-lg hover:scale-[1.03] hover:bg-[#cfcfcfab] cursor-pointer"
                                }`}
                            >
                                {/* Overlay para indisponíveis */}
                                {estaIndisponivel && (
                                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70 backdrop-blur-[1px]">
                                        <p className="px-3 py-1 rounded-full bg-white/90 text-[#3e2723] text-xs sm:text-sm font-bold shadow-lg uppercase tracking-wide">
                                            Indisponível
                                        </p>
                                    </div>
                                )}

                                <img
                                    src={fatia.imagem || "/placeholder.jpg"}
                                    alt={fatia.nome}
                                    className={`w-45 h-32 object-cover rounded-l-xl transition-all duration-300 ${
                                        estaIndisponivel ? "blur-[2px] grayscale" : ""
                                    }`}
                                />

                                <div className="flex flex-col justify-center px-3 sm:px-4 py-2 w-full">
                                    <p className="font-semibold font-[quicksand] text-[#3e2723] text-sm sm:text-lg line-clamp-2">
                                        {fatia.nome}
                                    </p>

                                    <p className="text-green-700 font-bold text-xs sm:text-base mt-1">
                                        R$ {fatia.preco.toFixed(2).replace(".", ",")}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
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
