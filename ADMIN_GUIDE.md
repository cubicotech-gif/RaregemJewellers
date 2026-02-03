# 🎯 Rare Gems Jewelry - Admin Panel Guide

## 📖 Overview

Complete admin panel for managing your jewelry e-commerce store. Built with Next.js 14, TypeScript, Supabase, and Tailwind CSS.

## 🚀 Getting Started

### 1. Database Setup

Run the SQL schema in your Supabase SQL Editor:

```bash
# Open supabase-schema.sql and execute all SQL commands in your Supabase dashboard
```

The schema includes:
- ✅ Products table with admin fields (SKU, cost price, SEO, etc.)
- ✅ Orders table with payment tracking
- ✅ Admin users table for authentication
- ✅ Stock history for inventory tracking
- ✅ Price history for pricing analytics
- ✅ Expenses for financial management
- ✅ Customer analytics
- ✅ Activity logs
- ✅ Store settings

### 2. Environment Setup

Your `.env.local` file is already configured with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://oaoohgbyzaazwsnldsab.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Create Admin User

After running the database schema, create your first admin user:

```sql
-- In Supabase SQL Editor
INSERT INTO admin_users (email, password_hash, full_name, role) VALUES
('admin@raregems.com', '$2b$10$YourBcryptHashHere', 'Admin User', 'super_admin');
```

Or use bcrypt to hash your password:
```bash
npm install -g bcrypt-cli
bcrypt your_password
```

## 🔐 Access Admin Panel

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:3000/admin/login`

3. Login with your admin credentials:
   - Email: `admin@raregems.com`
   - Password: `admin123` (or your custom password)

## 📊 Features Overview

### Dashboard (`/admin`)
- Real-time statistics (today's revenue, orders, low stock alerts)
- Revenue chart (last 30 days)
- Best selling products
- Recent orders timeline
- Quick stats overview

### Products Management (`/admin/products`)
- **Inline editing** - Edit price and stock directly in the table
- **Quick actions** - Toggle featured status with one click
- **Search & filter** - Find products by name, gem type, or category
- **Stock alerts** - Visual indicators for low/out of stock items
- **Bulk operations** - Delete, archive, or update multiple products

### Orders Management (`/admin/orders`)
- View all orders with detailed information
- **Status management** - Update order status inline
- **Search** - Find orders by customer name, email, or order ID
- **Filter by status** - Pending, processing, shipped, delivered, cancelled
- Track payment status and refunds
- Add internal notes to orders

### Inventory Management (`/admin/inventory`)
- **Low stock alerts** - Automatic notifications for products below threshold
- **Stock history** - Track all inventory changes with audit trail
- **Out of stock monitoring** - Quick view of unavailable items
- Visual stock level indicators

### Customers (`/admin/customers`)
- Customer database with purchase history
- **Customer segmentation** - VIP, Regular, New
- **Lifetime value tracking** - Total spent per customer
- Contact information management
- Order count and last purchase date

### Analytics (`/admin/analytics`)
- Revenue trends (7, 30, or 90 days)
- Total orders and average order value
- Sales performance charts
- Category performance analysis

### Finances (`/admin/finances`)
- **Expense tracking** - Record all business expenses
- **Category breakdown** - Organize expenses by type
- **Monthly summaries** - Track spending trends
- Profit & loss calculations
- Revenue vs. expenses comparison

### Settings (`/admin/settings`)
- Store information (name, email, phone)
- Business settings (currency, tax rate)
- Inventory thresholds (low stock alerts)
- Database connection status

## 🛠️ Technical Architecture

### Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Tables:** React Table (@tanstack/react-table)
- **Forms:** React Hook Form + Zod
- **State:** Zustand + React Query
- **Auth:** Custom auth with bcrypt
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

### File Structure

```
app/
├── admin/
│   ├── layout.tsx           # Protected admin layout with sidebar
│   ├── page.tsx             # Dashboard
│   ├── login/
│   │   └── page.tsx         # Admin login
│   ├── products/
│   │   └── page.tsx         # Product management
│   ├── orders/
│   │   └── page.tsx         # Order management
│   ├── inventory/
│   │   └── page.tsx         # Inventory tracking
│   ├── customers/
│   │   └── page.tsx         # Customer management
│   ├── analytics/
│   │   └── page.tsx         # Analytics dashboard
│   ├── finances/
│   │   └── page.tsx         # Financial tracking
│   └── settings/
│       └── page.tsx         # Settings configuration

components/
├── admin/
│   ├── Sidebar.tsx          # Admin sidebar navigation
│   ├── StatsCard.tsx        # Dashboard stat cards
│   └── RevenueChart.tsx     # Revenue chart component

lib/
├── admin-types.ts           # TypeScript type definitions
├── admin-auth.ts            # Authentication utilities
└── admin-api.ts             # API helper functions
```

## 🔒 Security Features

- ✅ **Authentication** - Session-based admin login
- ✅ **Protected routes** - Automatic redirect for unauthenticated users
- ✅ **Activity logging** - Track all admin actions
- ✅ **Password hashing** - Bcrypt for secure password storage
- ✅ **Session management** - 24-hour session expiry
- ✅ **Role-based access** - Super admin, admin, manager roles

## 📈 Key Advantages

| Feature | Shopify | Rare Gems Admin |
|---------|---------|-----------------|
| Real-time Updates | Manual refresh | Auto-refresh every 30s |
| Inline Editing | ❌ | ✅ Yes |
| Custom Reports | Paid addon | Built-in |
| Stock History | Limited | Full audit trail |
| Price History | ❌ | ✅ Complete tracking |
| Expense Tracking | Separate app | Built-in |
| Customer Segments | Basic | Auto-segmented (VIP/Regular/New) |
| Cost | $29-299/month | FREE |
| Data Ownership | Shopify | You own everything |
| Customization | Limited | Unlimited |

## 🎨 UI/UX Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark sidebar** - Purple gradient with modern glassmorphism
- **Inline editing** - Edit directly in tables without modals
- **Real-time search** - Filter as you type
- **Visual indicators** - Color-coded status badges
- **Toast notifications** - User feedback for all actions
- **Loading states** - Smooth loading indicators
- **Empty states** - Helpful messages when no data

## 🔧 Common Tasks

### Adding a New Product

1. Go to **Products** page
2. Click **Add Product** button
3. Fill in product details
4. Upload images (drag & drop supported)
5. Set stock quantity
6. Save

### Managing Orders

1. Go to **Orders** page
2. Find the order using search or filters
3. Click **View Details** for full information
4. Update status directly in the table
5. Add notes if needed

### Tracking Inventory

1. Go to **Inventory** page
2. View low stock alerts
3. Products are automatically flagged when stock < threshold
4. Click on product to view stock history

### Adding Expenses

1. Go to **Finances** page
2. Click **Add Expense** button
3. Enter category, amount, date, and description
4. Click **Add Expense**

### Viewing Analytics

1. Go to **Analytics** page
2. Select time period (7, 30, or 90 days)
3. View revenue trends and order statistics

## 🚨 Troubleshooting

### Cannot Login
- Verify admin user exists in `admin_users` table
- Check password hash is correct
- Clear browser local storage and try again

### Data Not Loading
- Check `.env.local` file has correct Supabase credentials
- Verify Supabase tables are created
- Check browser console for errors

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`

## 📝 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎯 Next Steps

1. **Customize branding** - Update colors in tailwind.config.js
2. **Add more features** - Implement product variants, coupons, etc.
3. **Email notifications** - Set up automated emails for orders
4. **Reports** - Add PDF/Excel export functionality
5. **Multi-admin** - Create admin users with different permissions

## 📞 Support

For issues or questions, check:
- Database schema: `supabase-schema.sql`
- Type definitions: `lib/admin-types.ts`
- API functions: `lib/admin-api.ts`
- Auth utilities: `lib/admin-auth.ts`

---

**Built with ❤️ for Rare Gems Jewelry**

*This admin panel provides enterprise-level features at zero cost, giving you complete control over your jewelry business.*
