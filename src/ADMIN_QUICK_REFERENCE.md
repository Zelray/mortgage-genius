# 🚀 Admin System - Quick Reference Card

## 📱 Access Points

| Page | URL | Purpose |
|------|-----|---------|
| **Admin Login** | `/admin/login` | Sign in to CMS |
| **Dashboard** | `/admin` | Manage content |
| **View Blog Post** | `/resources/{slug}` | Public article page |
| **Homepage** | `/` | Main website |

---

## 🔑 Default Login (First Time Setup)

1. **Create admin user in Supabase Dashboard:**
   - Go to Authentication → Users → Add User
   - Email: `admin@mortgagegenius.com`
   - Password: `YourSecurePassword`
   - Auto-confirm: ✅ Yes
   - User Metadata: `{"name": "Admin", "role": "admin"}`

2. **Login:**
   - Navigate to `/admin/login`
   - Enter credentials
   - Access dashboard

---

## ✍️ Creating a Blog Post

### Quick Steps:
1. Login → Click **"New Article"**
2. Enter **Title** (slug auto-generates)
3. Add **Excerpt** (preview text)
4. Write **Content** (full article)
5. Upload **Featured Image** (optional)
6. Go to **SEO & Meta** tab for search optimization
7. Click **"Publish"** (or "Save Draft")

### Tips:
- ✅ Slug = URL-friendly version of title
- ✅ Excerpt shows in previews and search
- ✅ Content supports basic HTML
- ✅ Featured image shows at top of article
- ✅ Draft posts are private until published

---

## 📸 Image Upload

### How to Add Images:
1. In post editor, find "Featured Image" section
2. Click to upload or drag & drop
3. Max size: **5MB**
4. Formats: PNG, JPG, WEBP
5. Image uploads to Supabase Storage automatically
6. Gets a permanent signed URL (10 year expiry)

### Image Best Practices:
- Recommended size: **1200×630px** (16:9 ratio)
- Optimize before upload for faster loading
- Use descriptive filenames

---

## 🎨 SEO Optimization

### Per-Post SEO:
1. Click "SEO & Meta" tab in editor
2. **Meta Title**: 60 characters max (shows in search)
3. **Meta Description**: 160 characters max (search snippet)

### Tips:
- Meta title defaults to article title
- Include keywords naturally
- Make description compelling (increases clicks)

---

## 📊 Post Management

### Dashboard Actions:

| Icon | Action | What it does |
|------|--------|--------------|
| 👁️ Eye | **Preview** | Opens post in new tab |
| ✏️ Pencil | **Edit** | Modify post content |
| 🗑️ Trash | **Delete** | Removes post (asks to confirm) |

### Post Status:
- **Draft** = Not visible to public
- **Published** = Live on website

### Search & Filter:
- Use search box to find posts by title/excerpt
- Filter by status (coming soon)

---

## 🔄 Workflow Examples

### Publishing a New Guide:
```
1. New Article → "Understanding VA Loans"
2. Slug: "understanding-va-loans"
3. Excerpt: "A comprehensive guide to VA home loans..."
4. Write content (1000+ words)
5. Upload hero image
6. SEO: "VA Loans Guide 2025 | Mortgage Genius"
7. Publish → Done! ✅
```

### Updating Existing Post:
```
1. Find post in dashboard
2. Click Edit (pencil icon)
3. Make changes
4. Click "Update"
5. Changes are live immediately ✅
```

### Scheduling Content (Manual):
```
1. Create post
2. Save as Draft
3. Come back later
4. Edit → Publish when ready ✅
```

---

## 🚨 Troubleshooting

### Can't Login?
- Check email/password spelling
- Verify user exists in Supabase Auth
- Check user has `role: "admin"` in metadata
- Clear browser cookies and try again

### Image Won't Upload?
- Check file size (< 5MB)
- Check file type (must be image)
- Check internet connection
- Try different browser

### Post Not Showing?
- Verify status is "Published" (not Draft)
- Check slug in URL matches
- Try opening in incognito mode
- Check browser console for errors

### Lost Access?
- Reset password in Supabase Dashboard
- Or create new admin user
- Contact system administrator

---

## 🎯 Best Practices

### Content Guidelines:
- ✅ Write 800-1500 words for SEO
- ✅ Use clear headings (H2, H3)
- ✅ Add relevant images
- ✅ Link to related resources
- ✅ Include call-to-action
- ✅ Proofread before publishing

### SEO Checklist:
- ✅ Keyword in title
- ✅ Keyword in first paragraph
- ✅ Meta description compelling
- ✅ Image has alt text
- ✅ URL slug is clean
- ✅ Internal links to other pages

### Publishing Schedule:
- **Consistency** > Frequency
- Aim for 1-2 posts per week
- Plan topics in advance
- Keep drafts for editing

---

## 📱 Mobile Usage

The admin dashboard works on mobile, but **desktop is recommended** for:
- Writing long content
- Image uploading
- Detailed editing

Mobile is fine for:
- Quick edits
- Publishing drafts
- Viewing posts

---

## 🔐 Security Reminders

- ✅ **Never share admin password**
- ✅ **Use strong passwords** (12+ characters)
- ✅ **Logout when done** (public computer)
- ✅ **Change default email/password** immediately
- ✅ **Only give admin to trusted users**

### User Roles:
| Role | Can Do |
|------|--------|
| **Admin** | Everything (create users, delete any post) |
| **Editor** | Create/edit/publish own posts |

---

## 📞 Need Help?

### Common Questions:

**Q: How do I change the homepage?**  
A: Homepage is static code in `/components/`. Ask developer to edit.

**Q: Can I add categories?**  
A: Not yet - future enhancement. Use tags in content for now.

**Q: How do I see analytics?**  
A: Check Google Analytics dashboard (separate login).

**Q: Can I schedule posts?**  
A: Use Draft status, then publish manually when ready.

**Q: How many images can I upload?**  
A: Unlimited, but each must be < 5MB.

---

## 🎓 Pro Tips

1. **Write in external editor first** (Google Docs, Word)
   - Proofread thoroughly
   - Paste into CMS when ready

2. **Save drafts frequently**
   - Don't lose work!
   - Use "Save Draft" button often

3. **Preview before publishing**
   - Click eye icon to see how it looks
   - Check on mobile too

4. **Use compelling headlines**
   - Numbered lists work well ("5 Ways to...")
   - Questions engage readers
   - Include benefits ("How to Save...")

5. **Add calls-to-action**
   - End posts with next steps
   - Link to contact page
   - Encourage calculator use

---

## ⚡ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Navigate form fields |
| `Enter` | Submit form |
| `Ctrl/Cmd + S` | Would save (not implemented yet) |

---

## 📈 Success Metrics

Track these in Google Analytics:
- Page views per post
- Time on page
- Bounce rate
- Conversions from posts

Good benchmarks:
- 2+ minutes on page = engaging content
- < 50% bounce rate = good
- 100+ views/month = successful post

---

**Remember**: The admin system is designed to be simple and intuitive. If something's confusing, it's a bug - not your fault! 

**Happy blogging!** 📝✨
