package io.github.V1niLu.imagelite.application.images;

import io.github.V1niLu.imageliteapi.domain.entity.Image;
import io.github.V1niLu.imageliteapi.domain.service.ImageService;
import io.github.V1niLu.imageliteapi.infra.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor // Gera um construtor com argumentos para todos os campos finais não inicializados
public class ImageServiceImplementation implements ImageService {

    public final ImageRepository repository;

    @Override // Sobrescreve o método save da interface ImageService
    @Transactional // Anotação que indica que o método deve ser executado dentro de uma transação
    public Image save(Image image) {
        return repository.save(image); // Salva a imagem no banco de dados e retorna a entidade salva
    }

    @Override
    public Optional<Image> getById(String id) {
        return repository.findById(id); // Retorna uma imagem opcional com base no ID fornecido
    }
}
