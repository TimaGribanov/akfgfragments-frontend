declare module '*.gql' {
    import { DocumentNode } from 'graphql/language'
    const Schema: DocumentNode

    export default Schema
}