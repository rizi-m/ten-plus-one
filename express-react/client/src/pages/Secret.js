import React, { useEffect, useState } from 'react';


const Secret = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    fetch('/api/secret', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res);
      return res.json();
    }).then(user => {
      setUser(user);
    }).catch(err => {
      console.error(err);
    })
  }, []);

  const seeUser = () => {
    console.log(user);
  }

  return (
    <>
      <h1>Secret</h1>
      <p>{JSON.stringify(user, null, 2)}</p>
      <button onClick={seeUser}>See user 2</button>
    </>
  )
}

export default Secret;