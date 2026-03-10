'use client'

import { useQuery } from '@apollo/client/react'
import GET_PAGINATED_POSTS from '@/lib/graphql/graphql-wordpress/requests/paginated_posts.gql'
import PostPreviewBlock from '@/app/components/PostPreviewBlock'
import '@/app/components/feed.css'
import React from 'react'

export interface PostPreview {
    node: {
        id: string,
        featuredImage: {
            node: {
                link: string
            }
        },
        title: string,
        date: string,
        author: {
            node: {
                name: string
            }
        },
        tags: {
            nodes: {
                name: string,
                translations: {
                    name: string,
                    language: {
                        code: string
                    }
                }
            }
        },
        excerpt: string,
        link: string,
    }
}

interface FeedData {
    posts: {
        pageInfo: {
            hasNextPage: boolean,
            hasPreviousPage: boolean,
            startCursor: string,
            endCursor: string
        },
        edges: PostPreview[]
    }
}

const updateQuery = (previousResult: FeedData, { fetchMoreResult }: { fetchMoreResult: FeedData }): FeedData => {
    return fetchMoreResult.posts.edges.length ? fetchMoreResult : previousResult
}

const FeedList = (
    {
        data,
        fetchMore,
        locale
    }:
    {
        data: FeedData,
        fetchMore: any,
        locale: string
    }) => {
    const { posts } = data

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone

    return (
        <div className="feed">
            {
                //TODO: proper errors
            }
            {posts && posts.edges ? (
                <div>
                    {posts.edges.map((edge: PostPreview) => {
                        return <PostPreviewBlock key={edge.node.id} post={edge} locale={locale} timezone={tz} />
                    })}
                    <div>
                        {posts.pageInfo.hasPreviousPage ? (
                            <button
                                onClick={() => {
                                    fetchMore({
                                        variables: {
                                            first: null,
                                            last: 10,
                                            before: posts.pageInfo.startCursor || null,
                                            after: null
                                        },
                                        updateQuery
                                    })
                                }}
                            >
                                Previous
                            </button>
                        ) : null}
                        {posts.pageInfo.hasNextPage ? (
                            <button
                                onClick={() => {
                                    fetchMore({
                                        variables: {
                                            first: 10,
                                            last: null,
                                            before: null,
                                            after: posts.pageInfo.endCursor || null
                                        },
                                        updateQuery
                                    })
                                }}
                            >
                                Next
                            </button>
                        ) : null}
                    </div>
                </div>
            ) : (
                <div>No posts were found...</div>
            )}
        </div>
    )
}

const Feed = ({ locale }: { locale: string }) => {
    const variables = {
        first: 10,
        last: null,
        before: null,
        after: null,
        language: locale.toUpperCase()
    }

    const { data, error, loading, fetchMore } = useQuery<FeedData>(GET_PAGINATED_POSTS, {
        variables,
        context: { apiName: 'wp' }
    })

    //TODO: make a proper error
    if (error || data === undefined)
        return <pre>{JSON.stringify(error)}</pre>

    //TODO: make proper loading
    if (loading)
        return <div>Loading...</div>

    return (
        <FeedList data={data} fetchMore={fetchMore} locale={locale} />
    )
}

export default Feed