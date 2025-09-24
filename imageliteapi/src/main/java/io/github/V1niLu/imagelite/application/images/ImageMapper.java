package io.github.V1niLu.imagelite.application.images;

import io.github.V1niLu.imageliteapi.domain.entity.Image;
import io.github.V1niLu.imageliteapi.domain.enums.ImageExtension;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Component // Anotação para indicar que esta classe é um componente gerenciado pelo Spring
public class ImageMapper {

    // Método para mapear os dados recebidos (MultipartFile, nome e tags) para uma entidade Image
    public Image mapToImage(MultipartFile file, String name, List<String> tags) throws IOException {

        return Image.builder()
                .name(name)
                .tags(String.join(",", tags)) // Concatena a lista de tags em uma única String separada por vírgulas
                .size(file.getSize())
                .extension(ImageExtension.valueOf(MediaType.valueOf(file.getContentType())))// Converte o contentType da imagem para ImageExtension
                .file(file.getBytes())// Converte o arquivo para um array de bytes
                .build();

    }

    // Método para converter uma entidade Image em um DTO (Data Transfer Object) ImageDTO
    public ImageDTO imageToDTO(Image image, String url){
        return ImageDTO.builder()
                .url(url) // URL da imagem
                .extension(image.getExtension().name()) // Converte enum para String
                .name(image.getName()) // Nome da imagem
                .size(image.getSize()) // Tamanho em bytes
                .uploadDate(image.getUploadDate().toLocalDate()) // Converte LocalDateTime para LocalDate
                .build(); // Retorna o DTO construído
    }

}
