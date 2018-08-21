<?php

namespace App\Http\Controllers;
use App\Symbol;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;


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

    public function add(Request $request){
      $symbol= new Symbol();
      $symbol->name=      $request->input('name');
      $symbol->desc=      $request->input('desc');
      $symbol->provider=  $request->input('provider');
      $symbol->logo=      $request->input('logo');
      $symbol->save();
      rename(
        'public'.DIRECTORY_SEPARATOR.'img'.DIRECTORY_SEPARATOR.'tmp'.DIRECTORY_SEPARATOR.$symbol->logo,
        'public'.DIRECTORY_SEPARATOR.'img'.DIRECTORY_SEPARATOR.'big'.DIRECTORY_SEPARATOR.$symbol->logo
      );
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
