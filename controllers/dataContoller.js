const axiosInstance = require("../lib/axios.js");
const {
  photo: photoModel,
  tag: tagModel,
  searchHistory: searchHistoryModel,
  user: userModel,
} = require("../models");

const {
  validateUsernameAndEmail,
  validateUnsplash,
} = require("../validations/index.js");

const doesUserExist = async (email) => {
  try {
    const checkUserEmail = await userModel.findOne({ where: { email } });
    return !!checkUserEmail; // Return the boolean result
  } catch (error) {
    console.log(error);
    return false; // Return false in case of error
  }
};
const createNewUser = async (req, res) => {
  const errors = validateUsernameAndEmail(req.body);
  if (errors.length > 0) return res.status(400).json({ errors });
  try {
    const { username, email } = req.body;
    const userExists = await doesUserExist(email);
    if (userExists)
      return res
        .status(400)
        .json({
          message: "User email already exists, please use different email.",
        });

    let newUser = await userModel.create({ username, email });
    res.status(201).json({ message: "User Created successfully", newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error in creating an new user" });
  }
};

const searchImages = async (req, res) => {
  const errors = validateUnsplash(req.query);
  if (errors.length > 0) return res.status(400).json({ errors });
  
  try {
    const { query } = req.query;
    const response = await axiosInstance.get(`/search/photos`, {
      params: {
        query,
      },
    });

    // console.log(response.data);  
    const images = response.data.results || [];
    if (images.length === 0) {
      return res.status(404).json({ 
        message: `No Data/Images found for query ${query}`
      });
    }

    const transformedImages = images.map(image => ({
      id: image.id,
      urls: image.urls,
      description: image.description,
      alt_description: image.alt_description,
      user: {
        name: image.user.name,
        username: image.user.username
      }
    }));

    return res.status(200).json({
      query,
      total: images.length,
      data: transformedImages
    });

  } catch (error) {
    console.error('Unsplash API Error:', error.response?.data || error.message);
    return res.status(500).json({ 
      message: "Unable to search images in unsplash" 
    });
  }
};

module.exports = { createNewUser, searchImages };
