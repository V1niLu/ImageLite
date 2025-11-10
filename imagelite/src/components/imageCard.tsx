"use client"

interface ImageCardProps {
    nome ?: string
    tamanho ?: number
    dataUpload ?: string
    srcImagem ?: string
    extension ?: string
}


export const ImageCard: React.FC<ImageCardProps> = ({nome, tamanho, dataUpload, srcImagem, extension} : ImageCardProps) => {
    
    function Download(){
        window.open(srcImagem, '_blank'); // Abre a imagem em uma nova aba para download
    }

    function formatBytes(bytes: number = 0, decimals = 2) {
    if (!+bytes) return '0 Bytes'
 
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
 
    const i = Math.floor(Math.log(bytes) / Math.log(k))
 
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

    return(
        <>
            <div className="card relative bg-white rounded-md shadow-md transition-transform ease-in duration-100 hover:shadow-lg hover:-translate-y-2 hover:cursor-pointer">
                <img onClick={Download} className="h-56 w-full object-cover rounded-t-md text-center"
                src={srcImagem}
                alt=""/>
                <div className="card-body p-4 pb-10">
                    <h5 className="text-xl font-semibold mb-2 text-gray-600 text-center">{nome}</h5>
                    <p className="text-gray-600 text-center">{formatBytes(tamanho, 2)}</p>
                    <p className="text-gray-600 text-center">{extension}</p>
                    <p className="text-gray-600 text-center">{dataUpload}</p>
                </div>
            </div>
        
        </>
    )
}

