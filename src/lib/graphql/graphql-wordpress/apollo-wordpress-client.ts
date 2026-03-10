import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client'
import {LOCALES} from '@/constants'

let client: ApolloClient

export function getApolloClient() {
    if (!client)
        client = _createApolloClient()

    return client
}

function _createApolloClient() {
    return new ApolloClient({
        link: new HttpLink({
            uri: process.env.WORDPRESS_API_URL
        }),
        cache: cache
    })
}

const cache = new InMemoryCache({
    typePolicies: {
        Language: {
            keyFields: LOCALES.map(entry => entry.code)
        }
    }
})