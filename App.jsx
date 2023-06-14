import React, { useState } from 'react';
import './App.css';

function App() {
    const [items, setItems] = useState([
        {
            order: "1",
            do: "メール確認",
            done: false,
        }
    ]);

    const [newDo, setNewDo] = useState('');
    const [count, setCount] = useState(2);
    const [editingItem, setEditingItem] = useState(null);

    function addTitle() {
        const newItems = [...items, { order: count, do: newDo, done: false }];
        setItems(newItems);
        setCount(count + 1);
        setNewDo('');
    }

    function finish(order) {
        const updatedItems = items.map(item => {
            if (item.order === order) {
                return { ...item, done: true };
            }
            return item;
        });
        setItems(updatedItems);
    }

    function cancel(order) {
        const updatedItems = items.map(item => {
            if (item.order === order) {
                return { ...item, done: false };
            }
            return item;
        });
        setItems(updatedItems);
    }

    function edit(order) {
        const itemToEdit = items.find(item => item.order === order);
        if (itemToEdit) {
            setEditingItem(itemToEdit);
            setNewDo(itemToEdit.do);
        }
    }

    function updateTitle() {
        const updatedItems = items.map(item => {
            if (item.order === editingItem.order) {
                return { ...item, do: newDo };
            }
            return item;
        });
        setItems(updatedItems);
        setEditingItem(null);
        setNewDo('');
    }

    function deleteItem(order) {
        const updatedItems = items.filter(item => item.order !== order);
        setItems(updatedItems);
    }

    return (
        <div className="App">
            <div className="background-container">
                <h1 className="text-center text-4xl">
                    <strong>ToDo</strong>
                </h1>
                <div className="title-input-container">
                    <div className="title-input-wrapper">
                        <input
                            type="text"
                            value={newDo}
                            onChange={(e) => setNewDo(e.target.value)}
                            placeholder="タイトルを入力してください"
                        />
                        {editingItem ? (
                            <button className="border rounded bg-white ml-4 px-1" onClick={updateTitle}>
                                更新
                            </button>
                        ) : (
                            <button className="border rounded bg-white ml-4 px-1" onClick={addTitle}>
                                追加
                            </button>
                        )}
                    </div>
                </div>
                <div className="flex justify-center text-center">
                    <table className="table-fixed">
                        <thead>
                            <tr>
                                <th className="w-1/4 px-4 py-2">番号</th>
                                <th className="w-1/2 px-4 py-2">やること</th>
                                <th className="w-1/4 px-4 py-2">確認</th>
                                <th className="w-1/4 px-4 py-2">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.order}>
                                    <td className="border px-4 py-2">{item.order}</td>

                                    <td className="border px-4 py-2">{item.do}</td>
                                    <td className="border px-4 py-2">{item.done ? '✓' : ''}</td>
                                    <td>
                                        {item.done ? (
                                            <button
                                                className="border rounded bg-white ml-4 px-2"
                                                onClick={() => cancel(item.order)}
                                            >
                                                取消
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    className="border rounded bg-white ml-4 px-2"
                                                    onClick={() => finish(item.order)}
                                                >
                                                    完了
                                                </button>
                                                <button
                                                    className="border rounded bg-white ml-4 px-2"
                                                    onClick={() => edit(item.order)}
                                                >
                                                    編集
                                                </button>
                                                <button
                                                    className="border rounded bg-white ml-4 px-2"
                                                    onClick={() => deleteItem(item.order)}
                                                >
                                                    削除
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default App;
