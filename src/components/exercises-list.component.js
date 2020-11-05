import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td className="text-center">{props.exercise.duration}</td>
        <td className="text-center">{new Intl.DateTimeFormat('tr-TR', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date(props.exercise.date.substring(0,10)))}</td>
        <td className="text-center">
            <Link style={{fontSize: 18}} className="text-info mr-1" to={"/edit/"+props.exercise._id}>
                <FontAwesomeIcon icon="edit"></FontAwesomeIcon>
                </Link> | 
                <a href="#" style={{fontSize: 18}} className="text-danger ml-2" onClick={() => {props.deleteExercise(props.exercise._id)}}>
                    <FontAwesomeIcon icon="trash"></FontAwesomeIcon>
                </a>
        </td>
    </tr>
)

export default class ExercisesList extends Component{
    constructor(props){
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
          .then(response => {
              this.setState({
                  exercises: response.data
                });
          })
          .catch((error) => {
            console.log(error);
          })
    }    

    deleteExercise(id){
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(res => console.log(res.data));

        this.setState({
            exercises : this.state.exercises.filter(el => el._id !== id)
        });
    }

    exerciseList(){
        return this.state.exercises.map(currentExercise => {
            return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id} />;
        })
    }

    render(){
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th className="text-center">Duration</th>
                            <th className="text-center">Date</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        );
    }
}