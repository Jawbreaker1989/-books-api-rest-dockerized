import express from 'express'

const routes = new express.Router()

import {
  findAll,
  findById,
  save,
  deleteById,
  updateById,
  findByYear,
  findByPages,
  priceStats,
  pagesStats
} from './../controllers/index.mjs'

// Rutas CRUD basicas
routes.get('/',findAll)
routes.get('/:id',findById)
routes.post('/',save)
routes.delete('/:id',deleteById)
routes.put('/:id',updateById)

// Rutas para busquedas por criterios numericos
routes.get('/search/year',findByYear)
routes.get('/search/pages',findByPages)

// Rutas para operaciones agrupadas
routes.get('/stats/price',priceStats)
routes.get('/stats/pages',pagesStats)

export default routes