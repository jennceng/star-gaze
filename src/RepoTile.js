// RepoTile.js
import React, { useState } from 'react';
import Unstar from './Unstar';
import Star from './Star';

export default function RepoTile ({url, name, id, viewerHasStarred }) {
  const [starred, updateStarred] = useState(viewerHasStarred)
  return(
    <div>
      <a href={url}>{name}</a>
      {starred ?
        <Unstar id={id} updateStarred={updateStarred} /> : <Star id={id} updateStarred={updateStarred}/>
      }
    </div>
  )
}
