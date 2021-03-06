import React from 'react'
import Flip from 'Image/Flip'
import Line from 'Charts/Line'
import Card from 'Symbols/Card'
class ChartsLayout extends React.Component {
  getTitle(e){
    let procent= parseInt((e.dailyHistory[e.dailyHistory.length-1].close*100)/e.dailyHistory[0].close-100);
    if(procent>0)procent='+ '+procent;
    procent+='%'
    return <div>
      <div><h4>{e.name}</h4></div>
      <div><h5>{procent}</h5></div>
    </div>;
  }
  render() {
    return <div className='dashboard__charts d-flex flex-row flex-wrap'>
        {(new Array(6).fill(undefined)).map((e,i)=>
          <div key={i} className="col-lg-4 col-md-6">
            <Card/>
          </div>
        )}
    </div>
  }
}
export default ChartsLayout
