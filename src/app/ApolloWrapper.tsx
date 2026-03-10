'use client'

import { ApolloLink, HttpLink } from '@apollo/client'
import { ApolloNextAppProvider, ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs'
import { LOCALES } from '@/constants'
import React from 'react'

const endpoint1 = new HttpLink({uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL})
const endpoint2 = new HttpLink({uri: process.env.NEXT_PUBLIC_DATA_API_URL})

const cache = new InMemoryCache({
    typePolicies: {
        Language: {
            keyFields: LOCALES.map(entry => entry.code)
        }
    }
})

function makeClient() {
    return new ApolloClient({
        link: ApolloLink.split(
            operation => operation.getContext().apiName === 'wp',
            endpoint1,
            endpoint2
        ),
        cache: cache
    })
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    )
}