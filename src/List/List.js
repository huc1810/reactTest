import React, { Component } from 'react';
import Item from './Item';
import films from '../api/data';
import './Item.css';

const ListTemplate = (props) => {
  return <div className="list">
           {props.list}
        </div>
}

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
            <ListTemplate list={myList}/>
            <ListTemplate list={recommendations}/>              
        </div>       
      );
    }

    getData() {
      let fetch = new Promise((resolve, reject) =>{
        setTimeout(() => {
          resolve(films);
        }, 500);
      });
      
      fetch.then((films) => {
        this.setState({ films: films});
      });
    }

    createList(list) {
     
      const films = this.state.films;

      const creatItem = film => <Item key={film.id} 
                        list={list} {...film} 
                        add={this.addMyList}
                        remove={this.removeMyList}
                        />;
      if (!films) {
        return null;
      }

      if (films) {
        return films[list].map(creatItem);
      }    
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
    
      const handler = film => film.id === id;
      const film = myList.find(handler);
      const filmIndex = myList.findIndex(handler);

      myList.splice(filmIndex, 1);
      recommendations.push(film);
      this.setState({ films: { mylist: myList, recommendations } });
    }

    componentDidMount() {
       this.getData();        
    } 
  }
  
  export default FilmList;


