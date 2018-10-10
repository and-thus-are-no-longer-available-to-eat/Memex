import db from '..'
import { transformUrl } from '../pipeline'
import { initErrHandler } from '../storage'

export async function domainHasFavIcon(url: string) {
    const { hostname } = transformUrl(url)

    const res = await db.favIcons.get(hostname).catch(initErrHandler())
    return res != null
}
