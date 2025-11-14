"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ModalProduto from "./components/modalProduto";

import "swiper/css";
import "swiper/css/navigation";

export default function Destaques() {
    const [produtosDestaque, setProdutosDestaque] = useState<any[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);

    async function carregarProdutos() {
        try {
            setCarregando(true);
            setErro("");

            const resposta = await fetch("https://doceria-backend.onrender.com/admin/ajustes/estoque");

            if (!resposta.ok) {
                setErro("Erro ao conectar ao servidor.");
                return;
            }

            const dados = await resposta.json();
            const somenteDestaques = dados.filter((p: any) => p.isDestaque === true);

            setProdutosDestaque(somenteDestaques);

            if (somenteDestaques.length === 0) {
                setErro("Nenhum destaque no momento...");
            }
        } catch (erro) {
            setErro("Erro ao carregar os destaques.");
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarProdutos();
    }, []);

    if (carregando) {
        return (
            <div className="text-center text-[#3e2723] mt-6 font-semibold">
                Carregando destaques...
            </div>
        );
    }

    if (erro && produtosDestaque.length === 0) {
        return (
            <div className="text-center text-[#3e2723] mt-6 font-semibold">
                {erro}
            </div>
        );
    }

    return (
        <>
            <div className="block md:hidden relative">
                <Swiper
                    modules={[Navigation]}
                    navigation={true}
                    spaceBetween={25}
                    slidesPerView={1.7}
                    centeredSlides={false}
                    className="px-4 overflow-visible"
                >
                    {produtosDestaque.map((produto) => (
                        <SwiperSlide
                            key={produto.id}
                            onClick={() => setProdutoSelecionado(produto)}
                            className="flex! flex-row! items-center bg-white rounded-xl shadow-md overflow-visible hover:shadow-lg transition-transform cursor-pointer duration-300 hover:scale-[1.03] hover:bg-[#cfcfcfab] h-32"
                        >
                            <img
                                src={produto.imagem}
                                alt={produto.nome}
                                className="flex-none w-20 h-28 object-cover rounded-l-xl"
                            />
                            <div className="flex flex-col justify-center px-3 py-2 flex-1">
                                <p className="font-semibold font-[quicksand] text-[#3e2723] text-sm leading-tight line-clamp-3">
                                    {produto.nome}
                                </p>
                                <p className="text-green-700 font-bold text-sm mt-1">
                                    R$ {produto.preco}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                {produtosDestaque.map((produto) => (
                    <div
                        key={produto.id}
                        onClick={() => setProdutoSelecionado(produto)}
                        className="flex items-center bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform cursor-pointer duration-300 hover:scale-[1.03] hover:bg-[#cfcfcfab] h-32"
                    >
                        <img
                            src={produto.imagem}
                            alt={produto.nome}
                            className="w-44 h-32 object-cover rounded-l-xl"
                        />
                        <div className="flex flex-col justify-center px-4 py-2 w-full">
                            <p className="font-semibold font-[quicksand] text-[#3e2723] text-lg">
                                {produto.nome}
                            </p>
                            <p className="text-green-700 font-bold text-base mt-1">
                                R$ {produto.preco}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {produtoSelecionado && (
                <ModalProduto
                    produto={produtoSelecionado}
                    onFechar={() => setProdutoSelecionado(null)}
                />
            )}
        </>
    );
}
