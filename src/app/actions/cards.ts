"use server";

import { cache } from "react";
import { cookies } from "next/headers";

import { supabaseAdmin } from "@/lib/supabase/server";
import { getOrCreateGuestProfile } from "@/lib/db/profile";
import { CardDTO } from "../types/card";

const fetchUserCardsForProfile = cache(async (profileId: string) => {
  console.log("Actual DB fetch for profileId:", profileId);
  
  const { data: userCards, error } = await supabaseAdmin
    .from("UserCard")
    .select('cardId')
    .eq("profileId", profileId);

  if (error) {
    console.error("Error fetching user cards:", error);
    return [];
  }

  return userCards || [];
});

export async function getMyCards() {
  try {
    const cookieStore = await cookies();
    const guestId = cookieStore.get("guestId")?.value;
    let actualProfileId = guestId;

    if (!guestId) {
      const profile = await getOrCreateGuestProfile();
      actualProfileId = profile.id;
    }

    return await fetchUserCardsForProfile(actualProfileId as string);
  } catch (error) {
    console.error("Error in getMyCards:", error);
    return [];
  }
}

export async function addCard(data: CardDTO) {
  const profile = await getOrCreateGuestProfile();
  console.log("Using profileId:", profile.id, data);

  try {
    const { data: card, error } = await supabaseAdmin
      .from('UserCard')
      .insert([{
        profileId: profile.id,
        cardId: data.cardId,
        nickname: data.nickname,
      }])
      .select()
      .single();

    if (error) {
      console.error("Error adding card:", error);
      throw new Error(`新增卡片失敗: ${error.message}`);
    }

    // 重新驗證相關頁面
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/dashboard");
    revalidatePath("/cards");

    return card;
  } catch (error) {
    console.error("Error adding card:", error);
    throw error;
  }
}

export async function deleteCard(cardId: string) {
  try {
    const profile = await getOrCreateGuestProfile();

    // 使用 Supabase 刪除卡片
    const { data, error } = await supabaseAdmin
      .from('UserCard')
      .delete()
      .eq('cardId', cardId)
      .eq('profileId', profile.id)
      .select(); // 返回被刪除的記錄

    if (error) {
      console.error("刪除卡片時發生錯誤:", error);
      throw new Error(`刪除卡片失敗: ${error.message}`);
    }

    if (!data || data.length === 0) {
      throw new Error("找不到要刪除的卡片或沒有權限刪除");
    }

    // 重新驗證相關頁面
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/dashboard");
    revalidatePath("/cards");

    return { 
      success: true, 
      deletedCount: data.length,
      deletedCards: data
    };
  } catch (error) {
    console.error("刪除卡片時發生錯誤:", error);
    throw error;
  }
}
