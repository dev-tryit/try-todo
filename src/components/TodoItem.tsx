import { useState } from "react";
import { supabase } from "../lib/api";
import log from "../utils/log";

type UpdatableTextProp = {
    className?:any;
    isCompleted: any;
    setTodoItemMode: any;
    todo: any;
    todoItemMode: TodoItemMode;
};
const UpdatableText = ({
    className,
    isCompleted,
    setTodoItemMode,
    todo,
    todoItemMode,
}: UpdatableTextProp) => {
    const [inputValue, setInputValue] = useState(todo.task);
    
    log.info("UpdatableText todoItemMode",todoItemMode);
    let returnTag;
    if (todoItemMode === "view") {
        returnTag= (
            <span
                className={`grow ${
                    isCompleted ? "line-through" : ""
                }`}
                onClick={() =>
                    setTodoItemMode((todoItemMode: any) =>
                        todoItemMode === "view" ? "change" : "view"
                    )
                }
            >
                {inputValue}
            </span>
        );
    } else {
        returnTag= <input className={'grow'} value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>;
    }

    return <span className={className}>
        {returnTag}
    </span>;
};

type TodoItemMode = "view" | "change";
type TodoItemProp = { todo: any; onDelete: any };
const TodoItem = ({ todo, onDelete }: TodoItemProp) => {
    const [isCompleted, setIsCompleted] = useState(todo.is_complete);
    const [todoItemMode, setTodoItemMode] = useState<TodoItemMode>("view");

    const toggleCompleted = async () => {
        const { data, error } = await supabase
            .from("todos")
            .update({ is_complete: !isCompleted })
            .eq("id", todo.id)
            .single();
        if (error) {
            console.error(error);
        }
        setIsCompleted(data.is_complete);
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
                    setTodoItemMode={setTodoItemMode}
                    todo={todo}
                    todoItemMode={todoItemMode}
                />
            <button
                className={"flex-none font-mono text-red-500 text-xl border px-2"}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete();
                }}
            >
                X
            </button>
        </div>
    );
};

export default TodoItem;
