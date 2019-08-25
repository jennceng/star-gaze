import githubRequest from './githubRequest';

const getRepositories = (organization, numberOfRepos = 5) => {
    const query = `
      {
        organization(login: ${organization}) {
          login
          url
          repositories(first: ${numberOfRepos}) {
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
    return githubRequest(JSON.stringify({"query": query}))
}

const addStar = (repoId) => {
  const mutation = `
    mutation {
      addStar(input: { starrableId: "${repoId}" }) {
        starrable {
          viewerHasStarred
        }
      }
    }
  `
  return githubRequest(JSON.stringify({"query": mutation}))
}

const removeStar = (repoId) => {
  const mutation = `
    mutation {
      removeStar(input: { starrableId: "${repoId}" }) {
        starrable {
          viewerHasStarred
        }
      }
    }
  `
  return githubRequest(JSON.stringify({"query": mutation}))
}

export {
  getRepositories,
  addStar,
  removeStar
}
