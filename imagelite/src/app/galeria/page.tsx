"use client" // Indica que este é um componente cliente

import { Template, ImageCard } from "@/components"
import { useState, useEffect} from "react"
import { useImageService } from "@/resouces/image/image.service"
import { Image } from "@/resouces/image/image.resource"

export default function GaleriaPage(){

    const useSerice = useImageService() // hook para usar o serviço de imagens
    const [image, setImages] = useState<Image[]>([]) // estado para armazenar as imagens

    async function buscarImages(){
        const result = await useSerice.buscar() // busca as imagens do backend
        setImages(result) // atualiza o estado com as imagens buscadas
        console.table(result)
    }

    useEffect(() => {
        (async () => {
            await buscarImages();
        })();
    }, []);

    function renderImageCard(image: Image){
        return(
            <ImageCard
                nome={image.name}
                tamanho={image.size}
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
                    <input type="text" className="border px-3 py-2 rounded-lg text-gray-900" />
                    <select className="border px-4 py-2 rounded-lg text-gray-900" name="" id="">
                        <option value="">All formats</option>
                    </select>
                    <button className="bg-blue-900 px-4 py-4 rounded-lg text-white">Search</button>
                    <button className="bg-yellow-500 px-4 py-4 rounded-lg text-white">Add image</button>
                </div>
            </section>

            <section className="grid grid-cols-3 gap-8">
                {renderImageCards()}
            </section>
        </Template>
        

    )
}

