import { ToastContainer } from 'react-toastify';

interface TemplateProps {

    children?: React.ReactNode // Conteúdo dinâmico a ser renderizado dentro do template
    loading ?: boolean // Indicador de carregamento

}

export const Template: React.FC<TemplateProps> = ( props: TemplateProps ) => {
    return(
        <>
            <Header />
            
            <div className="container mx-auto mt-8 px-4">
                {props.children}
            </div>

            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}

interface RenderIfProps {
    condition: boolean
    children: React.ReactNode
}

export const RenderIf: React.FC<RenderIfProps> = ( {condition, children} : RenderIfProps) => {
    if(condition){
        return children
    }
    return false
}

const Header: React.FC = () => {
    return(
        <header className="bg-indigo-950 text-white py-3">
        
            <div className="container mx-auto flex justify-between itens-center px-4">
                <h1 className="text-3xl font-bold">Imagelite</h1>

            </div>
        
        </header>
    )
}

const Footer: React.FC = () => {
    return(
        <footer className="bg-indigo-950 text-white py-4 mt-8">
            <div className="container mx-auto text-center">
                Desenvolvido por Lucas Andrade
            </div>

        </footer>
    )
}
