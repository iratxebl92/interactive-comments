# Interactive Comments Section – Full Stack Project

Full-stack implementation of [Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9)'s **"Interactive Comments Section"** challenge.

## 📌 Project Description

This project replicates an interactive comment section with features like replying, editing, deleting, and upvoting/downvoting comments. Unlike the original challenge (frontend-only), this version includes a full backend for data persistence, authentication, and user management.

## 🛠️ Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (Sequelize)

## 🚀 Features

- ✅ Display comments and replies
- ✅ Add new comments
- ✅ Reply to existing comments
- ✅ Edit and delete own comments
- ✅ Upvote and downvote comments
- ✅ User authentication
- ✅ Persistent data (DB)


## 📦 Getting Started

### Prerequisites

- Node.js
- PostgreSQL


# Reglas de Interacción - Interactive Comments Project

## ✅ Likes y votos
- Un usuario no puede dar like/voto positivo más de una vez.
- Si ya votó positivo y hace clic en negativo, se cambia el voto.
- Un usuario puede revertir su voto (quitarlo).

## 🗑️ Eliminar comentarios
- Solo puedes eliminar tu propio comentario.
- Debe aparecer un modal de confirmación antes de borrar.

## ✏️ Editar comentarios
- Solo puedes editar tu propio comentario.
- Al hacer clic en "Edit", cambia a un textarea editable.
- Botón "Update" reemplaza al comentario original.

## 🧵 Responder a un comentario
- Al hacer clic en "Reply", se abre un formulario debajo.
- El comentario de respuesta debe incluir `@username`.

## 🕵️‍♂️ Permisos
- El usuario actual puede: votar, responder, editar y borrar solo sus comentarios.
