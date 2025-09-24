package io.github.V1niLu.imagelite.application.images;

import io.github.V1niLu.imageliteapi.domain.entity.Image;
import io.github.V1niLu.imageliteapi.domain.enums.ImageExtension;
import io.github.V1niLu.imageliteapi.domain.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/v1/images")
@Slf4j // Anotação do Lombok para adicionar um logger à classe
@RequiredArgsConstructor // Gera um construtor com argumentos para todos os campos finais não inicializados
public class ImagesController {

    public final ImageService service;
    private final ImageMapper mapper;

    //ResponseEntity é uma classe do Spring que representa uma resposta HTTP, incluindo status, headers e body
    //MultipartFile é uma interface do Spring que representa um arquivo enviado em uma requisição HTTP multipart/form-data
    @PostMapping
    public ResponseEntity save(
            @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name,
            @RequestParam("tags") List<String> tags
    ) throws IOException {


        Image image = mapper.mapToImage(file, name, tags); // Mapeia os dados recebidos para uma entidade Image
        Image savedImage = service.save(image); // Salva a imagem no banco de dados
        URI imageURI = buildImageURL(savedImage); // Constrói a URL da imagem salva

        log.info( "Image saved with ID: {} and URL: {}", savedImage.getId(), imageURI); // Loga a informação de que a imagem foi salva com sucesso
        return ResponseEntity.created(imageURI).build(); // Retorna uma resposta HTTP 201 Created sem corpo
    }

    @GetMapping("{id}") // Endpoint para buscar uma imagem pelo ID
    public ResponseEntity<byte[]> getImage(@PathVariable("id") String id){

        var possibleImage = service.getById(id); // Busca a imagem pelo ID usando o serviço
        if (possibleImage.isEmpty()) {
            return ResponseEntity.notFound().build(); // Retorna 404 Not Found se a imagem não for encontrada
        }

        var image = possibleImage.get(); // Obtém a imagem do Optional
        HttpHeaders header = new HttpHeaders(); // Cria um novo objeto HttpHeaders para definir os cabeçalhos da resposta
        header.setContentType(image.getExtension().getMediaType()); // Define o tipo de conteúdo com base na extensão da imagem
        header.setContentLength(image.getSize()); // Define o tamanho do conteúdo
        header.setContentDispositionFormData("inline", image.getFileName());
        // Define o cabeçalho Content-Disposition para sugerir o nome do arquivo ao baixar

        // retorna nome do arquivo, header criados, status OK
        return new ResponseEntity<>(image.getFile(), header, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity <List<ImageDTO>>search(
            @RequestParam(value = "extension", required = false, defaultValue = "") String extension,
            @RequestParam(value = "query", required = false) String query){

        ImageExtension ext = null;
        if (StringUtils.hasText(extension)) {
            try {
                ext = ImageExtension.valueOf(extension.toUpperCase());
            } catch (IllegalArgumentException e) {
                // aqui você pode ignorar ou lançar um 400 Bad Request
                return ResponseEntity.badRequest().build();
            }
        }
        var result = service.Search(ext, query);
        // Busca as imagens que correspondem aos critérios de pesquisa

        var images = result.stream().map(image -> {
            var url = buildImageURL(image);
            return mapper.imageToDTO(image, url.toString());
        }).collect(Collectors.toList());

        return ResponseEntity.ok(images); // Retorna a lista de ImageDTOs com status 200 OK

    }

    private URI buildImageURL(Image image){

        String imagePath = "/" + image.getId(); // Constrói o caminho da imagem com base no ID
        return ServletUriComponentsBuilder
                .fromCurrentRequest() // Obtém a URL da requisição atual
                .path(imagePath) // Adiciona o caminho da imagem à URL
                .build() // Constrói o URI
                .toUri(); // Constrói a URI completa da imagem
    }
}
