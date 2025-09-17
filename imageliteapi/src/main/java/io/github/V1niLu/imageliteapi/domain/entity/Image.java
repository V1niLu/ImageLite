package io.github.V1niLu.imageliteapi.domain.entity;

import io.github.V1niLu.imageliteapi.domain.enums.ImageExtension;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity // Anotação do JPA que indica que essa classe é uma entidade que será mapeada para uma tabela no banco de dados
@Table // Anotação do JPA que indica o nome da tabela no banco de dados
@EntityListeners(AuditingEntityListener.class) // Anotação que habilita o suporte a auditoria para a entidade, permitindo o uso de @CreatedDate
@Data // Anotação do Lombok que gera getters, setters, toString, equals e hashCode automaticamente
@NoArgsConstructor // Anotação do Lombok que gera um construtor sem argumentos
@AllArgsConstructor // Anotação do Lombok que gera um construtor com todos os argumentos
@Builder // Anotação do Lombok que implementa o padrão de projeto Builder para a classe
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID) // Chave primaria gerada automaticamente como UUID
    private String id;

    @Column
    private String name;

    @Column
    private Long size;

    @Column
    @Enumerated(EnumType.STRING) // Indica que o valor do enum será armazenado como String no banco de dados
    private ImageExtension extension; // Enum que representa a extensão do arquivo (JPG, PNG, GIF)

    @Column
    @CreatedDate
    private LocalDateTime uploadDate; // Data e hora do upload da imagem

    @Column
    private String tags;

    @Column
    @Lob //indica que o campo é um Large Object, usado para armazenar grandes quantidades de dados binários ou texto
    private byte[] file; // Arquivo da imagem em bytes


}
