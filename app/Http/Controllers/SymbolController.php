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
      if($name==='random')
        return Symbol::inRandomOrder()->limit(1)->first();
      else
        return Symbol::where('name',$name)->limit(1)->first();
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
    public function searchLogo($name){
      $doc = new \DOMDocument('1.0', 'UTF-8');
      $html = file_get_contents( "https://www.google.com/search?q=".$name."+logo&tbm=isch" );
      $internalErrors = libxml_use_internal_errors(true);
      $doc->loadHTML($html);
      libxml_use_internal_errors($internalErrors);
      $table=$doc->getElementById('ires');
      $table=$table->getElementsByTagName('img');
      $result=[];
      foreach ($table as $t) {
        $result[]=$t->getAttribute('src');
      }
      return $result;
    }
    public function add(Request $request){
      $random=$request->input('name').rand(999999,8888888888);
      copy($request->input('logo'), public_path('img/big/symbols/').$random);
      $symbol= new Symbol();
      $symbol->name=      $request->input('name');
      $symbol->desc=      $request->input('desc');
      $symbol->provider=  $request->input('providers')[0];
      $symbol->logo=      $random;
      $symbol->save();

      return json_encode($symbol);
    }
    public function upload_logo(Request $request){
      if ($request->hasFile('logo')) {
        $path=$request->logo->store('public');
        rename(storage_path().DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.$path,str_replace('public','public'.DIRECTORY_SEPARATOR.'img'.DIRECTORY_SEPARATOR.'tmp',$path));
      }
      return json_encode(['name'=>str_replace('public'.DIRECTORY_SEPARATOR,'',$path)]);
    }
}
