require("dotenv").config();

function validateUsernameAndEmail(query) {
  let errors = [];

  if (!query || typeof query !== "object") {
    errors.push("Invalid request body");
    return errors;
  }

  if (!query.username || !query.email) {
    errors.push("Both username and email are required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (query.email && !emailRegex.test(query.email)) {
    errors.push("Please enter a valid email format");
  }

  return errors;
}

function validateUnsplash(query) {
  let errors = [];

  if (!query.query || query.query.trim() === "") {
    errors.push("Query parameter is requierd, please add it in request.");
  }

  if (!process.env.UNSPLASH_ACCESS) {
    errors.push(
      "Unable to Find Unsplash access key, please add it in env file"
    );
  }

  return errors;
}

function validateSavePhotos(query) {
  const errors = [];

  if (!query.imageUrl?.startsWith("https://images.unsplash.com/")) {
    errors.push("Invalid image URL. URL must be from Unsplash.");
  }

  if (query.tags) {
    if (query.tags.length > 5) {
      errors.push("You can add only 5 tags to a photo.");
    }

    const invalidTags = query.tags.filter((tag) => tag.length > 20);
    if (invalidTags.length > 0) {
      errors.push("Each tag must not exceed 20 characters in length.");
    }
  }

  return errors;
}

module.exports = {
  validateUsernameAndEmail,
  validateUnsplash,
  validateSavePhotos,
};
