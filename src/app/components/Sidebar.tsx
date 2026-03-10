'use client'

import React from 'react'
import {useTranslations} from 'use-intl'
import {Button} from '@headlessui/react'
import {Link} from '@/i18n/navigation'
import '@/app/components/sidebar.css'
import 'simple-icons-font/font/simple-icons.css'

const SidebarBlock = ({title, description, button}: {
    title: string,
    description: string,
    button: React.ReactElement<Element>
}) => (
    <div className="sidebar-block">
        <h2>{title}</h2>
        <p>{description}</p>
        {button}
    </div>
)

const SidebarButton = ({link, type, text}: { link: string, type: string, text: string }) => {
    if (type === 'twitter')
        return (
            <Link className={`button ${type}`} href={link} target="_blank">
                <Button>
                    <i className="inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-twitter" viewBox="0 0 16 16">
                            <path
                                d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15" />
                        </svg>
                    </i><span>{text}</span>
                </Button>
            </Link>
        )

    return (
        <Link className={`button ${type}`} href={link} target="_blank">
            <Button>
                <i className={`si si-${type}`}></i><span>{text}</span>
            </Button>
        </Link>
    )
}

const SidebarSeparator = () => (
    <hr className="block-separator" />
)

const Sidebar = () => {
    const t = useTranslations('Sidebar')

    return (
        <aside className="w-1/4">
            <SidebarBlock title={t('Buttons.Discord.title')}
                          description={t('Buttons.Discord.description')}
                          button={<SidebarButton link="https://discord.gg/mQJ4TcjM3h" type="discord"
                                                 text={t('Buttons.Discord.button-text')} />} />
            <SidebarSeparator />
            <SidebarBlock title={t('Buttons.Instagram.title')}
                          description={t('Buttons.Instagram.description')}
                          button={<SidebarButton link="https://instagram.com/akfgfragments_com" type="instagram"
                                                 text={t('Buttons.Instagram.button-text')} />} />
            <SidebarSeparator />
            <SidebarBlock title={t('Buttons.Twitter.title')}
                          description={t('Buttons.Twitter.description')}
                          button={<SidebarButton link="https://twitter.com/AkfgfragmentsEn" type="twitter"
                                                 text={t('Buttons.Twitter.button-text')} />} />
            <SidebarSeparator />
            <SidebarBlock title={t('Buttons.Support.title')}
                          description={t('Buttons.Support.description')}
                          button={<SidebarButton link="https://ko-fi.com/H2H417HX4T" type="kofi"
                                                 text={t('Buttons.Support.button-text')}/>} />
        </aside>
    )
}

export default Sidebar