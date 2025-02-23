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
  
  // Replace conventional commit prefixes with more friendly language and add emojis
  formattedMessage = formattedMessage
    .replace(/^feat(\([^)]*\))?:\s*/i, '🚀 New Feature: ')
    .replace(/^fix(\([^)]*\))?:\s*/i, '🐛 Improvement: ')
    .replace(/^perf(\([^)]*\))?:\s*/i, '⚡ Performance Enhancement: ')
    .replace(/^refactor(\([^)]*\))?:\s*/i, '🔧 Platform Update: ')
    .replace(/^style(\([^)]*\))?:\s*/i, '🎨 Visual Update: ')
    .replace(/^docs(\([^)]*\))?:\s*/i, '📚 Documentation Update: ')
    .replace(/^test(\([^)]*\))?:\s*/i, '🧪 Quality Improvement: ')
    .replace(/^build(\([^)]*\))?:\s*/i, '🏗️ Platform Update: ')
    .replace(/^ci(\([^)]*\))?:\s*/i, '🔄 Platform Update: ');
  
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
  let emoji = '✨';
  
  if (commitMessage.toLowerCase().includes('fix') || 
      commitMessage.toLowerCase().startsWith('fix:')) {
    changeType = 'Improvements & Bug Fixes';
    emoji = '🐛';
  } else if (commitMessage.toLowerCase().includes('feat') || 
             commitMessage.toLowerCase().startsWith('feat:')) {
    changeType = 'New Features';
    emoji = '🚀';
  } else if (commitMessage.toLowerCase().includes('perf') || 
             commitMessage.toLowerCase().startsWith('perf:')) {
    changeType = 'Performance Enhancements';
    emoji = '⚡';
  } else if (commitMessage.toLowerCase().includes('ui') || 
             commitMessage.toLowerCase().includes('style') ||
             commitMessage.toLowerCase().startsWith('style:')) {
    changeType = 'Visual Updates';
    emoji = '🎨';
  }
  
  return {
    type: changeType,
    emoji: emoji,
    message: formatCommitMessage(commitMessage),
    files: files
  };
}

// Generate user-focused descriptions based on file types
function generateUserDescription(changeInfo) {
  const message = changeInfo.message.toLowerCase();
  const files = changeInfo.files;
  
  // Check for specific update patterns
  if (files.some(f => f.includes('/search'))) {
    if (message.includes('popular') || message.includes('trending')) {
      return "We've added a way to discover popular content that other students are finding valuable.";
    } else if (message.includes('filter')) {
      return "We've improved the search filters to help you find scholarships more easily.";
    } else {
      return "We've enhanced the search experience to make finding scholarships more efficient.";
    }
  }
  
  if (files.some(f => f.includes('/editor'))) {
    return "We've refined the text editor to make writing and formatting your content smoother.";
  }
  
  if (message.includes('performance') || message.includes('speed') || message.includes('faster')) {
    return "We've optimized the platform for faster loading and smoother browsing.";
  }
  
  if (message.includes('fix') && message.includes('bug')) {
    return "We've resolved several issues to make your experience more reliable.";
  }
  
  // Generic descriptions by type
  switch (changeInfo.type) {
    case 'New Features':
      return "We've added new capabilities to enhance your UniSala experience.";
    case 'Improvements & Bug Fixes':
      return "We've polished the platform to work more smoothly for you.";
    case 'Performance Enhancements':
      return "We've made things faster and more responsive.";
    case 'Visual Updates':
      return "We've refreshed the visual design for better usability.";
    default:
      return "We've made behind-the-scenes improvements to the platform.";
  }
}

// Determine which areas of the application were affected
function getAffectedAreas(files) {
  const areas = new Set();
  
  files.forEach(file => {
    if (file.includes('/search')) areas.add('search experience');
    else if (file.includes('/profile')) areas.add('profile management');
    else if (file.includes('/thread') || file.includes('/comment')) areas.add('discussion threads');
    else if (file.includes('/scholarship')) areas.add('scholarship listings');
    else if (file.includes('/editor')) areas.add('writing tools');
    else if (file.includes('/login') || file.includes('/auth')) areas.add('account services');
    else if (file.includes('/notification')) areas.add('notifications');
    else if (file.includes('/ui/') || file.includes('/components/')) areas.add('user interface');
  });
  
  // If no specific areas were found but we have files
  if (areas.size === 0 && files.length > 0) {
    areas.add('platform');
  }
  
  return Array.from(areas);
}

// Generate a user-friendly summary of changes
function createUserFriendlySummary(changeInfo) {
  const areas = getAffectedAreas(changeInfo.files);
  const userDescription = generateUserDescription(changeInfo);
  
  let summary = '';
  
  // Include a specific area if we can identify one
  if (areas.length > 0) {
    if (areas.length === 1) {
      summary = `We've updated the ${areas[0]}. ${userDescription}`;
    } else if (areas.length <= 3) {
      const areasList = areas.join(', ').replace(/, ([^,]*)$/, ' and $1');
      summary = `We've improved several areas including ${areasList}. ${userDescription}`;
    } else {
      summary = `We've made platform-wide improvements. ${userDescription}`;
    }
  } else {
    summary = userDescription;
  }
  
  return summary;
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
  
  // Create user-friendly summary
  const userSummary = createUserFriendlySummary(changeInfo);
  
  // Format the entry content - more user-friendly approach
  let entryContent = `### ${changeInfo.message}\n`;
  entryContent += `${userSummary}\n\n`;
  
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






