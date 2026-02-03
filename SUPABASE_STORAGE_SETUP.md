# Supabase Storage Setup Guide

This guide explains how to set up Supabase Storage for product media uploads (images, videos, and 3D models).

## Quick Start (TL;DR)

1. Go to Supabase Dashboard → Storage
2. Click "Create a new bucket"
3. Name: `product-media`, Public: ✅ ON
4. Click "Create bucket"
5. Go to bucket → Policies tab
6. Click "New Policy" → "Get started quickly" → "Allow public access"
7. Done! Test upload in admin panel

## Detailed Instructions

### Step 1: Create Storage Bucket

1. Go to your Supabase project dashboard at https://supabase.com/dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **Create a new bucket**
4. Enter the following details:
   - **Name**: `product-media`
   - **Public bucket**: Toggle ON (this allows public access to uploaded files)
5. Click **Create bucket**

## Step 2: Configure Bucket Policies

After creating the bucket, you need to set up policies to allow uploads and public access.

**IMPORTANT**: Use the Supabase UI method below, as it's more reliable than SQL commands.

### Method 1: Using Supabase UI (Recommended)

1. Click on your `product-media` bucket in the Storage section
2. Go to the **Policies** tab
3. You'll see a section for creating policies

### Policy 1: Allow Public Read Access

Click **"New Policy"** and select **"For full customization"**, then:
- **Policy name**: `Public Access`
- **Allowed operation**: `SELECT`
- **Policy definition**: Select the "Custom" option
- **Target roles**: Leave default or select `public`
- **USING expression**: Enter: `true`

Or if using SQL in the SQL Editor (not in policies tab):
```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING ( true );
```

### Policy 2: Allow Public Uploads

Click **"New Policy"** and select **"For full customization"**, then:
- **Policy name**: `Allow uploads`
- **Allowed operation**: `INSERT`
- **Policy definition**: Select "Custom"
- **Target roles**: `public`
- **WITH CHECK expression**: Enter: `true`

Or if using SQL in the SQL Editor:
```sql
CREATE POLICY "Allow uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK ( true );
```

### Policy 3: Allow Public Updates (Optional)

Click **"New Policy"** and select **"For full customization"**, then:
- **Policy name**: `Allow updates`
- **Allowed operation**: `UPDATE`
- **Policy definition**: Select "Custom"
- **Target roles**: `public`
- **WITH CHECK expression**: Enter: `true`

Or if using SQL in the SQL Editor:
```sql
CREATE POLICY "Allow updates"
ON storage.objects FOR UPDATE
TO public
WITH CHECK ( true );
```

### Policy 4: Allow Public Delete (Optional)

Click **"New Policy"** and select **"For full customization"**, then:
- **Policy name**: `Allow delete`
- **Allowed operation**: `DELETE`
- **Policy definition**: Select "Custom"
- **Target roles**: `public`
- **USING expression**: Enter: `true`

Or if using SQL in the SQL Editor:
```sql
CREATE POLICY "Allow delete"
ON storage.objects FOR DELETE
TO public
USING ( true );
```

### Method 2: Quick Setup (Alternative)

If the above seems complex, you can use the built-in policy templates:

1. In the Policies tab, click **"New Policy"**
2. Select **"Get started quickly"**
3. Choose **"Allow public access"**
4. This will create policies for SELECT, INSERT, UPDATE, DELETE automatically

**Note**: For development, using `true` in policies is fine. For production, you'll want to restrict these policies to authenticated users and specific conditions.

## Step 3: Verify Setup

1. Go back to the Storage page
2. Click on your `product-media` bucket
3. You should see an empty bucket ready to receive files

## Step 4: Test Upload (Optional)

You can test the upload directly from the Supabase dashboard:

1. Click on your `product-media` bucket
2. Click **Upload file**
3. Select any image file
4. After upload, click on the file to see its public URL
5. The URL format should be: `https://[your-project-id].supabase.co/storage/v1/object/public/product-media/[filename]`

## Using Media Upload in Admin Panel

Once the storage bucket is set up:

1. Go to your admin panel at `/admin/products`
2. Click **Add Product** or click the edit icon on any product
3. In the product form, you'll see the **Product Media** section
4. Click the upload area or drag and drop files
5. Supported formats:
   - **Images**: JPG, PNG, GIF, WebP
   - **Videos**: MP4, WebM, MOV
   - **3D Models**: GLB, GLTF, OBJ, FBX

## File Structure

All uploaded files will be stored in the following structure:
```
product-media/
└── products/
    ├── [timestamp]-[random].jpg
    ├── [timestamp]-[random].mp4
    └── [timestamp]-[random].glb
```

## Troubleshooting

### ❌ ERROR: "column bucket_id does not exist"
This error occurs when trying to use SQL to create policies directly.

**Solution**:
1. **Use the Supabase UI instead** (Method 1 above) - this is the recommended approach
2. Make sure you're creating policies in the **Policies tab** under Storage, not in the SQL Editor
3. Use the policy expressions with `true` instead of `bucket_id = 'product-media'`
4. OR use the "Get started quickly" → "Allow public access" template which handles this automatically

### ❌ "StorageError: Bucket not found"
- Make sure the bucket name is exactly `product-media`
- Check that the bucket was created successfully in Supabase dashboard
- Verify the bucket name in the MediaUploader component matches exactly

### ❌ "StorageError: new row violates row-level security policy"
- Make sure you've created the upload policy (Policy 2: Allow uploads)
- Check that the policy target role is set to `public`
- Verify the policy is **enabled** (toggle should be green)
- Try using the "Allow public access" template instead

### ❌ Uploaded files are not accessible
- Make sure the bucket is set to **Public** (checkbox during creation)
- Verify that the Public Access policy (Policy 1) is created and enabled
- Check the file URL format: `https://[project-id].supabase.co/storage/v1/object/public/product-media/products/[filename]`
- Test by opening the URL directly in a new browser tab

### ❌ Cannot delete files
- Create the delete policy (Policy 4)
- Make sure the policy is enabled
- Check browser console for specific error messages

### ❌ Upload succeeds but files don't show in admin panel
- Check browser console for errors
- Verify the `getPublicUrl` is returning a valid URL
- Refresh the page to reload product data
- Check that the images array is being saved to the database

### ❌ "Failed to create policy" in Supabase UI
- Try using the **"Get started quickly"** option instead of custom policies
- Make sure you're in the correct bucket's Policies tab
- Check that you don't already have a policy with the same name
- Try creating policies one at a time

## Security Notes

**Current Setup**: The bucket is public and allows anyone to upload/delete files. This is fine for development.

**For Production**: When you add authentication later, update the policies to:
- Change target role from `public` to `authenticated`
- Add user ID checks in the policies to ensure users can only manage their own uploads
- Consider adding file size limits and file type validation

Example production policy:
```sql
CREATE POLICY "Authenticated uploads only"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'product-media'
  AND auth.role() = 'authenticated'
);
```

## Need Help?

If you encounter any issues:
1. Check the Supabase Storage documentation: https://supabase.com/docs/guides/storage
2. Verify your Supabase credentials in `.env.local`
3. Check the browser console for detailed error messages
