"use client";

import { useState, useEffect } from "react";
import { getCardInfo } from "@/lib/card-data";
import { getMyCards } from "@/app/actions/cards";

/**
 * Hook 用於獲取卡片詳細信息
 * @param cardId 卡片 ID
 * @returns { card, loading, error } 卡片數據、載入狀態和錯誤信息
 */
export function useCardDetail(cardId: string) {
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCardData() {
      try {
        setLoading(true);
        const cardData = await getCardInfo(cardId);
        setCard(cardData);
        setError(null);
      } catch (err) {
        console.error("Failed to load card data:", err);
        setError(err instanceof Error ? err.message : "未知錯誤");
      } finally {
        setLoading(false);
      }
    }

    loadCardData();
  }, [cardId]);

  return { card, loading, error };
}

/**
 * Hook 用於獲取用戶的所有卡片
 * @returns { cards, loading, error, refresh } 卡片列表、載入狀態、錯誤信息和刷新函數
 */
export function useUserCards() {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchCards() {
    try {
      setLoading(true);
      const userCards = await getMyCards();
      setCards(userCards);
      setError(null);
    } catch (err) {
      console.error("獲取用戶卡片失敗:", err);
      setError(err instanceof Error ? err.message : "未知錯誤");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCards();
  }, []);

  return { cards, loading, error, refresh: fetchCards };
}
