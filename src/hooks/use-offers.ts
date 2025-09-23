"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
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
  
  const [cachedResults, setCachedResults] = useState<Record<string, any[]>>({});

  const loadCategories = useCallback(async () => {
    try {
      const cats = await getCategories();
      setCategories(cats);
    } catch (err) {
      console.error("獲取分類失敗:", err);
      setError(err instanceof Error ? err.message : "未知錯誤");
    }
  }, []);

  const fetchUserCards = useCallback(async () => {
    try {
      setUserCardsLoading(true);
      const myCards = await getMyCards();
      const myCardIds = myCards.map((card) => card.cardId);
      setUserCardIds(myCardIds);
    } catch (err) {
      console.error("獲取用戶卡片失敗:", err);
      setError(err instanceof Error ? err.message : "未知錯誤");
    } finally {
      setUserCardsLoading(false);
    }
  }, []);

  const performSearch = useCallback(async () => {
    try {
      setLoading(true);
      
      const cacheKey = `${query || ''}-${categorySlug || ''}`;
    
      if (cachedResults[cacheKey]) {
        const processedResults = cachedResults[cacheKey].map((result) => ({
          ...result,
          userOwned: userCardIds.includes(result.card.cardId),
        }));
        
        processedResults.sort((a, b) => {
          if (a.userOwned && !b.userOwned) return -1;
          if (!a.userOwned && b.userOwned) return 1;
          return 0;
        });
        
        setResults(processedResults);
        setLoading(false);
        return;
      }
      
      let searchResults: { card: any; offer: any }[] = [];

      if (categorySlug) {
        searchResults = await searchByCategory([categorySlug]);
      } else if (query && query.trim() !== "") {
        searchResults = await searchByKeyword(query);
      } else {
        searchResults = await getAllCards();
      }

      setCachedResults(prev => ({
        ...prev,
        [cacheKey]: searchResults
      }));

      const processedResults = searchResults.map((result) => ({
        ...result,
        userOwned: userCardIds.includes(result.card.cardId),
      }));
      
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
  }, [query, categorySlug, userCardIds, cachedResults]);

  // 初始化載入分類和用戶卡片
  useEffect(() => {
    let isMounted = true;
    
    const initializeData = async () => {
      if (isMounted) {
        await Promise.all([loadCategories(), fetchUserCards()]);
      }
    };
    
    initializeData();
    
    return () => {
      isMounted = false;
    };
  }, [loadCategories, fetchUserCards]);

  // 當查詢條件變更時執行搜尋
  useEffect(() => {
    if (userCardsLoading) {
      return;
    }
    performSearch();
  }, [performSearch, userCardsLoading]);

  const selectedCategory = useMemo(() => 
    categorySlug && categories.length > 0
      ? categories.find((c) => c.slug === categorySlug)
      : null,
    [categorySlug, categories]
  );

  return {
    results,
    loading: loading || userCardsLoading,
    error,
    categories,
    selectedCategory,
    userCardIds,
  };
}
