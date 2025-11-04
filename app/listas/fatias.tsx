"use client";

export default function Fatias(){

    const fatias = [
        { id: 1, nome: "Doce de leite", preco: "R$ 8,00", img: "/doceDeLeite8.jpeg" },
        { id: 2, nome: "Red velvet", preco: "R$ 8,00", img: "/redVelvet8.jpeg" },
        { id: 3, nome: "Dois amores", preco: "R$ 8,00", img: "/doisAmores8.jpeg" },
    ]

    return(
        <>
        
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {fatias.map((fatia) => (
                    <div
                        key={fatia.id}
                        className="flex items-center bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:bg-[#cfcfcfab]">

                        <img src={fatia.img} alt={fatia.nome} className='w-45 h-32 object-cover rounded-l-xl' />

                        <div className="flex flex-col justify-center px-4 py-2 w-full">
                            <p className='font-semibold font-[quicksand] text-[#3e2723]  text-lg'>{fatia.nome}</p>

                            <p className='text-green-700 font-bold text-base mt-1'>{fatia.preco}</p>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}