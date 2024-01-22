import express from 'express'

import { routes } from '../../main/routes'

export const app = express()

app.use(express.json())
app.use(routes)

app.listen(3000, () => console.log("Servidor Iniciado com Sucesso!"))