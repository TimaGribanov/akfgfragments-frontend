import Main from '@/app/components/Main'
import Sidebar from '@/app/components/Sidebar'


const MainBlock = ({locale}: { locale: string }) => {
    return (
        <div className="flex">
            <Main locale={locale} />
            <Sidebar />
        </div>
    )
}

export default MainBlock