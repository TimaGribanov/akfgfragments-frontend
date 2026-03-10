import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import {LOCALES} from '@/constants'

let client: ApolloClient

const endpoint1 = new HttpLink({uri: process.env.WORDPRESS_API_URL})
const endpoint2 = new HttpLink({uri: process.env.DATA_API_URL})

export function getApolloClient() {
    if (!client)
        client = _createApolloClient()

    return client
}

function _createApolloClient() {
    return new ApolloClient({
        link: ApolloLink.split(
            operation => operation.getContext().apiName === 'wp',
            endpoint1,
            endpoint2
        ),
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