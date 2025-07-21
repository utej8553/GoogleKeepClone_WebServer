package com.utej.googlekeepclone.model;

import jakarta.persistence.*;
@Entity
@Table(name = "notes")
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private String email;
    private boolean archive;
    private boolean trash;
    public Note(){}
    public Note(String content, String email){
        this.content = content;
        this.email = email;
        this.archive = false;
        this.trash = false;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public boolean isArchive() {
        return archive;
    }
    public void setArchive(boolean archive) {
        this.archive = archive;
    }
    public boolean isTrash() {
        return trash;
    }
    public void setTrash(boolean trash) {
        this.trash = trash;
    }
}
