document.addEventListener("DOMContentLoaded", () => {
    const commentForm = document.querySelector("form");
    const commentList = document.getElementById("comment-list");
    const currentGameElement = document.querySelector("main");
  
    if (!currentGameElement || !commentForm || !commentList) {
      console.error("Required elements are missing on this page.");
      return;
    }
  
    const currentGame = currentGameElement.getAttribute("data-game");
    console.log("Current Game:", currentGame);
  
    const clonedForm = commentForm.cloneNode(true);
    commentForm.replaceWith(clonedForm);
  

    clonedForm.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("Form submission started");
  
      const name = document.getElementById("name").value.trim();
      const comment = document.getElementById("comment").value.trim();
      console.log("Name:", name, "Comment:", comment);
  
      if (name === "" || comment === "") {
        console.log("Validation failed: Both name and comment are required.");
        alert("Both name and comment are required!");
        return;
      }
  
      saveComment(name, comment); 
      loadComments();
      clonedForm.reset();
      console.log("Form submission completed");
    });
  
    function loadComments() {
      const allComments = JSON.parse(localStorage.getItem("comments")) || {};
      const gameComments = allComments[currentGame] || [];
      commentList.innerHTML = ""; // Clear the current comment list
  
      if (gameComments.length === 0) {
        commentList.innerHTML = "<p>No comments yet.</p>";
      } else {
        gameComments.forEach((comment) => {
          const commentDiv = document.createElement("div");
          commentDiv.classList.add("comment");
  
          const nameElement = document.createElement("strong");
          nameElement.textContent = comment.name;
  
          const textElement = document.createElement("p");
          textElement.textContent = comment.text;
  
          const separator = document.createElement("hr");
  
          commentDiv.appendChild(nameElement);
          commentDiv.appendChild(textElement);
          commentDiv.appendChild(separator);
  
          commentList.appendChild(commentDiv);
        });
      }
    }
  
    function saveComment(name, text) {
      const allComments = JSON.parse(localStorage.getItem("comments")) || {};
      const gameComments = allComments[currentGame] || [];
      gameComments.push({ name, text });
      allComments[currentGame] = gameComments;
      console.log("Saved Comments:", allComments);
      localStorage.setItem("comments", JSON.stringify(allComments));
    }

    loadComments();
  });
  