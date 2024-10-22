'use client';

import { DndContext } from '@/context/DndContext';
import { cardsData } from '@/utils/data';
import { useEffect, useState } from 'react';
import { Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
interface Cards {
  id: number;
  title: string;
  components: {
    id: number;
    name: string;
  }[];
}
const DndExample = () => {
  const [data, setData] = useState<Cards[]>([]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;

    // If no destination, return
    if (!destination) return;

    if (type === 'COLUMN') {
      // Handle column reordering
      const newData = [...data];
      const [movedColumn] = newData.splice(source.index, 1);
      newData.splice(destination.index, 0, movedColumn);
      setData(newData);
    } else {
      // Handle items within columns
      const newData = [...data];
      const sourceColumnIndex = newData.findIndex(
        (col) => col.id.toString() === source.droppableId.split('droppable')[1],
      );
      const destinationColumnIndex = newData.findIndex(
        (col) =>
          col.id.toString() === destination.droppableId.split('droppable')[1],
      );

      // Handle moving item from source column
      const [movedItem] = newData[sourceColumnIndex].components.splice(
        source.index,
        1,
      );

      // Handle adding item to the destination column
      newData[destinationColumnIndex].components.splice(
        destination.index,
        0,
        movedItem,
      );

      setData(newData);
    }
  };

  useEffect(() => {
    setData(cardsData); // Initialize data
  }, []);

  if (!data.length) {
    return 'hello word';
  }

  return (
    <DndContext onDragEnd={onDragEnd}>
      <h1 className="mb-3 mt-8 text-center text-[25px] font-bold">
        Drag and Drop Application
      </h1>
      <Droppable droppableId="all-columns" type="COLUMN" direction="horizontal">
        {(provided) => (
          <div
            className="mx-4 my-20 flex flex-col justify-between gap-4 lg:flex-row"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data.map((val, index) => (
              <Draggable
                key={val.id}
                draggableId={`draggable-column-${val.id}`}
                index={index}
              >
                {(provided) => (
                  <div
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="w-full border border-dashed border-gray-400 bg-white p-5 lg:w-1/3"
                  >
                    <Droppable
                      key={index}
                      droppableId={`droppable${val.id}`}
                      type="ITEM"
                    >
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <h2 className="mb-6 text-center font-bold text-black">
                            {val.title}
                          </h2>
                          {val.components.length > 0 ? (
                            val.components.map((component, index) => (
                              <Draggable
                                key={component.id}
                                draggableId={`item-${component.id}`}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    className="mx-1 my-3 bg-gray-200 px-4 py-3"
                                    {...provided.dragHandleProps}
                                    {...provided.draggableProps}
                                    ref={provided.innerRef}
                                  >
                                    {component.name}
                                  </div>
                                )}
                              </Draggable>
                            ))
                          ) : (
                            <div className="text-center text-gray-500">
                              <h2 className="invisible">No items</h2>
                            </div> // use this div because empty column does not work
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DndContext>
  );
};

export default DndExample;
