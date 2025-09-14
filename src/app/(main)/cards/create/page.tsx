// app/cards/new/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { createUserCard } from "@/app/actions/cards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function NewCardPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  async function onSubmit(data: unknown) {
    await createUserCard(data);
    router.push("/cards");
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-6">
      <h1 className="text-xl font-semibold">新增卡片</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          placeholder="發卡行（例：台新銀行）"
          {...register("issuer", { required: true })}
        />
        <Input
          placeholder="卡片名稱（例：FlyGo）"
          {...register("productName", { required: true })}
        />
        <Input placeholder="別名（選填）" {...register("nickname")} />
        <Input placeholder="卡號後四碼（選填）" {...register("last4")} />
        <Button type="submit">送出</Button>
      </form>
    </div>
  );
}
