'use client'

import { PostPreview } from '@/app/components/Feed'
import '@/app/components/feed.css'
import Image from 'next/image'
import { parse } from 'node-html-parser'
import { getDateForPrint } from '@/lib/helpers'
import {useTranslations} from 'use-intl'

const clearExcerpt = (input: string): string => {
    const tmp = parse(input)
    return tmp.textContent || tmp.innerText || ''
}

const PostPreviewBlock = (
    {
        post,
        locale,
        timezone
    }: {
        post: PostPreview,
        locale: string,
        timezone: string
    }) => {
    const t = useTranslations('Feed')

    const { node } = post

    const date = getDateForPrint(node.date, locale, timezone)
    const excerpt = clearExcerpt(node.excerpt)

    return (
        <div className="post flex gap-5">
            <div className="w-1/3">
                <a href={node.link}>
                    {node.featuredImage !== null ?
                    <Image
                        src={node.featuredImage.node.link}
                        alt={node.title}
                        width={300}
                        height={300}
                    />
                    : <div>No image</div>}
                    {
                        //TODO: add a proper block for no image situation
                    }
                </a>
            </div>
            <div className="w-2/3">
                <h2>{node.title}</h2>
                <p className="date">{date}</p>
                {
                    //TODO: add a link to the author's page
                }
                <p className="author">{t('author')}: {node.author.node.name}</p>
                <p className="excerpt">{excerpt}</p>
                <p className="more-link"><a href={node.link}>({t('more')})</a></p>
            </div>

        </div>
    )
}

export default PostPreviewBlock