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

export default function CopoDaFelicidade() {
    const [copos, setCopos] = useState<Doce[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [copoSelecionado, setCopoSelecionado] = useState<any | null>(null);

    async function carregarCoposDaFelicidade() {
        try {
            const resposta = await fetch("https://doceria-backend.onrender.com/admin/ajustes/estoque");
            if (!resposta.ok) throw new Error("Erro ao carregar doces");

            const dados: Doce[] = await resposta.json();

            const filtrados = dados.filter(
                (doce) =>
                    doce.categoria &&
                    doce.categoria.toLowerCase() === "copo da felicidade"
            );

            setCopos(filtrados);
        } catch (erro) {
            console.error("Erro ao buscar copos da felicidade:", erro);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarCoposDaFelicidade();
    }, []);

    if (carregando) {
        return <p className="text-center mt-6 text-gray-700 font-[quicksand]">Carregando copos da felicidade...</p>;
    }

    return (
        <>
            {copos.length === 0 ? (
                <p className="text-center mt-6 text-gray-700 font-[quicksand]">
                    Nenhum copo da felicidade disponível no momento.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {copos.map((copo) => (
                        <div
                            key={copo.id}
                            onClick={() =>
                                setCopoSelecionado({
                                    id: copo.id,
                                    nome: copo.nome,
                                    preco: `R$ ${copo.preco.toFixed(2).replace(".", ",")}`,
                                    img: copo.imagem || "/placeholder.jpg",
                                    quantidadeDisponivel: copo.quantidadeDisponivel,
                                })
                            }
                            className="flex items-center bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform cursor-pointer duration-300 hover:scale-[1.03] hover:bg-[#cfcfcfab]"
                        >
                            <img
                                src={copo.imagem || "/placeholder.jpg"}
                                alt={copo.nome}
                                className="w-45 h-32 object-cover rounded-l-xl"
                            />

                            <div className="flex flex-col justify-center px-4 py-2 w-full">
                                <p className="font-semibold font-[quicksand] text-[#3e2723] text-lg">
                                    {copo.nome}
                                </p>

                                <p className="text-green-700 font-bold text-base mt-1">
                                    R$ {copo.preco.toFixed(2).replace(".", ",")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {copoSelecionado && (
                <ModalProduto
                    produto={copoSelecionado}
                    onFechar={() => setCopoSelecionado(null)}
                />
            )}
        </>
    );
}
