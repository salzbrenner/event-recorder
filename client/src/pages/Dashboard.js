import React, { useEffect, useState } from 'react';
import { listenForTestResults } from '../api';
import {Link} from 'react-router-dom';

const Dashboard = () => {
  const [tests, setTests] = useState([]);
  useEffect(() => {
    listenForTestResults(res => setTests([...tests, res]));
  });

  return (
    <>
      <div>
        <Link to={'/'}>BACK HOME</Link>

        <ul>
          {tests.map((test, idx) => {
            return (
              <li key={idx}>
                Results for Recording {test.recordingId}:
                <ul>
                  {test.results.map((result, idx) => (
                    <li key={idx}>{result}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

// class Dashboard extends React.Component {
//   state = {
//     results: 'no timestamp yet'
//   };
//   constructor(props) {
//     super(props);
//     listenForTestResults((results) => {
//       console.log("YOOHOO")
//       this.setState({
//         results
//       })
//     });
//     socket.on('testResult', result => {console.log("HEOOLOO")})
//
//   }
//
//   render() {
//     return (
//           <p className="App-intro">
//             This is the timer value: {this.state.results}
//           </p>
//     );
//   }
// }

export default Dashboard;
