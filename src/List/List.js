import React, { Component } from 'react';
import Item from './Item';
import films from '../api/data';
import './Item.css';

class FilmList extends Component {
    constructor(props) {
       super(props);
       this.state = {
         films: null
       }

       this.getData = this.getData.bind(this);
       this.createList = this.createList.bind(this);
       this.addMyList = this.addMyList.bind(this);
       this.removeMyList = this.removeMyList.bind(this);
    }

    render() {
      let myList = this.createList('mylist');
      let recommendations = this.createList('recommendations');
      return (

        <div>
            <div className="list">
              {myList}
            </div>
            <div className="list">
              {recommendations}
            </div>
        </div>
       
      );
    }

    getData() {
      setTimeout(() => {
        this.setState({ films: films});
      }, 0);
    }

    createList(list) {
      const creatItem = film => <Item key={film.id} 
                                      list={list} {...film} 
                                      add={this.addMyList}
                                      remove={this.removeMyList}
                                      />;
      const films = this.state.films;

      if (films) {
        return films[list].map(creatItem);
      }

      return null;      
    }

    addMyList(id) {       
        let myList = this.state.films.mylist || [];
        let recommendations = this.state.films.recommendations || []; 
        const handler = film => film.id === id;
        const recommended = recommendations.find(handler);
        const recommendedIndex = recommendations.findIndex(handler);
        
        myList.push(recommended);
        recommendations.splice(recommendedIndex, 1);

        this.setState({ films: { mylist: myList, recommendations } });
    }

    removeMyList(id) {
      let myList = this.state.films.mylist || [];
      let recommendations = this.state.films.recommendations || []; 
      const filmIndex = myList.findIndex(film => film.id === id);
      myList.splice(filmIndex, 1);
      this.setState({ films: { mylist: myList, recommendations } });
    }

    componentDidMount() {
       this.getData();        
    } 
  }
  
  export default FilmList;


