import React, { Component } from  'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
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

  handleClose = () => {
    this.setState({ showSnack: false });
  };

  render() {

    const columns = [{
      Header: 'Brand',
      accessor: 'brand'
    }, {
      Header: 'Model',
      accessor: 'model',
    }, {
      Header: 'Year',
      accessor: 'year'
    }, {
      Header: 'Color',
      accessor: 'color',
    }, {
      Header: 'Fuel',
      accessor: 'fuel',
    }, {
        Header: 'Price ($)',
        accessor: 'price', 
    },   {
          Header: '',
          filterable: false,
          sortable: false,
          accessor: '_links.self.href', 
          Cell: ({value}) => (<Tooltip title="Delete" placement="right-end">
                              <IconButton size="small" onClick={() => this.deleteCar(value)} aria-label="Delete">
                              <DeleteIcon />
                              </IconButton></Tooltip>)
            
    }]
     
    return (
      <div>
      <Addcar />
      
      <ReactTable defaultPageSize={12} filterable={true}
      data={this.state.cars} 
      columns={columns} />
      <Snackbar message={'Car deleted'} autoHideDuration={2000} open={this.state.showSnack} onClose={this.handleClose} />
      </div>
    )
  }

}

export default Carlist;