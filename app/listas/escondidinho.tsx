"use client";

export default function Escondidinho(){

    const escondidinhos = [
        { id: 1, nome: "Chocolate", preco: "R$ 12,00", img: "/escondidinhoChocolate12.jpeg" },
        { id: 2, nome: "Ninho com nutella", preco: "R$ 12,00", img: "/escondidinhoNinhoNutella12.jpeg" },
    ]

    return(
        <>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {escondidinhos.map((escondidinho) => (
                    <div
                        key={escondidinho.id}
                        className="flex items-center bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:bg-[#cfcfcfab]">

                        <img src={escondidinho.img} alt={escondidinho.nome} className='w-45 h-32 object-cover rounded-l-xl' />

                        <div className="flex flex-col justify-center px-4 py-2 w-full">
                            <p className='font-semibold font-[quicksand] text-[#3e2723]  text-lg'>{escondidinho.nome}</p>

                            <p className='text-green-700 font-bold text-base mt-1'>{escondidinho.preco}</p>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}