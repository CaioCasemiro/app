"use client";

import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

interface PixModalProps {
    codigoPix: string;
    onFechar: () => void;
}

export default function PixModal({ codigoPix, onFechar }: PixModalProps) {
    const [copiado, setCopiado] = useState(false);

    const copiarPix = () => {
        navigator.clipboard.writeText(codigoPix);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000);
    };

    useEffect(() => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.overflow = 'hidden';
        document.body.style.width = '100%';

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollY);
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg flex flex-col items-center relative">
                <h2 className="text-xl font-semibold mb-4">Pagamento via PIX</h2>


                <div className="mb-4 p-4 bg-gray-100 rounded">
                    <QRCode value={codigoPix} size={180} />
                </div>

                <div className="flex flex-col items-center mb-4">
                    <p className="break-all text-center mb-2">{codigoPix}</p>
                    <button
                        onClick={copiarPix}
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition"
                    >
                        {copiado ? "Copiado!" : "Copiar código PIX"}
                    </button>
                </div>

                <div className="text-center mt-4">
                    <p className="mb-2">Envie o comprovante para o nosso WhatsApp:</p>
                    <a
                        href="https://api.whatsapp.com/send/?phone=%2B5589994282685&text&type=phone_number&app_absent=0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-green-600 text-white py-2 px-4 rounded inline-block transition"
                    >
                        Abrir WhatsApp
                    </a>
                </div>

                <button
                    onClick={onFechar}
                    aria-label="Fechar modal"
                    className="absolute top-3 right-3 p-2 bg-gray-100 rounded-full text-gray-600 hover:text-black hover:bg-gray-200 text-xl font-bold shadow-sm"
                >
                    ×
                </button>
            </div>
        </div>
    );
}
