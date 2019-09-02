import React, { useState } from 'react';
import './App.css';
import RepoTile from './RepoTile';
import UserInfo from './UserInfo';
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/react-hooks";

const GET_ORGANIZATION_REPOS = gql`
  query ($organization: String!, $numberOfRepos: Int = 5) {
    organization(login: $organization) {
      login
      url
      repositories(first: $numberOfRepos) {
        nodes {
          name
          url
          id
          viewerHasStarred
        }
      }
    }
  }
`

function App() {
  const [nameState, updateName] = useState('')
  const [numReposState, updateNumRepos] = useState('')
  const [getOrganizationData, { loading, data }] = useLazyQuery(GET_ORGANIZATION_REPOS);

  function onSubmit(event) {
    event.preventDefault()
    let variables = {organization: nameState}
    if(parseInt(numReposState) > 0) variables.numberOfRepos = parseInt(numReposState)
    getOrganizationData({ variables })
    updateName('')
    updateNumRepos('')
  }

  return (
      <div className="App">
        <UserInfo user="gaearon"/>
        <form onSubmit={onSubmit} id="organizationForm">
          <label htmlFor="organization">Organization:</label>
          <input id="organization" value={nameState} onChange={e => updateName(e.target.value)}/>
          <label htmlFor="numRepos">Number of Respositories:</label>
          <input id="numRepos" value={numReposState} type="number" onChange={e => updateNumRepos(e.target.value)}/>
          <button type="submit" value="Submit">Submit</button>
        </form>
        {loading && <h2>Loading...</h2>}
        {data && data.organization && Object.keys(data.organization.repositories).length > 0 &&
          (<React.Fragment>
            <a href={data.organization.url}>{data.organization.login}</a>
            {data.organization.repositories.nodes.map(repoData => <RepoTile key={repoData.id} {...repoData}/>)}
          </ React.Fragment>)
        }
      </div>
  );
}

export default App;
