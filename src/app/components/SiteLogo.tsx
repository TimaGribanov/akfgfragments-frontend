'use client'

/**
 * A component for rendering static icons in Next.js apps.
 *
 * Usage:
 * ```tsx
 * import myIcon from './myIcon.svg';
 *
 * // Render with current text color
 * <Icon src={myIcon} width={32} height={32} />
 *
 * // Render with original icon colors
 * <Icon src={myIcon} nofill width={32} height={32} />
 * ```
 */
import { type ComponentProps } from 'react'
import Image, { type StaticImageData } from 'next/image'

type IconProps = Omit<ComponentProps<typeof Image>, 'src'> & {
    /* Icon path and dimensions */
    src: StaticImageData;
    /* Disables filling with the current color and renders the original icon colors */
    nofill?: boolean;
}

const EMPTY_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E`

export default function SiteLogo({ src, nofill, width, height, alt, style, ...props }: IconProps) {
    const mainSrc = nofill ? src.src : EMPTY_SVG
    width = width ? width : src.width
    height = height ? height : src.height
    alt = alt ? alt : 'Site Logo'

    style = nofill
        ? style
        : {
            ...style,
            backgroundColor: `currentcolor`,
            mask: `url("${src.src}") no-repeat center / contain`,
        }

    return <Image src={mainSrc} width={width} height={height} alt={alt} style={style} {...props} />
}