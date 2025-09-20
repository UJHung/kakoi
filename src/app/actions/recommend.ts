// app/actions/recommend.ts
// "use server";
// Note: recommend action implementation is disabled for now. Keep server directive.
// Removed unused imports and types to silence no-unused-vars warnings.

// export async function recommendCard(input: Input) {
//   // 1) 取出「我的卡」關聯的有效優惠
//   const now = new Date();
//   const offers = await prisma.offer.findMany({
//     where: {
//       cards: { some: { userCard: { profileId: input.profileId } } },
//       OR: [{ startDate: null }, { startDate: { lte: now } }],
//       AND: [{ endDate: null }, { endDate: { gte: now } }],
//       ...(input.category ? { category: input.category } : {})
//     },
//     include: { cards: { include: { userCard: true } } }
//   });

//   // 2) 套用支付工具/LEVEL2 限制（依你的資料模型或 meta 調整）
//   const filtered = offers.filter((o) => {
//     // 假設用 o.title 做簡單篩；實務建議用 o.meta.rules
//     if (/假日刷/.test(o.title)) return true; // 假日例外
//     if (/Pay著刷/.test(o.title)) {
//       if (input.payMethod === "LINE_PAY") return false; // Richart 的限制
//       // LEVEL2 才有 3.8%，否則降為 1.3%
//       if (!input.level2) o.bonusRate = Math.max(0, (1.3 - (o.baseRate ?? 0)));
//     }
//     return true;
//   });

//   // 3) 計分：金額 * 有效回饋率
//   const scored = filtered.map((o) => {
//     const rate = (o.baseRate ?? 0) + (o.bonusRate ?? 0);
//     const reward = input.amount * (rate / 100);
//     return { offer: o, card: o.cards[0]?.userCard, rate, reward };
//   }).sort((a, b) => b.reward - a.reward);

//   return scored.slice(0, 3);
// }
