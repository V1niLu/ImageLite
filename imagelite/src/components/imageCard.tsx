interface ImageCardProps {
    nome ?: string
    tamanho ?: string
    dataUpload ?: string
    srcImagem ?: string
}


export const ImageCard: React.FC<ImageCardProps> = ({nome, tamanho, dataUpload, srcImagem} : ImageCardProps) => {
    return(
        <>
            <div className="card relative bg-white rounded-md shadow-md transition-transform ease-in duration-100 hover:shadow-lg hover:-translate-y-2">
                <img className="h-56 w-full object-cover rounded-t-md text-center"
                src={srcImagem}
                alt=""/>
                <div className="card-body p-4 pb-10">
                    <h5 className="text-xl font-semibold mb-2 text-gray-600 text-center">{nome}</h5>
                    <p className="text-gray-600 float-left">{tamanho}</p>
                    <p className="text-gray-600 float-right">{dataUpload}</p>
                </div>
            </div>
        
        </>
    )
}