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
    private $img_dir='public/img_big/symbols/';
    public function testUploadLogo(){
      $images=scandir($this->img_dir);
      $file=new UploadedFile($this->img_dir.$images[2],true);
      $req=$this
          ->post($this->api_logo_url,
            ['logo' => $file]
          )->dump();

    }
    public function testSymbolAdd()
    {
      $this->post($this->api_url,[
          'name'=>'TEST',
        ], array('HTTP_X-Requested-With' => 'XMLHttpRequest'))
          ->assertJson([
                   'name' => true,
               ]);


    }
}
