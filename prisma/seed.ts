import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const profileId = "guest-seed-kaku";

  await prisma.profile.upsert({
    where: { id: profileId },
    update: {},
    create: { id: profileId, type: "GUEST" },
  });

  const card = await prisma.userCard.create({
    data: {
      profileId,
      issuer: "台新銀行",
      productName: "Richart 卡",
      nickname: "Richart",
      last4: null,
    },
  });

  const offers = [
    {
      title: "Pay著刷（LEVEL2 最⾼ 3.8% / LEVEL1 1.3%）",
      category: ["其他"],
      baseRate: 0.3,
      bonusRate: 3.5,
      startDate: new Date("2025-09-01"),
      endDate: new Date("2025-12-31"),
    },
    {
      title: "天天刷（3.3%）",
      category: ["超商", "量販", "交通"],
      baseRate: 0.3,
      bonusRate: 3.0,
      startDate: new Date("2025-09-01"),
      endDate: new Date("2025-12-31"),
    },
    {
      title: "大筆刷（3.3%）",
      category: ["百貨"],
      baseRate: 0.3,
      bonusRate: 3.0,
      startDate: new Date("2025-09-01"),
      endDate: new Date("2025-12-31"),
    },
    {
      title: "好饗刷（3.3%）",
      category: ["餐飲"],
      baseRate: 0.3,
      bonusRate: 3.0,
      startDate: new Date("2025-09-01"),
      endDate: new Date("2025-12-31"),
    },
    {
      title: "數趣刷（3.3%）",
      category: ["網購"],
      baseRate: 0.3,
      bonusRate: 3.0,
      startDate: new Date("2025-09-01"),
      endDate: new Date("2025-12-31"),
    },
    {
      title: "玩旅刷（3.3%）",
      category: ["海外"],
      baseRate: 0.3,
      bonusRate: 3.0,
      startDate: new Date("2025-09-01"),
      endDate: new Date("2025-12-31"),
    },
    {
      title: "假日刷（2%）",
      category: ["其他"],
      baseRate: 0.3,
      bonusRate: 1.7,
      startDate: new Date("2025-09-01"),
      endDate: new Date("2025-12-31"),
    },
    {
      title: "保費免切換（1.3%）",
      category: ["保費"],
      baseRate: 0.3,
      bonusRate: 1.0,
      startDate: new Date("2025-09-01"),
      endDate: new Date("2025-12-31"),
    },
    {
      title: "一般消費（0.3%）",
      category: ["一般"],
      baseRate: 0.3,
      bonusRate: 0.0,
      startDate: null,
      endDate: null,
    },
  ];

  for (const o of offers) {
    const offer = await prisma.offer.create({
      data: {
        title: o.title,
        description: "詳情與限制請見台新官網活動頁。",
        categories: o.category,
        region: o.category.includes("海外") ? "海外" : "台灣",
        startDate: o.startDate ?? undefined,
        endDate: o.endDate ?? undefined,
        baseRate: o.baseRate,
        bonusRate: o.bonusRate,
        source:
          "https://www.taishinbank.com.tw/TSB/personal/credit/intro/overview/future/75e1eeeb-7816-11f0-b432-0050568c09e3",
      },
    });
    await prisma.cardOffer.create({
      data: { userCardId: card.id, offerId: offer.id },
    });
  }
}

main().finally(() => prisma.$disconnect());
