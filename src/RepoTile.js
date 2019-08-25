import React, { useState } from 'react';
import { addStar, removeStar } from './queries';

export default function RepoTile ({url, name, id, viewerHasStarred }) {
  const [starred, updateStarred] = useState(viewerHasStarred)

  async function starRepo() {
    const { data } = await addStar(id)
    console.log(data)
    updateStarred(data.addStar.starrable.viewerHasStarred)
  }

  async function unstarRepo() {
    const { data } = await removeStar(id)
    updateStarred(data.removeStar.starrable.viewerHasStarred)
  }

  return(
    <div>
      <a href={url}>{name}</a>
      {starred ?
      (<button onClick={unstarRepo}>Unstar <span role="img" aria-label="empty star">⭐</span></button>) : (<button onClick={starRepo}> Star <span role="img" aria-label="empty star">☆</span></button>)}
    </div>
  )
}
