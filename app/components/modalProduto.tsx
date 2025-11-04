"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Produto {
    id: number;
    nome: string;
    preco: string;
    img: string;
    quantidadeDisponivel: number;
}

interface ModalProdutoProps {
    produto: Produto | null
    onFechar: () => void
}

export default function ModalProduto({ produto, onFechar }: ModalProdutoProps) {

    const [quantidade, setQuantidade] = useState(1)

    if (!produto) return null


    const precoNumerico = parseFloat(produto.preco.replace("R$", "").replace(",", ".").trim());
    const precoTotal = precoNumerico * quantidade;


    const aumentar = () => {
        if (quantidade < produto.quantidadeDisponivel) {
            setQuantidade((q) => q + 1)
        }
    }

    const diminuir = () => {
        if (quantidade > 1) {
            setQuantidade((q) => q - 1)
        }
    }

    return (
        <>

            <AnimatePresence>
                <motion.div
                    className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onFechar}
                >
                    <motion.div
                        className="bg-white rounded-2xl shadow-lg w-[90%] max-w-sm pt-8 pb-6 px-8 relative "
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
                            className="w-full h-95 object-cover rounded-lg mb-4" />

                        <h2 className="text-xl font-[inter] font-semibold mb-2">{produto.nome}</h2>
                        <p className="text-sm text-gray-500 mb-3">Quantidade disponível: {produto.quantidadeDisponivel}</p>

                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3.5">
                                <button
                                    onClick={() => setQuantidade(q => Math.max(1, q - 1))}
                                    className="bg-gray-200 px-3 py-1 rounded-lg text-lg">
                                    -
                                </button>

                                <span className="text-lg font-medium">{quantidade}</span>

                                <button onClick={() => setQuantidade(q => Math.min(produto.quantidadeDisponivel, q + 1))}
                                    className="bg-gray-200 px-3 py-1 rounded-lg text-lg"
                                >
                                    +
                                </button>
                            </div>
                            <p className="text-lg font-bold text-[#6b3e26]">R$ {precoTotal.toFixed(2)}</p>
                        </div>

                        <button onClick={() => console.log("Adicionar à sacola", produto, quantidade)}
                            className="bg-[#d4a574] hover:bg-[#c28e57] text-white font-semibold py-3 rounded-xl w-full transition">
                            Adicionar à sacola - R$ {precoTotal.toFixed(2)}
                        </button>

                    </motion.div>

                </motion.div>
            </AnimatePresence>

        </>
    )
}