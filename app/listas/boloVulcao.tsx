"use client";

export default function BoloVulcao() {

    const vulcoes = [
        { id: 1, nome: "Red Velvet", preco: "R$ 10,00", img: "/vulcaoRedVelvet10.jpeg" },
        { id: 2, nome: "Chocolate", preco: "R$ 10,00", img: "/vulcaoChocolate10.jpeg" },
    ]


    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {vulcoes.map((vulcao) => (
                    <div
                        key={vulcao.id}
                        className="flex items-center bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:bg-[#cfcfcfab]">

                        <img src={vulcao.img} alt={vulcao.nome} className='w-45 h-32 object-cover rounded-l-xl' />

                        <div className="flex flex-col justify-center px-4 py-2 w-full">
                            <p className='font-semibold font-[quicksand] text-[#3e2723]  text-lg'>{vulcao.nome}</p>

                            <p className='text-green-700 font-bold text-base mt-1'>{vulcao.preco}</p>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}