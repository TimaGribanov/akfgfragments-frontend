'use client'

import { useTranslations } from 'use-intl'
import { LOCALES } from '@/constants'
import { Link, useRouter, usePathname } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import SiteLogo from './SiteLogo'
import AkfgfragmentsLogo from '../../../public/images/akfgfragments_logo_wide.svg'
import { Button, Field, Fieldset, Menu } from '@base-ui/react'

const Logo = () => (
    <Link href="/" className="flex items-center">
        <SiteLogo id="logo" src={AkfgfragmentsLogo} nofill={false} alt="Site Logo" height={40} width={200} />
    </Link>
)

const MenuBlock = () => {
    const t = useTranslations('Header.Menu')

    const MENU_ELEMENTS = [
        'discography', 'music-videos', 'lyrics', 'tablatures', 'interviews', 'stuff', 'side-projects', 'the-band'
    ]

    return (
        <ul className="flex flex-row gap-4">
            {MENU_ELEMENTS.map((element, index) =>
                <li key={index}>
                    <Link href={`/${element}`} className="block uppercase text-lg">
                        {t(element)}
                    </Link>
                </li>)}
        </ul>
    )
}

const SearchBar = () => {
    const searchFunction = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        //TODO: do the search, add cursor pointer to the icon
    }

    return (
        <Fieldset.Root>
            <Field.Root>
                <Field.Control placeholder="Search..." />
                <Button onClick={(event) => searchFunction(event)}>
                    <i className="bi bi-search"></i>
                </Button>
            </Field.Root>
        </Fieldset.Root>
    )
}

const LanguagePicker = () => {
    const router = useRouter()
    const pathname = usePathname()
    const locale = useLocale()

    const handleLanguages = (code: string) => {
        router.replace(pathname, { locale: code })
    }

    return (
        <div className="flex items-center border-solid border-2 rounded-lg p-1.5">
            <Menu.Root>
                <Menu.Trigger
                    className="flex items-center cursor-pointer bg-(--main-colour) dark:bg-(--main-colour-dark)">
                    {LOCALES.filter(lang => lang.code === locale).map(lang => (lang.label))}
                    <i className="bi bi-chevron-down"></i>
                </Menu.Trigger>
                <Menu.Portal
                    className="origin-top-right rounded-lg border-2 flow-col gap-3 ms-2 mt-1.5 bg-(--main-colour) dark:bg-(--main-colour-dark)">
                    <Menu.Positioner>
                        <Menu.Popup>
                            {LOCALES.map((lang) =>
                                <Menu.Item key={lang.code}>
                                    <button onClick={() => handleLanguages(lang.code)}
                                            className="block w-full text-left data-focus:bg-(--text-colour) data-focus:text-(--main-colour) dark:data-focus:bg-(--text-colour-dark) dark:data-focus:text-(--main-colour-dark) cursor-pointer p-1.5">
                                        {lang.label}
                                    </button>
                                </Menu.Item>
                            )}
                        </Menu.Popup>
                    </Menu.Positioner>
                </Menu.Portal>
            </Menu.Root>
        </div>
    )
}

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg border-2 border-(--text-colour) dark:border-(--text-colour-dark) hover:bg-(--text-colour) hover:text-(--main-colour) dark:hover:bg-(--text-colour-dark) dark:hover:text-(--main-colour-dark) transition-all cursor-pointer"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? <i className="bi bi-sun"></i> : <i className="bi bi-moon"></i>}
        </button>
    );
}

const Header = () => {
    return (
        <header className="font-nunito m-5 border-2 border-(--main-colour-dark) dark:border-(--main-colour)">
            <nav className="p-5">
                <div className="flex flex-wrap items-center justify-between">
                    <Logo />
                    <MenuBlock />
                    <SearchBar />
                    <LanguagePicker />
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    )
}

export default Header