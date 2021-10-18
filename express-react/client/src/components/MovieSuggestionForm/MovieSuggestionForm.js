import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

const { TextArea } = Input;

const MovieSuggestionForm = ({ movieSuggestion, onSubmit }) => {
  // setup
  const [form] = Form.useForm();

  useEffect(() => {
    if (movieSuggestion) {
      form.setFieldsValue(movieSuggestion);
    }
  });

  const onFinish = (formData) => {
    const listify = (data) => {
      if (!(data instanceof Array)) {
        return data.split(',').map((e) => e.trim());
      }
      return data;
    };

    const { actors, genres } = formData;
    formData.actors = listify(actors);
    formData.genres = listify(genres);

    onSubmit(formData);
  };

  return (
    <>
      <Form
        name='movie-suggestion'
        form={form}
        onFinish={onFinish}
        layout='vertical'
      >
        <Form.Item
          label='Title'
          name='title'
          validateTrigger='onSubmit'
          rules={[{ required: true }]}
        >
          <Input placeholder='Name of the movie' />
        </Form.Item>
        <Form.Item
          label='Year'
          name='release_year'
          validateTrigger='onSubmit'
          rules={[{ required: true }]}
        >
          <Input placeholder='Release year' />
        </Form.Item>
        <Form.Item
          label='Age Rating'
          name='age_rating'
          validateTrigger='onSubmit'
          rules={[{ required: true }]}
        >
          <Input placeholder='Age rating to see the movie' />
        </Form.Item>
        <Form.Item
          label='Duration'
          name='duration'
          validateTrigger='onSubmit'
          rules={[{ required: true }]}
        >
          <Input placeholder='<X>h <XX>m' />
        </Form.Item>
        {/* TODO: Add multi select for genres */}
        <Form.Item
          label='Genres'
          name='genres'
          validateTrigger='onSubmit'
          rules={[{ required: true }]}
        >
          <Input placeholder='Genres separated with a comma' />
        </Form.Item>
        <Form.Item
          label='Description'
          name='description'
          validateTrigger='onSubmit'
          rules={[{ required: true }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          label='Director(s)'
          name='directors'
          validateTrigger='onSubmit'
          rules={[{ required: true }]}
        >
          <Input placeholder='Director(s) of the movie separated with a comma' />
        </Form.Item>
        {/* TODO: Add multi select for actors */}
        <Form.Item
          label='Actors'
          name='actors'
          validateTrigger='onSubmit'
          rules={[{ required: true }]}
        >
          <Input placeholder='Actors of the movie separated with a comma' />
        </Form.Item>
        <Form.Item
          label='IMDb URL'
          name='imdb_url'
          rules={[
            {
              validator(_, value) {
                if (
                  !value ||
                  // perfect url :) https://www.urlregex.com/
                  // eslint-disable-next-line no-useless-escape
                  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(
                    value
                  )
                ) {
                  return Promise.resolve();
                }
                return Promise.reject('IMdb field must be a URL');
              },
            },
          ]}
        >
          <Input placeholder='YouTube video link of the movie trailer' />
        </Form.Item>
        <Form.Item
          label='YouTube trailer URL'
          name='trailer_url'
          validateTrigger='onSubmit'
          rules={[
            { required: true },
            {
              validator(_, value) {
                if (
                  // perfect url :) https://www.urlregex.com/
                  // eslint-disable-next-line no-useless-escape
                  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(
                    value
                  )
                ) {
                  return Promise.resolve();
                }
                return Promise.reject('YouTube field must be a URL');
              },
            },
          ]}
        >
          <Input placeholder='YouTube video link of the movie trailer' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Suggest!
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

MovieSuggestionForm.propTypes = {
  movieSuggestion: PropTypes.object,
  onSubmit: PropTypes.func,
};

MovieSuggestionForm.defaultProps = {
  movieSuggestion: {},
};

export default MovieSuggestionForm;
