"use client";

import { useSacola } from "../context/sacolaContext";

export default function SacolaDesktop() {
    const { itens, removerProduto, limparSacola } = useSacola();

    const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);


    return (
        <div className="sticky top-0 h-screen w-full bg-white shadow-md border-l border-gray-200 flex flex-col z-20 mt-15 rounded-lg">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold font-[raleway]">Minha Sacola</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {itens.length === 0 ? (
                    <p className="text-center text-gray-500 mt-10 font-[inter]">
                        Sua sacola está vazia 🍰
                    </p>
                ) : (
                    itens.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-3 border-b border-gray-100 pb-3"
                        >
                            <img
                                src={item.img}
                                alt={item.nome}
                                className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                                <p className="font-medium font-[inter]">{item.nome}</p>
                                <p className="text-sm text-gray-500">
                                    {item.quantidade}x R$ {item.preco.toFixed(2)}
                                </p>
                            </div>
                            <button
                                onClick={() => removerProduto(item.id)}
                                className="text-red-500 hover:text-red-700 text-sm font-semibold"
                            >
                                Remover
                            </button>
                        </div>
                    ))
                )}
            </div>

            {itens.length > 0 && (
                <div className="p-5 border-t border-gray-200 bg-white">
                    <div className="flex justify-between mb-4">
                        <span className="font-semibold font-[inter]">Total:</span>
                        <span className="font-semibold font-[inter]">
                            R$ {total.toFixed(2)}
                        </span>
                    </div>
                    <button
                        onClick={limparSacola}
                        className="w-full bg-gray-100 text-gray-700 font-medium py-2 rounded-lg mb-2 hover:bg-gray-200"
                    >
                        Limpar sacola
                    </button>
                    <button className="w-full bg-[#d4a574] hover:bg-[#c28e57] text-white font-semibold py-3 rounded-lg transition">
                        Finalizar pedido
                    </button>
                </div>
            )}
        </div>
    );
}
