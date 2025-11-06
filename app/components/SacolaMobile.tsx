"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSacola } from "../context/sacolaContext";
import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

export default function SacolaMobile() {
    const { aberta, fecharSacola, itens, removerProduto, limparSacola } = useSacola();

    const [checkoutAberto, setCheckoutAberto] = useState(false);
    const [modoEntrega, setModoEntrega] = useState<"delivery" | "retirada">("delivery");
    const [formaPagamento, setFormaPagamento] = useState<"pix" | "dinheiro">("pix");
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [valorEntrega, setValorEntrega] = useState(0);
    const [pontoReferencia, setPontoReferencia] = useState("");


    const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);



    async function confirmarPedido() {
        if (!nome.trim()) return alert("Informe seu nome.");
        if (!telefone.trim()) return alert("Informe seu telefone.");

        if (modoEntrega === "delivery") {
            if (!rua.trim() || !numero.trim() || !bairro.trim()) {
                return alert("Preencha o endereço completo para delivery.");
            }
        }

        const totalComEntrega =
            modoEntrega === "delivery" ? total + valorEntrega : total;

        const pedido = {
            itens,
            total: totalComEntrega,
            valorEntrega: modoEntrega === "delivery" ? valorEntrega : 0,
            modoEntrega,
            formaPagamento,
            nome,
            telefone,
            ...(modoEntrega === "delivery" && {
                endereco: { rua, numero, bairro, pontoReferencia },
            }),
            criadoEm: new Date().toISOString(),
        };

        try{
            const resposta = await fetch("http://localhost:3001/pedidos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pedido)
            })

            const dados = await resposta.json()

            if(!resposta.ok) throw new Error(dados.erro || "Erro ao enviar pedido");
            
            window.alert("Pedido enviado com sucesso!")

            if(dados.codigoPix){
                console.log("Código pix: ", dados.codigoPix)
            }
            limparSacola();
            setCheckoutAberto(false);

        } catch(erro){
            console.error(erro)
            window.alert("Erro ao enviar pedido. Tente novamente.")
        }

    }


    return (
        <AnimatePresence>
            {aberta && (
                <>
                    <motion.div
                        key="sacola-overlay"
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={fecharSacola}
                    />
                    <motion.div
                        key="sacola-panel"
                        className="fixed top-0 right-0 h-full w-[90%] sm:w-[400px] bg-white shadow-2xl z-50 flex flex-col lg:hidden"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    >
                        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-lg font-semibold font-[raleway]">Minha Sacola</h2>
                            <button onClick={fecharSacola} className="text-gray-500 hover:text-black text-xl">
                                ×
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 space-y-4">
                            {itens.length === 0 ? (
                                <p className="text-center text-gray-500 mt-10 font-[inter]">
                                    Sua sacola está vazia 🍰
                                </p>
                            ) : (
                                itens.map((item) => (
                                    <div key={item.id} className="flex items-center gap-3 border-b border-gray-100 pb-3">
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
                                    <span className="font-semibold font-[inter]">R$ {total.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={limparSacola}
                                    className="w-full bg-gray-100 text-gray-700 font-medium py-2 rounded-lg mb-2 hover:bg-gray-200"
                                >
                                    Limpar sacola
                                </button>
                                <button
                                    onClick={() => setCheckoutAberto(true)}
                                    className="w-full bg-[#d4a574] hover:bg-[#c28e57] text-white font-semibold py-3 rounded-lg transition">
                                    Finalizar pedido
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}

            {checkoutAberto && (
                <CheckoutModal
                    key="checkout-modal"
                    itens={itens}
                    total={total}
                    modoEntrega={modoEntrega}
                    formaPagamento={formaPagamento}
                    setModoEntrega={setModoEntrega}
                    setFormaPagamento={setFormaPagamento}
                    onFechar={() => setCheckoutAberto(false)}
                    onConfirmar={confirmarPedido}
                    nome={nome}
                    setNome={setNome}
                    telefone={telefone}
                    setTelefone={setTelefone}
                    rua={rua}
                    setRua={setRua}
                    numero={numero}
                    setNumero={setNumero}
                    bairro={bairro}
                    setBairro={setBairro}
                    pontoReferencia={pontoReferencia}
                    setPontoReferencia={setPontoReferencia}
                    valorEntrega={valorEntrega}
                    setValorEntrega={setValorEntrega}
                />
            )}
        </AnimatePresence>
    );
}
