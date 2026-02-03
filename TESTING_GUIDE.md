# Testing Guide - Product Management & Media Upload

This guide provides step-by-step instructions for testing the admin panel's product management and media upload features.

## Prerequisites

Before testing, make sure you have:

1. ✅ Supabase Storage bucket set up (see `SUPABASE_STORAGE_SETUP.md`)
2. ✅ Environment variables configured in `.env.local`
3. ✅ Dependencies installed: `npm install`
4. ✅ Development server running: `npm run dev`

## Test 1: Add New Product with Media

### Steps:

1. Navigate to the admin panel: `http://localhost:3000/admin/products`
2. Click the **"Add Product"** button (purple button in top right)
3. The Add Product modal should open

### Test Media Upload:

4. In the **Product Media** section at the top:
   - Click the upload area or drag and drop files
   - Try uploading:
     - ✅ An image file (JPG, PNG, or GIF)
     - ✅ A video file (MP4 or WebM)
     - ✅ A 3D model file (GLB or GLTF) - optional
5. Verify:
   - Upload progress indicator shows
   - Success toast appears: "Uploaded X file(s)"
   - Files appear in the preview grid
   - Each file shows correct type badge (IMAGE, VIDEO, 3D)
   - Hover over files to see the remove (X) button

### Test Product Form:

6. Fill in the product details:
   - **Product Name**: "Test Diamond Ring"
   - **Description**: "Beautiful test product"
   - **Selling Price**: 1299.99
   - **Cost Price**: 899.99 (optional)
   - **Category**: Women's Jewelry
   - **Gemstone Type**: Diamond
   - **Metal Type**: 18K Gold
   - **Stock Quantity**: 10
   - **SKU**: TEST-001 (optional)
   - ✅ Check "Mark as Featured Product"

7. Click **"Create Product"**

### Expected Results:

- ✅ Success toast: "Product created successfully!"
- ✅ Modal closes automatically
- ✅ Product appears in the products table
- ✅ Product image shows in the table (first uploaded image)
- ✅ All product details are correct

## Test 2: Edit Existing Product

### Steps:

1. In the products table, find any product
2. Click the **Edit** icon (blue pencil icon) in the Actions column
3. The Edit Product modal should open

### Verify Pre-population:

4. Check that all fields are pre-filled with existing product data:
   - ✅ Product name
   - ✅ Description
   - ✅ Price and cost price
   - ✅ Category selection
   - ✅ Gem type and metal type
   - ✅ Stock quantity
   - ✅ SKU (if exists)
   - ✅ Featured checkbox state
   - ✅ Existing media files in the grid

### Test Edit Functionality:

5. Make changes:
   - Update the product name: add " (Updated)" to the end
   - Change the price
   - Add new media files
   - Remove an existing media file (hover and click X)
   - Change stock quantity
   - Toggle featured status

6. Click **"Update Product"**

### Expected Results:

- ✅ Success toast: "Product updated successfully!"
- ✅ Modal closes automatically
- ✅ Product table refreshes with new data
- ✅ All changes are reflected in the table
- ✅ New media files are visible

## Test 3: Media Management

### Test Different File Types:

1. Open Add Product or Edit Product modal
2. Upload multiple files at once (select 3-5 files)
3. Verify each file type displays correctly:
   - **Images**: Should show thumbnail preview
   - **Videos**: Should show video player with controls
   - **3D Models**: Should show box icon placeholder

### Test Remove Media:

4. Hover over any uploaded file
5. Click the red X button that appears
6. Verify:
   - ✅ File is removed from the grid
   - ✅ Success toast: "Media removed"
   - ✅ Other files remain intact

### Test Large Uploads:

7. Try uploading a large file (5-10MB video)
8. Verify:
   - ✅ Upload progress indicator shows
   - ✅ Upload completes successfully
   - ✅ File appears in the grid

## Test 4: Quick Edit Features

### Test Inline Price Edit:

1. In the products table, find the **Price** column
2. Click on the price input field
3. Change the value and press Enter or click outside
4. Verify:
   - ✅ Success toast: "Updated successfully"
   - ✅ Price updates in the database
   - ✅ Page refreshes with new price

### Test Inline Stock Edit:

5. Click on the **Stock** input field
6. Change the value
7. Verify color indicators:
   - ✅ Red border when stock = 0
   - ✅ Orange border when stock < 10
   - ✅ Gray border when stock >= 10
   - ✅ Alert icon appears for low/out of stock

### Test Featured Toggle:

8. Click the **Featured/Not Featured** button in Status column
9. Verify:
   - ✅ Success toast with appropriate message
   - ✅ Button updates (star icon fills when featured)
   - ✅ Featured count updates in stats cards

## Test 5: Delete Product

### Steps:

1. Click the **Delete** icon (red trash icon) for any product
2. Confirm the deletion in the browser alert
3. Verify:
   - ✅ Success toast: "Product deleted successfully"
   - ✅ Product is removed from the table
   - ✅ Product counts update in stats cards

## Test 6: Filter and Search

### Test Search:

1. Type in the search box at the top: "ring"
2. Verify:
   - ✅ Only products with "ring" in name, description, or gem type show
   - ✅ Table updates instantly as you type

### Test Category Filter:

3. Select "Men's Jewelry" from the category dropdown
4. Verify:
   - ✅ Only men's products show
   - ✅ Combined with search if search term exists

5. Select "All Categories"
6. Verify:
   - ✅ All products show again (filtered by search if applicable)

## Test 7: Responsive Design

### Desktop (1920x1080):
- ✅ Sidebar visible on left
- ✅ Content fills remaining space
- ✅ Modals are centered and readable
- ✅ Tables display all columns

### Tablet (768x1024):
- ✅ Sidebar toggleable with hamburger menu
- ✅ Table columns stack appropriately
- ✅ Modals fit screen with scrolling

### Mobile (375x667):
- ✅ Sidebar becomes full-screen overlay
- ✅ Modals fit screen width
- ✅ Upload area is touch-friendly
- ✅ Buttons are easily clickable

## Test 8: Error Handling

### Test Invalid Input:

1. Try to create a product with:
   - ❌ Empty required fields
   - ❌ Negative price
   - ❌ Negative stock
2. Verify:
   - ✅ Browser validation prevents submission
   - ✅ Required field indicators show

### Test Upload Errors:

3. Try uploading an unsupported file type (.txt, .pdf)
4. Verify:
   - ✅ File is rejected or uploads but shows "Preview unavailable"
   - ✅ Error toast appears if upload fails

### Test Network Errors:

5. Disconnect network or stop Supabase
6. Try to create/edit a product
7. Verify:
   - ✅ Error toast appears
   - ✅ Loading state stops
   - ✅ User can retry after reconnecting

## Test 9: Data Persistence

### Verify Database Storage:

1. Create/edit a product with media
2. Refresh the page (F5)
3. Verify:
   - ✅ Product still exists
   - ✅ All data is preserved
   - ✅ Media files are still accessible

### Verify Supabase Storage:

4. Go to Supabase dashboard → Storage → product-media bucket
5. Verify:
   - ✅ Uploaded files appear in the bucket
   - ✅ Files have correct naming: `[timestamp]-[random].[ext]`
   - ✅ Files are in the `products/` folder

## Test 10: Admin Panel Navigation

### Test Sidebar Navigation:

1. Click each sidebar link:
   - ✅ Dashboard → Shows stats and charts
   - ✅ Products → Shows products table
   - ✅ Orders → Shows orders table
   - ✅ Inventory → Shows stock management
   - ✅ Customers → Shows customer list
   - ✅ Analytics → Shows analytics
   - ✅ Finances → Shows finances
   - ✅ Settings → Shows settings

2. Verify:
   - ✅ Active page is highlighted in sidebar
   - ✅ Each page loads correctly
   - ✅ No layout conflicts with main website

## Common Issues & Solutions

### Issue: "Bucket not found" error
**Solution**: Follow `SUPABASE_STORAGE_SETUP.md` to create the bucket

### Issue: Uploads fail silently
**Solution**:
- Check browser console for errors
- Verify Supabase credentials in `.env.local`
- Check bucket policies in Supabase dashboard

### Issue: Images don't display
**Solution**:
- Verify bucket is set to **Public**
- Check that Public Access policy is enabled
- Verify image URLs in browser network tab

### Issue: Modal doesn't close after save
**Solution**:
- Check browser console for errors
- Verify all required fields are filled
- Check network tab for API errors

### Issue: Stats don't update
**Solution**:
- Refresh the page
- Check that dashboard auto-refresh is working (30s interval)
- Verify database queries in Supabase dashboard

## Performance Checks

1. **Load Time**: Products page should load in < 2 seconds
2. **Upload Speed**: Depends on file size and network, but should show progress
3. **Table Rendering**: Should handle 100+ products without lag
4. **Search**: Should filter instantly as you type
5. **Modal Animations**: Should be smooth (60fps)

## Test Checklist Summary

Before marking as complete, ensure:

- [ ] Can add product with media
- [ ] Can edit product and update media
- [ ] Can delete products
- [ ] Can upload images
- [ ] Can upload videos
- [ ] Can upload 3D models
- [ ] Can remove media from products
- [ ] Inline editing works (price, stock)
- [ ] Featured toggle works
- [ ] Search filters products correctly
- [ ] Category filter works
- [ ] Delete confirmation works
- [ ] Responsive on mobile
- [ ] No layout conflicts with main site
- [ ] All data persists after refresh
- [ ] Error messages display correctly
- [ ] Success toasts show for all actions
- [ ] Supabase Storage working
- [ ] All sidebar links work

## Next Steps

After successful testing:

1. ✅ Add authentication system (see user request to add later)
2. ✅ Add user management
3. ✅ Add activity logging
4. ✅ Add backup/export features
5. ✅ Add bulk operations
6. ✅ Add advanced filters
7. ✅ Add product variants
8. ✅ Add inventory alerts

## Support

If you encounter issues not covered in this guide:
- Check browser console (F12) for error messages
- Check Supabase logs in dashboard
- Verify all prerequisites are met
- Review `SUPABASE_STORAGE_SETUP.md`
