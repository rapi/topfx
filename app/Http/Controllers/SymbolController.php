<?php

namespace App\Http\Controllers;
use App\Ohlc;
use App\Symbol;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use App\Http\OHLC\OHLCHistory;


class SymbolController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function delete($id){
        Symbol::destroy($id);
        return ['status'=>true];
    }
    public function get($name=false){
      if(!$name)
        return Symbol::all();
      if($name==='random'){
        $result= Symbol::select('id','name','desc','logo')->has('OHLC')->inRandomOrder()->limit(1)->first();
        $result['ohlc']=$result->OHLC()->select('open','hight','low','close','date')->limit(50)->get();
        return [$result];
      }else{
        $result=Symbol::where('name',$name)->has('OHLC')->limit(1)->first();
        $result['ohlc']=$result->OHLC()->select('open','hight','low','close','date')->limit(50)->get();
        return [$result];
      }
    }

    public function providers($name){
      $result=[];
      foreach(OHLCHistory::$providers as $provider_name){
        $provider=new OHLCHistory($provider_name);
        $val=$provider->info($name);
        $val['provider']=$provider_name;
        $result[]=$val;
      }
      return $result;
    }
    public function searchLogo($search_query){
      $search_query = urlencode( $search_query );
      $googleRealURL = "https://www.google.com/search?hl=en&biw=1360&bih=652&tbm=isch&sa=1&q=".$search_query."&oq=".$search_query;

      // Call Google with CURL + User-Agent
      $ch = curl_init($googleRealURL);
      curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
      curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (X11; Linux i686; rv:20.0) Gecko/20121230 Firefox/20.0');
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
      curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
      $google = curl_exec($ch);
      $array_imghtml = explode("\"ou\":\"", $google); //the big url is inside JSON snippet "ou":"big url"
      foreach($array_imghtml as $key => $value){
        if ($key > 0) {
          $array_imghtml_2 = explode("\",\"", $value);
          $array_imgurl[] = $array_imghtml_2[0];
        }
      }
      return array_slice($array_imgurl, 0, 20);
    }
    public function add(Request $request){
      $symbol= new Symbol();
      $symbol->name=      $request->input('name');
      $symbol->desc=      $request->input('desc');
      $symbol->provider=  $request->input('providers')[0];
      $symbol->logo=$this->grab_image($request->input('logo'), public_path('img/big/symbols/'));
      $symbol->save();

      $OHLC=new OHLCHistory($symbol->provider);
      $data=$OHLC->montly($symbol->name)->get();
      foreach ($data as $q) {
        $OHLC= Ohlc::firstOrNew($q);
        $symbol->OHLC()->save($OHLC);
      }
      return json_encode($symbol);
    }
    public function edit(Request $request,$id){
      // if($symbol->logo!==$request->input('logo')){
        $symbol->logo=$this->grab_image($request->input('logo'), public_path('img/big/symbols/'));
        return 11;
        $symbol->save();
      // }
      $symbol= Symbol::find($id);
      $symbol->name=      $request->input('name');
      $symbol->desc=      $request->input('desc');
      $symbol->provider=  $request->input('providers')[0];

      return json_encode($symbol);
    }
    function grab_image($url,$saveto){
        $ch = curl_init ($url);
        $random=rand(999999,8888888888);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER,1);
        $raw=curl_exec($ch);
        $content_type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
        $content_type=explode('/',$content_type);
        $name=$random.'.'.$content_type[count($content_type)-1];
        $saveto.=$name;
        curl_close ($ch);
        if(file_exists($saveto)){
            unlink($saveto);
        }
        $fp = fopen($saveto,'x');
        fwrite($fp, $raw);
        fclose($fp);
        return $name;
    }

}
