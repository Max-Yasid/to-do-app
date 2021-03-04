import React, { Component } from 'react';
import './to-do-list.css'

import Checkbox from './../common/checkbox';
import ConfigBar from './../common/configurationBar';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class toDoList extends Component{
    handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(this.props.fullList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        this.props.reorderList(items);
    }
    render(){
        let itemsLeft = 0;
        return (
            <div className={(this.props.selectedThemeIsDark ? "list-dark-background": "list-light-background") + " list-container"}>
                <DragDropContext onDragEnd={this.handleOnDragEnd}>
                <Droppable droppableId="characters">
                    {(provided) => (
                        <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                            {this.props.toDoList.map((toDo,i) => {
                                if(!toDo.done)
                                    itemsLeft++;
                                let doneClass = toDo.done ? ' task-done ' + (this.props.selectedThemeIsDark ? 'task-done-dark' : "task-done-light") : (this.props.selectedThemeIsDark ? " no-done-task-dark" : ' no-done-task-light');
                                return (
                                    <Draggable index={i} key={toDo.id} draggableId={toDo.id.toString()}>
                                        {(provided) => (
                                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={(this.props.selectedThemeIsDark ? "list-item-dark-border" : "list-item-light-border") + " todo-item d-flex"}>
                                                <div className="list-checkbox-side d-flex justify-content-center align-items-center">
                                                    <Checkbox
                                                        done={toDo.done}
                                                        id={toDo.id}
                                                        updateListOnTaskCheckOrUncheck={this.props.updateListOnTaskCheckOrUncheck}
                                                        selectedThemeIsDark={this.props.selectedThemeIsDark}
                                                    />
                                                </div>
                                                <div className="list-description-side d-flex align-items-center">
                                                    <span className={"list-description" + doneClass} onClick={() => this.props.updateListOnTaskCheckOrUncheck(toDo.id)}>
                                                        {toDo.description}
                                                    </span>
                                                    <span className="delete-task-container" onClick={() => this.props.deleteTask(toDo.id)}>
                                                        <svg className="delete-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
                                                    </span>
                                                </div>
                                            </li>
                                    )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </ul>
                    )}
                    </Droppable>    
                </DragDropContext>
                <div className="list-bar d-flex">
                    <div className="items-left-counter d-flex align-items-center justify-content-center">
                        <span className={this.props.selectedThemeIsDark ? "bar-option-dark" : "bar-option-light"}>{ itemsLeft } items left</span>
                    </div>
                    <div className="configbar-container">
                        <ConfigBar 
                            selectedThemeIsDark={this.props.selectedThemeIsDark}
                            updateFilter={this.props.updateFilter} 
                        />
                    </div>
                    <div className="clear-option d-flex align-items-center justify-content-center">
                        <span className={this.props.selectedThemeIsDark ? "bar-option-dark clear-completed-dark" : "bar-option-light clear-completed-light"} onClick={ () => this.props.clearCompletedTasks()}>Clear Completed</span>
                    </div>
                    <br />
                </div>
            </div>
        );
    };
}
export default toDoList;