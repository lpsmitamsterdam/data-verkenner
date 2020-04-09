import { createSelector } from 'reselect'
import { REDUCER_KEY } from './constants'

export const getFiles = (state) => state[REDUCER_KEY]
export const getFileName = createSelector(getFiles, (files) => files && files.fileName)
export const getFileUrl = createSelector(getFiles, (files) => files && files.fileUrl)
