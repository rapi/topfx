import React from 'react'
import {
  searchLogo,
  addSymbol,
  editSymbol,
  findProviders
} from 'actions/symbols'
import {connect} from 'react-redux'
// import 'components/symbols.sass'
import Icon from 'Icons/Fa'

class Form extends React.Component {
    state = {
        form: {
            name: '',
            providers: [],

        },
        error: false,
        providers: [],
        logo: []
    }
    constructor(props){
      super(props)
      if(props.form){
        this.state.form=props.form
        this.findProviders(props.form.name)
      }

      this.submit=this.submit.bind(this)
      this.findProviders=this.findProviders.bind(this)
      this.findLogo=this.findLogo.bind(this)
      this.error=this.error.bind(this)
    }
    submit() {
      if(!this.state.form.name)return this.error('Complete name')
      if(this.state.form.providers.length==0)return this.error('Choose Provider')
      if(!this.state.form.logo)return this.error('Choose Logo')
      if(this.state.form.id)
        this.props.edit(this.state.form.id,this.state.form)
          .then((e)=>{
            window.location='/symbols'
          }
        )
      else
      this.props.add(this.state.form)
        .then((e)=>{
          window.location='/symbols'
        }
      )
    }
    change(name, value) {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [name]: value
            }
        })
    }
    error(err) {
        this.setState({
            ...this.state,
            error: err
        })
        return false;
    }
    findProviders(val) {
      this.props.findProviders(val).then((e) =>{
          if(e.length>0){
            this.setState({
          ...this.state,
          form:{
            ...this.state.form,
            desc:e[0].desc,
            providers:e.map((e)=>e.provider)
          },
          providers:e
        })
        this.findLogo(e[0].desc+' logo')
      }
      })
      .catch((err) => this.error('Cannot Find provider for '+val ))
    }
    findLogo(val) {
        this.props.searchLogo(val).then((e) => this.setState({
            ...this.state,
            logoSearch:val,
            logo: e
        }))
    }
    render() {
      let error=''
      if(this.state.error)
      error=<div className="alert alert-danger">
        {this.state.error}
      </div>;

        return <div className='container-fluid'>
          {error}
            <div className='row'>

                <div className='col-md-3'>
                    <form>
                        <div className="form-group">
                            <input value={this.state.form.name} type="text" onChange={(e) => this.change('name', e.target.value)} className="form-control w-50 d-inline" id="nameSymbol" aria-describedby="emailHelp" placeholder="Enter name"/>
                            <a href="#" onClick={() => {
                                    this.findProviders(this.state.form.name);
                                }
}>
                                <Icon icon="search" size='1x'/></a>

                        </div>
                        {
                            (this.state.providers.length > 0)
                                ? <div>
                                        <div className="form-group">
                                            <label htmlFor="descriptionSymbol">Description</label>
                                            <input value={this.state.form.desc} onChange={(e) => this.change('name', e.target.desc)} type="text" className="form-control" id="descriptionSymbol" aria-describedby="emailHelp" placeholder="Enter description"/>
                                            <div className="form-group"></div>
                                            <label htmlFor="providerSymbol">Providers</label>
                                            <select className="form-control" id='providerSymbol' multiple="multiple">
                                              {this.state.form.providers.map((e,i)=>(<option key={i}>{e}</option>))}
                                            </select>
                                        </div>
                                        <button type="submit" onClick={this.submit}className="btn btn-primary">{this.state.form.id?'Edit':'Add'}</button>
                                        <table  className="table table-striped">
                                        <tbody>
                                          {Object.keys(this.state.providers[0]).map((e,i)=><tr key={i}>
                                            <td>{e}</td>
                                            <td>{this.state.providers[0][e]}</td>
                                        </tr>)}
                                        </tbody>
                                        </table>
                                    </div>
                                : 'No Providers for this symbol'
                        }
                    </form>
                </div>
                <div className='col-md-9'>
                    <h2>Choose Logo</h2>
                      <div className="form-group">
                          <input value={this.state.logoSearch} type="text" onChange={(e) => this.setState({
                              ...this.state,
                              logoSearch:e.target.value
                            })} className="form-control w-50 d-inline" id="nameSymbol" aria-describedby="emailHelp" placeholder="Enter name"/>
                          <a href="#" onClick={() => {
                                  this.findLogo(this.state.logoSearch);
                              }
}>
                              <Icon icon="search" size='1x'/></a>

                      </div>
                    <div className='row'>
                        {
                            (
                                (this.state.form.logo)
                                ? <div className='col-md-3 mb-3 text-center'>
                                    <img height='100'
                                       src={this.state.form.logo.indexOf('http')===0?this.state.form.logo:'/img/big/symbols/'+this.state.form.logo}
                                      />
                                    <br/>
                                    <button type="submit" onClick={() => this.change('logo', false)} className="btn btn-primary">Cancel</button>

                                </div>
                                : this.state.logo.map((e, i) =><div key = {
                                    i
                                }
                                className = 'col-md-3 mb-3' onClick = {
                                    () => this.change('logo', e)
                                } > <a href="#">
                                    <img height='100' src={e.indexOf('http')===0?e:'/img/big/symbols/'+e}/>
                                </a>
                            </div>))
                        }
                    </div>
                </div>
            </div>
        </div>
    }
}
const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => ({
    searchLogo: (filter) => dispatch(searchLogo(filter)),
    findProviders: (filter) => dispatch(findProviders(filter)),
    add: (filter) => dispatch(addSymbol(filter)),
    edit: (id,form) => dispatch(editSymbol(id,form)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Form)
