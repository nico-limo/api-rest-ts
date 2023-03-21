import express from 'express'
import * as diaryServices from '../services/diaryServices'
import toNewDiaryEntry from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(diaryServices.getEntriesWithoutSensitiveInfo())
})
router.get('/:id', (req, res) => {
  const diary = diaryServices.findById(Number(req.params.id))
  if (diary) return res.send(diary)
  return res.sendStatus(404)
})
router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body)

    const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry)
    res.json(addedDiaryEntry)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message)
    } else {
      res.status(400).send('Unknow Error')
    }
  }
})

export default router
