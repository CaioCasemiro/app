'use client';

import { useEffect, useRef } from 'react';

const DEFAULT_BACKEND_URL = 'https://doceria-backend.onrender.com';
const KEEP_ALIVE_INTERVAL_MS = 10 * 60 * 1000;
const PING_TIMEOUT_MS = 3000;

export default function KeepAlive() {
  const lastPingRef = useRef<number | null>(null);

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || DEFAULT_BACKEND_URL;

    const pingBackend = async () => {
      if (typeof window === 'undefined' || !navigator.onLine) {
        return;
      }

      const now = Date.now();
      if (lastPingRef.current && now - lastPingRef.current < KEEP_ALIVE_INTERVAL_MS) {
        return;
      }

      lastPingRef.current = now;

      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), PING_TIMEOUT_MS);

      try {
        await fetch(`${backendUrl}/admin/ajustes/estoque`, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
          signal: controller.signal,
        });
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          // Ignora falhas de rede; o objetivo é apenas tentar acordar o backend.
        }
      } finally {
        window.clearTimeout(timeoutId);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void pingBackend();
      }
    };

    const handleFocus = () => {
      void pingBackend();
    };

    const initialTimerId = window.setTimeout(() => {
      void pingBackend();
    }, 30_000);

    const intervalId = window.setInterval(() => {
      void pingBackend();
    }, KEEP_ALIVE_INTERVAL_MS);

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
