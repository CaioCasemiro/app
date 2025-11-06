"use client";

import { useEffect } from "react";
import type { ItemSacola } from "../context/sacolaContext";

const bairrosDisponiveis = [
    { nome: "Cohab", taxa: 5 },
    { nome: "Paraibinha", taxa: 8 },
    { nome: "Junco", taxa: 10 },
    { nome: "Pedrinhas", taxa: 12 },
];

interface CheckoutModalProps {
    itens: ItemSacola[];
    total: number;
    modoEntrega: "delivery" | "retirada";
    formaPagamento: "pix" | "dinheiro";
    setModoEntrega: (modo: "delivery" | "retirada") => void;
    setFormaPagamento: (forma: "pix" | "dinheiro") => void;
    onFechar: () => void;
    onConfirmar: () => void;
    nome: string;
    setNome: (valor: string) => void;
    telefone: string;
    setTelefone: (valor: string) => void;
    rua: string;
    setRua: (valor: string) => void;
    numero: string;
    setNumero: (valor: string) => void;
    bairro: string;
    setBairro: (valor: string) => void;
    pontoReferencia: string;
    setPontoReferencia: (valor: string) => void;
    valorEntrega: number;
    setValorEntrega: (valor: number) => void;
}

export default function CheckoutModal({
    itens,
    total,
    modoEntrega,
    formaPagamento,
    setModoEntrega,
    setFormaPagamento,
    onFechar,
    onConfirmar,
    nome,
    setNome,
    telefone,
    setTelefone,
    rua,
    setRua,
    numero,
    setNumero,
    bairro,
    setBairro,
    pontoReferencia,
    setPontoReferencia,
    valorEntrega,
    setValorEntrega,
}: CheckoutModalProps) {

    const totalComEntrega = modoEntrega === "delivery" ? total + (valorEntrega || 0) : total;

    useEffect(() => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        const previous = {
            position: document.body.style.position,
            top: document.body.style.top,
            left: document.body.style.left,
            right: document.body.style.right,
            overflow: document.body.style.overflow,
            width: document.body.style.width,
        };

        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';

        const touchHandler = (e: TouchEvent) => {
            const target = e.target as HTMLElement | null;
            if (!target || !target.closest('.checkout-modal-content')) {
                e.preventDefault();
            }
        };

        const wheelHandler = (e: WheelEvent) => {
            const target = e.target as HTMLElement | null;
            if (!target || !target.closest('.checkout-modal-content')) {
                e.preventDefault();
            }
        };

        document.addEventListener('touchmove', touchHandler, { passive: false });
        document.addEventListener('wheel', wheelHandler, { passive: false, capture: true });

        return () => {
            document.removeEventListener('touchmove', touchHandler);
            document.removeEventListener('wheel', wheelHandler, { passive: false, capture: true } as any);

            document.body.style.position = previous.position || '';
            document.body.style.top = previous.top || '';
            document.body.style.left = previous.left || '';
            document.body.style.right = previous.right || '';
            document.body.style.overflow = previous.overflow || '';
            document.body.style.width = previous.width || '';

            window.scrollTo(0, scrollY);
        };
    }, []);


    return (
        <div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
            onTouchMove={(e) => {
                const target = e.target as HTMLElement | null;
                if (!target || !target.closest('.checkout-modal-content')) {
                    e.preventDefault();
                }
            }}
        >

            <div className="bg-white w-full p-5 overflow-y-auto h-full checkout-modal-content">

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Finalizar pedido</h2>
                    <button onClick={onFechar} className="text-xl font-bold">
                        x
                    </button>
                </div>

                <div className="mb-4">
                    {itens.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={item.img}
                                    alt={item.nome}
                                    className="w-12 h-12 object-cover rounded-md"
                                />
                                <div>
                                    <p className="font-medium text-sm">{item.nome}</p>
                                    <p className="text-xs text-gray-500">{item.quantidade}x</p>
                                </div>
                            </div>
                            <span className="text-sm font-semibold">
                                R$ {(item.preco * item.quantidade).toFixed(2)}
                            </span>
                        </div>
                    ))}

                    <div className="flex justify-between font-semibold mt-2 border-t pt-2">
                        <span>Total: </span>
                        <span>R$ {totalComEntrega.toFixed(2)}</span>
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="font-medium mb-2">Modo de entrega: </h3>
                    <div className="flex gap-2">
                        <button
                            className={`px-4 py-2 rounded-lg border ${modoEntrega === "delivery"
                                ? "bg-[#d4a574] text-white"
                                : "bg-gray-100"
                                }`}
                            onClick={() => setModoEntrega("delivery")}
                        >
                            Delivery
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg border ${modoEntrega === "retirada"
                                ? "bg-[#d4a574] text-white"
                                : "bg-gray-100"
                                }`}
                            onClick={() => setModoEntrega("retirada")}
                        >
                            Retirada
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-3 mb-4">
                    <label className="font-semibold text-sm">Nome</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Seu nome completo"
                        className="p-2 border rounded-md"
                    />

                    <label className="font-semibold text-sm">Telefone (WhatsApp)</label>
                    <input
                        type="text"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        placeholder="(99) 99999-9999"
                        className="p-2 border rounded-md"
                    />
                </div>

                {modoEntrega === "delivery" && (
                    <div className="flex flex-col gap-3 mb-4">
                        <h3 className="font-medium mb-2">Endereço de entrega</h3>
                        <input
                            type="text"
                            value={rua}
                            onChange={(e) => setRua(e.target.value)}
                            placeholder="Rua"
                            className="p-2 border rounded-md"
                        />
                        <input
                            type="text"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                            placeholder="Número"
                            className="p-2 border rounded-md"
                        />
                        <div className="flex flex-col">
                            <label className="font-medium mb-1">Ponto de referência:</label>
                            <input
                                type="text"
                                value={pontoReferencia}
                                onChange={(e) => setPontoReferencia(e.target.value)}
                                className="border p-2 rounded-lg"
                                placeholder="Ex: perto da escola, em frente à padaria..."
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium mb-1">Bairro:</label>
                            <select
                                value={bairro}
                                onChange={(e) => {
                                    const selecionado = bairrosDisponiveis.find(b => b.nome === e.target.value);
                                    setBairro(e.target.value);
                                    setValorEntrega(selecionado ? selecionado.taxa : 0);
                                }}
                                className="border p-2 rounded-lg bg-white"
                            >
                                <option value="">Selecione um bairro...</option>
                                {bairrosDisponiveis.map((b, i) => (
                                    <option key={i} value={b.nome}>
                                        {b.nome} — R$ {b.taxa.toFixed(2)}
                                    </option>
                                ))}
                            </select>

                        </div>
                    </div>
                )}

                <div className="mb-4">
                    <h3 className="font-medium mb-2">Forma de Pagamento:</h3>
                    <div className="flex gap-2">
                        <button
                            className={`px-4 py-2 rounded-lg border ${formaPagamento === "pix" ? "bg-[#d4a574] text-white" : "bg-gray-100"
                                }`}
                            onClick={() => setFormaPagamento("pix")}
                        >
                            PIX
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg border ${formaPagamento === "dinheiro"
                                ? "bg-[#d4a574] text-white"
                                : "bg-gray-100"
                                }`}
                            onClick={() => setFormaPagamento("dinheiro")}
                        >
                            Dinheiro
                        </button>
                    </div>
                </div>

                <button
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold"
                    onClick={onConfirmar}
                >
                    Confirmar Pedido
                </button>

            </div>

        </div>
    )
}