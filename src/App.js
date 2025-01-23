import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, updateTodo, toggleComplete } from './redux/todoSlice';
import { ToastContainer, toast } from 'react-toastify';
import { FaPlus, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddOrUpdate = () => {
    if (text.trim() === '') {
      toast.error('Task cannot be empty');
      return;
    }
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
    <div className="min-h-screen bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-xl p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-700">To-Do List</h1>

        {/* Input Field and Add Button */}
        <div className="flex items-center gap-4 mb-4 mr-5">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter task..."
            className="border border-gray-300 rounded-lg p-3 w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddOrUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg shadow-md transition-transform transform active:scale-95"
          >
            {editId ? <FaCheck size={12} /> : <FaPlus size={12} />}
          </button>
        </div>

        {/* Task List aligned with input field */}
        <ul className="flex flex-col ">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center border border-gray-300 rounded-lg p-3 shadow-md w-full">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleComplete(todo.id))}
                className="h-5 w-5 accent-blue-500"
              />
              <input
                type="text"
                value={todo.text}
                readOnly
                className={`flex-1 text-lg ${
                  todo.completed ? 'line-through text-gray-500' : 'text-gray-700'
                } bg-transparent focus:outline-none`}
              />
              <button
                className="text-green-500 hover:text-green-600 transition-transform transform active:scale-90"
                onClick={() => {
                  setText(todo.text);
                  setEditId(todo.id);
                }}
              >
                <FaEdit size={10} />
              </button>
              <button
                className="text-red-500 hover:text-red-600 transition-transform transform active:scale-90 ml-3"
                onClick={() => {
                  dispatch(deleteTodo(todo.id));
                  toast.error('Task deleted');
                }}
              >
                <FaTrash size={10} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default App;