"use client";

import { useState } from "react";

const ETAPAS = [
    { chave: "recebido", label: "Recebido" },
    { chave: "em_preparo", label: "Em preparo" },
    { chave: "pronto", label: "Pronto" },
    { chave: "entregue", label: "Entregue" },
];

function indiceEtapa(status: string) {
    const i = ETAPAS.findIndex((e) => e.chave === status);
    return i === -1 ? 0 : i;
}

export default function Acompanhar() {
    const [telefone, setTelefone] = useState("");
    const [pedidos, setPedidos] = useState<any[]>([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");
    const [buscou, setBuscou] = useState(false);

    const buscarPedidos = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!telefone.trim()) return;

        setCarregando(true);
        setErro("");
        setBuscou(true);

        try {
            const resposta = await fetch(
                `https://doceria-backend.onrender.com/pedidos/consulta?telefone=${encodeURIComponent(telefone.trim())}`
            );

            if (!resposta.ok) throw new Error("Erro ao buscar pedidos");

            const dados = await resposta.json();
            setPedidos(dados);
        } catch (e: any) {
            console.error(e);
            setErro("Não foi possível consultar seus pedidos. Tente novamente.");
            setPedidos([]);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#E8CCAC] p-6 md:p-8 flex flex-col items-center">
            <div className="w-full max-w-2xl">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
                    Acompanhar meu pedido
                </h1>

                <form
                    onSubmit={buscarPedidos}
                    className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row gap-3 mb-8"
                >
                    <input
                        type="tel"
                        placeholder="Digite o telefone usado no pedido"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#d4a574]"
                    />
                    <button
                        type="submit"
                        disabled={carregando}
                        className="bg-[#d4a574] hover:bg-[#c28e57] disabled:opacity-50 text-white font-semibold px-6 py-2 rounded-lg transition"
                    >
                        {carregando ? "Buscando..." : "Consultar"}
                    </button>
                </form>

                {erro && <p className="text-center text-red-600 mb-4">{erro}</p>}

                {buscou && !carregando && !erro && pedidos.length === 0 && (
                    <p className="text-center text-gray-600">
                        Nenhum pedido encontrado para esse telefone.
                    </p>
                )}

                <div className="space-y-6">
                    {pedidos.map((pedido) => {
                        const passo = indiceEtapa(pedido.status);
                        return (
                            <div key={pedido.id} className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="font-semibold text-lg text-gray-800">
                                        Pedido #{pedido.id}
                                    </h2>
                                    <span className="text-sm text-gray-400">
                                        {new Date(pedido.criadoEm).toLocaleString()}
                                    </span>
                                </div>

                                {/* Linha do tempo do status */}
                                <div className="flex items-center justify-between mb-4">
                                    {ETAPAS.map((etapa, i) => (
                                        <div key={etapa.chave} className="flex-1 flex flex-col items-center relative">
                                            {i > 0 && (
                                                <div
                                                    className={`absolute top-3 right-1/2 w-full h-1 -z-10 ${i <= passo ? "bg-[#d4a574]" : "bg-gray-200"
                                                        }`}
                                                />
                                            )}
                                            <div
                                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i <= passo
                                                        ? "bg-[#d4a574] text-white"
                                                        : "bg-gray-200 text-gray-500"
                                                    }`}
                                            >
                                                {i <= passo ? "✓" : ""}
                                            </div>
                                            <span
                                                className={`text-xs mt-2 text-center ${i <= passo ? "text-gray-800 font-medium" : "text-gray-400"
                                                    }`}
                                            >
                                                {etapa.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-200 pt-3">
                                    <ul className="list-disc list-inside space-y-1">
                                        {pedido.itens.map((item: any, i: number) => (
                                            <li key={i} className="text-gray-800 text-sm">
                                                {item.nome} — {item.quantidade}x — R$ {item.preco}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-sm text-gray-500 mt-2">
                                        <strong>Total:</strong> R$ {pedido.total.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}