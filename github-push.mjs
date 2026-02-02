import { Octokit } from '@octokit/rest';
import fs from 'fs';
import path from 'path';

async function getAccessToken() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  const connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  return connectionSettings?.settings?.access_token;
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function getAllFiles(dir, base = '') {
  const excludeDirs = ['.git', 'node_modules', '.cache', '.upm', '__pycache__', '.replit', '.config', '.local'];
  const excludeFiles = ['tina-lock.json', 'package-lock.json'];
  let files = [];
  
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const relativePath = path.join(base, item.name);
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      if (!excludeDirs.includes(item.name) && !relativePath.includes('tina/__generated__')) {
        files = files.concat(getAllFiles(fullPath, relativePath));
      }
    } else {
      const stats = fs.statSync(fullPath);
      if (stats.size < 300 * 1024 && !excludeFiles.includes(item.name)) {
        files.push(relativePath);
      }
    }
  }
  return files;
}

async function main() {
  const token = await getAccessToken();
  const octokit = new Octokit({ auth: token });
  const owner = 'Zelray';
  const repo = 'mortgage-genius';
  
  // First, create README to initialize the repo
  console.log('Initializing repo with README...');
  try {
    await octokit.repos.createOrUpdateFileContents({
      owner, repo,
      path: 'README.md',
      message: 'Initial commit',
      content: Buffer.from('# Mortgage Genius\\n\\nProfessional mortgage broker website.').toString('base64')
    });
    console.log('README created.');
    await sleep(2000);
  } catch (err) {
    console.log('README might already exist:', err.message);
  }
  
  console.log('Getting all files...');
  const files = getAllFiles('.');
  console.log('Found', files.length, 'files to upload');
  
  // Now create blobs
  const treeItems = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    try {
      const content = fs.readFileSync(file);
      const base64Content = content.toString('base64');
      
      const { data: blob } = await octokit.git.createBlob({
        owner, repo,
        content: base64Content,
        encoding: 'base64'
      });
      
      treeItems.push({
        path: file,
        mode: '100644',
        type: 'blob',
        sha: blob.sha
      });
      
      if ((i + 1) % 25 === 0) {
        console.log('Progress:', i + 1, '/', files.length);
        await sleep(2000);
      } else if ((i + 1) % 5 === 0) {
        await sleep(300);
      }
    } catch (err) {
      if (err.status === 403 && err.message.includes('rate limit')) {
        console.log('Rate limited - waiting 65 seconds...');
        await sleep(65000);
        i--;
      } else {
        console.log('Skipping', file, '-', err.status);
      }
    }
  }
  
  console.log('\\nUploaded', treeItems.length, 'files');
  
  if (treeItems.length === 0) {
    throw new Error('No files uploaded');
  }
  
  // Get latest commit
  const { data: ref } = await octokit.git.getRef({ owner, repo, ref: 'heads/main' });
  const { data: commit } = await octokit.git.getCommit({ owner, repo, commit_sha: ref.object.sha });
  
  console.log('Creating tree...');
  const { data: tree } = await octokit.git.createTree({
    owner, repo,
    tree: treeItems,
    base_tree: commit.tree.sha
  });
  
  console.log('Creating commit...');
  const { data: newCommit } = await octokit.git.createCommit({
    owner, repo,
    message: 'Full project upload: Mortgage Genius\\n\\nReact 18 + TypeScript + Vite + TinaCMS + Tailwind CSS',
    tree: tree.sha,
    parents: [ref.object.sha]
  });
  
  console.log('Updating main branch...');
  await octokit.git.updateRef({
    owner, repo,
    ref: 'heads/main',
    sha: newCommit.sha,
    force: true
  });
  
  console.log('\\n==============================================');
  console.log('SUCCESS! Repository pushed to:');
  console.log('https://github.com/Zelray/mortgage-genius');
  console.log('==============================================');
}

main().catch(console.error);
