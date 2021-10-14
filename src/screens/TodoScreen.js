import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { EditModal } from '../components/EditModal';
import { AppCard } from '../components/ui/AppCard';
import { AppTextBold } from '../components/ui/AppTextBold';
import { THEME } from '../theme';

export const TodoScreen = ({ goBack, todo, onRemove, onSave }) => {
  const [modal, setModal] = useState(false);

  const saveHandler = (title) => {
    onSave(todo.id, title);
    setModal(false);
  };

  return (
    <View>
      <EditModal
        value={todo.title}
        visible={modal}
        onCancel={() => setModal(false)}
        onSave={saveHandler}
      />

      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <Button title='Ред.' onPress={() => setModal(true)}></Button>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button
            title='Назад'
            color={THEME.GREY_COLOR}
            onPress={goBack}
          ></Button>
        </View>
        <View style={styles.button}>
          <Button
            title='Удалить'
            color={THEME.DANGER_COLOR}
            onPress={() => onRemove(todo.id)}
          ></Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: '40%',
  },
  title: {
    fontSize: 20,
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
});
