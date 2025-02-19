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

// Helper function to format commit messages for user-friendly display
function formatCommitMessage(message) {
  // Remove conventional commit prefixes and make more readable
  let formattedMessage = message.trim();
  
  // Replace conventional commit prefixes with more friendly language
  formattedMessage = formattedMessage
    .replace(/^feat(\([^)]*\))?:\s*/i, 'New Feature: ')
    .replace(/^fix(\([^)]*\))?:\s*/i, 'Bug Fix: ')
    .replace(/^perf(\([^)]*\))?:\s*/i, 'Performance Improvement: ')
    .replace(/^refactor(\([^)]*\))?:\s*/i, 'Code Improvement: ')
    .replace(/^style(\([^)]*\))?:\s*/i, 'UI Update: ')
    .replace(/^docs(\([^)]*\))?:\s*/i, 'Documentation Update: ')
    .replace(/^test(\([^)]*\))?:\s*/i, 'Test Improvement: ')
    .replace(/^build(\([^)]*\))?:\s*/i, 'Build System Update: ')
    .replace(/^ci(\([^)]*\))?:\s*/i, 'CI Improvement: ');
  
  // Capitalize first letter if not already capitalized
  if (formattedMessage.length > 0 && formattedMessage[0].toLowerCase() === formattedMessage[0]) {
    formattedMessage = formattedMessage.charAt(0).toUpperCase() + formattedMessage.slice(1);
  }
  
  return formattedMessage;
}

// Group changes by type for better organization
function groupChangesByType(commitMessage, files) {
  // Determine change type from commit message
  let changeType = 'Other Updates';
  
  if (commitMessage.toLowerCase().includes('fix') || 
      commitMessage.toLowerCase().startsWith('fix:')) {
    changeType = 'Bug Fixes';
  } else if (commitMessage.toLowerCase().includes('feat') || 
             commitMessage.toLowerCase().startsWith('feat:')) {
    changeType = 'New Features';
  } else if (commitMessage.toLowerCase().includes('perf') || 
             commitMessage.toLowerCase().startsWith('perf:')) {
    changeType = 'Performance Improvements';
  } else if (commitMessage.toLowerCase().includes('ui') || 
             commitMessage.toLowerCase().includes('style') ||
             commitMessage.toLowerCase().startsWith('style:')) {
    changeType = 'UI Enhancements';
  }
  
  return {
    type: changeType,
    message: formatCommitMessage(commitMessage),
    files: files
  };
}

// Generate user-friendly file paths
function formatFilePath(filePath) {
  // Remove project-specific prefixes that users don't need to see
  return filePath
    .replace(/^unisala-astro\//, '')
    .replace(/\.js$/, '')
    .replace(/\.astro$/, '')
    .replace(/\.json$/, '')
    .replace(/\.md$/, '')
    .replace(/\/index$/, '');
}

// Summarize changes in user-friendly terms
function summarizeChanges(files) {
  // Count changes by directory to create a summary
  const areaChanges = {};
  
  files.forEach(file => {
    const normalizedPath = file.replace(/^unisala-astro\//, '');
    const mainArea = normalizedPath.split('/')[0];
    
    if (!areaChanges[mainArea]) {
      areaChanges[mainArea] = 0;
    }
    areaChanges[mainArea]++;
  });
  
  // Create summary text
  const summaryParts = [];
  for (const [area, count] of Object.entries(areaChanges)) {
    let readableArea = area;
    
    // Make area names more readable
    switch(area) {
      case 'src':
        readableArea = 'core application';
        break;
      case 'pages':
        readableArea = 'page templates';
        break;
      case 'scripts':
        readableArea = 'internal scripts';
        break;
      case 'content':
        readableArea = 'content files';
        break;
    }
    
    summaryParts.push(`${count} ${readableArea} ${count === 1 ? 'file' : 'files'}`);
  }
  
  return summaryParts.join(', ');
}

// Function to filter user-relevant files
function filterUserRelevantFiles(files) {
  return files
    .filter(file => !file.includes('node_modules/')) 
    .filter(file => !file.includes('.git/'))
    .filter(file => !file.endsWith('.log'))
    .filter(file => !file.endsWith('.lock.json'))
    .filter(file => !file.includes('test/'))
    .filter(file => !file.includes('.github/'));
}

// Function to update release notes
function updateReleaseNotes(message, files) {
  console.log(`\nUpdating release notes with message: "${message}"`);
  
  // Read the current release notes
  const releaseContent = fs.readFileSync(RELEASE_FILE_PATH, 'utf8');
  
  // Parse frontmatter and content
  const frontmatterMatch = releaseContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  
  if (!frontmatterMatch) {
    console.error('Invalid release notes format: could not find frontmatter');
    process.exit(1);
  }
  
  const [_, frontmatter, content] = frontmatterMatch;
  
  // Get current date in YYYY-MM-DD format
  const date = new Date().toISOString().split('T')[0];
  
  // Filter relevant files
  const relevantFiles = filterUserRelevantFiles(files)
    .filter(file => file !== 'src/content/releases/1_0.md'); // Avoid self-referencing
  
  if (relevantFiles.length === 0) {
    console.log('No relevant files changed, skipping release notes update');
    return;
  }
  
  // Group changes
  const changeInfo = groupChangesByType(message, relevantFiles);
  
  // Format the files in a user-friendly way
  const formattedFiles = relevantFiles
    .map(file => formatFilePath(file))
    .filter(file => file) // Remove empty strings
    .map(file => `- ${file}`);
  
  // Create a summary of changes
  const changeSummary = summarizeChanges(relevantFiles);
  
  // Format the entry content
  let entryContent = `### ${changeInfo.message}\n`;
  
  if (changeSummary) {
    entryContent += `Updated ${changeSummary}.\n\n`;
  }
  
  if (formattedFiles.length > 0 && formattedFiles.length <= 5) {
    entryContent += `Changed files:\n${formattedFiles.join('\n')}\n\n`;
  }
  
  // Check if there's already a section for this date
  const dateSection = new RegExp(`## Updates - ${date}`);
  const sectionExists = dateSection.test(content);
  
  let updatedContent;
  
  if (sectionExists) {
    // Update existing section for today
    updatedContent = content.replace(
      new RegExp(`(## Updates - ${date}[\\s\\S]*?)(##|$)`),
      (match, section, nextSection) => {
        // Add the new entry to the existing section
        const updatedSection = `${section}\n${entryContent}`;
        return nextSection ? updatedSection + nextSection : updatedSection;
      }
    );
  } else {
    // Add a new section for today
    updatedContent = `${content}\n## Updates - ${date}\n\n${entryContent}`;
  }
  
  // Write the updated release notes
  const finalContent = `---\n${frontmatter}\n---\n${updatedContent}`;
  fs.writeFileSync(RELEASE_FILE_PATH, finalContent, 'utf8');
  
  // Stage the release notes
  try {
    execSync(`git add ${RELEASE_FILE_PATH}`);
    console.log(`\nStaged updated release notes at ${RELEASE_FILE_PATH}`);
  } catch (error) {
    console.error(`\nERROR staging file: ${error.message}`);
  }
}

// Main execution
async function main() {
  // Check if release file exists
  if (!fs.existsSync(RELEASE_FILE_PATH)) {
    console.error(`Release file not found at ${RELEASE_FILE_PATH}`);
    process.exit(1);
  }

  // Get the current staged files
  const stagedFiles = execSync('git diff --staged --name-only').toString().trim().split('\n');
  
  if (stagedFiles.length === 0 || (stagedFiles.length === 1 && stagedFiles[0] === '')) {
    console.log('No files staged, skipping release notes update');
    process.exit(0);
  }

  // Get the latest commit message if it exists
  let commitMessage = '';
  try {
    commitMessage = execSync('git log -1 --pretty=%B').toString().trim();
  } catch (e) {
    console.log('\nNo previous commit found');
  }

  // If no commit message from previous commit, try to get it from prepared message
  if (!commitMessage) {
    try {
      const commitMsgPath = path.join(process.cwd(), '.git', 'COMMIT_EDITMSG');
      if (fs.existsSync(commitMsgPath)) {
        commitMessage = fs.readFileSync(commitMsgPath, 'utf8').trim();
      }
    } catch (e) {
      console.log(`\nError reading COMMIT_EDITMSG: ${e.message}`);
    }
  }

  // If still no commit message, ask the user
  if (!commitMessage) {
    console.log('\nNo commit message available, will prompt for description');
    commitMessage = await question('Enter a brief description of your changes: ');
  }

  updateReleaseNotes(commitMessage, stagedFiles);
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

// Run the main function
main().catch(error => {
  console.error('Error updating release notes:', error);
  process.exit(1);
});