// RepoTile.js
import React from 'react';

export default function RepoTile ({url, name, id, viewerHasStarred }) {
  return(
    <div>
      <a href={url}>{name}</a>
      {viewerHasStarred ?
      (<button><span role="img" aria-label="empty star">⭐</span></button>) : (<button ><span role="img" aria-label="empty star">☆</span></button>)}
    </div>
  )
}
