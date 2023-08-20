

export function goFetchAuthOrReg(url, email, password){
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
}

export async function getNotes() {
  const idToken = localStorage.getItem('token')
  const url = `https://my-proj-5217b-default-rtdb.firebaseio.com/posts.json?auth=${idToken}`
  return await fetch(url)
    .then(resp => {
      if (!resp.ok) {
        const message = 'Error: ' + resp.status
        throw new Error(message)
      }
      return resp
    })
    .catch(err => console.log(err))
    .then(res => res.json())
}


export async function setPost(body) {
  const url = 'https://my-proj-5217b-default-rtdb.firebaseio.com/posts.json'
  return await fetch(url, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}


