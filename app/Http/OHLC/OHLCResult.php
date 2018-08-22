<?php
namespace App\Http\OHLC;

class OHLCResult{
  private $result=[];
  public function get(){
    return $this->result;
  }
  public function json(){
    return json_encode($this->result);
  }
  public function push( float $open , float $hight,float $low, float $close, float $date){
    $this->result[]=[
        'open'=>$open,
        'hight'=>$hight,
        'low'=>$low,
        'close'=>$close,
        'date'=>$date
    ];
  }
}
