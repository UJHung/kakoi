"use client";

import { useState, useCallback } from "react";

/**
 * 管理顯示/隱藏狀態的通用 Hook
 * @param initialState 初始狀態，默認為 false (隱藏)
 * @returns { isOpen, onOpen, onClose, onToggle } 狀態和控制函數
 */
export function useDisclosure(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return { isOpen, onOpen, onClose, onToggle };
}
