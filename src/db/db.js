import Dexie from 'dexie'

export const db = new Dexie('clips')

db.version(1).stores({
  clips: '++id, createdAt, video',
})
