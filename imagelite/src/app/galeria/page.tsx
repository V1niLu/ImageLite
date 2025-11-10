"use client" // Indica que este é um componente cliente

import { Template, ImageCard, Button, Input, useNotification } from "@/components"
import { useState, useEffect} from "react"
import { useImageService } from "@/resouces/image/image.service"
import { Image } from "@/resouces/image/image.resource"
import Link from "next/link"

export default function GaleriaPage(){

    const useSerice = useImageService() // hook para usar o serviço de imagens
    const [image, setImages] = useState<Image[]>([]) // estado para armazenar as imagens
    const [query, setQuery] = useState<string>("") // estado para armazenar a query de busca
    const [extension, setExtension] = useState<string>("") // estado para armazenar a extensão de arquivo
    const notify = useNotification() // hook para usar as notificações

    async function buscarImages(){
        const result = await useSerice.buscar(query, extension) // busca as imagens do backend
        setImages(result) // atualiza o estado com as imagens buscadas
        //console.table(result)
        console.log(query, extension)
        if(!result.length){
            notify("No result found", "warning")
        }
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
                    <Input onChange={event => setQuery(event.target.value)} placeholder="Digite o Nome ou tags" />
                    <select onChange={event => setExtension(event.target.value)}
                        className="border px-4 py-2 rounded-lg text-gray-900" name="" id="">
                        <option value="">All formats</option>
                        <option value="JPEG">JPEG</option>
                        <option value="PNG">PNG</option>
                        <option value="GIF">GIF</option>
                    </select>
                    <Button color="bg-blue-900" colorHover="hover:bg-blue-500" label="Search" onClick={buscarImages}/>
                    <Link href="/formulario">
                        <button className="bg-yellow-500 px-4 py-4 rounded-lg text-white hover:bg-yellow-700 cursor-pointer">Add image</button>
                    </Link>
                </div>
            </section>

            <section className="grid grid-cols-4 gap-8">
                {renderImageCards()}
            </section>
        </Template>
        

    )
}

