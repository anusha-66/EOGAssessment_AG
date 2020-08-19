import React, { useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../Features/Dashboard/reducer';
import { Provider, createClient, useQuery } from 'urql';
import { IState } from '../store';
import LinearProgress from '@material-ui/core/LinearProgress';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const d = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

const client = createClient({
    url: 'https://react.eogresources.com/graphql',
  });
  
  const query = `
  query {
    getMeasurements(input: {metricName: "flareTemp"}) {
      metric
      value
      unit
      at
    }
  }
  `;

  const getMeasurementList = (state: IState) => {
    const { measurements } = state.dashboard;
    return measurements;
  };

export default () => {

 console.log(getMeasurementList, "hkjhdk");
 const dispatch = useDispatch();
 const  listOfMeasurements  = useSelector(getMeasurementList);
 console.log(listOfMeasurements, "list of measurements");
 const dataGraph = [...listOfMeasurements.slice(0, 1000)];
//  const [measurementValue, setMeasurementValue] = React.useState([]);
 const [result] = useQuery({
   query,
 });

 const { fetching, data, error } = result;
  console.log(fetching, "fetching");
  console.log(data, "data");
  console.log(error, "error");
 useEffect(() => {
   if (error) {
     dispatch(actions.metricDataReceivedApiError({ error: error.message }));
     return;
   }
   if (!data) return;
//    const { getMeasurements } = data;
   dispatch(actions.measurementsDataReceived(data));
 }, [dispatch, data, error]);

 if (fetching) return <LinearProgress />;


    return (
        <Provider value = {client}>
            <LineChart
        width={500}
        height={300}
        data={dataGraph}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="at" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
        </Provider>
    );
  
}
