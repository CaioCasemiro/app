"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Pedidos() {
    const [pedidos, setPedidos] = useState<any[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [logado, setLogado] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/admin");
            return;
        }
        setLogado(true);

        async function buscarPedidos() {
            const token = localStorage.getItem("token");
            console.log(token)
            try {
                const resposta = await fetch("https://doceria-backend.onrender.com/pedidos", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
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
    }, [router]);

    const finalizarPedido = async (id: number) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Token não encontrado. Faça login novamente.");
            return;
        }

        try {
            const resposta = await fetch(`https://doceria-backend.onrender.com/pedidos/${id}/finalizar`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                },
            });

            const text = await resposta.text();
            let data: any = null;
            try { data = text ? JSON.parse(text) : null; } catch { data = { message: text }; }

            if (!resposta.ok) {
                console.error("Erro ao finalizar pedido:", resposta.status, data || text);
                const msg = data?.erro || data?.message || text || `Status ${resposta.status}`;
                alert(`Erro ao finalizar pedido: ${msg}`);
                return;
            }

            setPedidos(prev => prev.map(p => p.id === id ? { ...p, finalizado: true } : p));
        } catch (e: any) {
            console.error("Erro de rede ao finalizar pedido:", e);
            alert("Não foi possível finalizar o pedido. Veja o console para mais detalhes.");
        }
    };

    if (logado === null) return <p className="text-center mt-10 text-lg">Verificando login...</p>;
    if (carregando) return <p className="text-center mt-10 text-lg">Carregando pedidos...</p>;
    if (erro) return <p className="text-center mt-10 text-red
    -600 text-lg">{erro}</p>;

    // Filtra pedidos por categoria
    const pedidosRetirada = pedidos.filter(p => p.modoEntrega === "retirada" && !p.finalizado);
    const pedidosEntrega = pedidos.filter(p => p.modoEntrega === "delivery" && !p.finalizado);
    const pedidosFinalizados = pedidos.filter(p => p.finalizado);

    const renderPedidos = (lista: any[]) => lista.map(pedido => (
        <div key={pedido.id} className={`rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300
            ${pedido.finalizado ? "bg-green-300 text-gray-500 opacity-50" : "bg-white shadow-md"}`}>
            <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-xl md:text-2xl text-gray-800">Cliente: {pedido.nome || "Não informado"}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${pedido.finalizado ? "bg-gray-100 text-gray-800" :
                    pedido.modoEntrega === "delivery" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                    {pedido.finalizado ? "Finalizado" : pedido.modoEntrega === "delivery" ? "Entrega" : "Retirada"}
                </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4 mb-3">
                <p><strong>Telefone:</strong> {pedido.telefone}</p>
                <p><strong>Total:</strong> R$ {pedido.total.toFixed(2)}</p>
            </div>

            {pedido.modoEntrega === "delivery" && pedido.endereco && (
                <p className="mb-3 text-gray-700">
                    <strong>Endereço:</strong> {pedido.endereco.rua}, {pedido.endereco.numero} - {pedido.endereco.bairro}
                    {pedido.endereco.pontoReferencia ? ` (${pedido.endereco.pontoReferencia})` : ""}
                </p>
            )}

            <div className="border-t border-gray-200 pt-3">
                <h3 className="font-medium mb-2">Itens:</h3>
                <ul className="list-disc list-inside space-y-1">
                    {pedido.itens.map((item: any, i: number) => (
                        <li key={i} className="text-gray-800">
                            {item.nome} — {item.quantidade}x — R$ {item.preco}
                        </li>
                    ))}
                </ul>
            </div>

            <p className="text-sm text-gray-400 mt-3">Feito em: {new Date(pedido.criadoEm).toLocaleString()}</p>

            {!pedido.finalizado && (
                <button
                    onClick={() => finalizarPedido(pedido.id)}
                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-blue-700 transition"
                >
                    Marcar como Finalizado
                </button>
            )}
        </div>
    ));

    return (
        <div className="min-h-screen bg-[#E8CCAC] p-6 md:p-8 flex flex-col items-center space-y-10">
            <div className="flex flex-row w-full justify-between items-center">
            <h1 className="text-3xl md:text-4xl font-bold flex-1 text-center">Dashboard de Pedidos</h1>
            <button 
                onClick={() => router.push("/admin/pedidos/ajustes")}
                className="bg-[#1900ff] hover:bg-[#877aff] hover:cursor-pointer text-white font-semibold px-4 py-2 rounded-lg transition"
            >
                Página de ajustes
            </button>
            </div>

            <div className="w-full max-w-3xl">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Pedidos para Retirada</h2>
                {pedidosRetirada.length === 0 ? <p>Nenhum pedido nesta categoria.</p> : <div className="space-y-4">{renderPedidos(pedidosRetirada)}</div>}
            </div>

            <div className="w-full max-w-3xl">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Pedidos para Entrega</h2>
                {pedidosEntrega.length === 0 ? <p>Nenhum pedido nesta categoria.</p> : <div className="space-y-4">{renderPedidos(pedidosEntrega)}</div>}
            </div>

            <div className="w-full max-w-3xl">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Pedidos Finalizados</h2>
                {pedidosFinalizados.length === 0 ? <p>Nenhum pedido finalizado ainda.</p> : <div className="space-y-4">{renderPedidos(pedidosFinalizados)}</div>}
            </div>
        </div>
    );
}
