<?php
namespace App\Http\OHLC;
use PHPMailer\PHPMailer\PHPMailer;
use Exception;
// use Iextrading;
// $stockQuote = IEXTrading::stockQuote( 'aapl' );
class OHLCHistory implements iOHLC{
  private $provider;
  public static $providers=[
    'Iextrading'
  ];
   function __construct($provider){
    if(!in_array($provider,OHLCHistory::$providers))
      throw new Exception('No provider `'.$provider.'`');
    $this->provider=new Iextrading();
  }
  public function info($symbol):array{
    return $this->provider->info($symbol);

  }
  public function montly($symbol):OHLCResult{
    return $this->provider->montly($symbol);
  }

}
