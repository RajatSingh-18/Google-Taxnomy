import { useEffect, useState } from "react";
import data from './data.txt'

function Chain(){
  const[value,setValue]=useState([])
  const[value1,setValue1]=useState([])
  const[value2,setValue2]=useState([])
  const[select,setSelect]=useState("")
  const[select1,setSelect1]=useState("")
  const [show, setShow] = useState(false)
  const[num,setNum]=useState(0)
    let arr=[];
    let arr1=[]
    useEffect(() => {
      fetch(data)
        .then((response) => response.text())
        .then((data) => {
          arr = data.split("\n");
          setValue(arr);
        });
    }, []);
    let length=[]
    function handleclick() {
      value.map((i) => {
        value1.push(i.split(">"));
        let a = i.split(">");
        let b = a.length;
        length.push(b);
        
      });
      length.forEach((i) => {
        i > num && setNum(i);
      });
      for (var i = 0; i < value1.length; i++) {
        if (value1[i].length == 1) {
          value2.push(value1[i][0].split("-")[1]);
        }
      }
      setShow(true);
    }
    console.log(value2)
          return(
              <>
              <button onClick={handleclick}>Show</button>               
        {show ? (
        <select
          onChange={(e) => {
             setSelect(e.target.value);
          }}
        >
          <option>Select option</option>
          {value2.map((i, key) => {
            return (
              <option key={key} value={i}>
                {i}
              </option>
            );
          })}
        </select>
      ) : null}
      {show ? (
        <select
          onChange={(e) => {
            setSelect(e.target.value)
          }}
        >
          <option>Select option</option>
          {value2.map((i, key) => {
            return (
              <option key={key} value={i}>
                {i}
              </option>
            );
          })}
        </select>
      ) : null}
      {select ? (
        select == "Select option" ? null
       : (
          <select
            onChange={(e) => {
              setSelect1(e.target.value);
            }}
          >
            <option>Select option</option>
            {value1
              .filter((index) => index.length == num)
              .map((i, key) => {
                return i[0].split("-")[1] ? (
                  
                  <option key={key} value={i[1]}>
                    {i[1]}
                  </option>
                ) : null;
              })}
          </select>
        )
      ) : null}
       {select1? (
        select == "Select option" ? null
       : (
          <select
            onChange={(e) => {
              setSelect1(e.target.value);
            }}
          >
            <option>Select option</option>
            {value1
              .filter((index) => index.length == num)
              .map((i, key) => {
                return i[0].split("-")[1]? (
                  
                  <option key={key} value={i[1]}>
                    {i[2]}                   
                  </option>
                ) : null;
              })}
          </select>
        )
      ) : null}
      {select1? (
        select == "Select option" ? null
       : (
          <select
            onChange={(e) => {
              setSelect1(e.target.value);
            }}
          >
            <option>Select option</option>
            {value1
              .filter((index) => index.length == num)
              .map((i, key) => {
                return i[0].split("-")[5]? (
                  
                  <option key={key} value={i[1]}>
                    {i[5]}                   
                  </option>
                ) : null;
              })}
          </select>
        )
      ) : null}
  </>
)
}export default Chain;                                                                              