"use client";

export default function Categorias() {

    const categorias = [
        { nome: "Bolos no pote", id: "bolosNoPote" },
        { nome: "Copos da felicidade", id: "copoDaFelicidade" },
        { nome: "Bolos vulcão", id: "boloVulcao" },
        { nome: "Escondidinhos de brownie", id: "escondidinhoDeBrownie" },
        { nome: "Bombons", id: "bomBons" },
        { nome: "Fatias de bolo", id: "fatiasDeBolo" },
    ]

    const rolarParaSecao = (id: string) => {
        const secao = document.getElementById(id);
        if (secao) {
            const alturaHeader = 140;
            const posicao = secao.getBoundingClientRect().top + window.scrollY - alturaHeader;

            window.scrollTo({ top: posicao, behavior: "smooth" });
        }
    };

    return (
        <>

            <div className="mt-8 px-6 grid grid-cols-2 lg:grid-cols-3 gap-4 justify-center mb-10">

                {categorias.map((categorias) => (
                    <button
                        key={categorias.id}
                        onClick={() => rolarParaSecao(categorias.id)}
                        className="bg-white cursor-pointer p-4 rounded-xl shadow-md text-center font-[quicksand] font-semibold hover:bg-[#cfcfcfab] transition-transform hover:scale-[1.03]"
                    >{categorias.nome}</button>

                ))}

            </div>

        </>
    )
}