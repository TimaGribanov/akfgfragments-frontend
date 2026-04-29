import type {NextConfig} from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [new URL('https://test.akfgfragments.com/**')],
    },
    turbopack: {
        rules: {
            '*.gql': {
                loaders: ['graphql-tag/loader'],
                as: "*.js"
            },
            '*.svg': {
                loaders: ['turbopack-inline-svg-loader'],
                as: '*.js'
            }
        },
        resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.gql', '.graphql']
    },
    allowedDevOrigins: ['test.akfgfragments.com', '127.0.0.1']
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
