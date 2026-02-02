# TinaCMS Content Management Guide

## 🚀 Quick Start

TinaCMS is now installed and running on your Mortgage Genius website! This guide will show you how to manage your content through an easy-to-use visual interface.

## Accessing the CMS

### **Admin URL:**
```
http://localhost:5000/admin/index.html
```

When deployed, replace `localhost:5000` with your actual domain.

### **Local Mode** (Current Setup)
- Changes are saved directly to your local files
- No authentication required in development
- Perfect for testing and development
- Changes are immediately reflected on your website

## What Can You Edit?

### 1. **State Mortgage Pages** 📍
Edit pages for Arizona, Florida, Texas and other states:
- Page Title (H1 heading)
- SEO Meta Title & Description
- Hero Section (headline, subheadline, image)
- Full page content (rich text editor)
- Keywords and social sharing images

**Location:** `content/pages/states/`

### 2. **Loan Product Pages** 💰
Manage loan type pages (FHA, VA, Conventional, HELOC, etc.):
- Loan type title
- SEO settings
- Hero section
- Full page content

**Location:** `content/pages/loans/`

### 3. **Blog Posts** ✍️
Create and manage blog articles:
- Post title & excerpt
- SEO meta tags
- Featured image
- Author & publish date
- Categories & tags
- Rich text content with callout boxes

**Location:** `content/blog/`

### 4. **Global Settings** ⚙️
Site-wide settings:
- Header (phone number, login/apply URLs)
- Footer (NMLS, company info, address, social links)
- SEO (site name, URL, default share image)

**Location:** `content/global/settings.json`

## How to Use the CMS

### **Step 1: Access the Admin**
1. Open your browser to `http://localhost:5000/admin/index.html`
2. Click **"Enter Edit Mode"**
3. You'll see the TinaCMS dashboard

### **Step 2: Navigate Content**
- Click the **hamburger menu** (☰) in the top left
- Select a content type:
  - State Mortgage Pages
  - Loan Product Pages
  - Blog Posts
  - Global Settings

### **Step 3: Edit Content**
1. **Select a page** from the list
2. **Edit fields** in the right sidebar:
   - Text fields for titles, descriptions
   - Rich text editor for body content
   - Image uploads for photos
   - Date pickers for publish dates
3. **Save** your changes (saves to local files)

### **Step 4: View Changes**
- Changes are immediately reflected on your website
- Navigate to the page to see your updates
- Hit refresh if needed

## Content Types Explained

### **State Mortgage Pages**
Perfect for location-specific pages like:
- Arizona Mortgage Loans
- Florida Mortgage Broker  
- Texas Home Loans

**Fields:**
- ✅ Page Title (what appears on the page)
- ✅ Meta Title (SEO title for search engines)
- ✅ Meta Description (150-160 characters for Google)
- ✅ State & Abbreviation
- ✅ Hero Section (headline, image, subtext)
- ✅ Body Content (main page content)
- ✅ SEO Keywords & Social Image

### **Loan Product Pages**
For loan type pages like:
- FHA Loans
- VA Loans
- HELOC
- Refinancing

**Fields:**
- ✅ Loan Type Title
- ✅ SEO Meta Tags
- ✅ Hero Section
- ✅ Body Content

### **Blog Posts**
Full-featured blog system:
- ✅ Title & Excerpt
- ✅ Featured Image
- ✅ Author & Publish Date
- ✅ Categories & Tags
- ✅ Rich Text Editor with callout boxes
- ✅ SEO metadata

**Special Feature:** Callout boxes for tips, warnings, success stories

### **Global Settings**
Site-wide configuration:
- **Header Settings:** Phone, login URL, apply URL
- **Footer Settings:** NMLS, company name, address, social links
- **SEO Settings:** Site name, URL, default share image

## Rich Text Editor Features

When editing page content, you have access to:

### **Basic Formatting:**
- **Bold**, *Italic*, ~~Strikethrough~~
- Headers (H1, H2, H3, H4, H5, H6)
- Bulleted lists
- Numbered lists
- Blockquotes
- Links

### **Advanced Features:**
- **Images:** Upload and insert images inline
- **Code blocks:** For showing examples
- **Callout boxes:** Highlight important information
- **Tables:** Create data tables
- **Horizontal rules:** Visual separators

## Image Management

### **Uploading Images:**
1. In any image field, click "Upload"
2. Select image from your computer
3. Images are stored in `attached_assets/`
4. Automatic optimization and responsive handling

### **Image Best Practices:**
- Use descriptive alt text for accessibility and SEO
- Keep file sizes reasonable (under 2MB)
- Use JPG for photos, PNG for graphics with transparency
- Recommended sizes:
  - Hero images: 1920x1080px
  - Featured images: 1200x630px
  - Inline images: 800-1200px wide

## SEO Best Practices

### **Meta Titles:**
- Keep under 60 characters
- Format: `[Page Topic] | Mortgage Genius Has Low Rates`
- Include primary keyword
- Example: `Arizona Mortgage Loans | Mortgage Genius Has Low Rates`

### **Meta Descriptions:**
- Keep between 150-160 characters
- Include value proposition
- Use active voice
- Include location and loan types
- Example: `Get expert Arizona mortgage help from licensed brokers. FHA, VA, conventional, jumbo loans in Phoenix, Tucson, Scottsdale. Competitive rates, fast approvals.`

### **Keywords:**
- Use comma-separated list
- Include location + loan type combinations
- Example: `Arizona mortgage broker, Phoenix home loans, Tucson mortgage rates`

## Creating New Content

### **New State Page:**
1. Go to **State Mortgage Pages**
2. Click **"Create New"**
3. Fill in all required fields (marked with *)
4. Save
5. Add route in App.tsx if needed

### **New Blog Post:**
1. Go to **Blog Posts**
2. Click **"Create New"**
3. Fill in:
   - Title & Excerpt
   - Author & Date
   - Category & Tags
   - Featured Image
   - Content
4. Save
5. Post appears in blog automatically

### **New Loan Page:**
1. Go to **Loan Product Pages**
2. Click **"Create New"**
3. Select loan type
4. Fill in content
5. Save

## File Structure

Content is stored as files in your repository:

```
content/
├── pages/
│   ├── states/
│   │   ├── az-mortgage-broker.mdx
│   │   ├── fl-mortgage-broker.mdx
│   │   └── tx-mortgage-broker.mdx
│   └── loans/
│       ├── fha-loan.mdx
│       ├── va-loan.mdx
│       └── heloc.mdx
├── blog/
│   ├── first-time-homebuyer-tips.mdx
│   └── understanding-mortgage-rates.mdx
└── global/
    └── settings.json
```

### **MDX Format:**
Pages are stored as MDX files:
- **Frontmatter** (YAML) - metadata at the top
- **Content** (Markdown/JSX) - body of the page

Example:
```mdx
---
title: Arizona Mortgage Loans
metaTitle: Arizona Mortgage Loans | Mortgage Genius
state: Arizona
---

## Welcome to Arizona's Premier Mortgage Broker

Your content here...
```

## Workflow

### **Content Editing Workflow:**
1. **Edit** content in TinaCMS admin
2. **Save** (writes to local files)
3. **Preview** on website
4. **Commit** changes to Git
5. **Deploy** (content goes live)

### **Git Integration:**
All content changes are version controlled:
- Every save creates file changes
- Commit changes with descriptive messages
- Full version history available
- Easy rollback if needed

## Production Setup (Future)

When ready for production, you can:

### **Option 1: Local Mode (Current)**
- Keep using local file editing
- Commit content through Git
- Free forever
- Full control

### **Option 2: Tina Cloud (Optional)**
- Visual editing on live site
- Authentication & user management
- Editorial workflow
- Content approval process
- Free tier available, paid plans for advanced features

Visit [tina.io](https://tina.io) for Tina Cloud setup if desired.

## Tips & Tricks

### **Quick Edits:**
- Click "Edit This Page" button (when added to site)
- Edit directly from any page
- Saves to CMS automatically

### **Keyboard Shortcuts:**
- `Cmd/Ctrl + S` - Save
- `Cmd/Ctrl + K` - Insert link
- `Cmd/Ctrl + B` - Bold
- `Cmd/Ctrl + I` - Italic

### **Content Organization:**
- Use consistent naming: `state-topic.mdx`
- Keep filenames URL-friendly (lowercase, hyphens)
- Organize by folder (states, loans, blog)

### **SEO Optimization:**
- Update meta titles and descriptions for every page
- Add alt text to all images
- Use descriptive headers (H2, H3, H4)
- Include internal links
- Add relevant keywords

## Migrating Existing Pages

To convert your current React components to TinaCMS content:

1. **Create MDX file** in appropriate folder
2. **Copy content** from React component
3. **Add frontmatter** with metadata
4. **Save** in CMS
5. **Update route** to load from CMS instead of component

Example already done: `az-mortgage-broker.mdx`

## Troubleshooting

### **CMS won't load:**
- Check that dev server is running
- Visit `/admin/index.html` (not just `/admin`)
- Clear browser cache

### **Changes not showing:**
- Refresh the page
- Check file was saved
- Verify route is loading CMS content

### **Image not uploading:**
- Check file size (under 5MB recommended)
- Verify file format (JPG, PNG, GIF, WebP)
- Check permissions on `attached_assets/` folder

## Support & Resources

- **TinaCMS Docs:** https://tina.io/docs/
- **Community Forum:** https://github.com/tinacms/tinacms/discussions
- **Video Tutorials:** https://tina.io/docs/introduction/video-tutorials/

---

## Summary

✅ **TinaCMS is installed and ready to use**  
✅ **Access admin at `/admin/index.html`**  
✅ **Edit state pages, loan pages, blog posts, and global settings**  
✅ **Content is saved as files in your Git repository**  
✅ **SEO-friendly with full meta tag control**  
✅ **Visual editor with rich text formatting**  
✅ **Free and open source**  

**Start editing your content today! 🎉**
