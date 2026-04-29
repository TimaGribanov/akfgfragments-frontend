'use client'

import { useQuery } from '@apollo/client/react'
import GET_PAGINATED_POSTS from '@/lib/graphql/graphql-wordpress/requests/paginated_posts.gql'
import PostPreviewBlock from '@/app/components/PostPreviewBlock'
import React from 'react'
import '@/app/components/feed.module.css'

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

const NavButton = ({ onClick, displayText }: {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined,
    displayText: string
}) => (
    <button
        className="border-2 border-(--text-colour) dark:border-(--text-colour-dark) p-2
        hover:bg-(--text-color) hover:text-(--main-colour) dark:hover:bg-(--text-colour-dark)
        dark:hover:text-(--main-colour-dark) hover:cursor-pointer"
        onClick={onClick}
    >
        {displayText}
    </button>
)

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
        <div>
            {
                //TODO: proper errors
            }
            {posts && posts.edges ? (
                <div className="feed">
                    {posts.edges.map((edge: PostPreview) => {
                        return <PostPreviewBlock key={edge.node.id} post={edge} locale={locale} timezone={tz} />
                    })}
                    <div className="navigation">
                        {posts.pageInfo.hasPreviousPage ? (
                            <NavButton
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
                                displayText="Previous"
                            />
                        ) : null}
                        {posts.pageInfo.hasNextPage ? (
                            <NavButton
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
                                displayText="Next"
                            />
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