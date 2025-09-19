## 📂 專案結構

```bash
kaku-cardku/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx              // 首頁
│  ├─ cards/
│  │   ├─ page.tsx          // 卡片清單
│  │   └─ new/page.tsx      // 新增卡片表單
│  ├─ actions/
│  │   └─ cards.ts          // Server Action：新增卡片
├─ components/ui/            // shadcn/ui 元件
├─ lib/
│  └─ prisma.ts
├─ prisma/
│  ├─ schema.prisma
│  └─ seed.ts
├─ package.json
└─ tsconfig.json
```
