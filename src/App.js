import logo from './logo.jpg';
import './App.css';
import axios from 'axios';
import useSWR from "swr";
// import './Api.js';


const charIdMap = new Map();

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
        <img className='logo' src={logo} alt="logo" />

        <h1>原神披萨深渊榜</h1>

        <h5>统计范围：{data.totalUsers}位深渊满星玩家</h5>

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

        <div className='footer'>
          <p>打开<a href="https://apps.apple.com/app/id1635319193">原神披萨小助手</a>iOS App查看更多信息和其他榜单  |  榜单如何计算？数据如何上传？请看<a href='http://ophelper.top/static/faq_abyss'>FAQ</a></p>
          <h5><p>Powered by <a href="https://apps.apple.com/app/id1635319193">Genshin Pizza Helper</a></p></h5>
        </div>
      </header>
    </div>
  );
}

export default App;

function getTable(data) {
  const rowData = [];
  data.forEach(element => {
    rowData.push(<tr><td>{charIdMap.get(element.charId) ?? element.charId}</td><td>{toPercent(element.percentage)}</td></tr>);
  })
  return rowData;
}

function toPercent(point) {
  var str = Number(point * 100).toFixed(2);
  str += "%";
  return str;
}

charIdMap.set(10000002, '神里绫华');
charIdMap.set(10000003, '琴');
charIdMap.set(10000005, '旅行者');
charIdMap.set(10000006, '丽莎');
charIdMap.set(10000007, '旅行者');
charIdMap.set(10000014, '芭芭拉');
charIdMap.set(10000015, '凯亚');
charIdMap.set(10000016, '迪卢克');
charIdMap.set(10000020, '雷泽');
charIdMap.set(10000021, '安柏');
charIdMap.set(10000022, '温迪');
charIdMap.set(10000023, '香菱');
charIdMap.set(10000024, '北斗');
charIdMap.set(10000025, '行秋');
charIdMap.set(10000026, '魈');
charIdMap.set(10000027, '凝光');
charIdMap.set(10000029, '可莉');
charIdMap.set(10000030, '钟离');
charIdMap.set(10000031, '菲谢尔');
charIdMap.set(10000032, '班尼特');
charIdMap.set(10000033, '达达利亚');
charIdMap.set(10000034, '诺艾尔');
charIdMap.set(10000035, '七七');
charIdMap.set(10000036, '重云');
charIdMap.set(10000037, '甘雨');
charIdMap.set(10000038, '阿贝多');
charIdMap.set(10000039, '迪奥娜');
charIdMap.set(10000041, '莫娜');
charIdMap.set(10000042, '刻晴');
charIdMap.set(10000043, '砂糖');
charIdMap.set(10000044, '辛焱');
charIdMap.set(10000045, '罗莎莉亚');
charIdMap.set(10000046, '胡桃');
charIdMap.set(10000047, '枫原万叶');
charIdMap.set(10000048, '烟绯');
charIdMap.set(10000049, '宵宫');
charIdMap.set(10000050, '托马');
charIdMap.set(10000051, '优菈');
charIdMap.set(10000052, '雷电将军');
charIdMap.set(10000053, '早柚');
charIdMap.set(10000054, '珊瑚宫心海');
charIdMap.set(10000055, '五郎');
charIdMap.set(10000056, '九条裟罗');
charIdMap.set(10000057, '荒泷一斗');
charIdMap.set(10000058, '八重神子');
charIdMap.set(10000059, '鹿野院平藏');
charIdMap.set(10000060, '夜兰');
charIdMap.set(10000062, '埃洛伊');
charIdMap.set(10000063, '申鹤');
charIdMap.set(10000064, '云堇');
charIdMap.set(10000065, '久岐忍');
charIdMap.set(10000066, '神里绫人');
charIdMap.set(10000067, '柯莱');
charIdMap.set(10000068, '多莉');
charIdMap.set(10000069, '提纳里');
charIdMap.set(10000070, '妮露');
charIdMap.set(10000071, '赛诺');
charIdMap.set(10000072, '坎蒂丝');
charIdMap.set(10000073, '纳西妲');
charIdMap.set(10000074, '莱伊拉');
