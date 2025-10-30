import express from 'express'

import routes from './routes/index.mjs'

const app = new express()

const PORT = 3200

app.use(express.json())

app.use('/api',routes)

app.listen(PORT,()=>console.log(`Server listen at PORT ${PORT}`))