package io.github.V1niLu.imageliteapi.domain.service;

import io.github.V1niLu.imageliteapi.domain.entity.Image;

import java.util.Optional;

public interface ImageService {

    Image save(Image image);

    Optional<Image> getById(String id); // Retorna uma imagem opcional com base no ID fornecido


}
