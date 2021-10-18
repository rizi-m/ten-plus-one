import React, { useContext, useEffect } from 'react';
import { UserContext } from 'context/UserContext';
import { logIn } from 'utils/session';
import { useHistory } from 'react-router';
import { Card, Col, Row } from 'antd';

const Movies = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

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

  const movieCards = [
    {
      key: 1,
      title: 'Next movie',
      body: 'Vote for the next movie to watch',
      action: () => history.push('/movies/next'),
    },
    {
      key: 2,
      title: 'Suggest movie',
      body: 'Suggest a movie to add to the list',
      action: () => history.push('/movies/suggest'),
    },
    {
      key: 3,
      title: 'Approve movie',
      body: 'Approve a movie suggestion',
      action: () => history.push('/movies/approve'),
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]}>
        {movieCards.map(({ title, body, action, key }) => (
          <Col lg={8} flex='auto' key={key}>
            <Card hoverable title={title} onClick={action}>
              {body}
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Movies;
