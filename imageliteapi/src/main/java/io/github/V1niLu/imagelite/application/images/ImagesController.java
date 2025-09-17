package io.github.V1niLu.imagelite.application.images;

import io.github.V1niLu.imageliteapi.domain.entity.Image;
import io.github.V1niLu.imageliteapi.domain.enums.ImageExtension;
import io.github.V1niLu.imageliteapi.domain.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/v1/images")
@Slf4j // Anotação do Lombok para adicionar um logger à classe
@RequiredArgsConstructor // Gera um construtor com argumentos para todos os campos finais não inicializados
public class ImagesController {

    public final ImageService service;

    //ResponseEntity é uma classe do Spring que representa uma resposta HTTP, incluindo status, headers e body
    //MultipartFile é uma interface do Spring que representa um arquivo enviado em uma requisição HTTP multipart/form-data
    @PostMapping
    public ResponseEntity save(
            @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name,
            @RequestParam("tags") List<String> tags
    ) throws IOException {
        log.info("Imagem recebida: : name: " + file.getOriginalFilename() + " size:  " + file.getSize());
        log.info("Content type: " + file.getContentType());
        log.info("Image type:" + MediaType.valueOf(file.getContentType()));

        Image image = Image.builder()
                .name(name)
                .tags(String.join(",", tags)) // Concatena a lista de tags em uma única String separada por vírgulas
                .size(file.getSize())
                .extension(ImageExtension.valueOf(MediaType.valueOf(file.getContentType())))// Converte o contentType da imagem para ImageExtension
                .file(file.getBytes())// Converte o arquivo para um array de bytes
                .build();

        service.save(image);

        return ResponseEntity.ok().build();
    }

}
