import Book from '../models/Book.mjs';
import { Op } from 'sequelize';
import sequelize from '../drivers/database.mjs';

async function findAll(req,res){
  try {
    const result = await Book.findAll();
    return res.status(200).json({"state":true,"data":result}) 
   
  } catch (err) {
    return res.status(500).json({"state":false,"error":err.message});
  }
}

async function findById(req,res){
  const {id} = req.params

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({
        "state": false,
        "message": `No se encontró libro con ID ${id}`
      });
    }
    return res.status(200).json({
      "state": true,
      "data": book
    });
  } catch (err) {
    return res.status(500).json({
      "state": false,
      "error": err.message
    });
  }
}

async function save(req,res){
  const book = req.body

  try {
    const result = await Book.create(book);
    return res.status(201).json({"state":true,"data":result});
  } catch (err) {
    return res.status(500).json({"state":false,"error":err.message});
  }
}

async function deleteById(req,res){
  const {id} = req.params

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({
        "state": false,
        "message": `No se encontró libro con ID ${id}`
      });
    }

    await book.destroy();
    return res.status(200).json({
      "state": true,
      "message": `El libro con ID ${id} ha sido eliminado correctamente`,
      "deletedId": id
    });
  } catch (err) {
    return res.status(500).json({
      "state": false,
      "error": err.message
    });
  }
}

async function updateById(req,res){
  const {id} = req.params
  const updatedData = req.body

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({
        "state": false,
        "message": `No se encontró libro con ID ${id}`
      });
    }

    await book.update(updatedData);
    return res.status(200).json({
      "state": true,
      "message": `El libro con ID ${id} ha sido actualizado correctamente`,
      "data": book
    });
  } catch (err) {
    return res.status(500).json({
      "state": false,
      "error": err.message
    });
  }
}

// Busqueda por criterios numericos (año de publicacion)
async function findByYear(req,res){
  const { year, operator } = req.query;

  try {
    let whereCondition = {};
    
    if (operator === 'gt') {
      whereCondition.publicationYear = { [Op.gt]: year };
    } else if (operator === 'lt') {
      whereCondition.publicationYear = { [Op.lt]: year };
    } else if (operator === 'gte') {
      whereCondition.publicationYear = { [Op.gte]: year };
    } else if (operator === 'lte') {
      whereCondition.publicationYear = { [Op.lte]: year };
    } else {
      whereCondition.publicationYear = year;
    }

    const books = await Book.findAll({ where: whereCondition });
    return res.status(200).json({
      "state": true,
      "data": books,
      "count": books.length
    });
  } catch (err) {
    return res.status(500).json({
      "state": false,
      "error": err.message
    });
  }
}

// Busqueda por criterios numericos (numero de paginas)
async function findByPages(req,res){
  const { pages, operator } = req.query;

  try {
    let whereCondition = {};
    
    if (operator === 'gt') {
      whereCondition.pages = { [Op.gt]: pages };
    } else if (operator === 'lt') {
      whereCondition.pages = { [Op.lt]: pages };
    } else if (operator === 'gte') {
      whereCondition.pages = { [Op.gte]: pages };
    } else if (operator === 'lte') {
      whereCondition.pages = { [Op.lte]: pages };
    } else {
      whereCondition.pages = pages;
    }

    const books = await Book.findAll({ where: whereCondition });
    return res.status(200).json({
      "state": true,
      "data": books,
      "count": books.length
    });
  } catch (err) {
    return res.status(500).json({
      "state": false,
      "error": err.message
    });
  }
}

// Operaciones agrupadas sobre precio
async function priceStats(req,res){
  try {
    const stats = await Book.aggregate('price', 'sum', {
      plain: false,
      attributes: [
        [sequelize.fn('sum', sequelize.col('price')), 'totalPrice'],
        [sequelize.fn('avg', sequelize.col('price')), 'averagePrice'],
        [sequelize.fn('count', sequelize.col('price')), 'totalBooks'],
        [sequelize.fn('min', sequelize.col('price')), 'minPrice'],
        [sequelize.fn('max', sequelize.col('price')), 'maxPrice']
      ]
    });

    return res.status(200).json({
      "state": true,
      "data": stats[0]
    });
  } catch (err) {
    return res.status(500).json({
      "state": false,
      "error": err.message
    });
  }
}

// Operaciones agrupadas sobre paginas
async function pagesStats(req,res){
  try {
    const stats = await Book.aggregate('pages', 'sum', {
      plain: false,
      attributes: [
        [sequelize.fn('sum', sequelize.col('pages')), 'totalPages'],
        [sequelize.fn('avg', sequelize.col('pages')), 'averagePages'],
        [sequelize.fn('count', sequelize.col('pages')), 'totalBooks'],
        [sequelize.fn('min', sequelize.col('pages')), 'minPages'],
        [sequelize.fn('max', sequelize.col('pages')), 'maxPages']
      ]
    });

    return res.status(200).json({
      "state": true,
      "data": stats[0]
    });
  } catch (err) {
    return res.status(500).json({
      "state": false,
      "error": err.message
    });
  }
}

export{
  findAll,
  findById,
  save,
  deleteById,
  updateById,
  findByYear,
  findByPages,
  priceStats,
  pagesStats
}