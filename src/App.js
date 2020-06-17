import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'My cool repository',
      url: 'https://github.com/izabela-am/somerandomrepohere',
      techs: ['Node.js', 'ReactJS', 'React Native']
    })

    setRepositories([ ...repositories, response.data ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newAddedRepositories = repositories.filter(
      repository => repository.id !== id
    )

    setRepositories(newAddedRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;