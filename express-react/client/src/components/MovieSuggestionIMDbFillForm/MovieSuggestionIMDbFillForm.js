import React from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

const MovieSuggestionIMDbFillForm = ({ onSubmit }) => {
  // setup
  const [form] = Form.useForm();

  return (
    <>
      <Form
        name='movie-suggestion-imdb'
        form={form}
        onFinish={onSubmit}
        layout='vertical'
      >
        <Form.Item
          label='IMDb URL'
          name='IMDb'
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
                return Promise.reject('IMdb field must be a URL');
              },
            },
          ]}
        >
          <Input placeholder='The IMDb url of the movie' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Fill
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

MovieSuggestionIMDbFillForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default MovieSuggestionIMDbFillForm;
