"use client";

import { useState, useEffect } from "react";
import { searchByKeyword, searchByCategory } from "@/app/types/search";
import { getMyCards } from "@/app/actions/cards";
import { getCategories } from "@/lib/utils/card-data";

/**
 * Hook 用於搜索優惠信息並排序（擁有的卡片優先）
 * @param query 搜索關鍵詞
 * @param categorySlug 分類標識
 * @returns { results, loading, error, categories } 優惠結果、載入狀態、錯誤信息和可用分類
 */
export function useOffers(query?: string, categorySlug?: string) {
  const [results, setResults] = useState<
    { card: any; offer: any; userOwned?: boolean }[]
  >([]);
  const [userCardIds, setUserCardIds] = useState<string[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 獲取用戶卡片
  useEffect(() => {
    async function fetchUserCards() {
      try {
        const myCards = await getMyCards();
        const myCardIds = myCards.map((card) => card.cardId);
        setUserCardIds(myCardIds);
      } catch (err) {
        console.error("獲取用戶卡片失敗:", err);
        setError(err instanceof Error ? err.message : "未知錯誤");
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

  // 執行搜尋
  useEffect(() => {
    async function performSearch() {
      try {
        setLoading(true);
        let searchResults: { card: any; offer: any }[] = [];

        if (categorySlug) {
          searchResults = await searchByCategory([categorySlug]);
        } else if (query && query.trim() !== "") {
          searchResults = await searchByKeyword(query);
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
  }, [query, categorySlug, userCardIds]);

  // 獲取指定分類信息
  const selectedCategory =
    categorySlug && categories.length > 0
      ? categories.find((c) => c.slug === categorySlug)
      : null;

  return {
    results,
    loading,
    error,
    categories,
    selectedCategory,
    userCardIds,
  };
}
