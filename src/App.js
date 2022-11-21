// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import useSWR from "swr";
// import './Api.js';

const fetcher = async url => {
  const res = await axios.get(url, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  );
  if (res.retCode) {
    const error = new Error('An error occurred while fetching the data.')
    // 将额外的信息附加到错误对象上。
    error.info = await res.json()
    error.status = res.status
    return error;
  }
  return res.data.data;
}

function App() {
  const { data, error } = useSWR('http://81.70.76.222/abyss/utilization', fetcher);

  if (error) {
    console.log(error);
    return <div>failed to load {data}</div>;
  }

  if (!data) return <div>loading...</div>

  return (
    <div className="App">
      <header className="App-header">
        <h1>原神披萨深渊榜</h1>
        <p>Powered by Genshin Pizza Helper</p>

        <h3>总用户：{data.totalUsers}</h3>

        <table>
          <thead>
            <tr>
              <th>角色</th>
              <th>使用率</th>
            </tr>
          </thead>
          <tbody>
            {
              getTable(data.avatars.sort((a, b) => b.percentage - a.percentage))
            }
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;

function getTable(data) {
  const rowData = [];
  data.forEach(element => {
    rowData.push(<tr><td>{element.charId}</td><td>{toPercent(element.percentage)}</td></tr>);
  })
  return rowData;
}

function toPercent(point){
  var str=Number(point*100).toFixed(2);
  str+="%";
  return str;
}