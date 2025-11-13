"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Ajustes() {
  const [doces, setDoces] = useState<any[]>([]);
  const [modoEdicao, setModoEdicao] = useState<any | null>(null);
  const [novoDoce, setNovoDoce] = useState({
    nome: "",
    imagem: "",
    quantidadeDisponivel: 0,
    preco: 0,
    categoria: "",
    isDestaque: false,
  });
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  async function carregarDoces() {
    try {
      const token = localStorage.getItem("token");
      const headers: any = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const resposta = await fetch(
        "https://doceria-backend.onrender.com/admin/ajustes/estoque",
        { headers }
      );

      if (!resposta.ok) throw new Error("Erro ao carregar doces");
      const dados = await resposta.json();
      setDoces(Array.isArray(dados) ? dados : []);
    } catch (erro) {
      console.error("Falha ao buscar doces:", erro);
    }
  }

  async function adicionarDoce(e: React.FormEvent) {
    e.preventDefault();
    if (!novoDoce.nome.trim()) return;
    setCarregando(true);
    try {
      // Verificar limite de destaques no front
      if (novoDoce.isDestaque) {
        const totalDestaques = doces.filter((d) => d.isDestaque).length;
        if (totalDestaques >= 5) {
          alert("Limite de 5 doces em destaque atingido!");
          setCarregando(false);
          return;
        }
      }

      const token = localStorage.getItem("token");
      const headers: any = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const resposta = await fetch(
        "https://doceria-backend.onrender.com/admin/ajustes/estoque",
        {
          method: "POST",
          headers,
          body: JSON.stringify(novoDoce),
        }
      );

      if (!resposta.ok) {
        const erro = await resposta.text();
        console.error("Erro ao adicionar doce:", erro);
      }

      setNovoDoce({
        nome: "",
        imagem: "",
        quantidadeDisponivel: 0,
        preco: 0,
        categoria: "",
        isDestaque: false,
      });
      carregarDoces();
    } finally {
      setCarregando(false);
    }
  }

  async function salvarEdicao() {
    if (!modoEdicao) return;
    setCarregando(true);
    try {
      // Verificar limite de destaques
      if (modoEdicao.isDestaque) {
        const totalDestaques = doces.filter(
          (d) => d.isDestaque && d.id !== modoEdicao.id
        ).length;
        if (totalDestaques >= 5) {
          alert("Limite de 5 doces em destaque atingido!");
          setCarregando(false);
          return;
        }
      }

      const token = localStorage.getItem("token");
      const headers: any = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const resposta = await fetch(
        `https://doceria-backend.onrender.com/admin/ajustes/estoque/${modoEdicao.id}`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify(modoEdicao),
        }
      );

      if (!resposta.ok) {
        const erro = await resposta.text();
        console.error("Erro ao salvar edição:", erro);
      }

      setModoEdicao(null);
      carregarDoces();
    } catch (erro) {
      console.error("Erro no PUT:", erro);
    } finally {
      setCarregando(false);
    }
  }

  async function excluirDoce(id: number) {
    if (!confirm("Tem certeza que deseja remover este doce?")) return;
    setCarregando(true);
    try {
      const token = localStorage.getItem("token");
      const headers: any = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      await fetch(
        `https://doceria-backend.onrender.com/admin/ajustes/estoque/${id}`,
        {
          method: "DELETE",
          headers,
        }
      );
      carregarDoces();
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDoces();
  }, []);

  return (
    <div
      className="p-8 min-h-screen font-[quicksand]"
      style={{ backgroundColor: "#E8CCAC" }}
    >
      <div>
        <button
          onClick={() => router.back()}
          className="bg-[#1900ff] hover:bg-[#877aff] text-white font-semibold px-4 py-2 rounded-lg transition"
        >
          {"< Voltar"}
        </button>
        <h1 className="text-4xl font-bold mb-10 text-center text-[#6d1b7b]">
          Painel de Ajustes
        </h1>
      </div>

      {/* Formulário novo doce */}
      <form
        onSubmit={adicionarDoce}
        className="bg-white/80 border border-pink-200 shadow-md rounded-2xl p-6 mb-10 max-w-3xl mx-auto"
      >
        <h2 className="text-xl font-semibold mb-4 text-[#6d1b7b] text-center">
          Adicionar novo doce
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <input type="text" placeholder="Nome do doce"
            value={novoDoce.nome}
            onChange={(e) => setNovoDoce({ ...novoDoce, nome: e.target.value })}
            className="border border-pink-300 rounded-lg px-3 py-2"
          />
          <input type="text" placeholder="URL da imagem"
            value={novoDoce.imagem}
            onChange={(e) => setNovoDoce({ ...novoDoce, imagem: e.target.value })}
            className="border border-pink-300 rounded-lg px-3 py-2"
          />
          <input type="number" placeholder="Qtd disponível"
            value={novoDoce.quantidadeDisponivel}
            onChange={(e) => setNovoDoce({ ...novoDoce, quantidadeDisponivel: Number(e.target.value) })}
            className="border border-pink-300 rounded-lg px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input type="number" step="0.01" placeholder="Preço (R$)"
            value={novoDoce.preco}
            onChange={(e) => setNovoDoce({ ...novoDoce, preco: Number(e.target.value) })}
            className="border border-pink-300 rounded-lg px-3 py-2"
          />
          <input type="text" placeholder="Categoria"
            value={novoDoce.categoria}
            onChange={(e) => setNovoDoce({ ...novoDoce, categoria: e.target.value })}
            className="border border-pink-300 rounded-lg px-3 py-2"
          />
          <label className="flex items-center gap-2 text-[#6d1b7b]">
            <input type="checkbox"
              checked={novoDoce.isDestaque}
              onChange={(e) => setNovoDoce({ ...novoDoce, isDestaque: e.target.checked })}
            />
            Destaque?
          </label>
        </div>

        <button
          type="submit"
          disabled={carregando}
          className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-xl transition block mx-auto"
        >
          {carregando ? "Salvando..." : "Adicionar Doce"}
        </button>
      </form>

      {/* Listagem */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doces.map((doce) => (
          <div key={doce.id}
            className="bg-white/80 border border-pink-200 rounded-2xl shadow-lg p-5 flex flex-col items-center hover:scale-[1.02] transition-all"
          >
            {modoEdicao?.id === doce.id ? (
              <>
                <input type="text"
                  value={modoEdicao.nome ?? ""}
                  onChange={(e) => setModoEdicao({ ...modoEdicao, nome: e.target.value })}
                  className="border border-pink-300 rounded-lg px-2 py-1 mb-2 w-full"
                />
                <input type="text"
                  value={modoEdicao.imagem ?? ""}
                  onChange={(e) => setModoEdicao({ ...modoEdicao, imagem: e.target.value })}
                  className="border border-pink-300 rounded-lg px-2 py-1 mb-2 w-full"
                />
                <input type="number"
                  value={modoEdicao.quantidadeDisponivel ?? 0}
                  onChange={(e) => setModoEdicao({ ...modoEdicao, quantidadeDisponivel: Number(e.target.value) })}
                  className="border border-pink-300 rounded-lg px-2 py-1 mb-2 w-full"
                />
                <input type="number" step="0.01"
                  value={modoEdicao.preco ?? 0}
                  onChange={(e) => setModoEdicao({ ...modoEdicao, preco: Number(e.target.value) })}
                  className="border border-pink-300 rounded-lg px-2 py-1 mb-2 w-full"
                />
                <input type="text"
                  value={modoEdicao.categoria ?? ""}
                  onChange={(e) => setModoEdicao({ ...modoEdicao, categoria: e.target.value })}
                  className="border border-pink-300 rounded-lg px-2 py-1 mb-2 w-full"
                />
                <label className="flex items-center gap-2 text-[#6d1b7b] mb-2">
                  <input type="checkbox"
                    checked={modoEdicao.isDestaque ?? false}
                    onChange={(e) => setModoEdicao({ ...modoEdicao, isDestaque: e.target.checked })}
                  />
                  Destaque?
                </label>

                <div className="flex gap-2 mt-2">
                  <button onClick={salvarEdicao} className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition">
                    Salvar
                  </button>
                  <button onClick={() => setModoEdicao(null)} className="bg-gray-400 text-white px-3 py-1 rounded-lg hover:bg-gray-500 transition">
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <img src={doce.imagem || "/placeholder.jpg"} alt={doce.nome}
                  className="w-40 h-32 object-cover rounded-xl mb-3"
                />
                <p className="font-semibold text-lg text-[#6d1b7b]">{doce.nome}</p>
                <p className="text-sm text-gray-700 mt-1">Qtd disponível: {doce.quantidadeDisponivel}</p>
                <p className="text-sm text-gray-700 mt-1">Preço: R$ {Number(doce.preco).toFixed(2)}</p>
                <p className="text-sm text-gray-700">Categoria: {doce.categoria || "—"}</p>
                <p className="text-sm text-yellow-700 font-semibold">{doce.isDestaque ? "⭐ Destaque" : ""}</p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() =>
                      setModoEdicao({
                        ...doce,
                        preco: doce.preco ?? 0,
                        categoria: doce.categoria ?? "",
                        imagem: doce.imagem ?? "",
                        quantidadeDisponivel: doce.quantidadeDisponivel ?? 0,
                        isDestaque: doce.isDestaque ?? false,
                      })
                    }
                    className="bg-pink-600 text-white px-3 py-1 rounded-lg hover:bg-pink-700 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => excluirDoce(doce.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                  >
                    Excluir
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
