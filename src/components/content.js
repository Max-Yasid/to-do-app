import React, { Component } from 'react';

import './content.css';

import ModeToggler from './title-mode-toggle';
import Filter from './filter';
import ToDoList from './to-do-list';
import ConfigBar from './../common/configurationBar';

class content extends Component{

    constructor(props){
        super(props);
        this.state = {
            toDoList: [
                { id: 1, description: 'Complete online JavaScript Course', done: true },
                { id: 2, description: 'Jog around the park 3x', done: false },
                { id: 3, description: '10 minutes meditation', done: false },
                { id: 4, description: 'Read for 1 hour', done: false },
                { id: 5, description: 'Pick up groceries', done: false },
                { id: 6, description: 'Complete Todo App on Frontend Mentor', done: false },
            ],
            doneFilter: null,
        };
    }
    reorderList = (reordererList) => {
        this.setState({
            toDoList: reordererList
        });
    }
    generateNewID = () => {
        if(this.state.toDoList.length === 0)
            return 1;
        let id = Math.random() * 1000;
        let idAlreadyExists = this.state.toDoList.some((task) => id === task.id);
        if(idAlreadyExists)
            return this.generateNewID();
        return id;
    };
    updateListOnTaskCheckOrUncheck = (taskId) => {
        let toDoListWithModifiedElements = this.state.toDoList.map( task => {
            if(task.id === taskId){
                task.done = !task.done;
                return task;
            }
            return task;
        });
        this.setState({
            toDoList: toDoListWithModifiedElements
        });
    };
    updateFilter = (newDoneFilterValue) => {
        this.setState({
            doneFilter: newDoneFilterValue
        });
    };
    addTaskToList = (task) => {
        task.id = this.generateNewID();
        let toDoListCopy = this.state.toDoList;
        toDoListCopy.push(task);
        this.setState({
            toDoList: toDoListCopy,
        });
    };
    filterList = () => {
        if(this.state.doneFilter === null){
            return this.state.toDoList;
        }
        return this.state.toDoList.filter( task => {
            return task.done === this.state.doneFilter;
        });
    };
    deleteTask = (taskId) => {
        let toDoListCopy = this.state.toDoList.filter((task) => {
            if(task.id === taskId){
                return false;
            }
            return true;
        });
        this.setState({
            toDoList: toDoListCopy,
        });
    };
    clearCompletedTasks = () => {
        let undoneTasks = this.state.toDoList.filter((task) => {
            if(!task.done)
                return true;
            return false;
        });
        this.setState({
            toDoList: undoneTasks,
        });
    };
    render = () => {
        let filteredList = this.filterList();
        return (
            <div className="container-all">
                <br/>
                <br/>
                <ModeToggler
                    selectedThemeIsDark={this.props.selectedThemeIsDark}
                    changeTheme={this.props.changeTheme}
                />
                <br/>
                <Filter 
                    selectedThemeIsDark={this.props.selectedThemeIsDark}
                    addTaskToList={this.addTaskToList}
                />
                <br/>
                <ToDoList
                    selectedThemeIsDark={this.props.selectedThemeIsDark}
                    updateListOnTaskCheckOrUncheck={this.updateListOnTaskCheckOrUncheck}
                    toDoList={filteredList}
                    updateFilter={this.updateFilter}
                    deleteTask={this.deleteTask}
                    clearCompletedTasks={this.clearCompletedTasks}
                    reorderList={this.reorderList}
                    fullList={this.state.toDoList}
                />
                <br />
                <div className={(this.props.selectedThemeIsDark ? "filter-bar-mobile-dark" : "filter-bar-mobile-light") + " filter-on-mobile d-flex justify-content-center"}>
                    <ConfigBar
                            selectedThemeIsDark={this.props.selectedThemeIsDark}
                            updateFilter={this.updateFilter}
                    />
                </div>
                <div className={"dragNDropText w-100 d-flex justify-content-center " + (this.state.selectedThemeIsDark ? "darkTextColor" : "lightTextColor")}>
                    drag and drop to reorder the list
                </div>
            </div>
        );
    };
}

export default content;