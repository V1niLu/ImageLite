"use client" // Indica que este é um componente cliente

import { Template, ImageCard } from "@/components"
import { useState, useEffect} from "react"
import { useImageService } from "@/resouces/image/image.service"
import { Image } from "@/resouces/image/image.resource"

export default function GaleriaPage(){

    const useSerice = useImageService() // hook para usar o serviço de imagens
    const [image, setImages] = useState<Image[]>([]) // estado para armazenar as imagens
    const [query, setQuery] = useState<string>("") // estado para armazenar a query de busca
    const [extension, setExtension] = useState<string>("") // estado para armazenar a extensão de arquivo

    async function buscarImages(){
        const result = await useSerice.buscar(query, extension) // busca as imagens do backend
        setImages(result) // atualiza o estado com as imagens buscadas
        //console.table(result)
        console.log(query, extension)
    }

    useEffect(() => {
        (async () => {
            await buscarImages();
        })();
    }, []);

    function renderImageCard(image: Image){
        return(
            <ImageCard
                key = {image.url}
                nome={image.name}
                tamanho={image.size}
                extension={image.extension}
                dataUpload={image.uploadDate}
                srcImagem={image.url}
            />    
        )
    }

    function renderImageCards(){
        return image.map(renderImageCard)
    }
    

    return (

        <Template>

            <section className="flex flex-col items-center justify-center my-5">
                <div className="flex space-x-4">
                    <input onChange={event => setQuery(event.target.value)} // atualiza o estado da query ao digitar 
                        type="text" className="border px-3 py-2 rounded-lg text-gray-900" />
                    <select onChange={event => setExtension(event.target.value)}
                        className="border px-4 py-2 rounded-lg text-gray-900" name="" id="">
                        <option value="">All formats</option>
                        <option value="JPEG">JPEG</option>
                        <option value="PNG">PNG</option>
                        <option value="GIF">GIF</option>
                    </select>
                    <button onClick={buscarImages} className="bg-blue-900 px-4 py-4 rounded-lg text-white hover:bg-blue-500 cursor-pointer">Search</button>
                    <button className="bg-yellow-500 px-4 py-4 rounded-lg text-white hover:bg-yellow-700 cursor-pointer">Add image</button>
                </div>
            </section>

            <section className="grid grid-cols-4 gap-8">
                {renderImageCards()}
            </section>
        </Template>
        

    )
}

