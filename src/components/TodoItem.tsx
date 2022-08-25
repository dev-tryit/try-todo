import { useState } from "react";
import { supabase } from "../lib/api";
import log from "../utils/log";

type UpdatableTextProp = {
    className?: any;
    isCompleted: any;
    toggleTodoItemMode: any;
    todo: any;
    todoItemMode: TodoItemMode;
    onDelete: any;
    onUpdate: (objectToUpdate: any) => void;
};
const UpdatableText = ({
    className,
    isCompleted,
    toggleTodoItemMode,
    todo,
    todoItemMode,
    onDelete,
    onUpdate,
}: UpdatableTextProp) => {
    const [inputValue, setInputValue] = useState(todo.task);
    const deleteFunc = () => {
        onDelete();
    };
    const updateFunc = () => {
        onUpdate({ task: inputValue });
        toggleTodoItemMode();
    };

    log.info("UpdatableText todoItemMode", todoItemMode);
    let returnTag;
    if (todoItemMode === "view") {
        returnTag = (
            <span
                className={`grow ${isCompleted ? "line-through" : ""}`}
                onClick={toggleTodoItemMode}
            >
                {inputValue}
            </span>
        );
    } else {
        returnTag = (
            <input
                className={"grow"}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        updateFunc();
                    }
                }}
            />
        );
    }

    return (
        <>
            <span className={className}>{returnTag}</span>
            <button
                className={
                    "flex-none font-mono text-red-500 text-xl border px-2"
                }
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (todoItemMode === "view") {
                        deleteFunc();
                    } else {
                        updateFunc();
                    }
                }}
            >
                {todoItemMode === "view" ? "X" : "O"}
            </button>
        </>
    );
};

type TodoItemMode = "view" | "change";
type TodoItemProp = {
    todo: any;
    onDelete: any;
    onUpdate: (objectToUpdate: any) => void;
};
const TodoItem = ({ todo, onDelete, onUpdate }: TodoItemProp) => {
    const [isCompleted, setIsCompleted] = useState(todo.is_complete);
    const [todoItemMode, setTodoItemMode] = useState<TodoItemMode>("view");

    const toggleCompleted = async () => {
        const nextIsCompleted = !isCompleted;
        onUpdate({ is_complete: nextIsCompleted });
        setIsCompleted(nextIsCompleted);
    };

    const toggleTodoItemMode = () => {
        setTodoItemMode((todoItemMode: any) =>
            todoItemMode === "view" ? "change" : "view"
        );
    };

    return (
        <div className={"flex flex-row border p-3"}>
            <input
                className="flex-none cursor-pointer mr-2"
                onChange={toggleCompleted}
                type="checkbox"
                checked={isCompleted ? true : false}
            />
            <UpdatableText
                className={"grow flex"}
                isCompleted={isCompleted}
                toggleTodoItemMode={toggleTodoItemMode}
                todo={todo}
                todoItemMode={todoItemMode}
                onDelete={onDelete}
                onUpdate={onUpdate}
            />
        </div>
    );
};

export default TodoItem;
