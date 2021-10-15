import axios from 'axios';
import React, { useReducer, useContext } from 'react';
import { Alert } from 'react-native';
import { ScreenContext } from '../screen/screenContext';
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
} from '../types';
import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  };

  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = async (title) => {
    try {
      const responce = await axios.post(
        'https://react-native-todo-fc24d-default-rtdb.firebaseio.com/todos.json',
        JSON.stringify({ title })
      );
      const data = await responce.data;

      dispatch({ type: ADD_TODO, title, id: data.name });
    } catch (e) {
      console.log(e);
    }
  };

  const removeTodo = (id) => {
    const todo = state.todos.find((t) => t.id === id);
    Alert.alert(
      'Удаление элемента',
      `Вы уверены, что хотите удалить ${todo.title}`,
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            changeScreen(null);
            try {
              await axios.delete(
                `https://react-native-todo-fc24d-default-rtdb.firebaseio.com/todos/${id}.json`
              );

              dispatch({ type: REMOVE_TODO, id });
            } catch (e) {
              console.log(e);
            }
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      const responce = await axios.get(
        'https://react-native-todo-fc24d-default-rtdb.firebaseio.com/todos.json'
      );

      const data = await responce.data;

      const todos = Object.keys(data).map((key) => ({ ...data[key], id: key }));

      dispatch({ type: FETCH_TODOS, todos });
    } catch (e) {
      showError('Что-то пошло не так...');
      console.log(e);
    } finally {
      hideLoader();
    }
  };

  const updateTodo = async (id, title) => {
    showLoader();
    clearError();
    try {
      await axios.patch(
        `https://react-native-todo-fc24d-default-rtdb.firebaseio.com/todos/${id}.json`,
        JSON.stringify({ title })
      );
      dispatch({ type: UPDATE_TODO, id, title });
    } catch (e) {
      showError('Что-то пошло не так...');
      console.log(e);
    } finally {
      hideLoader();
    }
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = (error) => dispatch({ type: SHOW_ERROR, error });

  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
