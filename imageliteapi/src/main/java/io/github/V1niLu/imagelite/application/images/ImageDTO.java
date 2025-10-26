package io.github.V1niLu.imagelite.application.images;

// DTO (Data Transfer Object) para transferir dados de imagem

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
@Data // Anotação do Lombok que gera getters, setters, toString, equals e hashCode automaticamente
@Builder // Anotação do Lombok que implementa o padrão de projeto Builder para a classe e gera getters, setters, toString, equals e hashCode automaticamente
public class ImageDTO {

    private String url;
    private String name;
    private String extension;
    private Long size;
    @JsonFormat(pattern = "dd-MM-yyyy") // Formata a data no padrão dia-mês-ano
    private LocalDate uploadDate;

}
