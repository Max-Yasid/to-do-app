import { React, Component } from 'react';

import './filter.css';

import Checkbox from './../common/checkbox';

 class filter extends Component{
    
    isCheckboxChecked = false;

    onCheckboxChange = (value) => {
        this.isCheckboxChecked = value;
    }

    keyEnterHandler(e){
        if(e.keyCode === 13){
            let inputValue = e.target.value;
            this.props.addTaskToList({ 
                description: inputValue,
                done: this.isCheckboxChecked, 
            });
            e.target.value = "";
        }
    }

    render(){
        return (
            <div className={"filter-container d-flex " + ( this.props.selectedThemeIsDark ? "filter-dark-background" : "filter-light-background")}>
                <div className="filter-checkbox-container d-flex justify-content-center align-items-center">
                    <Checkbox
                        selectedThemeIsDark={this.props.selectedThemeIsDark}
                        onCheckboxChange={this.onCheckboxChange}
                    />
                </div>
                <div className="filter-input-container d-flex align-items-center">
                    <input type="text" onKeyUp={(e) => this.keyEnterHandler(e)} className={"filter-input " + (this.props.selectedThemeIsDark ? "filter-input-dark-color" : "filter-input-light-color")} placeholder="Create a new todo..." spellCheck="false"/>
                </div>
            </div>
        );
    }
 }

 export default filter;