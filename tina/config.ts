import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  
  media: {
    tina: {
      mediaRoot: "attached_assets",
      publicFolder: "",
    },
  },
  
  schema: {
    collections: [
      {
        name: "statePage",
        label: "State Mortgage Pages",
        path: "content/pages/states",
        format: "mdx",
        ui: {
          router: ({ document }) => {
            const slug = document._sys.filename.replace(/^(.+)\.(mdx?)$/, '$1');
            return `/${slug}`;
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title (H1)",
            required: true,
          },
          {
            type: "string",
            name: "metaTitle",
            label: "SEO Meta Title",
            required: true,
            description: "Title shown in search results and browser tabs",
          },
          {
            type: "string",
            name: "metaDescription",
            label: "SEO Meta Description",
            required: true,
            ui: {
              component: "textarea",
            },
            description: "150-160 characters shown in search results",
          },
          {
            type: "string",
            name: "state",
            label: "State",
            required: true,
            options: ["Arizona", "Florida", "Texas", "Other"],
          },
          {
            type: "string",
            name: "stateAbbr",
            label: "State Abbreviation",
            required: true,
            description: "e.g., AZ, FL, TX",
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true,
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "image",
                name: "image",
                label: "Hero Image",
              },
              {
                type: "string",
                name: "imageAlt",
                label: "Image Alt Text",
                description: "Describe the image for accessibility and SEO",
              },
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Page Content",
            isBody: true,
          },
          {
            type: "object",
            name: "seo",
            label: "Additional SEO",
            fields: [
              {
                type: "string",
                name: "ogImage",
                label: "Social Share Image",
                description: "Image shown when shared on social media",
              },
              {
                type: "string",
                name: "keywords",
                label: "Keywords",
                ui: {
                  component: "textarea",
                },
                description: "Comma-separated keywords for SEO",
              },
            ],
          },
        ],
      },
      {
        name: "loanPage",
        label: "Loan Product Pages",
        path: "content/pages/loan-types",
        format: "mdx",
        ui: {
          router: ({ document }) => {
            const slug = document._sys.filename.replace(/^(.+)\.(mdx?)$/, '$1');
            return `/${slug}`;
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Loan Type Title",
            required: true,
          },
          {
            type: "string",
            name: "metaTitle",
            label: "SEO Meta Title",
            required: true,
          },
          {
            type: "string",
            name: "metaDescription",
            label: "SEO Meta Description",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "loanType",
            label: "Loan Type",
            required: true,
            options: ["FHA", "VA", "Conventional", "Jumbo", "USDA", "HELOC", "Refinance"],
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "headline",
                label: "Headline",
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "image",
                name: "image",
                label: "Hero Image",
              },
            ],
          },
          {
            type: "object",
            name: "seo",
            label: "SEO Settings",
            fields: [
              {
                type: "string",
                name: "keywords",
                label: "Keywords",
                ui: {
                  component: "textarea",
                },
                description: "Comma-separated keywords for SEO",
              },
              {
                type: "string",
                name: "ogImage",
                label: "Social Share Image",
                description: "Image shown when shared on social media",
              },
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Page Content",
            isBody: true,
          },
        ],
      },
      {
        name: "legalPage",
        label: "Legal Pages",
        path: "content/pages/legal",
        format: "mdx",
        ui: {
          router: ({ document }) => {
            return `/${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            required: true,
          },
          {
            type: "string",
            name: "metaTitle",
            label: "SEO Meta Title",
            required: true,
          },
          {
            type: "string",
            name: "metaDescription",
            label: "SEO Meta Description",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "lastUpdated",
            label: "Last Updated",
            description: "e.g., January 2025",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Page Content",
            isBody: true,
          },
        ],
      },
      {
        name: "blogPost",
        label: "Blog Posts",
        path: "content/blog",
        format: "mdx",
        ui: {
          router: ({ document }) => {
            return `/resources/${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Post Title",
            required: true,
          },
          {
            type: "string",
            name: "metaTitle",
            label: "SEO Meta Title",
          },
          {
            type: "string",
            name: "metaDescription",
            label: "SEO Meta Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            required: true,
            ui: {
              component: "textarea",
            },
            description: "Brief summary shown in blog listings",
          },
          {
            type: "datetime",
            name: "publishDate",
            label: "Publish Date",
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true,
          },
          {
            type: "image",
            name: "featuredImage",
            label: "Featured Image",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "First Time Buyers",
              "Refinancing",
              "VA Loans",
              "FHA Loans",
              "Market Updates",
              "Tips & Advice",
            ],
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            ui: {
              component: "tags",
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Post Content",
            isBody: true,
            templates: [
              {
                name: "callout",
                label: "Callout Box",
                fields: [
                  {
                    name: "type",
                    label: "Type",
                    type: "string",
                    options: ["info", "warning", "success", "tip"],
                  },
                  {
                    name: "title",
                    label: "Title",
                    type: "string",
                  },
                  {
                    name: "content",
                    label: "Content",
                    type: "rich-text",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "globalSettings",
        label: "Global Settings",
        path: "content/global",
        format: "json",
        ui: {
          global: true,
        },
        fields: [
          {
            type: "object",
            name: "header",
            label: "Header Settings",
            fields: [
              {
                type: "string",
                name: "phone",
                label: "Phone Number",
              },
              {
                type: "string",
                name: "clientLoginUrl",
                label: "Client Login URL",
              },
              {
                type: "string",
                name: "applyOnlineUrl",
                label: "Apply Online URL",
              },
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "Footer Settings",
            fields: [
              {
                type: "string",
                name: "nmls",
                label: "NMLS Number",
              },
              {
                type: "string",
                name: "companyName",
                label: "Company Name",
              },
              {
                type: "string",
                name: "tagline",
                label: "Tagline",
              },
              {
                type: "string",
                name: "address",
                label: "Address",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "object",
                name: "social",
                label: "Social Media Links",
                fields: [
                  {
                    type: "string",
                    name: "facebook",
                    label: "Facebook URL",
                  },
                  {
                    type: "string",
                    name: "linkedin",
                    label: "LinkedIn URL",
                  },
                  {
                    type: "string",
                    name: "twitter",
                    label: "Twitter/X URL",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "seo",
            label: "Site-wide SEO",
            fields: [
              {
                type: "string",
                name: "siteName",
                label: "Site Name",
              },
              {
                type: "string",
                name: "siteUrl",
                label: "Site URL",
                description: "e.g., https://mortgagegenius.com",
              },
              {
                type: "string",
                name: "defaultOgImage",
                label: "Default Social Share Image",
              },
            ],
          },
        ],
      },
    ],
  },
});
