package com.utej.googlekeepclone.repository;

import com.utej.googlekeepclone.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByEmail(String email);
    List<Note> findByEmailAndTrashFalse(String email);
    List<Note> findByEmailAndArchiveTrueAndTrashFalse(String email);
    List<Note> findByEmailAndTrashTrue(String email);
}
