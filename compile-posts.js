const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, 'posts');
const OUTPUT_FILE = path.join(__dirname, 'blog-posts.json');

const CATEGORY_MAP = {
  'shore-life': 'Shore Life',
  'seattle-guides': 'Seattle Guides',
  'decor': 'Decor & DIY',
  'vlog': 'Social & Vlog'
};

// Simple Markdown to HTML parser
function parseMarkdown(markdown) {
  // 1. Separate into block segments by double line breaks
  const blocks = markdown.split(/\n\s*\n/);
  const htmlBlocks = [];
  
  let inList = false;
  let listItems = [];

  const closeListIfOpen = () => {
    if (inList) {
      htmlBlocks.push(`<ul>\n${listItems.map(item => `  <li>${item}</li>`).join('\n')}\n</ul>`);
      inList = false;
      listItems = [];
    }
  };

  blocks.forEach(block => {
    let text = block.trim();
    if (!text) return;

    // Handle Headers
    if (text.startsWith('## ')) {
      closeListIfOpen();
      const content = parseInline(text.substring(3));
      htmlBlocks.push(`<h2>${content}</h2>`);
    } else if (text.startsWith('### ')) {
      closeListIfOpen();
      const content = parseInline(text.substring(4));
      htmlBlocks.push(`<h3>${content}</h3>`);
    } 
    // Handle Blockquotes
    else if (text.startsWith('> ')) {
      closeListIfOpen();
      const content = parseInline(text.substring(2));
      htmlBlocks.push(`<blockquote class="guide-quote">"${content}"</blockquote>`);
    } 
    // Handle Bullet Lists
    else if (text.startsWith('- ') || text.startsWith('* ')) {
      inList = true;
      // Split the block into separate list items in case they are clumped together
      const lines = text.split('\n');
      lines.forEach(line => {
        const itemText = line.replace(/^[\-\*]\s+/, '').trim();
        if (itemText) {
          listItems.push(parseInline(itemText));
        }
      });
    } 
    // Standard Paragraphs
    else {
      closeListIfOpen();
      // Replace manual linebreaks inside a single paragraph with <br>
      const paragraphContent = parseInline(text.replace(/\n/g, '<br>'));
      htmlBlocks.push(`<p>${paragraphContent}</p>`);
    }
  });

  // Close list at the end if it's still open
  closeListIfOpen();

  return htmlBlocks.join('\n');
}

// Convert inline formatting like bold, links, and images
function parseInline(text) {
  let result = text;
  
  // Images: ![alt](url) -> <img src="url" alt="alt" class="modal-body-img">
  result = result.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="modal-body-img">');
  
  // Bold: **text** -> <strong>text</strong>
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Italics: *text* -> <em>text</em>
  result = result.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Links: [label](url) -> <a href="url">label</a>
  result = result.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  return result;
}

// Parse Front-Matter metadata
function parseFrontMatter(frontMatterStr) {
  const metadata = {};
  const lines = frontMatterStr.split('\n');
  
  lines.forEach(line => {
    const parts = line.split(':');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const value = parts.slice(1).join(':').trim().replace(/^['"]|['"]$/g, '');
      metadata[key] = value;
    }
  });

  return metadata;
}

function compile() {
  console.log('🌊 Tuning the tides... Compiling OctopusAve blog posts.');
  
  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`Error: Directory not found at "${POSTS_DIR}".`);
    process.exit(1);
  }

  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
  const compiledPosts = [];

  files.forEach((file, index) => {
    const filePath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Extract front-matter and markdown content
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) {
      console.warn(`⚠️ Warning: Skipping "${file}" due to missing or malformed YAML front-matter.`);
      return;
    }

    const frontMatterStr = match[1];
    const markdownBody = match[2];

    const metadata = parseFrontMatter(frontMatterStr);
    const htmlBody = parseMarkdown(markdownBody);

    if (!metadata.title || !metadata.date || !metadata.category) {
      console.warn(`⚠️ Warning: Skipping "${file}" due to missing required front-matter fields (title, date, category).`);
      return;
    }

    const cat = metadata.category.toLowerCase().trim();
    const categoryLabel = CATEGORY_MAP[cat] || 'Social & Vlog';

    compiledPosts.push({
      id: index + 1, // Will be re-assigned sorted IDs below
      title: metadata.title,
      summary: metadata.summary || '',
      date: metadata.date,
      category: cat,
      categoryLabel: categoryLabel,
      image: metadata.image || 'assets/logo_octopus.png',
      content: htmlBody,
      timestamp: new Date(metadata.date).getTime() || 0 // Used for chronological sorting
    });
  });

  // Sort posts chronologically (newest first)
  compiledPosts.sort((a, b) => b.timestamp - a.timestamp);

  // Re-assign clean sequential IDs based on sorted order
  const finalPosts = compiledPosts.map((post, idx) => {
    const { timestamp, ...rest } = post; // Exclude timestamp helper from final JSON
    return {
      id: idx + 1,
      ...rest
    };
  });

  // Write compiled JSON array directly to target
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalPosts, null, 2), 'utf8');
  console.log(`✅ Success! Compiled ${finalPosts.length} posts directly into "blog-posts.json".`);
}

compile();
