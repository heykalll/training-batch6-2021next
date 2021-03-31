import React from 'react'

function fetchApi({characters}) {
  return <div> {
    characters.map( character => {
      return (
        <div>
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