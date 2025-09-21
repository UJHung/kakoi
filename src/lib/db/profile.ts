import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function getOrCreateGuestProfile() {
  const cookieStore = await cookies();
  const guestId = cookieStore.get("guestId")?.value;

  console.debug("guestId from cookie:", guestId);

  if (!guestId) {
    throw new Error("guestId not found - middleware should have set it");
  }

  try {
    // 先嘗試查找現有的配置檔
    const { data: existingProfile, error: findError } = await supabaseAdmin
      .from("Profile")
      .select("*")
      .eq("id", guestId)
      .single();

    // 如果找到配置檔且沒有錯誤，則返回它
    if (existingProfile && !findError) {
      return existingProfile;
    }

    // 如果找不到配置檔，則創建一個新的
    const { data: newProfile, error: createError } = await supabaseAdmin
      .from("Profile")
      .insert([{ id: guestId, type: "GUEST" }])
      .select()
      .single();

    if (createError) {
      console.error("Error creating profile:", createError);
      throw createError;
    }

    return newProfile;
  } catch (error) {
    console.error("Error in getOrCreateGuestProfile:", error);
    throw error;
  }
}
