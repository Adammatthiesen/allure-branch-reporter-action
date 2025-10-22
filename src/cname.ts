import * as path from 'path'
import * as fs from 'fs/promises'

export const writeCNAMEFile = async (cname: string, ghPagesPath: string) => {
    await fs.writeFile(path.join(ghPagesPath, 'CNAME'), cname)
}

export const shouldWriteCNAMEFile = async (cname: string, ghPagesPath: string) => {
    const cnamePath = path.join(ghPagesPath, 'CNAME')
    try {
        const existingCname = (await fs.readFile(cnamePath)).toString('utf-8').trim()
        return existingCname !== cname
    } catch {
        return true
    }
}

export const cleanupOutdatedCNAMEFile = async (ghPagesPath: string) => {
    const cnamePath = path.join(ghPagesPath, 'CNAME')
    try {
        await fs.unlink(cnamePath)
        return true
    } catch {
        return true
    }
}
