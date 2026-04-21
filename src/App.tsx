import { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, Sparkles, Trash } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const text = inputValue.trim();
    if (!text) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos([newTodo, ...todos]);
    setInputValue('');
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.length - completedCount;

  const clearCompleted = () => {
    setTodos(todos.filter((t) => !t.completed));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-purple-100">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="text-purple-500" size={32} />
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              我的待办清单
            </h1>
            <Sparkles className="text-purple-500" size={32} />
          </div>
          <p className="text-gray-500">记录你的每一个重要任务</p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg shadow-purple-100/50 p-4 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="今天要做什么？"
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-purple-300 focus:outline-none transition-colors text-gray-700 placeholder-gray-400"
            />
            <button
              onClick={addTodo}
              className="px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-purple-200 active:scale-95 flex items-center gap-2"
            >
              <span>➕ 添加任务</span>
            </button>
          </div>
        </div>

        {/* Stats and Clear Button */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
          <div className="flex gap-6">
            <div className="bg-white rounded-xl px-4 py-2 shadow-md shadow-purple-100/30">
              <span className="text-gray-500 text-sm">待完成</span>
              <span className="ml-2 text-blue-600 font-bold text-lg">
                {pendingCount}
              </span>
            </div>
            <div className="bg-white rounded-xl px-4 py-2 shadow-md shadow-purple-100/30">
              <span className="text-gray-500 text-sm">已完成</span>
              <span className="ml-2 text-emerald-500 font-bold text-lg">
                {completedCount}
              </span>
            </div>
          </div>
          {completedCount > 0 && (
            <button
              onClick={clearCompleted}
              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 border border-red-200"
            >
              <Trash size={16} />
              清空已完成
            </button>
          )}
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg shadow-purple-100/50">
              <div className="text-gray-300 mb-2">
                <CheckCircle2 size={48} className="mx-auto" />
              </div>
              <p className="text-gray-400">暂无待办事项</p>
              <p className="text-gray-300 text-sm mt-1">添加一个新任务开始吧</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`group bg-white rounded-xl shadow-md shadow-purple-100/30 p-4 flex items-center gap-3 transition-all duration-200 hover:shadow-lg hover:shadow-purple-100/50 ${
                  todo.completed ? 'opacity-70' : ''
                }`}
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="flex-shrink-0 transition-transform duration-200 hover:scale-110"
                >
                  {todo.completed ? (
                    <CheckCircle2 className="text-emerald-500" size={24} />
                  ) : (
                    <Circle className="text-gray-300 hover:text-purple-400" size={24} />
                  )}
                </button>
                <span
                  className={`flex-1 text-gray-700 transition-all duration-200 ${
                    todo.completed
                      ? 'line-through text-gray-400'
                      : ''
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="flex-shrink-0 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {todos.length > 0 && (
          <div className="text-center mt-6 text-gray-400 text-sm">
            共 {todos.length} 个任务
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
