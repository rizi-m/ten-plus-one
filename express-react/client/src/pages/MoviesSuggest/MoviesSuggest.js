import React, { useContext, useEffect, useMemo, useState } from 'react';
import { UserContext } from 'context/UserContext';
import { logIn } from 'utils/session';
import { useHistory } from 'react-router';
import { Typography, Divider } from 'antd';
import MovieSuggestionIMDbFillForm from 'components/MovieSuggestionIMDbFillForm';
import MovieSuggestionForm from 'components/MovieSuggestionForm';
import { suggestionCheck, suggestMovie } from 'utils/movies';

const { Title } = Typography;

const MoviesSuggest = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const [movieSuggestion, setMovieSuggestion] = useState(null);

  useEffect(() => {
    if (user) return;
    logIn()
      .then((body) => {
        setUser(body);
      })
      .catch((err) => {
        console.error(err);
        history.push('/');
      });
  });

  const loadSuggestion = (formData) => {
    suggestionCheck(formData)
      .then((data) => {
        console.log('From movie suggest', data);
        setMovieSuggestion(data);
      })
      .catch((err) => console.error(err));
  };

  const sendSuggestion = (formData) => {
    console.log('sending suggestion', formData);
    suggestMovie(formData)
      .then((res) => console.log('Successfully suggested movie!', res))
      .catch((err) => console.error('Flopped sending suggestion', err));
  };

  return (
    <>
      <Title>Suggest a movie!</Title>
      <Divider />
      <Title level={2}>Fill form with IMDb</Title>
      <MovieSuggestionIMDbFillForm onSubmit={loadSuggestion} />
      <Divider />
      <Title level={2}>Movie suggestion form</Title>
      <MovieSuggestionForm
        movieSuggestion={movieSuggestion}
        onSubmit={sendSuggestion}
      />
    </>
  );
};

export default MoviesSuggest;
