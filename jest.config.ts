import path from 'path'
import type { Config } from 'jest'

export default async (): Promise<Config> => {
    return {
        verbose: true,
        preset: 'ts-jest',
        transform: {
            '^.+\\.(ts|tsx)?$': 'ts-jest',
        },
        // moduleNameMapper: {
        //     'src/(.*)': '<rootDir>/src/$1',
        // },
        moduleDirectories: ['node_modules', path.join(__dirname, 'src')],
    }
}
