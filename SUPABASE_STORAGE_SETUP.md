# Supabase Storage Setup Guide

This guide explains how to set up Supabase Storage for product media uploads (images, videos, and 3D models).

## Step 1: Create Storage Bucket

1. Go to your Supabase project dashboard at https://supabase.com/dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **Create a new bucket**
4. Enter the following details:
   - **Name**: `product-media`
   - **Public bucket**: Toggle ON (this allows public access to uploaded files)
5. Click **Create bucket**

## Step 2: Configure Bucket Policies

After creating the bucket, you need to set up policies to allow uploads and public access:

1. Click on your `product-media` bucket
2. Go to **Policies** tab
3. Click **New Policy**

### Policy 1: Allow Public Read Access

```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-media' );
```

Or use the Supabase UI:
- **Policy name**: `Public Access`
- **Allowed operation**: `SELECT`
- **Target roles**: `public`
- **USING expression**: `bucket_id = 'product-media'`

### Policy 2: Allow Authenticated Uploads

```sql
CREATE POLICY "Allow uploads"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'product-media' );
```

Or use the Supabase UI:
- **Policy name**: `Allow uploads`
- **Allowed operation**: `INSERT`
- **Target roles**: `public` (or `authenticated` if you add auth later)
- **WITH CHECK expression**: `bucket_id = 'product-media'`

### Policy 3: Allow Delete (Optional)

```sql
CREATE POLICY "Allow delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'product-media' );
```

Or use the Supabase UI:
- **Policy name**: `Allow delete`
- **Allowed operation**: `DELETE`
- **Target roles**: `public` (or `authenticated` if you add auth later)
- **USING expression**: `bucket_id = 'product-media'`

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

### "StorageError: Bucket not found"
- Make sure the bucket name is exactly `product-media`
- Check that the bucket was created successfully in Supabase dashboard

### "StorageError: new row violates row-level security policy"
- Make sure you've created the upload policy (Policy 2)
- Check that the policy target role is set correctly

### Uploaded files are not accessible
- Make sure the bucket is set to **Public**
- Verify that the Public Access policy (Policy 1) is created and enabled

### Cannot delete files
- Create the delete policy (Policy 3)
- Make sure the policy is enabled

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
