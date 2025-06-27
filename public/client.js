// NYT Wedding Announcer Client JavaScript

document.addEventListener('DOMContentLoaded', function() {
  const generateButton = document.getElementById("gen-btn");
  const resultsContainer = document.getElementById("resultsContainer");
  const loading = document.getElementById("loading");
  
  let generationCount = 0;
  
  // Add keyboard shortcut (Enter or Space)
  document.addEventListener('keydown', function(event) {
    if ((event.code === 'Enter' || event.code === 'Space') && 
        event.target === document.body && 
        !generateButton.disabled) {
      event.preventDefault();
      generateAnnouncement();
    }
  });
  
  // Handle button click
  generateButton.addEventListener("click", generateAnnouncement);
  
  function generateAnnouncement() {
    // Disable button and show loading
    generateButton.disabled = true;
    generateButton.textContent = "Generating...";
    loading.classList.add('show');
    
    // Clear any existing error messages
    clearErrorMessages();
    
    // Create XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    xhr.timeout = 10000; // 10 second timeout
    
    xhr.onload = function() {
      if (xhr.status === 200) {
        handleSuccess(xhr.response);
      } else {
        handleError(`Server error: ${xhr.status} ${xhr.statusText}`);
      }
    };
    
    xhr.onerror = function() {
      handleError("Network error. Please check your connection and try again.");
    };
    
    xhr.ontimeout = function() {
      handleError("Request timed out. Please try again.");
    };
    
    xhr.onloadend = function() {
      // Always re-enable button and hide loading
      generateButton.disabled = false;
      generateButton.textContent = "Generate Another Announcement";
      loading.classList.remove('show');
    };
    
    xhr.send();
  }
  
  function handleSuccess(response) {
    generationCount++;
    
    // Hide the stats on first generation
    const stats = document.querySelector('.stats');
    if (stats && generationCount === 1) {
      stats.style.display = 'none';
    }
    
    // Update results with animation
    resultsContainer.style.opacity = '0.5';
    setTimeout(() => {
      resultsContainer.innerHTML = response;
      resultsContainer.style.opacity = '1';
      
      // Add generation counter
      const results = document.getElementById('results');
      if (results) {
        const counter = document.createElement('div');
        counter.className = 'generation-counter';
        counter.textContent = `Announcement #${generationCount}`;
        counter.style.cssText = `
          text-align: center;
          font-size: 12px;
          color: #999;
          margin-top: 15px;
          padding-top: 10px;
          border-top: 1px solid #eee;
        `;
        results.appendChild(counter);
        
        // Add copy button
        addCopyButton(results);
      }
    }, 200);
    
    // Update page title
    document.title = `NYT Wedding Generator - Announcement #${generationCount}`;
    
    // Log success for debugging
    console.log(`Successfully generated announcement #${generationCount}`);
  }
  
  function handleError(message) {
    console.error('Generation error:', message);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
      <strong>Oops!</strong> ${message}
      <br><small>Please try again in a moment.</small>
    `;
    
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(errorDiv);
    
    // Auto-retry after 3 seconds for network errors
    if (message.includes('Network') || message.includes('timeout')) {
      setTimeout(() => {
        if (document.querySelector('.error-message')) {
          generateAnnouncement();
        }
      }, 3000);
    }
  }
  
  function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
  }
  
  function addCopyButton(resultsElement) {
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy to Clipboard';
    copyButton.className = 'copy-button';
    copyButton.style.cssText = `
      margin-top: 15px;
      padding: 8px 16px;
      background-color: #666;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      display: block;
      margin-left: auto;
      margin-right: auto;
    `;
    
    copyButton.onclick = function() {
      // Get text content without the copy button
      const textToCopy = resultsElement.cloneNode(true);
      const copyBtn = textToCopy.querySelector('.copy-button');
      const counter = textToCopy.querySelector('.generation-counter');
      if (copyBtn) copyBtn.remove();
      if (counter) counter.remove();
      
      const text = textToCopy.textContent.trim();
      
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          copyButton.textContent = 'Copied!';
          copyButton.style.backgroundColor = '#4CAF50';
          setTimeout(() => {
            copyButton.textContent = 'Copy to Clipboard';
            copyButton.style.backgroundColor = '#666';
          }, 2000);
        }).catch(() => {
          fallbackCopy(text, copyButton);
        });
      } else {
        fallbackCopy(text, copyButton);
      }
    };
    
    resultsElement.appendChild(copyButton);
  }
  
  function fallbackCopy(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      button.textContent = 'Copied!';
      button.style.backgroundColor = '#4CAF50';
      setTimeout(() => {
        button.textContent = 'Copy to Clipboard';
        button.style.backgroundColor = '#666';
      }, 2000);
    } catch (err) {
      button.textContent = 'Copy failed';
      button.style.backgroundColor = '#f44336';
      setTimeout(() => {
        button.textContent = 'Copy to Clipboard';
        button.style.backgroundColor = '#666';
      }, 2000);
    }
    
    document.body.removeChild(textArea);
  }
  
  // Add enhanced help text with better styling
  const helpText = document.createElement('div');
  helpText.className = 'help-text';
  helpText.innerHTML = '⌨️ Press <kbd>Space</kbd> or <kbd>Enter</kbd> to generate';
  document.body.appendChild(helpText);
  
  // Add CSS for kbd elements
  const style = document.createElement('style');
  style.textContent = `
    .help-text kbd {
      background: rgba(255,255,255,0.2);
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 0.7rem;
      margin: 0 2px;
    }
  `;
  document.head.appendChild(style);
  
  // Enhanced hide animation
  setTimeout(() => {
    helpText.style.opacity = '0';
    helpText.style.transform = 'translateY(10px)';
    setTimeout(() => helpText.remove(), 500);
  }, 6000);
});

// Add some fun console messages
console.log('🎩 NYT Wedding Announcer loaded successfully!');
console.log('💼 Featuring 135+ prestigious careers and fake elite universities');
console.log('🎓 Including Rhodes Scholars, Harvard Law graduates, and Goldman Sachs partners');
console.log('🦷 Smart title matching: DDS for dentists, Dr. for physicians and PhDs');
console.log('🎨 Powered by RiTa.js with narrative-aware titles and matching content');
console.log('📖 Each title drives specific story elements and meeting contexts');
console.log('💍 Press Space or Enter to generate, or click the button');