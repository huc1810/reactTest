import React, { Component } from 'react';
import { Icon } from 'react-icons-kit'
import {trashO} from 'react-icons-kit/fa/trashO'
import {plus} from 'react-icons-kit/fa/plus'

import './Item.css'; 
 

class Item extends Component {
    constructor(props) {
       super(props);

       this.state = {
         showIcon: false
       }      

       this.getIcon = this.getIcon.bind(this);
       this.click = this.click.bind(this);
       this.displayIcon = this.displayIcon.bind(this);
       this.hideIcon = this.hideIcon.bind(this);
    }

    getIcon() {
        return this.props.list === 'mylist' ? trashO : plus;
    }

    click(ev) {
      ev && ev.stopPropagation();

      if (this.props.list === 'recommendations') {
        this.props.add(this.props.id);
      }
      else {
        this.props.remove(this.props.id);
      } 
    }

    displayIcon(ev) {
      ev && ev.stopPropagation(); 
      this.setState({showIcon: true})
    }

    hideIcon(ev) {
      ev && ev.stopPropagation(); 
      this.setState({showIcon: false})
    }


    render() {
      return (
          <div className="item">
            <h3>{this.props.title}</h3>
            <img onMouseOver={this.displayIcon} onMouseLeave={this.hideIcon} alt={this.props.title} src={this.props.img}/>
            <Icon className="icon" onClick={this.click} icon={this.getIcon()}/>
          </div>
       
      );
    }
  }
  
  export default Item;
