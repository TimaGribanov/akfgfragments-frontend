//TODO: test this date while hosting on the UTC server, if it won't work, create a helper with conversion to UTC and then to timezone
export function getDateForPrint(inputDate: string, locale: string, timezone: string): string {
    return new Date(inputDate).toLocaleString(locale === 'en' ? 'en-GB' : locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: timezone,
    })
}