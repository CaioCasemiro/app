"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";



export default function Admin() {

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const router = useRouter()

    async function confirmarLogin() {
        if (!usuario.trim()) return alert("Preencha o usuário!")
        if (!senha.trim()) return alert("Preencha a senha!")

        const usuarioLogin = {
            user: usuario,
            password: senha
        }

        try {

            const resposta = await fetch("http://localhost:3001/admin/login", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(usuarioLogin)
            })

            const dados = await resposta.json()

            if (!resposta.ok){
                alert(dados.erro || "Erro no login");
                return
            }
            
            alert("Login bem sucedido")
            localStorage.setItem("token", dados.token)

            router.push("/admin/pedidos")


        } catch (erro) {
            console.error(erro)
            window.alert(erro)
        }

    }

    return (
        <>
            <div className="min-h-screen bg-[#E8CCAC] w-full flex items-center justify-center">
                <div className="flex flex-col bg-[#F8EFE6] shadow-lg items-center gap-6 w-[75%] h-[80vh] p-8 border border-black/20 rounded-2xl md:w-[50%] lg:w-[40%]">
                    <img
                        src="/logo.png"
                        alt="logo adocicada"
                        className="w-32 h-32 object-contain"
                    />
                    <h1 className="text-2xl font-[raleway] font-semibold">Página do administrador</h1>
                    <div className=" w-full h-[25vh] justify-between rounded-lg p-6 flex flex-col items-center gap-4">
                        <input
                            className="border rounded-lg border-black/50 shadow-md px-4 py-2.5 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-[#d4a574]"
                            placeholder="Usuário"
                            type="text"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                        <input
                            className="border rounded-lg border-black/50 shadow-md px-4 py-2.5 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-[#d4a574]"
                            placeholder="Senha"
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>
                    <button
                        className="bg-green-400 border border-black/20 w-[20vh] rounded-lg px-6 py-2 shadow-lg"
                        onClick={confirmarLogin}
                    >Entrar</button>
                </div>

            </div>
        </>
    )
}