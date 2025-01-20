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

  if(!query.query || query.query.trim() === '') {
    errors.push("Query parameter is requierd, please add it in request.");
  }

  if(!process.env.UNSPLASH_ACCESS) {
    errors.push("Unable to Find Unsplash access key, please add it in env file");
  }

  return errors
}

module.exports = { validateUsernameAndEmail, validateUnsplash };
