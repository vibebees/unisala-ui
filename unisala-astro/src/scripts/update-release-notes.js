#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import * as readline from 'readline';

// Get current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const RELEASE_FILE_PATH = path.join(process.cwd(), 'unisala-astro/src/content/releases/1_0.md');

// DEBUGGING: Log key information
console.log('===== DEBUG INFO =====');
console.log(`Script path: ${__filename}`);
console.log(`Current working directory: ${process.cwd()}`);
console.log(`Release file path: ${RELEASE_FILE_PATH}`);
console.log(`Release file exists: ${fs.existsSync(RELEASE_FILE_PATH)}`);
console.log('======================');

// Check if release file exists
if (!fs.existsSync(RELEASE_FILE_PATH)) {
  console.error(`Release file not found at ${RELEASE_FILE_PATH}`);
  process.exit(1);
}

// Get the current staged files
const stagedFiles = execSync('git diff --staged --name-only').toString().trim().split('\n');
console.log(`\nStaged files (${stagedFiles.length}):`);
stagedFiles.forEach(file => console.log(`- ${file}`));

if (stagedFiles.length === 0 || (stagedFiles.length === 1 && stagedFiles[0] === '')) {
  console.log('No files staged, skipping release notes update');
  process.exit(0);
}

// Get the latest commit message if it exists
let commitMessage = '';
try {
  commitMessage = execSync('git log -1 --pretty=%B').toString().trim();
  console.log(`\nLatest commit message: "${commitMessage}"`);
} catch (e) {
  console.log('\nNo previous commit found');
}

// If no commit message from previous commit, try to get it from prepared message
if (!commitMessage) {
  try {
    const commitMsgPath = path.join(process.cwd(), '.git', 'COMMIT_EDITMSG');
    if (fs.existsSync(commitMsgPath)) {
      commitMessage = fs.readFileSync(commitMsgPath, 'utf8').trim();
      console.log(`\nCommit message from COMMIT_EDITMSG: "${commitMessage}"`);
    }
  } catch (e) {
    console.log(`\nError reading COMMIT_EDITMSG: ${e.message}`);
  }
}

// Function to get user input
const question = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise(resolve => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

// Function to update release notes
function updateReleaseNotes(message, files) {
  console.log(`\nUpdating release notes with message: "${message}"`);
  
  // Read the current release notes
  const releaseContent = fs.readFileSync(RELEASE_FILE_PATH, 'utf8');
  console.log(`\nCurrent release notes size: ${releaseContent.length} characters`);
  
  // Parse frontmatter and content
  const frontmatterMatch = releaseContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  
  if (!frontmatterMatch) {
    console.error('Invalid release notes format: could not find frontmatter');
    process.exit(1);
  }
  
  const [_, frontmatter, content] = frontmatterMatch;
  console.log(`\nFrontmatter size: ${frontmatter.length} characters`);
  console.log(`Content size: ${content.length} characters`);
  
  // Get current date in YYYY-MM-DD format
  const date = new Date().toISOString().split('T')[0];
  console.log(`\nToday's date: ${date}`);
  
  // Format the new entry
  const relevantFiles = files
    .filter(file => file !== 'src/content/releases/1_0.md') // Avoid self-referencing
    .filter(file => !file.includes('node_modules/')) // Exclude node_modules
    .filter(file => !file.includes('.git/')) // Exclude git files
  
  console.log(`\nRelevant files for changelog (${relevantFiles.length}/${files.length}):`);
  relevantFiles.forEach(file => console.log(`- ${file}`));
  
  const changedFiles = relevantFiles.map(file => `- \`${file}\``).join('\n');
  
  if (!changedFiles) {
    console.log('No relevant files changed, skipping release notes update');
    return;
  }

  // Check if there's already a section for this date
  const dateSection = new RegExp(`## Updates - ${date}`);
  const sectionExists = dateSection.test(content);
  console.log(`\nSection for today (${date}) already exists: ${sectionExists}`);
  
  let updatedContent;
  
  if (sectionExists) {
    // Update existing section for today
    updatedContent = content.replace(
      new RegExp(`(## Updates - ${date}[\\s\\S]*?)(##|$)`),
      (match, section, nextSection) => {
        // Add the new entry to the existing section
        const updatedSection = `${section}\n### ${message}\nFiles changed:\n${changedFiles}\n\n`;
        return nextSection ? updatedSection + nextSection : updatedSection;
      }
    );
    console.log('\nUpdated existing section for today');
  } else {
    // Add a new section for today
    const newEntry = `\n## Updates - ${date}\n\n### ${message}\nFiles changed:\n${changedFiles}\n`;
    updatedContent = `${content}\n${newEntry}`;
    console.log('\nAdded new section for today');
  }
  
  // Calculate difference in length to confirm changes
  const contentDiff = updatedContent.length - content.length;
  console.log(`\nContent length difference: ${contentDiff} characters`);
  
  if (contentDiff <= 0) {
    console.log('\nWARNING: No content was added, this might indicate a problem');
  }
  
  // Write the updated release notes
  const finalContent = `---\n${frontmatter}\n---\n${updatedContent}`;
  fs.writeFileSync(RELEASE_FILE_PATH, finalContent, 'utf8');
  console.log(`\nWrote ${finalContent.length} characters to release notes file`);
  
  // Stage the release notes
  try {
    execSync(`git add ${RELEASE_FILE_PATH}`);
    console.log(`\nStaged updated release notes at ${RELEASE_FILE_PATH}`);
  } catch (error) {
    console.error(`\nERROR staging file: ${error.message}`);
  }
}

// Main execution
if (!commitMessage) {
  console.log('\nNo commit message available, will prompt for description');
  (async () => {
    commitMessage = await question('Enter a brief description of your changes: ');
    console.log(`\nUser entered description: "${commitMessage}"`);
    updateReleaseNotes(commitMessage, stagedFiles);
  })();
} else {
  updateReleaseNotes(commitMessage, stagedFiles);
}