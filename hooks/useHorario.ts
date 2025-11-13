
"use client";

import { useMemo } from "react";

type Dia =
    | "segunda"
    | "terca"
    | "quarta"
    | "quinta"
    | "sexta"
    | "sabado"
    | "domingo";
type Horario = { aberto: boolean; inicio: number; fim: number };

export function useHorario() {
    return useMemo(() => {
        const horarios: Record<Dia, Horario> = {
            segunda: { aberto: false, inicio: 10, fim: 18 },
            terca: { aberto: true, inicio: 10, fim: 18 },
            quarta: { aberto: true, inicio: 10, fim: 18 },
            quinta: { aberto: true, inicio: 10, fim: 18 },
            sexta: { aberto: true, inicio: 10, fim: 18 },
            sabado: { aberto: true, inicio: 10, fim: 18 },
            domingo: { aberto: true, inicio: 10, fim: 18 },
        };

        const dias = [
            "domingo",
            "segunda",
            "terca",
            "quarta",
            "quinta",
            "sexta",
            "sabado",
        ] as const;
        type Dias = typeof dias[number];

        const agora = new Date();
        const diaAtual = dias[agora.getDay()] as Dias;
        const hoje = horarios[diaAtual];
        const horaAtual = agora.getHours() + agora.getMinutes() / 60;
        const abertoAgora = hoje.aberto && horaAtual >= hoje.inicio && horaAtual <= hoje.fim;
        const textoBarra = abertoAgora ? "Aberto agora" : "Fechado no momento";
        const corBarra = abertoAgora ? "bg-green-500" : "bg-red-500";

        return { abertoAgora, textoBarra, corBarra };
    }, []);
}
