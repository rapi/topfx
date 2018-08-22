import React from 'react'
import {getSymbols} from 'actions/symbols'
import {connect} from 'react-redux'
import 'components/symbols.sass'
import Icon from 'Icons/Fa'
import Remove from './Remove'
import Form from './Form'

class List extends React.Component {
    state = {
        symbols: [],
        form: false
    }
    putSymbols(e) {
        this.setState({
            ...this.state,
            symbols: e
        })
    }
    componentDidMount() {
        this.fetch()
    }
    addForm(bool) {
        this.setState({
            ...this.state,
            form: bool
        })
    }
    fetch() {
        this.props.fetchSymbol().then(this.putSymbols.bind(this))
    }
    constructor(props) {
        super(props)
        let cmd = window.location.pathname.split('/')
        cmd = cmd[cmd.length - 1]
        switch (cmd) {
            case 'add':
                this.state.form = true;
                break;
            default:

        }
    }
    render() {
        let back = <button className='btn btn-primary mb-4' onClick={() => this.addForm(false)}>Back</button>
        return <div className="container-flud">
        <div className="row">
            {
                this.state.form
                    ? <div className='w-100'>{back}<Form/></div>
                    : (<div className="row symbols-list">
                        <div className="col-sm-6 col-lg-2 col-md-3 mb-3 p-3">
                            <a href='#' onClick={() => this.addForm(true)}>
                                <div className="card p-1 text-center rounded-0">
                                    <div className="card-body">
                                        <Icon icon="plus" size='2x'/>
                                    </div>
                                </div>
                            </a>
                        </div>
                        {
                            this.state.symbols.map((e,i) => <div key={i} className="custom-card m-3 text-center">
                                <img className="" src={"/img/big/symbols/"+e.logo} alt="Card image cap"/>
                                <div className="card-body">
                                    <h4>
                                      {e.name}
                                    </h4>
                                    <Remove id={e.id} onClick={this.fetch.bind(this)}/>
                                </div>
                        </div>)
                        }</div>)
            }
        </div>
        </div>
        ;

    }
}
const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => ({
    fetchSymbol: (filter) => dispatch(getSymbols(filter))
})
export default connect(mapStateToProps, mapDispatchToProps)(List)
