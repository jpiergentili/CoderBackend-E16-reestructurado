import {fileURLToPath} from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
import { fakerES_MX as faker } from "@faker-js/faker";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

export const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

export const generateProduct = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
        price: faker.number.float({ min: 10, max: 10000, precision: 0.01 }),
        code: faker.database.mongodbObjectId(),
        stock: faker.number.int({ min: 10, max: 100 }),
        thumbnail: faker.image.urlPicsumPhotos()
    }
}