import React from 'react'
import {getSymbols} from 'actions/symbols'
import {connect} from 'react-redux'
import 'components/symbols.sass'
import Icon from 'Icons/Fa'
import Image from 'Image/Image'
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
        return <div className="container-fluid">
            <div className="row-fluid">
                {

                    this.state.form
                        ? (
                              (this.state.form===true)
                              ?<div className='w-100'>{back}<Form/></div>
                              :<div className='w-100'>{back}<Form form={this.state.form}/></div>
                          )
                        : (<div className="row symbols-list">
                            <div className="col-sm-4 col-lg-1 col-md-3 mb-3">
                              <div className="custom-card text-center">
                                <a href='#' onClick={() => this.addForm(true)}>
                                        <div className="custom-card-icon d-flex align-items-center justify-content-center">
                                            <Icon icon="plus" size='2x'/>
                                        </div>
                                </a>
                              </div>
                            </div>

                            {

                                this.state.symbols.map((e, i) =><div  key={i}><a href='#' onClick={()=>this.addForm(e)} ><div
                                    className = "col-sm-4 col-lg-1 col-md-3 mb-3" > <div className="custom-card text-center">
                                    <div className="custom-card-icon d-flex align-items-center justify-content-center flipped">
                                        <Image className="" src={"symbols/" + e.logo} alt="Card image cap"/>
                                    </div>
                                    <div className="card-body">
                                        <h4>
                                            {e.name}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                          </a>
                          <div className="remove" >
                              <Remove id={e.id} onClick={()=>this.fetch() } />
                          </div>
                        </div>
                          )
                            }
                        </div>)
                }
            </div>
        </div>;

    }
}
const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => ({
    fetchSymbol: (filter) => dispatch(getSymbols(filter))
})
export default connect(mapStateToProps, mapDispatchToProps)(List)
