"use client";

import { useEffect, useState } from "react";

export default function Pedidos() {
    const [pedidos, setPedidos] = useState<any[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function buscarPedidos() {
            try {
                const resposta = await fetch("http://localhost:3001/pedidos");

                if (!resposta.ok) throw new Error("Erro ao buscar pedidos");

                const dados = await resposta.json();
                setPedidos(dados);
            } catch (e: any) {
                console.error(e);
                setErro("Não foi possível carregar os pedidos.");
            } finally {
                setCarregando(false);
            }
        }

        buscarPedidos();
    }, []);

    if (carregando) return <p className="text-center mt-10">Carregando pedidos...</p>;
    if (erro) return <p className="text-center mt-10 text-red-600">{erro}</p>;

    return (
        <div className="min-h-screen bg-[#E8CCAC] p-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Pedidos Recebidos </h1>

            {pedidos.length === 0 ? (
                <p>Nenhum pedido encontrado.</p>
            ) : (
                <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-4 space-y-4">
                    {pedidos.map((pedido) => (
                        <div key={pedido.id} className="border border-gray-300 rounded-lg p-4 flex flex-col gap-2">
                            <h2 className="font-semibold text-lg">Cliente: {pedido.nome}</h2>
                            <p><strong>Telefone:</strong> {pedido.telefone}</p>
                            <p><strong>Total:</strong> R$ {pedido.total.toFixed(2)}</p>
                            <p><strong>Entrega:</strong> {pedido.modoEntrega === "delivery" ? "Sim" : "Não"}</p>

                            {pedido.modoEntrega === "delivery" && pedido.endereco && (
                                <div>
                                    <strong>Endereço:</strong> {pedido.endereco.rua}, {pedido.endereco.numero} - {pedido.endereco.bairro} {pedido.endereco.pontoReferencia ? `(${pedido.endereco.pontoReferencia})` : ""}
                                </div>
                            )}

                            <div className="border-t border-gray-200 mt-2 pt-2">
                                <h3 className="font-medium mb-2">Itens:</h3>
                                <ul className="list-disc list-inside">
                                    {pedido.itens.map((item: any, i: number) => (
                                        <li key={i}>
                                            {item.nome} — {item.quantidade}x — R$ {item.preco}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <p className="text-sm text-gray-500 mt-2">Status: {pedido.status || "recebido"}</p>
                            <p className="text-sm text-gray-400">Feito em: {new Date(pedido.criadoEm).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
