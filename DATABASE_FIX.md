# 🔧 Quick Fix for Database Issues

## ⚠️ Error: `cost_price` column not found

This means your database doesn't have the admin fields yet. Here's how to fix it:

---

## ✅ Solution: Run Database Update Script

### **Step 1: Open Supabase Dashboard**
1. Go to https://supabase.com
2. Open your project: `oaoohgbyzaazwsnldsab`
3. Click **SQL Editor** in the left sidebar

### **Step 2: Run Update Script**
1. Click **"New Query"**
2. Copy the **entire contents** of `supabase-schema-update.sql`
3. Paste into the SQL editor
4. Click **"Run"** (or press Ctrl/Cmd + Enter)

### **Step 3: Verify**
You should see a success message: `Database schema updated successfully!`

---

## 📋 What This Script Does

The update script will add these new fields **safely** (without errors):

### **Products Table:**
- `sku` - Product SKU code
- `cost_price` - Cost to you (for profit calculations)
- `weight` - Product weight
- `dimensions` - Product dimensions
- `archived` - Archive products without deleting
- `seo_title` - SEO title
- `seo_description` - SEO description
- `url_slug` - URL friendly name

### **Orders Table:**
- `payment_status` - Track payment state
- `payment_method` - How they paid
- `tracking_number` - Shipping tracking
- `refund_amount` - Refund tracking
- `notes` - Internal notes

### **New Tables:**
- `stock_history` - Track inventory changes
- `price_history` - Track price changes
- `expenses` - Track business expenses
- `customer_analytics` - Customer segmentation
- `order_notes` - Notes on orders
- `store_settings` - Store configuration

---

## 🚀 After Running the Script

Everything will work perfectly! You can then:
- ✅ Add products with SKU and cost price
- ✅ Track stock history
- ✅ Track price changes
- ✅ Add expenses
- ✅ View customer analytics
- ✅ Update store settings

---

## 🔄 Alternative: Simple Product Creation (No Update Needed)

If you want to test immediately without running the update, just:

1. **Leave SKU and Cost Price empty** in the Add Product form
2. The form will only send required fields
3. Product will be created successfully

The code is now smart enough to only send fields that have values!

---

## 💡 Recommended: Run the Update Script

For the best experience and full functionality, **please run the update script**. It takes 5 seconds and enables all the advanced features!

---

## ❓ Troubleshooting

### If you see "products already exists" error:
✅ Use `supabase-schema-update.sql` (NOT `supabase-schema.sql`)

### If you see other column errors:
✅ Run the complete `supabase-schema-update.sql` script

### If update seems stuck:
1. Refresh the page
2. Try running the script again
3. Check for any error messages in red

---

**Ready?** Go run that update script and unlock the full admin panel! 🚀
