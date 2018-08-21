import React from 'react'
import Icon from 'Icons/Fa'
import {connect} from 'react-redux'
import {removeSymbol} from 'actions/symbols'


class Remove extends React.Component{
  remove(id){
    return this.props.removeSymbol(id)
  }
  render(){
    return  <a onClick={(e)=>{
        this.remove(this.props.id)
        .then(()=>this.props.onClick());
      }}><Icon icon = "trash-alt" /></a>
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => ({
    removeSymbol: (filter) => dispatch(removeSymbol(filter))
})
export default connect(mapStateToProps, mapDispatchToProps)(Remove)
