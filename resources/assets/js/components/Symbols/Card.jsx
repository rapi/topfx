import React from 'react'
import CardLoader from 'Card/Loader'
import Card from 'Card/WithIcon'
import Line from 'Charts/Line'
import Flip from 'Image/Flip'
import {connect} from 'react-redux'
import {getRandom} from 'actions/symbols'
import PropTypes from 'prop-types';
import 'components/cardLoader.sass';

class SymbolCard extends React.Component {
  tid=0
  state = {}
  fetch() {
    let random = parseInt((Math.random() * 10) + 3) * 1000;
    this.props.fetchSymbol().then((value) => {

      this.put(value)
      this.tid=setTimeout(() => this.fetch(), random)
    })
  }
  componentWillUnmount() {
    clearTimeout(this.tid);
  }
  componentDidMount() {
    this.fetch('first', 'stock')
  }
  put(value) {
    if(this.state)
    this.setState({
      ...value
    })
  }
  render() {
    if (this.state.name)
      return <Card image={<Flip
        size = {
          100
        }
        src = {
          'symbols/' + this.state.logo
        }
        />} title={
          (this.props.titleFilter)?this.props.titleFilter(this.state):this.state.name
        } body={<Line className = {this.props.theme?this.props.theme:'success'} data = {
          this.state.ohlc
        } />} body-padding={0}/>
    else
      return <CardLoader/>
  }
}
const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => ({
  fetchSymbol: (filter) => dispatch(getRandom(filter))
})
SymbolCard.propTypes = {
  theme: PropTypes.oneOf([
    'primary',
    'info',
    'danger',
    'success',
    'warning'
  ]),
  titleFilter: PropTypes.func,
}
export default connect(mapStateToProps, mapDispatchToProps)(SymbolCard)
