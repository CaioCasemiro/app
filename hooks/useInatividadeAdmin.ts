import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useInatividadeAdmin(tempoMin = 20) {
    const router = useRouter();

    useEffect(() => {
        const limite = tempoMin * 60 * 1000;

        const registrarAtividade = () => {
            localStorage.setItem("ultimaAtividadeAdmin", Date.now().toString());
        };

        // Registrar eventos
        window.addEventListener("mousemove", registrarAtividade);
        window.addEventListener("keydown", registrarAtividade);
        window.addEventListener("click", registrarAtividade);

        registrarAtividade();

        const verificar = setInterval(() => {
            const ultima = localStorage.getItem("ultimaAtividadeAdmin");
            const agora = Date.now();

            if (ultima && agora - Number(ultima) > limite) {
                localStorage.removeItem("token");
                localStorage.removeItem("ultimaAtividadeAdmin");

                router.push("/admin");
            }
        }, 60000);

        return () => {
            window.removeEventListener("mousemove", registrarAtividade);
            window.removeEventListener("keydown", registrarAtividade);
            window.removeEventListener("click", registrarAtividade);
            clearInterval(verificar);
        };

    }, [tempoMin, router]);
}
