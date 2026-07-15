'use client';
import { useEffect, useRef } from 'react';

const DEFAULT_BACKEND_URL = 'https://doceria-backend.onrender.com';
const KEEP_ALIVE_INTERVAL_MS = 3 * 60 * 1000; // Reduzido para 3 minutos
const PING_TIMEOUT_MS = 5000; // Aumentado para 5 segundos para dar mais tempo

export default function KeepAlive( ) {
  const lastPingRef = useRef<number | null>(null);

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || DEFAULT_BACKEND_URL;
    const pingEndpoint = `${backendUrl}/health/ping`; // Use o novo endpoint

    const pingBackend = async () => {
      if (typeof window === 'undefined' || !navigator.onLine) {
        return;
      }

      const now = Date.now();
      // Evita pings muito próximos se o componente for re-renderizado rapidamente
      if (lastPingRef.current && now - lastPingRef.current < KEEP_ALIVE_INTERVAL_MS / 2) { 
        return;
      }
      lastPingRef.current = now;

      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), PING_TIMEOUT_MS);

      try {
        const response = await fetch(pingEndpoint, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          console.warn(`KeepAlive: Ping para ${pingEndpoint} falhou com status ${response.status}`);
        } else {
          console.log(`KeepAlive: Ping para ${pingEndpoint} bem-sucedido.`);
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            console.warn(`KeepAlive: Ping para ${pingEndpoint} excedeu o tempo limite.`);
          } else {
            console.error(`KeepAlive: Erro ao fazer ping para ${pingEndpoint}:`, error);
          }
        } else {
          console.error(`KeepAlive: Erro desconhecido ao fazer ping para ${pingEndpoint}:`, error);
        }
      } finally {
        window.clearTimeout(timeoutId);
      }
    };

    // Ping inicial após um curto atraso
    const initialTimerId = window.setTimeout(() => {
      void pingBackend();
    }, 5_000); // 5 segundos após o carregamento da página

    // Ping em intervalos regulares
    const intervalId = window.setInterval(() => {
      void pingBackend();
    }, KEEP_ALIVE_INTERVAL_MS);

    // Ping quando a aba/janela volta a ficar visível ou ganha foco
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void pingBackend();
      }
    };
    const handleFocus = () => {
      void pingBackend();
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.clearTimeout(initialTimerId);
      window.clearInterval(intervalId);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
}
