package io.github.V1niLu.imageliteapi.infra.repository;

import ch.qos.logback.core.util.StringUtil;
import io.github.V1niLu.imageliteapi.domain.entity.Image;
import io.github.V1niLu.imageliteapi.domain.enums.ImageExtension;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.util.StringUtils;

import java.util.List;

// Interface que estende JpaRepository para fornecer operações CRUD para a entidade Image
// JpaRepository<Image, String> indica que a entidade gerenciada é Image e o tipo da chave primária é String
// JpaSpecificationExecutor<Image> permite a execução de consultas dinâmicas usando especificações
public interface ImageRepository extends JpaRepository<Image, String>, JpaSpecificationExecutor<Image> {

    default List<Image> FindByExtensionAndNameOrTagsLike(ImageExtension extension, String query) {

        Specification<Image> spec = Specification.where(null);

        if (extension != null) {
            Specification<Image> extensionEqual = (root, q, cb) -> cb.equal(root.get("extension"), extension);
            spec = spec.and(extensionEqual);
        }

        if (StringUtils.hasText(query)) {
            Specification<Image> nameLike = (root, q, cb) ->
                    cb.like(cb.upper(root.get("name")), "%" + query.toUpperCase() + "%");

            Specification<Image> tagsLike = (root, q, cb) ->
                    cb.like(cb.upper(root.get("tags")), "%" + query.toUpperCase() + "%");

            Specification<Image> nameOrTagsLike = nameLike.or(tagsLike);

            spec = spec.and(nameOrTagsLike);
        }

        return findAll(spec);
    }


}
