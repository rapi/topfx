<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/symbols_logo/search/{name}', 'SymbolController@searchLogo');
Route::post('/symbols_logo', 'SymbolController@upload_logo');
Route::get('/symbols/providers/{name}', 'SymbolController@providers');
Route::get('/symbols/{name}', 'SymbolController@get');
Route::get('/symbols', 'SymbolController@get');
Route::post('/symbols', 'SymbolController@add');
Route::delete('/symbols/{id}', 'SymbolController@delete');
