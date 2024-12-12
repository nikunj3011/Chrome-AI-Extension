document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.local.get(['selectedText'], function(result) {
    if (result.selectedText) {
      var html = result.selectedText;

      // Create a temporary DOM element
      var tempElement = document.createElement("div");
      
      // Set the innerHTML of the temporary element to the provided HTML
      tempElement.innerHTML = html;

      // Remove all <style> and <script> elements
      var elementsToRemove = tempElement.querySelectorAll('style, script');
      elementsToRemove.forEach(el => el.remove());
      
      // Use the textContent property to get the plain text
      var text = tempElement.textContent || tempElement.innerText || "";
      document.getElementById('selectedText').textContent = text;
    }
  });

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.selectedText) {
      var html = message.selectedText;

      // Create a temporary DOM element
      var tempElement = document.createElement("div");
      
      // Set the innerHTML of the temporary element to the provided HTML
      tempElement.innerHTML = html;

      // Remove all <style> and <script> elements
      var elementsToRemove = tempElement.querySelectorAll('style, script');
      elementsToRemove.forEach(el => el.remove());
      
      // Use the textContent property to get the plain text
      var text = tempElement.textContent || tempElement.innerText || "";

      // Display the plain text in the output div
      document.getElementById("selectedText").textContent = text;
      // document.getElementById('selectedText').textContent = message.selectedText;
    }
  });
});
