import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const TodoScreen = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = async () => {
    if (!token) return; 
    const response = await axios.get('http://localhost:5000/todo/getTodos', {
      headers: { Authorization: token },
    });
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (!token) return; 
    await axios.post('http://localhost:5000/todo/addTodo', { title: newTodo }, {
      headers: { Authorization: token },
    });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.todoItem}>{item.title}</Text>}
      />
      <TextInput
        style={styles.input}
        placeholder="New Todo"
        value={newTodo}
        onChangeText={setNewTodo}
      />
      <Button title="Add Todo" onPress={addTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  todoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default TodoScreen;
