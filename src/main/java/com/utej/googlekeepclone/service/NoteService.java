package com.utej.googlekeepclone.service;

import com.utej.googlekeepclone.model.Note;
import com.utej.googlekeepclone.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {
    private final NoteRepository noteRepository;
    @Autowired
    public NoteService(NoteRepository noteRepository){
        this.noteRepository = noteRepository;
    }
    public void addNote(Note note){
        noteRepository.save(note);
    }
    public List<Note> getActiveNotes(String email){
        return noteRepository.findByEmailAndTrashFalse(email);
    }
    public List<Note> getArchiveNotes(String email){
        return noteRepository.findByEmailAndArchiveTrueAndTrashFalse(email);
    }
    public List<Note> getTrashNotes(String email){
        return noteRepository.findByEmailAndTrashTrue(email);
    }
    public void archiveNote(String email, String content){
        Note note = noteRepository.findByEmail(email).stream()
                .filter(n->n.getContent().equals(content))
                .findFirst()
                .orElseThrow(()->new RuntimeException("Note not found"));
        note.setArchive(true);
        noteRepository.save(note);
    }
    public void unarchiveNote(String email, String content){
        Note note = noteRepository.findByEmail(email).stream()
                .filter(n->n.getContent().equals(content))
                .findFirst()
                .orElseThrow(()->new RuntimeException("Note not found"));
        note.setArchive(false);
        noteRepository.save(note);
    }
    public void trashNote(String email, String content){
        Note note = noteRepository.findByEmail(email).stream()
                .filter(n->n.getContent().equals(content))
                .findFirst()
                .orElseThrow(()->new RuntimeException("Note not found"));
        note.setTrash(true);
        noteRepository.save(note);
    }
    public void deleteNote(String email, String content){
        Note note = noteRepository.findByEmail(email).stream()
                .filter(n->n.getContent().equals(content))
                .findFirst()
                .orElseThrow(()->new RuntimeException("Note not found"));
        noteRepository.delete(note);
    }
}
