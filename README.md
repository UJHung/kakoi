# kakoi - 信用卡優惠管理系統

> 一個幫助用戶管理信用卡並找到最佳回饋方案的 Next.js 應用程式

## ✨ 功能特色

- 🏦 **卡片管理**：新增、刪除個人信用卡
- � **優惠查詢**：透過關鍵字或類別搜尋卡片優惠
- 💰 **回饋計算**：分析不同消費場景的最佳回饋卡片
- 🎯 **智慧推薦**：根據消費習慣推薦最適合的信用卡

## 🛠 技術堆疊

- **框架**：Next.js 14 (App Router)
- **語言**：TypeScript
- **資料庫**：PostgreSQL + Prisma ORM
- **UI 元件**：shadcn/ui + Tailwind CSS
- **字體**：LINE Seed TW

## �📂 專案結構

```
src/
├─ app/                      # Next.js App Router
│  ├─ (auth)/                # 認證相關頁面
│  ├─ (main)/                # 主要功能頁面群組
│  │  ├─ cards/              # 卡片管理
│  │  ├─ dashboard/          # 個人儀表板
│  │  └─ offers/             # 優惠查詢
│  ├─ actions/               # Server Actions
│  │  ├─ cards.ts            # 卡片相關操作
│  │  └─ recommend.ts        # 推薦算法
│  └─ types/                 # TypeScript 型別定義
├─ components/               # React 元件
│  ├─ cards/                 # 卡片相關元件
│  ├─ common/                # 共用元件
│  └─ ui/                    # shadcn/ui 基礎元件
├─ data/
│  └─ cards.json             # 卡片與優惠資料庫
├─ lib/
│  └─ db/                    # 資料庫工具
├─ hooks/                    # 自訂 React Hooks
└─ prisma/                   # 資料庫 Schema
   ├─ schema.prisma
   └─ seed.ts
```

## 🚀 開始使用

### 環境需求

- Node.js 18+
- PostgreSQL 資料庫

### 安裝步驟

1. **複製專案**

   ```bash
   git clone https://github.com/UJHung/kakoi.git
   cd kakoi
   ```

2. **安裝依賴**

   ```bash
   npm install
   ```

3. **設置環境變數**

   ```bash
   cp .env.example .env.local
   ```

   編輯 `.env.local` 設置資料庫連線：

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/kakoi"
   ```

4. **初始化資料庫**

   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **啟動開發伺服器**

   ```bash
   npm run dev
   ```

   應用程式將在 http://localhost:3000 啟動

## 📊 核心功能

### 卡片管理

- 新增個人信用卡到系統
- 設定卡片等級 (LEVEL_1, LEVEL_2)
- 刪除不需要的卡片

### 優惠查詢

- 透過關鍵字搜尋優惠
- 按類別篩選優惠 (餐飲、電商、交通等)
- 查看詳細回饋率資訊

### 智慧推薦

- 根據消費場景推薦最佳回饋卡片
- 計算不同卡片的預期回饋
- 支援方案切換提醒

## 🎨 主要頁面

- **首頁** (`/`) - 專案介紹與快速開始
- **儀表板** (`/dashboard`) - 個人卡片總覽
- **卡片管理** (`/cards`) - 新增/刪除卡片
- **優惠查詢** (`/offers`) - 搜尋與瀏覽優惠

## 🔧 API 架構

### Server Actions

```typescript
// 新增卡片
await addCard(card)

// 刪除卡片
await deleteCard(cardId: string)

// 搜尋優惠
await searchByKeyword(keyword: string)

// 取得推薦卡片 (未來功能)
await getRecommendation(category: string, amount: number)
```

### 資料結構

卡片與優惠資料存放在 `src/data/cards.json`：

```json
{
  "schema_version": "1.0.0",
  "categories": [
    { "slug": "dining", "name": "餐飲" },
    { "slug": "ecommerce", "name": "電商" }
  ],
  "cards": [
    {
      "cardId": "cathay_cube",
      "issuer": "國泰世華",
      "name": "CUBE 卡",
      "offers": [
        {
          "id": "cube_dining",
          "name": "餐飲回饋",
          "category": ["dining"],
          "rate": {
            "LEVEL_1": 0.02,
            "LEVEL_2": 0.03
          }
        }
      ]
    }
  ]
}
```

## 📝 授權

本專案採用 MIT 授權
