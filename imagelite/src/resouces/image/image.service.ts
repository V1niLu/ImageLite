import { Image } from './image.resource';

class ImageService {

    baseUrl: string = "http://localhost:8080/v1/images"; 
    async buscar(query : string = "", extension : string= "") : Promise<Image[]>{ //busca todas as imagens
        const pesquisaUrl = `${this.baseUrl}?query=${query}&extension=${extension}`
        const response = await fetch(pesquisaUrl); //faz a requisição para o backend
        return await response.json(); //retorna o json convertido para o tipo Image[]
    }

    async salvar(formData: FormData) : Promise<void>{ //salva uma nova imagem
        await fetch(this.baseUrl, { //faz a requisição para o backend
            method: "POST",
            body: formData
        });
    }
}

// react hook
export const useImageService = () => new ImageService();    