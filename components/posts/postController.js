import * as postService from './postService.js';
import axios from 'axios';

export const readPostList = async (req, res) => {
  try {
    const page = req.query.page;

    const posts = await postService.readPostList(page);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).send(
      { error: error.message } || {
        error: 'Internal Server Error',
      }
    );
  }
};

export const createPost = async (req, res) => {
  try {
    const currentWeather = await getWeather();

    const { title, content, writer, password } = req.body;

    await postService.createPost({
      title,
      content: content ? content : null,
      writer: writer ? writer : null,
      password,
      currentWeather,
    });
    return res.status(201).json({ message: '게시물 작성 성공' });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).send(
      { error: error.message } || {
        error: 'Internal Server Error',
      }
    );
  }
};

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const password = req.body.password;

    await postService.deletePost(id, password);
    return res.status(200).json({ message: '게시물 삭제 성공' });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).send(
      { error: error.message } || {
        error: 'Internal Server Error',
      }
    );
  }
};

export const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content, password } = req.body;

    await postService.updatePost({ id, title, content, password });
    return res.status(201).json({ message: '게시물 수정 성공' });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).send(
      { error: error.message } || {
        error: 'Internal Server Error',
      }
    );
  }
};

/*
// 날씨 api 호출
export const requestWeatherApi = async (req, res) => {
  const apiKey = process.env.WEATHER_API_KEY;

  const url_for_weather = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Seoul&aqi=no&lang=ko`;

  await axios
    .get(url_for_weather)
    .then(function (response) {
      res.status(response.status).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
      res.status(error.response.status || 500).json(error.response.data);
    });
};*/

// 날씨 api 호출하여 현재 날씨 리턴하는 함수
export const getWeather = async () => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url_for_weather = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Seoul&aqi=no&lang=ko`;

  let currentWeather = null;
  currentWeather = await axios
    .get(url_for_weather)
    .then(function (response) {
      const weather = response.data.current.condition.text;
      return weather;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    });

  return currentWeather;
};
