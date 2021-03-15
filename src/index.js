const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository) // inserted by leocairos
  return response.json(repository); //fixed by leocairos
  //return response.status(204).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  //const updatedRepository = request.body;  //fixed by leocairos
  const {title, url, techs} = request.body;
  
  //repositoryIndex = repositories.findindex(repository => repository.id === id); //fixed by leocairos

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  //update by leocairos
  const updatedRepository = { };

  if (title) updatedRepository.title = title;
  if (url) updatedRepository.url = url;
  if (techs) updatedRepository.techs = techs;
  //update by leocairos
  
  const repository = { ...repositories[repositoryIndex], ...updatedRepository };  
  
  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  //if (repositoryIndex > 0) { //fixed by leocairos
  if (repositoryIndex < 0) { 
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();  
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  //const likes = ++repositories[repositoryIndex].likes; // fixed by leocairos
  repositories[repositoryIndex].likes++;  

  //return response.json('likes');
  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
