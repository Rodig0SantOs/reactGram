const Photo = require("../models/Photo");
const User = require("../models/User");
const mongoose = require("mongoose");

// Insert a photo, with an user related to it
const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  // Create a photo
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  // If photo was created successfully, return data
  if (!newPhoto) {
    res.status(422).json({
      errors: ["Houve um problema, por favor tente novamente mais tarde."],
    });
    return;
  }

  res.status(201).json(newPhoto);
};

// Remove a photo from db
const deletePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  try {
    // Veficar ID é valido antes de consultar
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ errors: ["ID inválido."] });
    }

    const photo = await Photo.findById(id);

    // Check if photo exists
    if (!photo) {
      res.status(404).json({
        errors: ["Foto não encontrada!"],
      });
      return;
    }

    // Check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
      return res
        .status(403)
        .json({ errors: ["Você não tem permissão para excluir essa foto."] });
    }

    await Photo.findByIdAndDelete(photo._id);

    res
      .status(200)
      .json({ id: photo._id, message: "Foto excluida com sucesso" });
  } catch (error) {
    return res.status(404).json({ errors: ["Foto não encontrada."] });
  }
};

// Get all photo
const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

// Get user photos

const getUserPhotos = async (req, res) => {
  const { id } = req.params;

  const photos = await Photo.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

// Get photo by id
const getPhotoById = async (req, res) => {
  const { id } = req.params;

  try {
    // Veficar ID é valido antes de consultar
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ errors: ["ID inválido."] });
    }

    const photo = await Photo.findById(id);

    // Check if photo exists
    if (!photo) {
      res.status(404).json({
        errors: ["Foto não encontrada!"],
      });
      return;
    }

    res.status(200).json(photo);
  } catch (error) {
    return res.status(404).json({ errors: ["Foto não encontrada."] });
  }
};

// Update a photo
const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const reqUser = req.user;

  const photo = await Photo.findById(id);

  // Check if photo exists
  if (!photo) {
    res.status(404).json({
      errors: ["Foto não encontrada!"],
    });
    return;
  }

  // Check if photo belongs to user
  if (!photo.userId.equals(reqUser._id)) {
    return res
      .status(403)
      .json({ errors: ["Você não tem permissão para editar essa foto."] });
  }

  if (title) {
    photo.title = title;
  }

  await photo.save();

  res.status(200).json({ photo, message: "Foto atualizada com sucesso" });
};

// Like Fuctionality
const likePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;
  const photo = await Photo.findById(id);

  // Check if photo exists
  if (!photo) {
    return res.status(404).json({
      errors: ["Foto não encontrada!"],
    });
  }

  // Check if user has already liked the photo
  if (photo.likes.includes(reqUser._id)) {
    return res.status(400).json({
      errors: ["Você já curtiu essa foto!"],
    });
  }

  // Put user id in likes array
  photo.likes.push(reqUser._id);
  await photo.save();

  res.status(200).json({
    photoId: id,
    userId: reqUser._id,
    message: "Foto curtida com sucesso",
  });
};

// Comment functionality
const commentPhoto = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  const reqUser = req.user; // Acessa o usuário autenticado

  const user = await User.findById(reqUser._id);

  const photo = await Photo.findById(id);

  // Check if photo exists
  if (!photo) {
    return res.status(404).json({
      errors: ["Foto não encontrada!"],
    });
  }

  // Put comment in the array comments
  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id,
  };

  photo.comments.push(userComment);

  await photo.save();

  res.status(200).json({
    comment: userComment,
    message: "Comentário adicionado com sucesso",
  });
};

// Seach photo by title
const searchPhotos = async (req, res) => {
  const { q } = req.query;

  const photos = await Photo.find({ title: new RegExp(q, "i") }).exec();

  res.status(200).json(photos);
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
};
