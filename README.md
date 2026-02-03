# 💎 Rare Gems Jewelry - E-Commerce Website

A modern, full-stack e-commerce platform for selling rare gemstone jewelry. Built with Next.js 14, TypeScript, Tailwind CSS, Supabase, and deployed on Vercel.

![Tech Stack](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)
![Supabase](https://img.shields.io/badge/Supabase-Database-green)

## ✨ Features

### Customer-Facing Store
- 🛍️ **Product Catalog** - Browse men's and women's jewelry collections
- 🔍 **Advanced Filtering** - Filter by category, gemstone type, and price
- 🛒 **Shopping Cart** - Persistent cart using Zustand with local storage
- 💳 **Checkout System** - Complete order placement with customer details
- 📱 **Responsive Design** - Mobile-first design with beautiful UI
- ⚡ **Fast Performance** - Server-side rendering with Next.js 14 App Router
- 🎨 **Modern UI** - Gradient accents, smooth animations, elegant typography

### 🎯 Admin Panel (New!)
- 📊 **Real-time Dashboard** - Live analytics with auto-refresh
- 📦 **Product Management** - Inline editing, bulk actions, stock tracking
- 🛒 **Order Management** - Status updates, payment tracking, order notes
- 📈 **Analytics** - Revenue trends, sales performance, best sellers
- 👥 **Customer Management** - Segmentation (VIP/Regular/New), lifetime value
- 💰 **Financial Tracking** - Expense management, profit calculations
- 📦 **Inventory Management** - Low stock alerts, stock history, auto-notifications
- ⚙️ **Settings** - Store configuration, tax rates, thresholds

**[View Admin Panel Documentation →](ADMIN_GUIDE.md)**

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Custom gradients
- **State Management**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Version Control**: Git & GitHub

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A GitHub account
- A Supabase account (free tier works)
- A Vercel account (free tier works)
- Git installed on your machine

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
# Create a new repository on GitHub first, then:
git clone https://github.com/YOUR_USERNAME/rare-gems-jewelry.git
cd rare-gems-jewelry
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to be provisioned
3. Go to **SQL Editor** in your Supabase dashboard
4. Copy the entire content of `supabase-schema.sql`
5. Paste it into the SQL Editor and click **Run**
6. This will create all necessary tables and sample data

### 4️⃣ Configure Environment Variables

1. Go to **Settings → API** in your Supabase dashboard
2. Copy your **Project URL** and **anon public** key
3. Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

4. Update `.env.local` with your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5️⃣ Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your website!

## 🔓 Accessing the Admin Panel (Open Access)

The admin panel is currently accessible without authentication for ease of development.

1. **Set up the database** - Run the SQL schema from `supabase-schema.sql` in your Supabase SQL Editor

2. **Access the admin panel**:
   - Local: [http://localhost:3000/admin](http://localhost:3000/admin)
   - Production: `https://your-domain.vercel.app/admin`

**Note:** User authentication will be added later. For now, focus on building the website features!

**📖 Full admin documentation:** See [ADMIN_GUIDE.md](ADMIN_GUIDE.md)

## 🌐 Deploying to Vercel

### Method 1: Deploy from GitHub (Recommended)

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"Add New Project"**
4. Import your `rare-gems-jewelry` repository
5. Configure your project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

6. Add Environment Variables in Vercel:
   - Click **"Environment Variables"**
   - Add the same variables from your `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXT_PUBLIC_SITE_URL` (use your Vercel domain)

7. Click **Deploy** and wait ~60 seconds!

### Method 2: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## 📁 Project Structure

```
rare-gems-jewelry/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with Navbar/Footer
│   ├── page.tsx             # Home page
│   ├── shop/                # Shop page
│   ├── cart/                # Shopping cart
│   ├── checkout/            # Checkout page
│   ├── about/               # About page
│   ├── contact/             # Contact page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── ShopFilters.tsx
├── lib/                     # Utilities
│   └── supabase.ts          # Supabase client & types
├── store/                   # State management
│   └── cartStore.ts         # Zustand cart store
├── public/                  # Static assets
├── supabase-schema.sql      # Database schema
└── package.json
```

## 🗄️ Database Schema

The project uses four main tables:

1. **products** - Store product information
2. **orders** - Customer orders
3. **newsletter_subscribers** - Email subscribers
4. **contact_messages** - Contact form submissions

See `supabase-schema.sql` for the complete schema.

## 🎨 Customization

### Update Contact Information

Edit the following files:
- `components/Footer.tsx` - Footer contact details
- `app/contact/page.tsx` - Contact page info

### Change Color Scheme

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: { /* Your colors */ },
  gold: { /* Your colors */ },
}
```

### Add More Products

Go to your Supabase dashboard → Table Editor → `products` → Insert row

Or use the SQL Editor:
```sql
INSERT INTO products (name, description, price, category, gem_type, metal_type, stock, featured)
VALUES ('Ruby Ring', 'Beautiful ruby ring', 1999.99, 'womens', 'Ruby', '18K Gold', 10, true);
```

## 📸 Adding Product Images

Currently using placeholder images. To add real images:

1. **Option 1: Supabase Storage**
   - Go to Storage in Supabase dashboard
   - Create a bucket called `products`
   - Upload images
   - Get public URL and add to `images` array in products table

2. **Option 2: External CDN**
   - Upload to Cloudinary, AWS S3, or similar
   - Add URLs to products table

3. Update `next.config.js` to allow your image domains:
```javascript
images: {
  domains: ['your-supabase-project.supabase.co', 'cloudinary.com'],
}
```

## 🔒 Security Notes

- Never commit `.env.local` to Git (it's in `.gitignore`)
- Use Supabase Row Level Security (RLS) for production
- Consider adding authentication for admin features
- Implement rate limiting for forms

## 🚧 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] User authentication & accounts
- [ ] Order tracking system
- [ ] Product reviews & ratings
- [ ] Wishlist functionality
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Product search

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Database Connection Issues

- Verify Supabase credentials in `.env.local`
- Check if Supabase project is active
- Ensure tables are created (run `supabase-schema.sql`)

### Deployment Issues

- Check Vercel logs in dashboard
- Verify all environment variables are set in Vercel
- Ensure `next.config.js` is properly configured

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

For support, email rooh@cubico.tech or open an issue on GitHub.

---

**Built with ❤️ by Rooh Ul - Cubico Technologies**
