package hr.fer.progi.posterized.dao;

import hr.fer.progi.posterized.domain.Fotografija;
import hr.fer.progi.posterized.domain.Konferencija;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FotografijaRepository extends JpaRepository<Fotografija,Long> {
    List<Fotografija> findAllByKonferencija(Konferencija konf);
}
