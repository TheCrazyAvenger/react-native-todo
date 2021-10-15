import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContext } from '../context/screen/screenContext';
import { TodoContext } from '../context/todo/todoContext';
import { AppText } from './ui/AppText';

export const Todo = ({ todo }) => {
  const { removeTodo } = useContext(TodoContext);
  const { changeScreen } = useContext(ScreenContext);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => changeScreen(todo.id)}
      onLongPress={() => removeTodo(todo.id)}
    >
      <View style={styles.todo}>
        <AppText>{todo.title}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginBottom: 10,
  },
});
