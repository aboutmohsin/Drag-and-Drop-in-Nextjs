"use client";

import { AnyARecord } from "dns";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// import _ from "lodash";

interface CreateTask {
  tasks: CreateTask[];
  setTasks: (tasks: CreateTask[]) => void;
}

export default function CreateTask() {
  const item = {
    id: uuidv4(),
    name: "Clean the house",
  };

  const item2 = {
    id: uuidv4(),
    name: "Wash the car",
  };
  const data = {
    todo: {
      title: "todo",
      items: [item, item2],
    },

    inprogress: {
      title: "In Progress",
      items: [item],
    },

    completed: {
      title: "completed",
      items: [item],
    },
  };
  const [text, setText] = useState("");
  const [task, setTask] = useState(data);
  console.log("================================================");
  console.log(task);
  console.log("================================================");

  const changeHandler = (e: any) => {
    setText(e.target.value);
    console.log(text);
  };
  const addItem = (e: any) => {
    e.preventDefault();

    setTask((prev) => {
      return {
        ...prev,
        todo: {
          title: "Todo",
          items: [
            {
              id: uuidv4(),
              name: text,
            },
            ...prev.todo.items,
          ],
        },
      };
    });

    setText("");
  };
  const handleDragEnd = ({ destination, source }: any) => {
    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    // Creating a copy of item before removing it from state
    const itemCopy = { ...task[source.droppableId].items[source.index] };

    setTask((prev) => {
      prev = { ...prev };
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1);

      // Adding to new items array location
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );

      return prev;
    });
  };

  return (
    // <div className="w-full h-full flex  flex-col items-center bg-red-300">
    <div className="">
      {/* input */}
      <form className=" flex items-center justify-center py-4">
        <input
          type="text"
          className="border-2 border-slate-600 bg-transparent rounded-md mr-4 h-12 w-64 px-2 outline-none "
          value={text}
          onChange={changeHandler}
        />
        <button className="bg-cyan-400 rounded-md h-12 w-44" onClick={addItem}>
          Create
        </button>
      </form>
      {/* list of input */}
      <div className="flex justify-between   bg-slate-400 m-4 rounded-lg p-4 gap-10">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="w-1/3">
            <h1>{task.todo.title}</h1>
            <Droppable droppableId={task.todo.title}>
              {(provided, snapshot) => {
                return (
                  <div
                    className="bg-white text-black my-4 p-8 rounded-lg"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {task.todo.items.map((data, id, index) => (
                      <Draggable
                        key={data.id}
                        index={index}
                        draggableId={data.id}
                      >
                        {(provided, snapshot) => {
                          console.log(snapshot);
                          return (
                            <p
                              key={id}
                              className={`border-4 p-4 rounded-md my-4 ${snapshot.isDragging}`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              {data.name}
                            </p>
                          );
                        }}
                      </Draggable>
                    ))}
                  </div>
                );
              }}
            </Droppable>
          </div>
          <div className="w-1/3">
            <h1>{task.inprogress.title}</h1>

            <div className="bg-white text-black my-4 p-8 rounded-lg">
              {task.inprogress.items.map((data, id) => (
                <p className="border-4 p-4 rounded-md my-4" key={id}>
                  {data.name}
                </p>
              ))}
            </div>
          </div>
          <div className="w-1/3">
            <h1>{task.completed.title}</h1>

            <div className="bg-white text-black my-4 p-8 rounded-lg">
              {task.completed.items.map((data, id) => (
                <p className="border-4 p-4 rounded-md my-4" key={id}>
                  {data.name}
                </p>
              ))}
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
