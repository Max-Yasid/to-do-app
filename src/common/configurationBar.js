import { React, Component } from 'react';
import './configurationBar.css';

class configurationBar extends Component{

    onClickHandler = (targetNumber, filterValue) => {
        this.props.updateFilter(filterValue);
        this.changeToActiveColor(targetNumber);
    } 
    changeToActiveColor = (targetNumber) => {
        let filterOptions = document.getElementsByClassName('config-bar-option');

        filterOptions[0].style.color = 'hsl(234, 11%, 52%)';
        filterOptions[0].classList.add('hover-color');

        filterOptions[1].style.color = 'hsl(234, 11%, 52%)';
        filterOptions[1].classList.add('hover-color');
        
        filterOptions[2].style.color = 'hsl(234, 11%, 52%)';
        filterOptions[2].classList.add('hover-color');
        
        filterOptions[targetNumber].classList.remove('hover-color');
        filterOptions[targetNumber].style.color = 'hsl(220, 98%, 61%)';
    }
    render(){
        return (
            <div className="filter-list-container d-flex align-items-center">
                <div className={"all-filter config-bar-option " + (this.props.selectedThemeIsDark ? "hover-color-dark" : "hover-color-light")} onClick={(e) => this.onClickHandler(0, null)}>
                    <span>All</span>    
                </div>
                <div className={"active-filter config-bar-option " + (this.props.selectedThemeIsDark ? "hover-color-dark" : "hover-color-light")} onClick={(e) => this.onClickHandler(1, false)}>
                    <span>Active</span>
                </div>
                <div className={"completed-filter config-bar-option " + (this.props.selectedThemeIsDark ? "hover-color-dark" : "hover-color-light")} onClick={(e) => this.onClickHandler(2, true)}>
                    <span>Completed</span>
                </div>
            </div>
        );
    }
}
export default configurationBar;