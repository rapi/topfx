<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class SymbolController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function add(Request $request){
      return json_encode(['name'=>'test']);
    }
    public function upload_logo(Request $request){
      if ($request->hasFile('logo')) {
        $path=$request->logo->store('public');
        rename(storage_path().DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.$path,str_replace('public','public'.DIRECTORY_SEPARATOR.'tmp',$path));
      }
      return json_encode(['name'=>str_replace('public'.DIRECTORY_SEPARATOR,'',$path)]);
    }
}
