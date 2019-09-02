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

export {
  getRepositories,
}
