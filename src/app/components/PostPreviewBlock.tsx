'use client'

import { PostPreview } from '@/app/components/Feed'
import Image from 'next/image'
import { parse } from 'node-html-parser'
import { getDateForPrint } from '@/lib/helpers'
import { useTranslations } from 'use-intl'
import '@/app/components/feed.module.css'

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

    const link = node.link.replace('https://test.akfgfragments.com/', '')

    return (
        <article className="container">
            <div className="row">
                <div className="col-4">
                    <a href={link}>
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
                <div className="col-8 ms-2">
                    <a href={link}><h2>{node.title}</h2></a>
                    <p className="date">{date}</p>
                    {
                        //TODO: add a link to the author's page
                    }
                    <p className="author italic">{t('author')}: {node.author.node.name}</p>
                    <p className="excerpt">{excerpt}</p>
                    <p className="more-link italic"><a href={link}>({t('more')})</a></p>
                </div>
            </div>
        </article>
    )
}

export default PostPreviewBlock