<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>


    </head>
    <body>
      <div id='root'>
      </div>
    </body>
    <div style="display:none">
    <?php
      exec('git rev-parse --verify HEAD 2> /dev/null', $output);
      echo '<script src="/js/app.js?'.$output[0].'"></script>';?>
    </div>
</html>
