# Sección de Comentarios Interactiva – Proyecto Frontend

Implementación frontend del reto "Sección de Comentarios Interactiva" de [Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9).

## 📌 Descripción del Proyecto
Este proyecto replica una sección de comentarios interactiva con funcionalidades como responder, editar, eliminar y votar comentarios. Se centra en la lógica de interfaz y experiencia de usuario, gestionando el estado localmente por ahora.

## 🛠️ Tech Stack
- React + TypeScript
- Tailwind CSS
- Zustand (gestión de estado)
- Vite (entorno de desarrollo)

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

## 📦 Instalación
- [git clone https://github.com/tuusuario/interactive-comments.git](https://github.com/iratxebl92/interactive-comments.git)
- cd interactive-comments
- cd client
- npm install
- npm run dev
