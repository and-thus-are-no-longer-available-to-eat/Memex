import Storex from 'storex'
import { DexieStorageBackend } from 'storex-backend-dexie'
import stemmer from 'memex-stemmer'

import schemaPatcher from './storage/dexie-schema'
import { suggestObjects } from './search/suggest'
import { StorageManager, Dexie } from './types'

export const backend = new DexieStorageBackend({
    stemmer,
    schemaPatcher,
    dbName: 'memex',
    idbImplementation: {
        factory: window.indexedDB,
        range: window['IDBKeyRange'],
    },
})

export const dexieInstance = backend.dexieInstance as Dexie

// Extend storex instance with Memex-specific methods
const instance = new Storex({ backend }) as StorageManager
const oldMethod = instance.collection.bind(instance)
instance.collection = (name: string) => ({
    ...oldMethod(name),
    suggestObjects,
})

instance.deleteDB = window.indexedDB.deleteDatabase

export default instance
