<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;



class SymbolsTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    private $api_logo_url='/api/symbols_logo';
    private $api_url='/api/symbols';
    private $img_dir='public/img/big/symbols/';


    public static $logo='';
    public static $id='';

    public function testSymbolAdd()
    {
      $res=$this->post($this->api_url,[
          'name'=>'TEST',
          'logo'=>'public/img/big/symbols/AAPL.png',
          'desc'=>'TEST',
          'providers'=>['TEST'],
        ], array('HTTP_X-Requested-With' => 'XMLHttpRequest'))
          ->assertJson([
              'name' => true,
          ])
          ->json();
        SymbolsTest::$id=$res['id'];
    }
    public function testSymbolGet()
    {
      $res=$this->get($this->api_url.'/random')
          ->assertJson([
              'name' => true,
          ]);
        // SymbolsTest::$id=$res['id'];
    }
    public function testSymbolDelete()
    {
      $this->delete($this->api_url.'/'.SymbolsTest::$id)
          ->assertJson([
              'status' => true,
          ]);
    }
}
