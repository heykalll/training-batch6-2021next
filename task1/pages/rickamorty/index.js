import React from 'react'
import Link from 'next/link'

function fetchApi({characters}) {
  return <div> 
    <h1>
      <Link href="/">Back To Home</Link>
    </h1>
    {
      characters.map((character) => {
        return (
          <div key={character.id}>
            <p>Name: {character.name}</p>
            <p>Species: {character.species}</p>
            <p>Gender: {character.gender}</p>
            <br></br>
          </div>
        ) 
      })
    }
  </div>
}

export async function getServerSideProps(context) {
  const response = await fetch('https://rickandmortyapi.com/api/character')
  const data = await response.json()

  return {
    props : {
      characters : data.results
    }
  }
}

export default fetchApi