import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const REMOVE_STAR = gql`
  mutation RemoveStar($repoId: ID!) {
    removeStar(input: {starrableId: $repoId}) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`

const Unstar = ({id, updateStarred}) => {
  const [removeStar, { data }] = useMutation(
    REMOVE_STAR,
    { onCompleted(data) { updateStarred(data.removeStar.starrable.viewerHasStarred) }
  })

  return(
    <button onClick={() => removeStar({variables: {repoId: id}})}>
      <span role="img" aria-label="unstar">Unstar ⭐</span>
    </button>
  )
}

export default Unstar
