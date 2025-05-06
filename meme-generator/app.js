const divOutput = document.getElementById("output");
const form = document.getElementById("form");


form.addEventListener("submit", (event) => {

  // Prevent default and get form values.
  event.preventDefault();
  const imageurl = event.target.imageurl.value;
  const toptext = event.target.toptext.value;
  const bottomtext = event.target.bottomtext.value;

  // Reset the form values after submit event.
  event.target.imageurl.value = "";
  event.target.toptext.value = "";
  event.target.bottomtext.value = "";

  // Use the createMeme function to create meme.
  createMeme(imageurl, toptext, bottomtext);
})


function createMeme(imageurl, toptext, bottomtext) {
  // Create a new div element for the meme.
  const memeDiv = document.createElement("div");
  memeDiv.classList.add("meme-container");

  // Create an image element and set its source.
  const img = document.createElement("img");
  img.src = imageurl;
  img.alt = "Meme Image";

  // Create a span element for the top text.
  const topTextSpan = document.createElement("div");
  topTextSpan.classList.add("top-text");
  topTextSpan.textContent = toptext;

  // Create a span element for the bottom text.
  const bottomTextSpan = document.createElement("div");
  bottomTextSpan.classList.add("bottom-text");
  bottomTextSpan.textContent = bottomtext;

  // Add event listener to the delete button to remove the meme.
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    memeDiv.remove();
  });

  // Append the image, text spans, and delete buttons to the meme div.
  memeDiv.appendChild(img);
  memeDiv.appendChild(topTextSpan);
  memeDiv.appendChild(bottomTextSpan);
  memeDiv.appendChild(deleteButton);

  // Append the meme div to the output div.
  divOutput.appendChild(memeDiv);
}


/*

https://preview.redd.it/digging-through-my-old-photos-and-found-this-so-i-figured-v0-l6k1hwcbfwqb1.jpg?width=320&crop=smart&auto=webp&s=3b0bc049284c9d902bec5e44c764d68573067145

*/