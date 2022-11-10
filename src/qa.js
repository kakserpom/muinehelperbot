import { createReadStream } from 'fs'
import csv from 'csv-parser'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class QA {

    constructor() {
    }

    async importFromFile() {
        createReadStream('data/questions.csv')
            .pipe(csv())
            .on('data', async data => {
                await prisma.qa.create({ data })
            })
            .on('end', () => {
            });
    }

    async search(text) {
        return await prisma.qa.findMany({
            where: {
                keywords: {
                    search: text.replace(/"/g, '')
                        .split(/\s+/)
                        .map(word => '"' + word + '"')
                        .join(' | '),
                },
            },
        })
    }
}