import { client } from '../../tina/__generated__/client';

export async function getStatePage(filename: string) {
  try {
    const result = await client.queries.statePage({
      relativePath: `${filename}.mdx`,
    });
    return result;
  } catch (error) {
    console.error('Error fetching state page:', error);
    return null;
  }
}

export async function getLoanPage(filename: string) {
  try {
    const result = await client.queries.loanPage({
      relativePath: `${filename}.mdx`,
    });
    return result;
  } catch (error) {
    console.error('Error fetching loan page:', error);
    return null;
  }
}

export async function getBlogPost(filename: string) {
  try {
    const result = await client.queries.blogPost({
      relativePath: `${filename}.mdx`,
    });
    return result;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function getAllBlogPosts() {
  try {
    const result = await client.queries.blogPostConnection();
    return result.data.blogPostConnection.edges || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getGlobalSettings() {
  try {
    const result = await client.queries.globalSettings({
      relativePath: 'settings.json',
    });
    return result.data.globalSettings;
  } catch (error) {
    console.error('Error fetching global settings:', error);
    return null;
  }
}
