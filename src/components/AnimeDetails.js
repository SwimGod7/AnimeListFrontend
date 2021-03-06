import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'

import { removeParticularAnime,increaseLikesOfAnime,commentAnime } from '../reducers/animeReducer'
import CommentForm from './CommentForm'
import { Button } from '@mui/material'

const AnimeDetails=() => {

  const animeId=useParams().id
  const anime=useSelector(state => state.animes.find(b => b.id===animeId))
  const user=useSelector(state => state.user)
  const dispatch=useDispatch()
  const history=useHistory()

  if(!anime) return null

  const increaseLikesOf=(anime) => {
    dispatch(increaseLikesOfAnime(anime))
  }

  const deleteAnime=() => {
    if (window.confirm(`Do you want to delete ${anime.title}?`)) {
      dispatch(removeParticularAnime(animeId))
      history.push('/')
    }
  }

  const handleComment=(comment) => {
    dispatch(commentAnime( animeId , comment))
  }

  return(
    <div>
      <h4>Animes</h4>
      <div>
        <div style={{ marginTop:'20px' }}>
          <div><h4>{anime.title}</h4></div>
          <div>{anime.author}</div>
          <div>likes {anime.likes} <Button size="small" variant="outlined" sx={{ fontSize:10,padding:'2px 2px' }} color="primary" onClick={() => increaseLikesOf(anime)}>like</Button></div>
          <div>{anime.url}</div>
          {user.username===anime.author?
            <Button size="small" variant="outlined" color="primary" onClick={deleteAnime}>delete</Button>
            :null}
        </div>

        <div style={{ marginTop:'20px' }}>
          <h4>Comments</h4>
          <CommentForm handleComment={handleComment}/>
          <div style={{ marginTop:'20px' }}>
            <ul>
              {anime.comments.length===0 ? null: anime.comments.map((comment) => {
                return(<li key={comment}>{comment}</li>)
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimeDetails