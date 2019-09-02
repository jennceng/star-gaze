import React from 'react';
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const GET_USER_INFO = gql`
  query($user: String!) {
    user(login: $user) {
      login
      pinnedItems {
        totalCount
      }
    }
  }
`
const UserInfo = () => {
  const user = "gaearon";

  const { loading, error, data } = useQuery(GET_USER_INFO,
    {
      variables: { user },
    }
  );

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error.message}</h2>;
  }
  return(
    <div>
      {data.user.login} has {data.user.pinnedItems.totalCount} pinned items
    </div>
  )
}

export default UserInfo;
