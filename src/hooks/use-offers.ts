"use client";

import { useState, useEffect } from "react";
import { searchByKeyword, searchByCategory, getAllCards } from "@/app/types/search";
import { getMyCards } from "@/app/actions/cards";
import { getCategories } from "@/lib/utils/card-data";

export function useOffers(query?: string, categorySlug?: string) {
  const [results, setResults] = useState<
    { card: any; offer: any; userOwned?: boolean }[]
  >([]);
  const [userCardIds, setUserCardIds] = useState<string[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userCardsLoading, setUserCardsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 獲取用戶卡片
  useEffect(() => {
    async function fetchUserCards() {
      try {
        setUserCardsLoading(true); // 開始載入用戶卡片
        const myCards = await getMyCards();
        const myCardIds = myCards.map((card) => card.cardId);
        setUserCardIds(myCardIds);
      } catch (err) {
        console.error("獲取用戶卡片失敗:", err);
        setError(err instanceof Error ? err.message : "未知錯誤");
      } finally {
        setUserCardsLoading(false); // 用戶卡片載入完成
      }
    }

    fetchUserCards();
  }, []);

  // 獲取分類
  useEffect(() => {
    async function loadCategories() {
      try {
        const cats = await getCategories();
        setCategories(cats);
      } catch (err) {
        console.error("獲取分類失敗:", err);
        setError(err instanceof Error ? err.message : "未知錯誤");
      }
    }

    loadCategories();
  }, []);

  // 執行搜尋 - 只有在用戶卡片載入完成後才執行
  useEffect(() => {
    // 如果用戶卡片還在載入中，不執行搜尋
    if (userCardsLoading) {
      return;
    }

    async function performSearch() {
      try {
        setLoading(true);
        let searchResults: { card: any; offer: any }[] = [];

        if (categorySlug) {
          searchResults = await searchByCategory([categorySlug]);
        } else if (query && query.trim() !== "") {
          searchResults = await searchByKeyword(query);
        } else {
          searchResults = await getAllCards()
        }

        // 標記用戶擁有的卡片，並依此排序
        const processedResults = searchResults.map((result) => ({
          ...result,
          userOwned: userCardIds.includes(result.card.cardId),
        }));
        
        // 排序：用戶擁有的卡片優先顯示
        processedResults.sort((a, b) => {
          if (a.userOwned && !b.userOwned) return -1;
          if (!a.userOwned && b.userOwned) return 1;
          return 0;
        });

        setResults(processedResults);
        setError(null);
      } catch (err) {
        console.error("搜尋優惠失敗:", err);
        setError(err instanceof Error ? err.message : "未知錯誤");
      } finally {
        setLoading(false);
      }
    }

    performSearch();
  }, [query, categorySlug, userCardIds, userCardsLoading]); 
  // 獲取指定分類信息
  const selectedCategory =
    categorySlug && categories.length > 0
      ? categories.find((c) => c.slug === categorySlug)
      : null;

  return {
    results,
    loading: loading || userCardsLoading, // 任一載入中就是載入中
    error,
    categories,
    selectedCategory,
    userCardIds,
  };
}
