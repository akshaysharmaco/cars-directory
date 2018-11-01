import React, { Component } from  'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import Addcar from './Addcar';

class Carlist extends Component {
  constructor(params) {
    super(params);
    this.state = {cars: []};
  }

  componentDidMount(){
    this.listCars();
  }
    listCars = () => {
    fetch('https://carstockrest.herokuapp.com/cars')
    .then(response => response.json())
    .then(responseData => {
      this.setState({cars: responseData._embedded.cars})
    })
  }
  

  //Delete a Car
  deleteCar = (link) => {
    fetch(link, {method: 'DELETE'})
    .then(response => {
    this.listCars();
    this.setState({showSnack: true})
    })
  }


  //Save a Car
  saveCar = (car) => { 
  fetch(
    'https://carstockrest.herokuapp.com/cars',
    {method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(car)})
    .then(response => {
      this.listCars();
    })
  }

  //Updating existing car
  updateCar = (car, link) => {
    fetch(link,
      {method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(car)})
      .then(response => {
        this.listCars();
      })
  }

  renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.cars];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ cars: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.cars[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }


  handleClose = () => {
    this.setState({ showSnack: false });
  };

  render() {

    const columns = [{
      Header: 'Brand',
      accessor: 'brand',
      Cell:  this.renderEditable
    }, {
      Header: 'Model',
      accessor: 'model',
      Cell:  this.renderEditable
    }, {
      Header: 'Year',
      accessor: 'year',
      Cell:  this.renderEditable
    }, {
      Header: 'Color',
      accessor: 'color',
      Cell:  this.renderEditable
    }, {
      Header: 'Fuel',
      accessor: 'fuel',
      Cell:  this.renderEditable
    }, {
      Header: 'Price ($)',
      accessor: 'price', 
      Cell:  this.renderEditable
    },  
    {
      Header: '',
      filterable: false,
      sortable: false,
      minWidth: 30,
      accessor: '_links.self.href', 
      Cell: ({row, value}) => (<Tooltip title="Save" placement="right-end">
                          <IconButton size="small" color="default" onClick={() => this.updateCar(row, value)}>
                          <SaveIcon />
                          </IconButton></Tooltip>)
        
},
    {
          Header: '',
          filterable: false,
          sortable: false,
          minWidth: 30,
          accessor: '_links.self.href', 
          Cell: ({value}) => (<Tooltip title="Delete" placement="right-end">
                              <IconButton size="small" onClick={() => this.deleteCar(value)}>
                              <DeleteIcon />
                              </IconButton></Tooltip>)
            
    }]
     
    return (
      <div>
      <Addcar saveCar={this.saveCar} />

      <ReactTable defaultPageSize={12} filterable={true}
      data={this.state.cars} 
      columns={columns} />
      <Snackbar message={'Car deleted'} autoHideDuration={2000} open={this.state.showSnack} onClose={this.handleClose} />
      </div>
    )
  }

}

export default Carlist;