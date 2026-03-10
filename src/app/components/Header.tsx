'use client'

import { useTranslations } from 'use-intl'
import { LOCALES } from '@/constants'
import { Link, useRouter, usePathname } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { Button, Fieldset, Input, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { MagnifyingGlassIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const Logo = () => (
    <Link id="logo" href="/" className="flex items-center">
        <Image className="block dark:hidden" src="/images/logo.png" alt="Site logo" width={50} height={50} />
        <Image className="hidden dark:block" src="/images/logo-dark.png" alt="Site logo" width={50} height={50} />
        <span className="text-3xl ms-2 leading-none mb-2">akfgfragments</span>
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
        //TODO: do the search
    }

    return (
        <Fieldset className="flex flex-row items-center">
            <Input placeholder="Search..." className="rounded-lg border-2 border-solid p-1" />
            <Button onClick={(event) => searchFunction(event)}>
                <MagnifyingGlassIcon className="size-7 cursor-pointer" />
            </Button>
        </Fieldset>
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
            <Menu>
                <MenuButton
                    className="flex items-center cursor-pointer bg-(--main-colour) dark:bg-(--main-colour-dark)">
                    {LOCALES.filter(lang => lang.code === locale).map(lang => (lang.label))}
                    <ChevronDownIcon className="size-4" />
                </MenuButton>
                <MenuItems transition anchor="bottom end"
                           className="origin-top-right rounded-lg border-2 flow-col gap-3 ms-2 mt-1.5 bg-(--main-colour) dark:bg-(--main-colour-dark)">
                    {LOCALES.map((lang) =>
                        <MenuItem key={lang.code}>
                            <button onClick={() => handleLanguages(lang.code)}
                                    className="block w-full text-left data-focus:bg-(--text-colour) data-focus:text-(--main-colour) dark:data-focus:bg-(--text-colour-dark) dark:data-focus:text-(--main-colour-dark) cursor-pointer p-1.5">
                                {lang.label}
                            </button>
                        </MenuItem>
                    )}
                </MenuItems>
            </Menu>
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
            {theme === "dark" ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
        </button>
    );
}

const Header = () => {
    return (
        <header className="font-nunito">
            <nav
                className="w-full top-0 start-0 p-5 border-b border-b-(--main-colour-dark) dark:border-b-(--main-colour)">
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