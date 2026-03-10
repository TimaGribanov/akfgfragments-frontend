import Feed from '@/app/components/Feed'

const Main = ({ locale }: { locale: string }) => {
    return (
        <main className="w-3/4">
            <Feed locale={locale} />
        </main>
    )
}

export default Main