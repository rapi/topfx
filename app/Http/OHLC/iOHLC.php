<?php
namespace App\Http\OHLC;

interface iOHLC{
  public function montly($symbol):OHLCResult;
  public function info($symbol):array;
}
