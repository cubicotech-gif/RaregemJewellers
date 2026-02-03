# Storage Upload Diagnostics

This guide helps diagnose and fix Supabase Storage upload issues.

## Step 1: Check Browser Console

1. Open your browser's Developer Tools (F12)
2. Go to the **Console** tab
3. Try to upload a file in the admin panel
4. Look for error messages

## Common Error Messages & Solutions

### ❌ "StorageApiError: Bucket not found"

**Cause**: The `product-media` bucket doesn't exist in your Supabase project.

**Solution**:
1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to **Storage** in the left sidebar
4. Click **"Create a new bucket"**
5. Name: `product-media`
6. **Public bucket**: Toggle ON ✅
7. Click **"Create bucket"**

---

### ❌ "StorageApiError: new row violates row-level security policy"

**Cause**: Storage policies are not set up correctly or are missing.

**Solution**:
1. Go to your Supabase dashboard → Storage
2. Click on the `product-media` bucket
3. Go to **Policies** tab
4. Click **"New Policy"**
5. Select **"Get started quickly"**
6. Choose **"Allow public access"**
7. Click **"Save policy"**

This creates all necessary policies automatically (SELECT, INSERT, UPDATE, DELETE).

---

### ❌ "Invalid bucket name"

**Cause**: Bucket name has incorrect characters or doesn't match the code.

**Solution**:
- Bucket name must be exactly: `product-media` (lowercase, with hyphen)
- No spaces, no underscores, no capital letters

---

### ❌ "File size exceeds maximum allowed"

**Cause**: File is too large (Supabase default limit is 50MB).

**Solution**:
1. Try a smaller file (under 10MB) for testing
2. To increase limit: Supabase Dashboard → Storage → Settings → Maximum file size

---

### ❌ "NetworkError" or "Failed to fetch"

**Cause**: Network connectivity issues or CORS problems.

**Solution**:
1. Check your internet connection
2. Verify Supabase credentials in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```
3. Restart development server: `npm run dev`

---

### ❌ "Invalid API key"

**Cause**: Supabase credentials are incorrect or missing.

**Solution**:
1. Go to Supabase Dashboard → Settings → API
2. Copy the **Project URL** and **anon public** key
3. Update `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```
4. Restart: `npm run dev`

---

## Step 2: Manual Bucket Test

Test if the bucket is accessible:

1. Go to Supabase Dashboard → Storage
2. Click on `product-media` bucket
3. Click **"Upload file"** (in the Supabase dashboard)
4. Upload any image file
5. If this works, the bucket and policies are set up correctly

---

## Step 3: Check Environment Variables

Run this command to verify your env variables are loaded:

```bash
npm run dev
```

Then in your browser console (F12), type:
```javascript
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
```

If it shows `undefined`, your `.env.local` file is not being read.

**Solution**:
1. Make sure `.env.local` is in the root directory
2. Restart the dev server: `npm run dev`
3. Clear browser cache (Ctrl+Shift+Delete)

---

## Step 4: Verify Bucket Configuration

### Check Bucket Settings:

1. Go to Supabase Dashboard → Storage
2. Click on `product-media` bucket
3. Click the **settings icon** (⚙️)
4. Verify:
   - ✅ **Public bucket** is enabled
   - ✅ **File size limit** is reasonable (50MB default)
   - ✅ **Allowed MIME types** is empty or includes `image/*,video/*`

### Check Bucket Policies:

1. Click on `product-media` bucket
2. Go to **Policies** tab
3. You should see at least these policies **enabled** (green toggle):
   - Policy for **SELECT** operations
   - Policy for **INSERT** operations
4. If no policies exist, follow "Step 1" solution above

---

## Step 5: Test with Code

Create a test file: `test-upload.js` in your project root:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_ANON_KEY'
const supabase = createClient(supabaseUrl, supabaseKey)

async function testUpload() {
  // Create a test file
  const testData = new Blob(['Hello World'], { type: 'text/plain' })
  const testFile = new File([testData], 'test.txt')

  console.log('Testing upload...')

  const { data, error } = await supabase.storage
    .from('product-media')
    .upload(`test/${Date.now()}.txt`, testFile)

  if (error) {
    console.error('❌ Upload failed:', error)
  } else {
    console.log('✅ Upload successful:', data)
  }
}

testUpload()
```

Run: `node test-upload.js`

---

## Step 6: Check Browser Network Tab

1. Open Developer Tools (F12)
2. Go to **Network** tab
3. Try to upload a file
4. Look for requests to `supabase.co`
5. Check the response:
   - **200 OK**: Upload succeeded
   - **400 Bad Request**: Invalid request (check file format)
   - **401 Unauthorized**: API key issue
   - **403 Forbidden**: Policy issue
   - **404 Not Found**: Bucket doesn't exist

---

## Quick Checklist

Before asking for help, verify:

- [ ] Bucket `product-media` exists in Supabase
- [ ] Bucket is set to **Public**
- [ ] Policies are created and **enabled**
- [ ] `.env.local` has correct Supabase URL and anon key
- [ ] Development server restarted after `.env.local` changes
- [ ] Browser console shows detailed error message
- [ ] Network tab shows the request being made
- [ ] Manual upload works in Supabase dashboard

---

## Still Not Working?

If you've tried everything above and uploads still fail:

1. **Copy the exact error message** from browser console
2. **Check the Network tab** and copy the response body
3. **Verify your Supabase project** is not paused or suspended
4. **Try creating a new bucket** with a different name like `test-media`
5. **Update MediaUploader.tsx** to use the new bucket name temporarily

---

## Success Indicators

When everything is working correctly, you should see:

1. ✅ In browser console: "Upload successful:" with file data
2. ✅ In browser console: "Public URL:" with a valid URL
3. ✅ Toast notification: "Uploaded X file(s)"
4. ✅ File preview appears in the media grid
5. ✅ In Supabase Dashboard → Storage → product-media: uploaded files visible

---

## Additional Resources

- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Supabase Storage Row Level Security](https://supabase.com/docs/guides/storage/security/access-control)
- [Debugging Supabase](https://supabase.com/docs/guides/getting-started/debugging)
