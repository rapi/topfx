<?php

namespace App\Console\Commands;

use App\Symbol;
use App\Ohlc;
use App\Http\OHLC\OHLCHistory;
use Illuminate\Console\Command;

class ohlc_update extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ohlc_update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
      $all=Symbol::all();
      foreach ($all as $symbol) {
        $OHLC=new OHLCHistory($symbol->provider);
        $data=$OHLC->montly($symbol->name)->get();
        foreach ($data as $q) {
          $OHLC= Ohlc::firstOrNew($q);
          $symbol->OHLC()->save($OHLC);
        }
      }
    }
}
