// Star.js
import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ADD_STAR = gql`
  mutation AddStar($repoId: ID!) {
    addStar(input: {starrableId: $repoId}) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`

const Star = ({id, updateStarred}) => {
  const [addStar, { data }] = useMutation(ADD_STAR, { onCompleted(data) { updateStarred(data.addStar.starrable.viewerHasStarred) }})

  return(
    <button onClick={() => addStar({variables: {repoId: id}})}>
      <span role="img" aria-label="star">Star ☆</span>
    </button>
  )
}

export default Star
