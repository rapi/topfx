<?php

namespace App\Http\Controllers;
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
      $googleRealURL = "https://www.google.com/search?hl=en&biw=1360&bih=652&tbs=isz%3Alt%2Cislt%3Asvga%2Citp%3Aphoto&tbm=isch&sa=1&q=".$search_query."&oq=".$search_query."&gs_l=psy-ab.12...0.0.0.10572.0.0.0.0.0.0.0.0..0.0....0...1..64.psy-ab..0.0.0.wFdNGGlUIRk";

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
      return($array_imgurl); //array contains the urls for the big images
      // $doc = new \DOMDocument('1.0', 'UTF-8');
      // $html = file_get_contents("https://www.google.com/search?q=".str_replace(' ','+',$name)."+logo&tbm=isch" );
      // return str_replace('<','&lt;',$html);
      // $internalErrors = libxml_use_internal_errors(true);
      // $doc->loadHTML($html);
      // libxml_use_internal_errors($internalErrors);
      // $table=$doc->getElementById('ires');
      // $table=$table->getElementsByTagName('img');
      // $result=[];
      // foreach ($table as $t) {
      //   $result[]=$t->getAttribute('src');
      // }
      // return $result;
    }
    public function add(Request $request){
      $random=$request->input('name').rand(999999,8888888888);
      $this->grab_image($request->input('logo'), public_path('img/big/symbols/').$random);
      $symbol= new Symbol();
      $symbol->name=      $request->input('name');
      $symbol->desc=      $request->input('desc');
      $symbol->provider=  $request->input('providers')[0];
      $symbol->logo=      $random;
      $symbol->save();

      return json_encode($symbol);
    }
    public function edit(Request $request,$id){
      $symbol= Symbol::find($id);
      $symbol->name=      $request->input('name');
      $symbol->desc=      $request->input('desc');
      $symbol->provider=  $request->input('providers')[0];
      if($symbol->logo!==$request->input('logo')){
        $random=$request->input('name').rand(999999,8888888888);
        $this->grab_image($request->input('logo'), public_path('img/big/symbols/').$random);
        $symbol->logo= $random;
        $symbol->save();
      }

      return json_encode($symbol);
    }
    function grab_image($url,$saveto){
        $ch = curl_init ($url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER,1);
        $raw=curl_exec($ch);
        curl_close ($ch);
        if(file_exists($saveto)){
            unlink($saveto);
        }
        $fp = fopen($saveto,'x');
        fwrite($fp, $raw);
        fclose($fp);
    }

}
