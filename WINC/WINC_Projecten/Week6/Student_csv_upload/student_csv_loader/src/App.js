// reference to setup: https://medium.com/@lawrey/upload-csv-data-to-firebase-using-react-js-1afc9b45ea3f

import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import csv from 'csv';

class App extends Component {
  onDrop = files => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      csv.parse(reader.result, (error, exercises) => {
        if (error) {
          console.log(error);
        } else {
          const exerciseList = [];

          exercises.forEach((exercise, index) => {
            if (index !== 0) {
              const newExercise = {
                name: exercise[0],
                exercise: exercise[1],
                ratingDifficulty: parseInt(exercise[2]),
                ratingEnjoyment: parseInt(exercise[3])
              };
              exerciseList.push(newExercise);
            }
          });

          fetch(
            'https://student-dashboard-f102f.firebaseio.com/student_array.json',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(exerciseList)
            }
          );
        }
      });
    };
    reader.readAsBinaryString(file);
  };

  render() {
    return (
      <div align='center'>
        <div style={{ margin: '20px' }}>
          <Dropzone accept='.csv' onDropAccepted={this.onDrop}></Dropzone>
        </div>
        <h2>Upload student .csv here!</h2>
      </div>
    );
  }
}

export default App;
