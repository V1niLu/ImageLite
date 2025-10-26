import { Image } from './image.resource';

class ImageService {

    baseUrl: string = "http://localhost:8080/v1/images"; 
    async buscar() : Promise<Image[]>{ //busca todas as imagens
        const response = await fetch(this.baseUrl); //faz a requisição para o backend
        return await response.json(); //retorna o json convertido para o tipo Image[]
    }
}

// react hook
export const useImageService = () => new ImageService();    