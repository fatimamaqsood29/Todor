import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, updateTodo, toggleComplete } from './redux/todoSlice';
import { ToastContainer, toast } from 'react-toastify';
import { FaPlus, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';

function App() {
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddOrUpdate = () => {
    if (editId) {
      dispatch(updateTodo({ id: editId, text }));
      toast.success('Task updated successfully');
      setEditId(null);
    } else {
      dispatch(addTodo(text));
      toast.success('Task added successfully');
    }
    setText('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter task..."
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleAddOrUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editId ? <FaCheck /> : <FaPlus />}
          </button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="flex justify-between items-center bg-gray-200 p-2 rounded mb-2">
              <span
                className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
                onClick={() => dispatch(toggleComplete(todo.id))}
              >
                {todo.text}
              </span>
              {/* <div className="flex gap-2"> */}
                <button
                  className="text-green-500"
                  onClick={() => {
                    setText(todo.text);
                    setEditId(todo.id);
                  }}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500"
                  onClick={() => {
                    dispatch(deleteTodo(todo.id));
                    toast.error('Task deleted');
                  }}
                >
                  <FaTrash />
                </button>
              
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;