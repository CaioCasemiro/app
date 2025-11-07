"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

interface SuccessModalProps {
    message?: string;
    duration?: number; // ms
    onClose: () => void;
}

export default function SuccessModal({ message = "Sucesso!", duration = 2500, onClose }: SuccessModalProps) {
    useEffect(() => {
        const t = setTimeout(() => onClose(), duration);
        return () => clearTimeout(t);
    }, [duration, onClose]);

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center"
            >
                <div className="flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">{message}</h3>
                <p className="text-sm text-gray-500 mb-4">Recebemos seu pedido e já estamos processando.</p>
                <button onClick={onClose} className="mt-2 bg-[#d4a574] hover:bg-[#c28e57] text-white px-4 py-2 rounded-lg">Fechar</button>
            </motion.div>
        </div>
    );
}
