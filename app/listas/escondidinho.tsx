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

export default function Escondidinho() {
    const [escondidinhos, setEscondidinhos] = useState<Doce[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [escondidinhoSelecionado, setEscondidinhoSelecionado] = useState<any | null>(null);

    async function carregarEscondidinhos() {
        try {
            const resposta = await fetch("https://doceria-backend.onrender.com/admin/ajustes/estoque");
            if (!resposta.ok) throw new Error("Erro ao carregar doces");

            const dados: Doce[] = await resposta.json();

            const filtrados = dados.filter(
                (doce) =>
                    doce.categoria &&
                    doce.categoria.toLowerCase() === "escondidinho"
            );

            setEscondidinhos(filtrados);
        } catch (erro) {
            console.error("Erro ao buscar escondidinhos:", erro);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarEscondidinhos();
    }, []);

    if (carregando) {
        return <p className="text-center mt-6 text-gray-700 font-[quicksand]">Carregando escondidinhos...</p>;
    }

    return (
        <>
            {escondidinhos.length === 0 ? (
                <p className="text-center mt-6 text-gray-700 font-[quicksand]">
                    Nenhum escondidinho disponível no momento.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {escondidinhos.map((escondidinho) => (
                        <div
                            key={escondidinho.id}
                            onClick={() =>
                                setEscondidinhoSelecionado({
                                    id: escondidinho.id,
                                    nome: escondidinho.nome,
                                    preco: `R$ ${escondidinho.preco.toFixed(2).replace(".", ",")}`,
                                    img: escondidinho.imagem || "/placeholder.jpg",
                                    quantidadeDisponivel: escondidinho.quantidadeDisponivel,
                                })
                            }
                            className="flex items-center bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform cursor-pointer duration-300 hover:scale-[1.03] hover:bg-[#cfcfcfab]"
                        >
                            <img
                                src={escondidinho.imagem || "/placeholder.jpg"}
                                alt={escondidinho.nome}
                                className="w-45 h-32 object-cover rounded-l-xl"
                            />

                            <div className="flex flex-col justify-center px-4 py-2 w-full">
                                <p className="font-semibold font-[quicksand] text-[#3e2723] text-lg">
                                    {escondidinho.nome}
                                </p>

                                <p className="text-green-700 font-bold text-base mt-1">
                                    R$ {escondidinho.preco.toFixed(2).replace(".", ",")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {escondidinhoSelecionado && (
                <ModalProduto
                    produto={escondidinhoSelecionado}
                    onFechar={() => setEscondidinhoSelecionado(null)}
                />
            )}
        </>
    );
}
