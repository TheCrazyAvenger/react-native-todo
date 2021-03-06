import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput, Alert, Keyboard } from 'react-native';
import { THEME } from '../theme';
import { AntDesign } from '@expo/vector-icons';
import { TodoContext } from '../context/todo/todoContext';

export const AddTodo = () => {
  const [value, setValue] = useState('');
  const { addTodo } = useContext(TodoContext);

  const pressHandler = () => {
    if (value.trim()) {
      addTodo(value);
      setValue('');
      Keyboard.dismiss();
    } else {
      Alert.alert('Название дела не может быть пустым');
    }
  };

  return (
    <View style={styles.block}>
      <TextInput
        value={value}
        onChangeText={setValue}
        style={styles.input}
        placeholder='Введите название дела...'
      />
      <AntDesign.Button onPress={pressHandler} name='pluscircleo'>
        Добавить
      </AntDesign.Button>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    width: '60%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
  },
});
