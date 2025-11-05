"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ItemSacola {
    id: number;
    nome: string;
    preco: number;
    img: string;
    quantidade: number;
}

interface SacolaContextType {
    aberta: boolean;
    itens: ItemSacola[];
    abrirSacola: () => void;
    fecharSacola: () => void;
    adicionarProduto: (item: ItemSacola) => void;
    removerProduto: (id: number) => void;
    limparSacola: () => void;
}

const SacolaContext = createContext<SacolaContextType | undefined>(undefined);

export function SacolaProvider({ children }: { children: ReactNode }) {
    const [aberta, setAberta] = useState(false);
    const [itens, setItens] = useState<ItemSacola[]>([]);

    useEffect(() => {
        const armazenados = localStorage.getItem("sacola");
        if (armazenados) {
            setItens(JSON.parse(armazenados));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("sacola", JSON.stringify(itens));
    }, [itens]);

    const abrirSacola = () => setAberta(true);
    const fecharSacola = () => setAberta(false);

    const adicionarProduto = (item: ItemSacola) => {
        setItens((prev) => {
            const existente = prev.find((p) => p.id === item.id);
            if (existente) {
                return prev.map((p) =>
                    p.id === item.id ? { ...p, quantidade: p.quantidade+ item.quantidade} : p
                );
            }
            return [...prev, item];
        });
        setAberta(true);
    };

    const removerProduto = (id: number) => {
        setItens((prev) => prev.filter((item) => item.id !== id));
    };

    const limparSacola = () => setItens([]);

    return (
        <SacolaContext.Provider
            value={{
                aberta,
                itens,
                abrirSacola,
                fecharSacola,
                adicionarProduto,
                removerProduto,
                limparSacola,
            }}
        >
            {children}
        </SacolaContext.Provider>
    );
}

export function useSacola() {
    const context = useContext(SacolaContext);
    if (!context) {
        throw new Error("useSacola deve ser usado dentro de um <SacolaProvider>");
    }
    return context;
}