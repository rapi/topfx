import React from 'react'
import {getSymbols} from 'actions/symbols'
import {connect} from 'react-redux'
import 'components/symbols.sass'
import Icon from 'Icons/Fa'
import Remove from './Remove'

class List extends React.Component {
    state={
      symbols:[]
    }
    putSymbols(e){
      this.setState({
        ...this.state,
        symbols:e
      })
    }
    componentDidMount() {
      this.fetch()
    }
    fetch() {
        this.props.fetchSymbol()
        .then(this.putSymbols.bind(this))
    }
    render() {
        return <div className="row">
            {
              this.state.symbols.map(e=><div key={e.id} className="col-sm-6 col-lg-2 col-md-3 mb-3 p-3">
                <div className="card p-1 text-center">
                    <img className="card-img-top" src="img/big/symbols/AAPL.png" width='50' alt="Card image cap"/>
                    <div className="card-body">
                      <Remove id={e.id} onClick={this.fetch.bind(this)}/>
                    </div>
                </div>

            </div>)
        }
        </div>;

    }
}
const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => ({
    fetchSymbol: (filter) => dispatch(getSymbols(filter))
})
export default connect(mapStateToProps, mapDispatchToProps)(List)
