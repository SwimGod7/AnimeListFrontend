import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ListItem, Divider, List } from '@mui/material'
import { Link } from 'react-router-dom'

const User=() => {
  const userId=useParams().id
  const user=useSelector(state => state.users.find(u => u.id===userId))
  if(!user) return null
  return(
    <div>
      <h4>{user.name}</h4>
      <h4>added {user.animes.length===0?0:null} animes</h4>
      <List>
        {user.animes.map(anime =>
          <div key={anime.id}>
            <ListItem key={anime.id}>
              <Link to={`/animes/${anime.id}`}>{anime.title}</Link>
            </ListItem>
            <Divider />
          </div>
        )}
      </List>
    </div>

  )
}

export default User