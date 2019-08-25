const githubRequest = (query) => {
  const url = "https://api.github.com/graphql"
  const headers = {"Authorization": `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`}

  return fetch(url, {
    method: 'POST',
    body: query,
    headers: headers
  })
  .then(res => {return res.json()})
}

export default githubRequest;
