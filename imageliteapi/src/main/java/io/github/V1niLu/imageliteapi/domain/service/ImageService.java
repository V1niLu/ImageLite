package io.github.V1niLu.imageliteapi.domain.service;

import io.github.V1niLu.imageliteapi.domain.entity.Image;
import io.github.V1niLu.imageliteapi.domain.enums.ImageExtension;

import java.util.List;
import java.util.Optional;

public interface ImageService {

    Image save(Image image);

    Optional<Image> getById(String id); // Retorna uma imagem opcional com base no ID fornecido

    List<Image> Search(ImageExtension extension, String query);

}
