package com.utej.googlekeepclone.controller;

import com.utej.googlekeepclone.model.EmailRequest;
import com.utej.googlekeepclone.model.Note;
import com.utej.googlekeepclone.model.User;
import com.utej.googlekeepclone.service.NoteService;
import com.utej.googlekeepclone.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService userService;
    private final NoteService noteService;
    @Autowired
    public UserController(UserService userService, NoteService noteService){
        this.userService = userService;
        this.noteService = noteService;
    }
    @PostMapping("/signup")
    public String signup(@RequestBody User user){
        boolean success = userService.registerUser(user);
        return success ? "signup successful" : "user already exists";
    }
    @PostMapping("/login")
    public String login(@RequestBody User user){
        boolean success = userService.loginUser(user);
        return success ? "login successful" : "invalid credentials";
    }
    @PostMapping("/notes")
    public String addNote(@RequestBody Note note){
        noteService.addNote(note);
        return "note added";
    }
    @GetMapping("/notes")
    public List<Note> getNotes(@RequestParam String email){
        return noteService.getActiveNotes(email);
    }
    @GetMapping("/notes/archive")
    public List<Note> getArchive(@RequestParam String email){
        return noteService.getArchiveNotes(email);
    }
    @GetMapping("/notes/trash")
    public List<Note> getTrash(@RequestParam String email){
        return noteService.getTrashNotes(email);
    }
    @PostMapping("/archive")
    public ResponseEntity<String> archiveNote(@RequestBody Map<String, String> payload){
        String email = payload.get("email");
        String content = payload.get("content");
        noteService.archiveNote(email, content);
        return ResponseEntity.ok("note archived");
    }
    @PostMapping("/trash")
    public ResponseEntity<String> trashNote(@RequestBody Map<String, String> payload){
        String email = payload.get("email");
        String content = payload.get("content");
        noteService.trashNote(email, content);
        return ResponseEntity.ok("note trashed");
    }
    @PostMapping("/unarchive")
    public ResponseEntity<String> unarchiveNote(@RequestBody Map<String, String> payload){
        String email = payload.get("email");
        String content = payload.get("content");
        noteService.unarchiveNote(email, content);
        return ResponseEntity.ok("note unarchived");
    }
    @PostMapping("/delete")
    public ResponseEntity<String> deleteNote(@RequestBody Map<String, String> payload){
        String email = payload.get("email");
        String content = payload.get("content");
        noteService.deleteNote(email, content);
        return ResponseEntity.ok("note deleted");
    }
    @PostMapping("/deleteAcc")
    public ResponseEntity<String> deleteAcc(@RequestBody EmailRequest request){
        userService.deleteUser(request.getEmail());
        return ResponseEntity.ok("Account deleted");
    }

}
