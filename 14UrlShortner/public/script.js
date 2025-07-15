document.getElementById("shorten-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const display = document.getElementById("shortend-url");
  
  // Clear previous messages and show loading state
  display.innerHTML = '<div class="loading">⏳ Processing...</div>';
  
  try {
    // Get form values
    const url = formData.get("url").trim();
    const shortCode = formData.get("shortCode")?.trim(); // Optional chaining
    
    // Basic client-side validation
    if (!url) {
      display.innerHTML = '❌ Please enter a URL to shorten';
      return;
    }
    
    // Step 1: POST to /shorten
    const response = await fetch("/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, shortCode }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to shorten URL');
    }

    const data = await response.json();
    const finalShortCode = data.shortCode;

    // Step 2: GET /links/:shortCode (verification)
    const getResponse = await fetch(`/links/${finalShortCode}`);
    if (!getResponse.ok) {
      const msg = await getResponse.text();
      throw new Error(msg || 'Failed to verify shortened URL');
    }

    const result = await getResponse.json();
    const fullShortUrl = `${window.location.origin}/${finalShortCode}`;

    // Display success message
    display.innerHTML = `
      <div class="success">
        ✅ <strong>Shortened URL:</strong> 
        <a href="${result.url}" target="_blank" rel="noopener noreferrer">
          ${fullShortUrl}
        </a>
      </div>
    `;

    // Reset form
    form.reset();
    
  } catch (error) {
    console.error("❌ Submit error:", error);
    display.innerHTML = `❌ Error: ${error.message}`;
  }
});