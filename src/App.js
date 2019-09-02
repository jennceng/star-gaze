import React, { useState } from 'react';
import './App.css';
import { getRepositories } from './queries';
import RepoTile from './RepoTile';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './index';

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app 🚀</h2>
    </div>
  </ApolloProvider>
);

function App() {
  const [nameState, updateName] = useState('')
  const [numReposState, updateNumRepos] = useState('')
  const [organizationState, setOrganizationState] = useState({})

  async function onSubmit(event) {
    event.preventDefault()
    const { data } = await getRepositories(nameState, parseInt(numReposState))
    setOrganizationState(data.organization)
    updateName('')
    updateNumRepos('')
  }

  return (
      <div className="App">
        <form onSubmit={onSubmit} id="organizationForm">
          <label htmlFor="organization">Organization:</label>
          <input id="organization" value={nameState} onChange={e => updateName(e.target.value)}/>
          <label htmlFor="numRepos">Number of Respositories:</label>
          <input id="numRepos" value={numReposState} type="number" onChange={e => updateNumRepos(e.target.value)}/>
          <button type="submit" value="Submit">Submit</button>
        </form>
        {Object.keys(organizationState).length > 0 &&
          (<React.Fragment>
            <a href={organizationState.url}>{organizationState.login}</a>
            {organizationState.repositories.nodes.map(repoData => <RepoTile key={repoData.id} {...repoData}/>)}
          </ React.Fragment>)
        }
      </div>
  );
// }

export default App;
