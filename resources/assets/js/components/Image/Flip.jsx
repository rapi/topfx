import React from 'react';
import Image from './Image'
import 'components/flip.sass'
export default class extends React.Component {
  flipped=false
  componentDidMount(){
    this.current=this.props.src
  }
  render() {
    // console.log([this.current,this.next],)
    this.switch()
    return <div className={"flip d-flex align-items-center justify-content-center "+(this.flipped?'flipped':'')} style={{
        width:this.props.size,
        height:this.props.size
      }}>
        <div className="front">
          <Image src={this.current} style={{
                'maxHeight':this.props.size,
                'maxWidth':this.props.size
              }}/>
        </div>
        <div className="back">
          <Image src={this.next}  style={{
                'maxHeight':this.props.size,
                'maxWidth':this.props.size
              }}/>
        </div>
    </div>
  }
  switch(){
    this.flipped=!this.flipped
    if(this.flipped)
      this.next=this.props.src
    else
      this.current=this.props.src
  }
}
