import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client'

let client: ApolloClient

export function getApolloClient() {
    if (!client)
        client = _createApolloClient()

    return client
}

function _createApolloClient() {
    return new ApolloClient({
        link: new HttpLink({
            uri: process.env.DATA_API_URL
        }),
        cache: new InMemoryCache()
    })
}