package io.github.V1niLu.imageliteapi.infra.repository;

import io.github.V1niLu.imageliteapi.domain.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

// Interface que estende JpaRepository para fornecer operações CRUD para a entidade Image
// JpaRepository<Image, String> indica que a entidade gerenciada é Image e o tipo da chave primária é String
public interface ImageRepository extends JpaRepository<Image, String> {



}
