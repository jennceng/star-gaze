// RepoTile.js
import React from 'react';
import Unstar from './Unstar';
import Star from './Star';
export default function RepoTile ({url, name, id, viewerHasStarred }) {
  return(
    <div>
      <a href={url}>{name}</a>
      {viewerHasStarred ? <Unstar /> : <Star />}
    </div>
  )
}
