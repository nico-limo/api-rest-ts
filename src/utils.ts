/// <reference path="./types.d.ts" />
import { Visibility, Weather } from './enums'
import { NewDiaryEntry } from './types'

const ERROR_MESSAGE = 'Incorrect or missing'

// PARSERS
const parseComment = (commentFromRequest: any): string => {
  if (!isString(commentFromRequest)) throw new Error(`${ERROR_MESSAGE} comment`)
  return commentFromRequest
}

const parseDate = (dateFromRequest: any): string => {
  if (!isString(dateFromRequest) || !isDate(dateFromRequest)) {
    throw new Error(`${ERROR_MESSAGE} date`)
  }
  return dateFromRequest
}

const parseWeather = (weatherFromRequest: any): Weather => {
  if (!isString(weatherFromRequest) || !isWeather(weatherFromRequest)) {
    throw new Error(`${ERROR_MESSAGE} weather`)
  }
  return weatherFromRequest
}

const parseVisibility = (visibilityFromRequest: any): Visibility => {
  if (
    !isString(visibilityFromRequest) ||
    !isVisibility(visibilityFromRequest)
  ) {
    throw new Error(`${ERROR_MESSAGE} visibility`)
  }
  return visibilityFromRequest
}

//CHECKS
const isDate = (date: string) => Boolean(Date.parse(date))

const isString = (string: string) => typeof string === 'string'

const isWeather = (param: any): boolean =>
  Object.values(Weather).includes(param)

const isVisibility = (param: any): boolean =>
  Object.values(Visibility).includes(param)

const toNewDiaryEntry = (object: any): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    comment: parseComment(object.comment),
    date: parseDate(object.date),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility)
  }

  return newEntry
}

export default toNewDiaryEntry
