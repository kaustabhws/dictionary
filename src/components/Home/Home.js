import React, { useRef, useState } from 'react'
import './Home.css'
import { useMyContext } from '../../Context/MyContext';

const Home = (props) => {

  const audioRef = useRef(null);

  const handleAudioClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    else {
      alert('Audio pronunciation is not available.');
    }
  };

  const { def, wordSearch, setWord, error, errorMessage } = useMyContext();

  if (def.word) {
    return (
      <div className={`home-container ${props.color}`}>
        <div className="dict-container">
          <div className="word-details">
            <div className="basic-info">
              <h2>{def.word}</h2>
              <p>{def.phonetic}</p>
            </div>
            <div className="sound-info" onClick={handleAudioClick}>
              <i className="fa-solid fa-play fa-2x">
                {def.pronunciation ? (
                  <audio ref={audioRef} src={def.pronunciation}></audio>
                ) : null}
              </i>
            </div>
          </div>
          <div className="meaning-details">
            {def.definitions.map((info) => (
              <div className="definitions" key={info.id}>
                <div className="def-header">
                  <h2>{info.partOfSpeech}</h2>
                  <div className="line"></div>
                </div>
                <div className="meaning-info">
                  {info.definitions.map((list) => (
                    <div className="meaning-list" key={list.id}>
                      <ul>
                        <li className='def'>{list.definition}</li>
                        {list.example &&
                          <ul className='example'>
                            <li>{list.example}</li>
                          </ul>
                        }
                      </ul>
                    </div>
                  ))}
                </div>
                {info.synonyms.length > 0 &&
                  <div className="synonym-info">
                    <h3>
                      Synonyms{' '}
                      {info.synonyms.map((synonym) => (
                        <a className='syno' onClick={async () => {
                          await setWord(synonym);
                          wordSearch()
                        }}>
                          {synonym}
                        </a>
                      ))}
                    </h3>
                  </div>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } if (error && errorMessage !== null) {
    return (
      <div className={`home-container ${props.color}`}>
        <div className="notfound">
          <div className="emoji">
            <h2>😒</h2>
          </div>
          <div className="notfound-title">
            <h2>{errorMessage.title}</h2>
          </div>
          <div className="notfound-cont">
            <p>{errorMessage.message}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`home-container ${props.color}`}>
        <div className="notfound">
          <div className="emoji">
            <h2>😁</h2>
          </div>
          <div className="notfound-title">
            <h2>Don't Be Shy</h2>
          </div>
          <div className="notfound-cont">
            <p>Start Typing To Explore</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home