'use client'

import React from 'react'
import { useTranslations } from 'use-intl'
import { Link } from '@/i18n/navigation'
import '@/app/components/sidebar.module.css'
import 'simple-icons-font/font/simple-icons.css'
import { Button } from 'react-bootstrap'

const SidebarBlock = ({ title, description, button }: {
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

const SidebarButton = ({ link, type, text }: { link: string, type: string, text: string }) => {
    if (type === 'twitter')
        return (
            <Link className={`button ${type}`} href={link} target="_blank">
                <Button>
                    <i className={`bi bi-${type}`}></i><span>{text}</span>
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
    <hr className="separator" />
)

const Sidebar = () => {
    const t = useTranslations('Sidebar')

    return (
        <aside>
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
                                                 text={t('Buttons.Support.button-text')} />} />
        </aside>
    )
}

export default Sidebar