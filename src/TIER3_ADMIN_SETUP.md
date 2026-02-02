# TIER 3: Admin Backend Setup Guide

## 🎉 What's Been Built

Your WordPress-like admin system is now complete with:

✅ **Admin Dashboard** - Full content management interface  
✅ **Blog Post System** - Create, edit, publish, and delete articles  
✅ **User Authentication** - Secure login with Supabase Auth  
✅ **Image Upload** - Upload featured images to Supabase Storage  
✅ **SEO Management** - Custom meta titles and descriptions  
✅ **Beautiful Blog Template** - Professional article display pages  

---

## 🚀 Quick Start

### Step 1: Create Your First Admin User

You need to create an admin user in Supabase Auth. Here's how:

#### Option A: Using Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Users**
3. Click **"Add User"**
4. Enter:
   - **Email**: `admin@mortgagegenius.com`
   - **Password**: `YourSecurePassword123!`
   - **Auto Confirm User**: ✅ Yes
5. Click **Create User**
6. Edit the user and add **User Metadata** (JSON):
   ```json
   {
     "name": "Admin User",
     "role": "admin"
   }
   ```
7. Save

#### Option B: Using the Backend API
Send a POST request to create an admin:

```bash
curl -X POST \
  https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-e8e0d145/api/auth/create-admin \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN' \
  -d '{
    "email": "admin@mortgagegenius.com",
    "password": "YourSecurePassword123!",
    "name": "Admin User",
    "role": "admin"
  }'
```

**Note**: The first admin must be created via Supabase Dashboard. After that, admins can create other users via the backend.

---

### Step 2: Access the Admin Dashboard

1. Navigate to: **`/admin/login`** in your browser
2. Login with your admin credentials:
   - Email: `admin@mortgagegenius.com`
   - Password: (the one you set)
3. You're in! 🎉

---

## 📝 How to Use the Admin System

### Creating a Blog Post (Resource Article)

1. **Login** to `/admin/login`
2. Click **"New Article"** button
3. Fill in the form:
   - **Title**: Article headline
   - **URL Slug**: Auto-generated, but you can customize (e.g., `va-loan-guide`)
   - **Excerpt**: Short summary (shows in previews)
   - **Content**: Full article text (supports basic HTML)
   - **Featured Image**: Click to upload an image
4. Switch to **"SEO & Meta"** tab to customize:
   - **Meta Title**: For search engines (60 chars max)
   - **Meta Description**: For search results (160 chars max)
5. Click **"Save Draft"** to save without publishing
6. Click **"Publish"** to make it live

### Viewing Published Articles

- Public URL: **`/resources/{slug}`**
- Example: `/resources/va-loan-guide`

### Editing Articles

1. Go to admin dashboard
2. Find the article in the list
3. Click the **Edit** icon (pencil)
4. Make changes
5. Click **"Update"** to republish

### Deleting Articles

1. Find the article in the dashboard
2. Click the **Delete** icon (trash)
3. Confirm deletion

---

## 🎨 Customization

### Change "Resources" to "Blog" (or anything else)

If you want to call them "Blog Posts" instead of "Resources":

1. Update `AdminDashboard.tsx` line 117: Change `"Resources"` to `"Blog"`
2. Update `AdminDashboard.tsx` line 118: Change `"Resource Articles"` to `"Blog Posts"`
3. Update `BlogPostView.tsx` line 64: Change `"Resource Article"` to `"Blog Post"`
4. Update routes from `/resources/` to `/blog/` in:
   - `App.tsx` (line 75)
   - `BlogPostView.tsx` (URL structure)

### Add More Admin Users

Only administrators can create new users:

1. Login as admin
2. Go to **Users** tab (coming soon in UI)
3. Or use the backend API endpoint shown above

---

## 🔐 Security Notes

**IMPORTANT:**

- ✅ All admin routes require authentication
- ✅ Passwords are hashed by Supabase
- ✅ Blog images are stored in private Supabase Storage buckets
- ✅ Only published posts are visible to public
- ✅ Draft posts require authentication to view

**Change default admin email** after first login for security!

---

## 📂 File Structure

```
/components/
  ├── AdminLogin.tsx         - Login page
  ├── AdminDashboard.tsx     - Main admin interface
  ├── BlogPostEditor.tsx     - Article creation/editing
  └── BlogPostView.tsx       - Public article display

/supabase/functions/server/
  ├── auth.tsx              - Authentication API
  ├── posts.tsx             - Blog CRUD API
  ├── upload.tsx            - Image upload handler
  └── index.tsx             - Main server (updated)
```

---

## 🐛 Troubleshooting

### "Unauthorized" Error When Logging In

- Check that you created the user in Supabase Auth
- Verify the user has `role: "admin"` in user_metadata
- Check password is correct

### Images Not Uploading

- Supabase Storage bucket is created automatically on first upload
- Check file size (must be < 5MB)
- Check file type (must be an image)

### Can't Access /admin

- Make sure you're navigating to `/admin/login`
- Check browser console for errors
- Verify server is running

### Blog Post Not Showing

- Make sure post status is "published" (not "draft")
- Check the slug matches the URL
- Try accessing directly: `/resources/your-slug`

---

## 🎯 What's Next?

Your admin system is fully functional! You can now:

1. ✅ Create and publish blog posts
2. ✅ Upload images
3. ✅ Manage SEO settings
4. ✅ Maintain your website content

**Optional Enhancements:**
- Rich text editor (e.g., Tiptap, Quill)
- Categories and tags
- User management UI
- Analytics integration
- Scheduled publishing
- Media library
- Comment system

---

## 📞 Need Help?

The system is designed to be simple and WordPress-like. If you need to make changes:

1. **Frontend**: All components are in `/components/`
2. **Backend**: All API routes are in `/supabase/functions/server/`
3. **Database**: Uses the KV store (key-value pairs)

Everything is documented and ready for your dev team! 🚀
