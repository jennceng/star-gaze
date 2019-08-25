const githubRequest = (body) => {
  const url = "https://api.github.com/graphql"
  const headers = {"Authorization": `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`}

  return fetch(url, {
    method: 'POST',
    body: body,
    headers: headers
  })
  .then(res => {return res.json()})
  // .catch(res => console.log(res))
}

export default githubRequest;
