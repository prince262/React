//import logo from './logo.svg';
import './App.css';
import React, { Component, useState, useEffect } from 'react'
import { Dropdown, Button, Table } from 'react-bootstrap'
import axios from 'axios'
import Pagination from '@material-ui/lab/Pagination';
const para = ['adress','bank_id', 'branch',  'city', 'district', 'ifsc','state']
function App() {

  useEffect(() => {
    post()
   

  }, [])
  const search = () => {
    var text = document.getElementById('1').value;

    //console.log('text', text)


    // console.log('start',text)
    const newData = maindata.filter(function (item) {
        console.log(item.address,text)


      const itemData = item.state
      // ? item.toUpperCase()
      // : ''.toUpperCase();
      const textData = text.toUpperCase();
      const itemData1 = item.city
      const itemData2 = item.branch
      const itemData3 = item.district
     const itemData5 = item.address
      // ? item.title.toUpperCase()
      // : ''.toUpperCase();
      // const itemData2 = item.hashtags
      //     ? item.hashtags.toUpperCase()
      //     : ''.toUpperCase();
     // const textData2 = text.toUpperCase();
     // return itemData.indexOf(textData) > -1 
      return itemData.indexOf(textData) > -1 || itemData1.indexOf(textData) > -1 || itemData2.indexOf(textData) > -1 ||itemData3.indexOf(textData) > -1 ||  itemData5.indexOf(textData) > -1;
    });
    console.log(newData)
    setData(newData)
  }
const [branch ,setBranch]=useState('RTGS-HO')
const [page,setPage]=useState(1)
const [totalpage,setTotalpage]=useState(0)
  const [text, setText] = useState('')
  const [data, setData] = useState([])
  const [maindata, setMainData] = useState([])
  const post1 = async (text) => {
  setBranch(text)
    const axios = require('axios');

    let config = {
      method: 'get',
      url: `https://princefylepython.herokuapp.com/api/branches/autocomplete?q=${text}`,
      headers: {}
    };

    axios(config)
      .then((response) => {
         console.log(JSON.stringify(response.data.banks[0]));
        setData(response.data.banks)
        setMainData(response.data.banks)
        setTotalpage(response.data.page_count)
        console.log(data)
      })
      .catch((error) => {
        console.log(error);
      });


  }
  const post = async () => {
    console.log('start', branch)
    const axios = require('axios');

    let config = {
      method: 'get',
      url: `https://princefylepython.herokuapp.com/api/branches/autocomplete?q=${branch}`,
      headers: {}
    };

    axios(config)
      .then((response) => {
         console.log(JSON.stringify(response.data.banks[0]));
        setData(response.data.banks)
        setMainData(response.data.banks)
        setTotalpage(response.data.page_count)
        console.log(data)
      })
      .catch((error) => {
        console.log(error);
      });


  }
  // const handleChange=()=>{
  //   var text = document.getElementById('page').value;
  //   console.log('page',text)
  //   setPage(page)
  // }
  const handleChange = (event, value) => {
    console.log(value)
    setPage(value);
    console.log('start', branch)
    const axios = require('axios');

    let config = {
      method: 'get',
      url: `https://princefylepython.herokuapp.com/api/branches/autocomplete?q=${branch}&offset=${value}`,
      headers: {}
    };

    axios(config)
      .then((response) => {
         console.log(JSON.stringify(response.data.banks[0]));
        setData(response.data.banks)
        setMainData(response.data.banks)
        setTotalpage(response.data.page_count)
        console.log(data)
      })
      .catch((error) => {
        console.log(error);
      });

  };
  return (
    <>
      {/* {['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Danger'].map(
    (variant) => (
      <DropdownButton
        as={ButtonGroup}
        key={variant}
        id={`dropdown-variants-${variant}`}
        variant={variant.toLowerCase()}
        title={variant}
      >
        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="3" active>
          Active Item
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
      </DropdownButton>
    ),
  )} */}

      <div className="Search" flexDirection='row'>


        <Dropdown style={{ marginTop: "2%", alignSelf: 'center', marginLeft: "2%" }}>
          <Dropdown.Toggle variant="success" id="dropdown-basic" >
            Dropdown Button
  </Dropdown.Toggle>

          <Dropdown.Menu  id='item' style={{ flexDirection: 'column', padding: 10 }}>

            <Dropdown.Item  onClick={()=>{post1('BANGALORE')}} href="#/action-1">BANGALORE</Dropdown.Item>
            <Dropdown.Item onClick={()=>{post1('RTGS-HO')}} href="#/action-2">RTGS-HO</Dropdown.Item>
            <Dropdown.Item onClick={()=>{post1('PUNE')}} href="#/action-3">PUNE</Dropdown.Item>
            <Dropdown.Item onClick={()=>{post1('MUMBAI')}} href="#/action-3">MUMBAI</Dropdown.Item>
            <Dropdown.Item onClick={()=>{post1('KANJUR')}} href="#/action-3">KANJUR</Dropdown.Item>  

          </Dropdown.Menu>
        </Dropdown>
        <form>

          <input
            style={{ marginLeft: '2%' }}
            type="text"
            id="1"
            placeholder={'search'}
          />

        </form>
        <h1>{text}</h1>

        <Button
          style={{ marginLeft: '2%' }}
          variant="primary"
          onClick={search}
        >Submit</Button>
      </div>

      <Table responsive>
        <thead>
          <tr>
            <th>No</th>
            {
              para.map((_, index) => (
              
                <th key={index}>{_}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {data.map((i, ind) => (


            <tr>

             <td>{ind+1}</td>
             <td>{i.address}</td>
            
             <td>{i.bank_id}</td>
             <td>{i.branch}</td>
             <td>{i.city}</td>
             <td>{i.district}</td>
             <td>{i.ifsc}</td>
             <td>{i.state}</td>
           
             
              
              {/* <td>
                {i.isfc}
              </td> */}
            </tr>
          ))
          }

        </tbody>
      </Table>
      <Pagination id='page' page={page} count={totalpage} onChange={handleChange}  />
    </>
  );
}

export default App;
