import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TaskForm from '../Components/TaskForm';
import { addTask } from '../redux/taskSlice';

const mockStore = configureStore([]);
const store = mockStore({});

jest.mock('../redux/taskSlice', () => ({
  addTask: jest.fn((payload) => ({
    type: 'taskData/addTask',
    payload,
  })),
}));

describe('TaskForm', () => {
  beforeEach(() => {
    store.clearActions();
  });

  test('renders TaskForm component', () => {
    render(
      <Provider store={store}>
        <TaskForm />
      </Provider>
    );

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Detail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Priority/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Task/i })).toBeInTheDocument();
  });

  test('submits the form with correct data', () => {
    render(
      <Provider store={store}>
        <TaskForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Task' } });
    fireEvent.change(screen.getByLabelText(/Detail/i), { target: { value: 'Test Detail' } });
    fireEvent.change(screen.getByLabelText(/Priority/i), { target: { value: 'Medium' } });

    fireEvent.click(screen.getByRole('button', { name: /Add Task/i }));

    const actions = store.getActions();
    expect(actions[0].type).toBe('taskData/addTask');
    expect(actions[0].payload).toEqual({
      title: 'Test Task',
      detail: 'Test Detail',
      priority: 'Medium',
      status: 'Incomplete',
      id: expect.any(Number),
    });
  });
});