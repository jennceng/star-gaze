import githubRequest from './githubRequest';

const getRepositories = (organization, numberOfRepos) => {
    const query = `
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
    let requestBody = {query: query}
    requestBody.variables = {organization: organization}
    if(numberOfRepos > 0) requestBody.variables.numberOfRepos = numberOfRepos
    return githubRequest(JSON.stringify(requestBody))
}

const addStar = (repoId) => {
  const mutation = `
      mutation AddStar($repoId: ID!) {
        addStar(input: {starrableId: $repoId}) {
        starrable {
          id
          viewerHasStarred
        }
      }
    }
  `
  let requestBody = {query: mutation, variables: {repoId}}
  return githubRequest(JSON.stringify(requestBody))
}

const removeStar = (repoId) => {
  const mutation = `
    mutation removeStar($repoId: ID!) {
      removeStar(input: {starrableId: $repoId}) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
  `
  let requestBody = {query: mutation, variables: {repoId}}
  return githubRequest(JSON.stringify(requestBody))
}

export {
  getRepositories,
  addStar,
  removeStar
}
