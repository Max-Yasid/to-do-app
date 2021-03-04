import React, { Component } from 'react';

import './checkbox.css';

class checkbox extends Component{
    constructor(props){
        super(props);
        this.isCheckboxChecked = false;
    }

    checkboxClickHandler = () => {
        if(this.props.id > -1)
            this.props.updateListOnTaskCheckOrUncheck(this.props.id);
        else{
            this.isCheckboxChecked = !this.isCheckboxChecked;
            this.setState({});
        }
        if(this.props.onCheckboxChange){
            this.onNewTaskCheckboxChange();
        }
    }
    onNewTaskCheckboxChange(){
        this.props.onCheckboxChange(this.isCheckboxChecked);
    }

    render(){
        if(this.props.id > -1)
            this.isCheckboxChecked = this.props.done;
        let checkboxCheckedStyle = { backgroundImage: 'linear-gradient(to bottom right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))'};
        let checkIcon = <svg className="checkbox-check" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>;
    
        return (
            <div 
                style={this.isCheckboxChecked ? checkboxCheckedStyle : {}} 
                className={
                    "checkbox d-flex justify-content-center align-items-center " + 
                    (this.props.selectedThemeIsDark ? " checkbox-dark-background" : " checkbox-light-background") +
                    (this.props.selectedThemeIsDark ? (this.isCheckboxChecked ? " checkbox-checked-dark-background" : " checkbox-dark-border"): (this.isCheckboxChecked ? " checkbox-checked-light-background": " checkbox-light-border"))
                } 
                onClick={this.checkboxClickHandler}
            >
                {this.isCheckboxChecked ? checkIcon : ''}
            </div>
        );
    }
}

export default checkbox;