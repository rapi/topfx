<?php
namespace App\Http\OHLC;
use PHPMailer\PHPMailer\PHPMailer;

// use iOHLC;
// $stockQuote = IEXTrading::stockQuote( 'aapl' );
class Iextrading implements iOHLC{
  public function info($symbol):array{
    $res=file_get_contents('https://api.iextrading.com/1.0/stock/'.$symbol.'/company');
    $res=json_decode($res,1);
    $res['desc']=$res['companyName'];
    return $res;
  }
  public function montly($symbol):OHLCResult{
    $result= new OHLCResult();
    $res=file_get_contents('https://api.iextrading.com/1.0/stock/'.$symbol.'/chart/1y');
    $res=json_decode($res,1);
    foreach ($res as  $value) {
      $result->push(
        $value['open'],
        $value['high'],
        $value['low'],
        $value['close'],
        Date(strtotime($value['date']))
      );
    }
    return $result;
  }
}
