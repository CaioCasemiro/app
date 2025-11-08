"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSacola } from "../context/sacolaContext";

interface Produto {
    id: number;
    nome: string;
    preco: string;
    img: string;
    quantidadeDisponivel: number;
}

interface ModalProdutoProps {
    produto: Produto | null;
    onFechar: () => void;
}

export default function ModalProduto({ produto, onFechar }: ModalProdutoProps) {
    const [quantidade, setQuantidade] = useState(1);
    const { adicionarProduto } = useSacola();

    // 🔒 BLOQUEIO DE SCROLL
    useEffect(() => {
        if (!produto) return;

        const scrollY = window.scrollY || document.documentElement.scrollTop;

        const previous = {
            position: document.body.style.position,
            top: document.body.style.top,
            left: document.body.style.left,
            right: document.body.style.right,
            overflow: document.body.style.overflow,
            width: document.body.style.width,
        };

        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";
        document.body.style.overflow = "hidden";

        const touchHandler = (e: TouchEvent) => {
            const target = e.target as HTMLElement | null;
            if (!target || !target.closest(".modal-produto-content")) {
                e.preventDefault();
            }
        };

        const wheelHandler = (e: WheelEvent) => {
            const target = e.target as HTMLElement | null;
            if (!target || !target.closest(".modal-produto-content")) {
                e.preventDefault();
            }
        };

        document.addEventListener("touchmove", touchHandler, { passive: false });
        document.addEventListener("wheel", wheelHandler, { passive: false, capture: true });

        return () => {
            document.removeEventListener("touchmove", touchHandler);
            document.removeEventListener("wheel", wheelHandler, { passive: false, capture: true } as any);

            document.body.style.position = previous.position || "";
            document.body.style.top = previous.top || "";
            document.body.style.left = previous.left || "";
            document.body.style.right = previous.right || "";
            document.body.style.overflow = previous.overflow || "";
            document.body.style.width = previous.width || "";

            window.scrollTo(0, scrollY);
        };
    }, [produto]);
    // 🔒 fim do bloqueio

    if (!produto) return null;

    const precoNumerico = parseFloat(produto.preco.replace("R$", "").replace(",", ".").trim());
    const precoTotal = precoNumerico * quantidade;

    const adicionarNaSacola = () => {
        adicionarProduto({
            id: produto.id,
            nome: produto.nome,
            preco: precoNumerico,
            img: produto.img,
            quantidade,
        });
        onFechar();
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onFechar}
            >
                <motion.div
                    className="modal-produto-content bg-white rounded-2xl shadow-lg w-[90%] max-w-sm pt-8 pb-6 px-8 relative"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onFechar}
                        className="absolute top-0 right-3 text-2xl font-bold text-gray-600 hover:text-gray-900"
                    >
                        x
                    </button>

                    <img
                        src={produto.img}
                        alt={produto.nome}
                        className="w-full h-95 object-cover rounded-lg mb-4"
                    />

                    <h2 className="text-xl font-[inter] font-semibold mb-2">{produto.nome}</h2>
                    <p className="text-sm text-gray-500 mb-3">
                        Quantidade disponível: {produto.quantidadeDisponivel}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3.5">
                            <button
                                onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                                className="bg-gray-200 px-3 py-1 rounded-lg text-lg"
                            >
                                -
                            </button>

                            <span className="text-lg font-medium">{quantidade}</span>

                            <button
                                onClick={() =>
                                    setQuantidade((q) => Math.min(produto.quantidadeDisponivel, q + 1))
                                }
                                className="bg-gray-200 px-3 py-1 rounded-lg text-lg"
                            >
                                +
                            </button>
                        </div>
                        <p className="text-lg font-bold text-[#6b3e26]">
                            R$ {precoTotal.toFixed(2)}
                        </p>
                    </div>

                    <button
                        onClick={adicionarNaSacola}
                        className="bg-[#d4a574] hover:bg-[#c28e57] text-white font-semibold py-3 rounded-xl w-full transition"
                    >
                        Adicionar à sacola - R$ {precoTotal.toFixed(2)}
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
